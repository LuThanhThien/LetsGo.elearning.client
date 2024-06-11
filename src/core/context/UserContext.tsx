"use client";
import {createContext, use, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import { UserUpdateDto, UserUpdateSchema, ChangePasswordDto, ChangePasswordSchema } from "../schema/User";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPaymentList } from "@/app/api/payment/actions";
import { PaymentModel } from "../models/user/Payment";
import { EnrollmentModel } from "../models/user/Enrollment";
import { Session } from "next-auth";


export type TypeUserContext = {
  session: Session,
  contextStatus: "loading" | "unauthenticated" | "authenticated", 
  setContextStatus: (status: string) => void,
  profileForm: UseFormReturn<UserUpdateDto>,
  resetProfileForm: (data?: UserUpdateDto | undefined | null) => void,
  changePasswordForm: UseFormReturn<ChangePasswordDto>,
  clickChangePassword: boolean,
  resetChangePasswordForm: (data?: ChangePasswordDto | undefined | null) => void,
  handleOpenChangePassword: () => void,
  handleCloseChangePassword: () => void,
  payments: PaymentModel[],
  setPayments: (payments: PaymentModel) => void,
  handleGetPayments: () => void,
}

//@ts-ignore
const UserContext = createContext();

//@ts-ignore
export function UserProvider({ children }) {
  const {data: session, status } = useSession();
  const [clickChangePassword, setClickChangePassword] = useState<boolean>(false);
  const [contextStatus, setContextStatus] = useState<string>("loading");
  const [payments, setPayments] = useState<PaymentModel[]>([]);

  const profileForm = useForm<UserUpdateDto>({
    resolver: zodResolver(UserUpdateSchema),
  });


  const resetProfileForm = async (data?: UserUpdateDto | undefined | null) => {
    if (data) {
      profileForm.reset(data, { keepDirty: false });
      return;
    }
    profileForm.reset({
      username: session?.user.username || "",
      fullName: session?.user.fullName || "",
      phone: session?.user.phone || "",
      location: session?.user.location || "",
      birthDate: session?.user.birthDate ? new Date(session.user.birthDate) : null,
      gender: session?.user.gender || null,
      school: session?.user.school || "",
      avatar: session?.user.avatar || "",
    },
    { keepDirty: false }
    )
  }

  const changePasswordForm = useForm<ChangePasswordDto>({
    resolver: zodResolver(ChangePasswordSchema)
  });

  const resetChangePasswordForm = async (data?: ChangePasswordDto | undefined | null) => {
    if (data) {
      changePasswordForm.reset(data, { keepDirty: false });
      return;
    }
    changePasswordForm.reset({
      username: session?.user.username || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    { keepDirty: false }
    )
  }


  const handleOpenChangePassword = () => {
    setClickChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setClickChangePassword(false);
  };  

  
  const handleGetPayments = async () => {
    console.log("handleGetPayments");
    const response = await getPaymentList();
    if (response.error) {
      setPayments([]);
    }
    setPayments(response.data as PaymentModel[]);
    console.log("payments", payments);
  }

  useEffect(() => {
    if (session) {
      handleGetPayments();
      if (!profileForm.formState.isDirty && !profileForm.formState.isSubmitting) {
      resetProfileForm();
      }
      if (!changePasswordForm.formState.isDirty && !changePasswordForm.formState.isSubmitting) {
        resetChangePasswordForm();
      }
    }
  }, [session]);

  useEffect(() => {
    // loading if status is loading and form is not submitted (since form is submitted, session might be loading status making ui experience bad)
    if (status === "loading" && !profileForm.formState.isSubmitted) {
      setContextStatus("loading");
    } else if (status != "loading") {
      setContextStatus(status);
    } 
  }, [status, profileForm.formState.isSubmitted])

  return (
    <UserContext.Provider value={{ 
      session,
      contextStatus, setContextStatus,
      profileForm, resetProfileForm,
      clickChangePassword, handleCloseChangePassword, handleOpenChangePassword, 
      changePasswordForm, resetChangePasswordForm,
      payments, setPayments, handleGetPayments,

      }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () : TypeUserContext => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context as TypeUserContext;
};


