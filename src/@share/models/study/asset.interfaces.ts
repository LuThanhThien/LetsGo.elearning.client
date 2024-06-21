import { AuditData } from "../global/audit-data.interfaces";
import { DisplayStatus } from "./asset.enums";

export type NameStack = {
    id: number,
    name: string,
    order: number,
    stacks: NameStack[],
}


export interface AssetModel extends AuditData {
    displayStatus: DisplayStatus,
    name: string,
    order: number, 
    description: string,
};