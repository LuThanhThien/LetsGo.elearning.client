import { Colors, EnumStyle } from "../../lib/style";


export enum PriceLevel {
   FREE = "MIỄN PHÍ",
   BASIC = "CƠ BẢN",
   SPECIALIZE = "CHUYÊN SÂU",
}

export const PriceLevelStyles: Record<PriceLevel, EnumStyle> = {
   [PriceLevel.FREE]: { color: Colors.primary },
   [PriceLevel.BASIC]: { color: Colors.secondary },
   [PriceLevel.SPECIALIZE]: { color: Colors.tetiary },
}
