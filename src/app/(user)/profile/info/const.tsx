import { MuiColor } from "@/@share/index.ui";
import { Colors, EnumStyle, FontSize } from "@/@share/lib/style";
import { FormLabel, Typography, TypographyProps } from "@mui/material";

type InputLabelProps = {
    label: string,
  } & TypographyProps;
  
  
export const InputLabel = ({ label: label, paddingLeft, paddingBottom, fontWeight, fontSize, ...props } : InputLabelProps) => {
    return (
      <FormLabel>
        <Typography fontSize={fontSize ? fontSize : FontSize.small + 1} fontWeight={fontWeight ? fontWeight : "bold"} paddingBottom={paddingBottom ? paddingBottom : 0.5} paddingLeft={paddingLeft ? paddingLeft : 0.4} {...props}>{label}</Typography>
      </FormLabel>
    )
}
  
  
export const AccountType = (numberModules: number) : EnumStyle => {
    if (200 <= numberModules) return { label: "Huyền thoại", color: MuiColor({transparency: 50, customColor: Colors.secondary}).custom }
    if (100 <= numberModules) return { label: "Chiến binh", color:  MuiColor({transparency: 30}).warning }
    if (50 <= numberModules) return { label: "Cao nhân", color: MuiColor({transparency: 30}).success }
    if (20 <= numberModules) return { label: "Học giả", color: MuiColor({transparency: 30}).info }
    return { label: "Sơ cấp", color: Colors.shadowDarken}
}
  