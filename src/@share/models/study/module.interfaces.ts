import { AssetModel } from "./asset.interfaces";


export interface ModuleModel extends AssetModel {
    id: number,
    courseId: number,
    lessonsId: number[],
    price: number,
    enrollmentsId: number[],
};