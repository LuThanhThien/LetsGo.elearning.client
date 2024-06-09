import { HOST_URL } from "@/app/api/const";


type ResetPasswordOTPTemplateProps = {
    validInterval: number;
    unitInterval: string;
    username: string;
    otp: string;
  };
  
  export function ResetPasswordOTPTemplate({
    validInterval,
    unitInterval,
    username,
    otp,
  }: ResetPasswordOTPTemplateProps): React.ReactElement {
    return (
      <div>
        <p>
          Vui lòng nhấn vào đường link sau để thay đổi mật khẩu của bạn.
          <br />
          Đường link sẽ có hiệu lực trong vòng {validInterval} {unitInterval.toLowerCase()}.
          <br />
          Lưu ý: Tuyệt đối không chia sẻ đường link này cho người khác.
        </p>
        <a href={`${HOST_URL}/reset-password?username=${username}&totp=${otp}`} target="_blank">
          Đổi mật khẩu
        </a>
      </div>
    );  
}

  