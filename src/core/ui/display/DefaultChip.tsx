import { Chip, ChipProps } from "@mui/material";
import { MuiColor } from "./MuiColor";

export type DefaultChipProps = ChipProps & {};

export const DefaultChip = ({
    ...props
}: DefaultChipProps
) => {
    return (
        <Chip
            sx={{
                borderRadius: 10,
                backgroundColor: MuiColor({ transparency: "70%" }).primary,
            }}
            {...props}
        />
    )
}