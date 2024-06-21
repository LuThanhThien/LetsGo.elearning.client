import { Colors } from "@/@share/lib/style";
import { CheckBox } from "@mui/icons-material"


export const DefaultCheckbox = () => {
    return (
        <CheckBox
            sx={{
                color: Colors.primary,
                '&.Mui-checked': {
                    color: Colors.primary,
                },
            }}  
        />
    )
}