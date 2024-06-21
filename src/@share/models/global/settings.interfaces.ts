import { SettingsValueType } from "./settings.enums";


export interface SettingsModel {
    id: number,
    name: string,
    value: string,
    type: SettingsValueType,
}