"use client"
import Loading from "@/app/loading";
import { Colors, EnumStyle, FontSize, Styles } from "../../../../@core/lib/style";
import {
  Card,
  CardContent,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import { Cake, CircleUserRound, Key, Mail, MapPin, PackageCheck, Phone, RectangleEllipsis, School, Shapes } from "lucide-react";
import { useSession } from "next-auth/react"
import provinces from '../../../../@core/lib/json/provinces.json';
import dayjs from "dayjs";
import { useEffect } from "react";
import { changePassword, updateUser } from "@/app/api/user/actions";
import { toast } from "sonner";
import { useUser } from "../../../../@core/index.context";
import { 
  ChangePasswordDto, 
  UserUpdateDto 
} from "../../../../@core/index.schema";
import { Gender } from "../../../../@core/index.models"
import {
  DefaultButton,
  PhoneTextField,
  PasswordTextField, 
  ControlledAutocomplete,
  ControlledDatePicker,
  ControlledSelectEnum,
  HelperText,
} from "../../../../@core/index.ui";
import { MuiColor } from "@/@core/ui/display/MuiColor";

type InputLabelProps = {
  label: string,
} & TypographyProps;

const InputLabel = ({ label: label, paddingLeft, paddingBottom, fontWeight, fontSize, ...props } : InputLabelProps) => {
  return (
    <FormLabel>
      <Typography fontSize={fontSize ? fontSize : FontSize.small + 1} fontWeight={fontWeight ? fontWeight : "bold"} paddingBottom={paddingBottom ? paddingBottom : 0.5} paddingLeft={paddingLeft ? paddingLeft : 0.4} {...props}>{label}</Typography>
    </FormLabel>
  )
}



const AccountType = (numberModules: number) : EnumStyle => {
  if (200 <= numberModules) return { label: "Huyền thoại", color: MuiColor({transparency: 50, customColor: Colors.secondary}).custom }
  if (100 <= numberModules) return { label: "Chiến binh", color:  MuiColor({transparency: 30}).warning }
  if (50 <= numberModules) return { label: "Cao nhân", color: MuiColor({transparency: 30}).success }
  if (20 <= numberModules) return { label: "Học giả", color: MuiColor({transparency: 30}).info }
  return { label: "Sơ cấp", color: Colors.shadowDarken}
}

export default function ProfileGeneral() {
  
  const {data: session, status, update} = useSession();
  const { 
    contextStatus,
    profileForm, resetProfileForm,
    changePasswordForm, clickChangePassword, 
    handleCloseChangePassword, resetChangePasswordForm,
  } = useUser();

  const onInvalid = (errors: any) => {
    console.error(errors);
  }

  const handleUpdateProfile = async (data: UserUpdateDto) => {
    console.log("Updating user profile")
    console.log(data);
    const response = await updateUser(data);
    if (response.error) {
      console.log("Error updating user profile");
      console.error(response.error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin của bạn!");
      return;
    }
    console.log("Successfully updated user profile");
    console.log(response.data);
    resetProfileForm(data);
    update();
    toast.success("Cập nhật thông tin thành công!");  
  }

  const handleChangePassword = async (data: ChangePasswordDto) => {
    console.log("Changing password")
    console.log(data)
    const response = await changePassword(data);
    if (response.error) {
      console.log("Error changing password");
      console.error(response);
      changePasswordForm.setError("root", {message: response.details[0]});
      return;
    }
    console.log("Successfully changed password");
    console.log(response.data);
    resetChangePasswordForm();
    toast.success("Đổi mật khẩu thành công!");
  }

  
  useEffect(() => {
    if (clickChangePassword) {
      const passwordPosition = document.getElementById('profile-password-card')?.offsetTop;  
      // Scroll to the target position with smooth behavior
      window.scrollTo({
        top: passwordPosition as number - 200,
        behavior: 'smooth'
      });
      handleCloseChangePassword();
    }
  }, [clickChangePassword])

  if (contextStatus === "loading") return <Loading/>;
    
  return (
    <Grid container padding={4} paddingLeft={2} rowSpacing={3}
      justifyContent={"flex-start"} alignItems={"flex-start"}
    >
      <Grid item xs={12}>
        <Grid container rowSpacing={2} direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"}>
          <Grid item xs={12}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Thông tin cá nhân</Typography>
          </Grid>
          <Grid item xs={12}>  
            <Card 
              id="profile-general-card"
              sx={{
                ...Styles.Card}}>
              <CardContent>
              <Stack direction="column" padding={3} rowGap={5} alignItems="flex-start">  
                <Grid container direction={"row"} rowSpacing={2} columnSpacing={3} >
                  <Grid item xs={6}>
                    <InputLabel label="Họ và tên"/>
                    <TextField
                      {...profileForm.register("fullName")}
                      error={!!profileForm.formState.errors.fullName}
                      helperText={profileForm.formState.errors.fullName?.message}
                      defaultValue={profileForm.getValues().fullName || ""}
                      fullWidth
                      placeholder="Họ và tên của bạn"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CircleUserRound size={23} />
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel label="Địa chỉ email"/>
                    <TextField
                      {...profileForm.register("username")}
                      error={!!profileForm.formState.errors.username}
                      helperText={profileForm.formState.errors.username?.message}
                      fullWidth
                      disabled
                      sx={{
                        ...Styles.InputDisabled,
                      }}
                      placeholder="Email của bạn"
                      variant="outlined"
                      InputProps={{
                        
                        startAdornment: (
                          <InputAdornment position="start">
                            <Mail size={23} />
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel label="Địa chỉ"/>
                      <ControlledAutocomplete
                        control={profileForm.control}
                        defaultValue={profileForm.getValues().location || null}
                        name="location"
                        options={provinces.map((province) => province.Name)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Tỉnh/Thành phố"
                            fullWidth
                            error={!!profileForm.formState.errors.location}
                            helperText={profileForm.formState.errors.location?.message}
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MapPin />
                                </InputAdornment>
                                )
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel label="Ngày sinh"/> 
                      <ControlledDatePicker
                        defaultValue={dayjs(profileForm.getValues().birthDate) || null}
                        control={profileForm.control}
                        name="birthDate"
                        slotProps={{
                            textField: {
                              InputProps: {
                                error: !!profileForm.formState.errors.birthDate,
                                placeholder: "Ngày sinh",
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Cake />
                                  </InputAdornment>
                                  )
                              }
                            }
                          }}
                      />
                      <HelperText>{profileForm.formState.errors.birthDate?.message}</HelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel label="Giới tính"/> 
                      <ControlledSelectEnum 
                        control={profileForm.control}
                        name="gender"
                        defaultValue={profileForm.getValues().gender || ""}
                        enumObj={Gender}
                        startAdornment={
                          <InputAdornment position="start">
                            <Shapes size={23} />
                          </InputAdornment>
                        }
                      />
                      <HelperText>{profileForm.formState.errors.gender?.message}</HelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel label="Số điện thoại"/>
                    <PhoneTextField
                      {...profileForm.register("phone")}
                      error={!!profileForm.formState.errors.phone}
                      helperText={profileForm.formState.errors.phone?.message}
                      fullWidth
                      placeholder="Số điện thoại"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone size={23} />
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel label="Trường học"/>
                    <TextField
                      {...profileForm.register("school")}
                      error={!!profileForm.formState.errors.school}
                      helperText={profileForm.formState.errors.school?.message}
                      fullWidth
                      placeholder="Bạn đang học trường nào?"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <School />
                          </InputAdornment>
                          )
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction={"row"} justifyContent={"flex-end"}>
                    <Grid item xs={2}>
                      <DefaultButton 
                        processing={profileForm.formState.isSubmitting}
                        disabled={!profileForm.formState.isDirty} onClick={profileForm.handleSubmit(handleUpdateProfile, onInvalid)}>Lưu thay đổi</DefaultButton>
                    </Grid>
                    <Grid item xs={2}>
                      <DefaultButton disabled={!profileForm.formState.isDirty || profileForm.formState.isSubmitting} onClick={() => resetProfileForm()} color="error">Hoàn tác</DefaultButton>
                    </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2} direction={"column"} justifyContent={"flex-end"} paddingRight={2}>
          <Grid item xs={6}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Đổi mật khẩu</Typography>
          </Grid>
          <Grid item xs={6}>
            <Card 
              id="profile-password-card"
              sx={{
                ...Styles.Card}}>
              <CardContent>
              <Stack direction="column" padding={3} rowGap={2} alignItems="flex-start">  
                <Grid container direction={"column"} rowSpacing={2} columnSpacing={3} >
                  <Grid item xs={12}>
                    <InputLabel label="Mật khẩu hiện tại"/>
                    <PasswordTextField
                      fullWidth
                      {...changePasswordForm.register("currentPassword")}
                      error={!!changePasswordForm.formState.errors.currentPassword} 
                      helperText={changePasswordForm.formState.errors.currentPassword?.message}
                      placeholder="Mật khẩu hiện tại"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RectangleEllipsis size={23} />
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel label="Mật khẩu mới"/>
                    <PasswordTextField
                      fullWidth
                      {...changePasswordForm.register("newPassword")}
                      error={!!changePasswordForm.formState.errors.newPassword} 
                      helperText={changePasswordForm.formState.errors.newPassword?.message}
                      placeholder="Mật khẩu mới"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Key size={23} />
                          </InputAdornment>
                          )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel label="Mật khẩu xác nhận"/>
                    <PasswordTextField
                      fullWidth 
                      {...changePasswordForm.register("confirmPassword")}
                      error={!!changePasswordForm.formState.errors.confirmPassword} 
                      helperText={changePasswordForm.formState.errors.confirmPassword?.message}
                      placeholder="Mật khẩu xác nhận"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PackageCheck size={23}/>
                          </InputAdornment>
                          ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <HelperText >{changePasswordForm.formState.errors.root?.message}</HelperText>
                  </Grid>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"}>
                    <Grid item xs={6}>
                      <DefaultButton 
                        processing={changePasswordForm.formState.isSubmitting}
                        color="info" onClick={changePasswordForm.handleSubmit(handleChangePassword, onInvalid)}>
                        Đổi mật khẩu
                      </DefaultButton>
                    </Grid>
                </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
      </Grid>
      <Grid item xs={7}>
        <Grid container spacing={2} direction={"column"} justifyContent={"flex-end"} paddingLeft={2}>
          <Grid item xs={12}>
            <Typography fontSize={FontSize.super} fontWeight={"bold"} paddingLeft={1}>Thông tin tài khoản</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{
              ...Styles.Card,
              }}>
              <CardContent>
                <Stack direction="column" padding={3} rowGap={4} alignItems="flex-start">  
                    <Grid container rowSpacing={2} columnSpacing={3} >
                      <Grid item xs={6}>
                        <InputLabel label="Tên tài khoản"/>
                        <Typography fontSize={FontSize.medium} fontWeight={"bold"} paddingLeft={0.5}>{session?.user?.username}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel label="Danh hiệu"/>
                          <Chip label={AccountType(session?.user?.numberEnrollmentModules).label} color="primary" style={{backgroundColor: AccountType(session?.user?.numberEnrollmentModules).color, fontWeight: "bold"}}/>
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel label="Ngày tham gia"/>
                        <Typography fontSize={FontSize.medium} fontWeight={"bold"} paddingLeft={0.5}>{dayjs(session?.user?.createdDatetime).format('DD/MM/YYYY')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel label="Số bài học tham gia"/>
                        <Typography fontSize={FontSize.medium} fontWeight={"bold"} paddingLeft={0.5}>{session?.user?.numberEnrollmentModules}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction={"row"} justifyContent={"flex-start"}>
                      <InputLabel label="Giới thiệu"/>
                      <TextField
                      fullWidth
                      placeholder="Mô tả về bản thân..."
                      variant="outlined"
                      multiline
                      InputLabelProps={{ shrink: true }}
                      rows={7}
                    />
                    </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
   
  )
}