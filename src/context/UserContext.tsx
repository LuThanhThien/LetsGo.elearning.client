"use client";
import {createContext, use, useContext, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import { UserUpdateDto, UserUpdateSchema, ChangePasswordDto, ChangePasswordSchema } from "@/dto/User";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTotalNumberModules } from "@/app/api/user/enrollment/actions";
import { getPaymentList } from "@/app/api/user/payment/actions";
import { PaymentDto } from "@/dto/Payment";
import { EnrollmentDto } from "@/dto/Enrollment";


export type TypeUserContext = {
  contextStatus: "loading" | "unauthenticated" | "authenticated", 
  setContextStatus: (status: string) => void,
  profileForm: UseFormReturn<UserUpdateDto>,
  resetProfileForm: (data?: UserUpdateDto | undefined | null) => void,
  changePasswordForm: UseFormReturn<ChangePasswordDto>,
  clickChangePassword: boolean,
  resetChangePasswordForm: (data?: ChangePasswordDto | undefined | null) => void,
  handleOpenChangePassword: () => void,
  handleCloseChangePassword: () => void,
  totalModules: number, 
  setTotalModules: (total: number) => void,
  handleGetTotalModules: () => void,
  payments: PaymentDto[],
  setPayments: (payments: PaymentDto) => void,
  handleGetPayments: () => void,
}

//@ts-ignore
const UserContext = createContext();

//@ts-ignore
export default function UserProvider({ children }) {
  const {data: session, status } = useSession();
  const [clickChangePassword, setClickChangePassword] = useState<boolean>(false);
  const [contextStatus, setContextStatus] = useState<string>("loading");
  const [totalModules, setTotalModules] = useState<number>(0);
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);

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

  
  const handleGetTotalModules = async () => {
    console.log("handleGetTotalModules"); 
    const response = await getTotalNumberModules(session?.user?.username);
    if (response.error) {
      setTotalModules(0);
      return
    }
    setTotalModules(response.data.totalModules as number);
  }

  const handleGetPayments = async () => {
    console.log("handleGetPayments");
    const response = await getPaymentList(session?.user?.username);
    if (response.error) {
      setPayments([]);
    }
    setPayments(response.data as PaymentDto[]);
    console.log("payments", payments);
  }

  useEffect(() => {
    if (session) {
      handleGetTotalModules();
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
      contextStatus, setContextStatus,
      profileForm, resetProfileForm,
      clickChangePassword, handleCloseChangePassword, handleOpenChangePassword, 
      changePasswordForm, resetChangePasswordForm,
      totalModules, setTotalModules, handleGetTotalModules,
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


