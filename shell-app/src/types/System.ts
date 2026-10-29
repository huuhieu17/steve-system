export type BootState = "splash" | "login" | "desktop";

export type AppearanceSettings = {
    darkMode: boolean;
    textSize: number;
    backgroundUrl?: string;
    backgroundMobileUrl?: string;
    accentColor: string;
}

export type GeneralSettings = {
    language: string;
    timeZone: string;
    volume: number;
    muted: boolean;
}

export type SystemConfig = {
    id: string;
    userId: string;
    appearance: AppearanceSettings;
    general: GeneralSettings;
}

export interface SystemConfigRequest {
    appearance: AppearanceSettings;
    general: GeneralSettings;
}