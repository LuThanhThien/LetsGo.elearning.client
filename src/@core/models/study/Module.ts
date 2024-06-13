import { AssetModel } from "./Asset";


export type ModuleModel = {
    id: number,
    courseId: number,
    lessonsId: number[],
    price: number,
    enrollmentsId: number[],
} & AssetModel;