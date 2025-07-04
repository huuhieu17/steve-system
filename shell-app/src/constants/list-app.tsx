import {
    Folder,
    Settings,
    FileText,
    Calculator,
    Terminal,
    Globe,
    Mail,
    MessageSquare,
    Music,
    Camera,
    Calendar,
    User,
    Film,
    HardDrive
} from "lucide-react"
import { type AppConfig, AppCategory, AppId } from "@/types/window"
import FinderApp from "@/components/apps/FinderApp"
import SettingsApp from "@/components/apps/SettingsApp"
import NotesApp from "@/components/apps/NotesApp"
import CalculatorApp from "@/components/apps/CalculatorApp"
import MovieApp from "@/components/apps/MovieApp"
import PhotoApp from "@/components/apps/PhotoApp"
import SafariAppOptimized from "@/components/apps/SafariApp"

export const APP_CONFIGS: Record<AppId, AppConfig> = {
    [AppId.FINDER]: {
        id: AppId.FINDER,
        name: "Finder",
        icon: <Folder className="w-6 h-6 text-white" />,
        color: "bg-blue-500",
        category: AppCategory.SYSTEM,
        defaultSize: { width: 800, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 100, y: 50 },
        component: FinderApp,
    },
    [AppId.SETTINGS]: {
        id: AppId.SETTINGS,
        name: "System Preferences",
        icon: <Settings className="w-6 h-6 text-white" />,
        color: "bg-gray-500",
        category: AppCategory.SYSTEM,
        defaultSize: { width: 700, height: 500 },
        minSize: { width: 500, height: 400 },
        defaultPosition: { x: 150, y: 100 },
        component: SettingsApp,
    },
    [AppId.NOTES]: {
        id: AppId.NOTES,
        name: "Notes",
        icon: <FileText className="w-6 h-6 text-white" />,
        color: "bg-yellow-500",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 600, height: 400 },
        minSize: { width: 300, height: 200 },
        defaultPosition: { x: 200, y: 150 },
        component: NotesApp,
    },
    [AppId.CALCULATOR]: {
        id: AppId.CALCULATOR,
        name: "Calculator",
        icon: <Calculator className="w-6 h-6 text-white" />,
        color: "bg-gray-600",
        category: AppCategory.UTILITIES,
        defaultSize: { width: 280, height: 400 },
        minSize: { width: 280, height: 400 },
        defaultPosition: { x: 250, y: 200 },
        component: CalculatorApp,
    },
    [AppId.TERMINAL]: {
        id: AppId.TERMINAL,
        name: "Terminal",
        icon: <Terminal className="w-6 h-6 text-white" />,
        color: "bg-black",
        category: AppCategory.DEVELOPMENT,
        defaultSize: { width: 600, height: 400 },
        minSize: { width: 400, height: 200 },
        defaultPosition: { x: 300, y: 250 },
        component: () => <div className="p-4">Terminal App (Coming Soon)</div>,
    },
    [AppId.SAFARI]: {
        id: AppId.SAFARI,
        name: "Safari",
        icon: <Globe className="w-6 h-6 text-white" />,
        color: "bg-gradient-to-br from-blue-400 to-blue-600",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 900, height: 600 },
        minSize: { width: 500, height: 300 },
        defaultPosition: { x: 50, y: 50 },
        component: () => <SafariAppOptimized/>,
    },
    [AppId.MAIL]: {
        id: AppId.MAIL,
        name: "Mail",
        icon: <Mail className="w-6 h-6 text-white" />,
        color: "bg-blue-600",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 800, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 120, y: 80 },
        component: () => <div className="p-4">Mail App (Coming Soon)</div>,
    },
    [AppId.MESSAGES]: {
        id: AppId.MESSAGES,
        name: "Messages",
        icon: <MessageSquare className="w-6 h-6 text-white" />,
        color: "bg-green-500",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 600, height: 400 },
        minSize: { width: 300, height: 200 },
        defaultPosition: { x: 180, y: 120 },
        component: () => <div className="p-4">Messages App (Coming Soon)</div>,
    },
    [AppId.MUSIC]: {
        id: AppId.MUSIC,
        name: "Music",
        icon: <Music className="w-6 h-6 text-white" />,
        color: "bg-red-500",
        category: AppCategory.MEDIA,
        defaultSize: { width: 700, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 240, y: 160 },
        component: () => <div className="p-4">Music App (Coming Soon)</div>,
    },
    [AppId.PHOTOS]: {
        id: AppId.PHOTOS,
        name: "Photos",
        icon: <Camera className="w-6 h-6 text-white" />,
        color: "bg-gradient-to-br from-yellow-400 to-orange-500",
        category: AppCategory.MEDIA,
        defaultSize: { width: 800, height: 600 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 80, y: 60 },
        component: PhotoApp,
    },
    [AppId.MOVIES]: {
        id: AppId.MOVIES,
        name: "Xem Phim",
        icon: <Film className="w-6 h-6 text-white" />,
        color: "bg-blue-500",
        category: AppCategory.MEDIA,
        defaultSize: { width: 800, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 100, y: 50 },
        component: MovieApp,
    },
    [AppId.DRIVE]: {
        id: AppId.DRIVE,
        name: "Drive",
        icon: <HardDrive className="w-6 h-6 text-white" />,
        color: "bg-blue-500",
        category: AppCategory.UTILITIES,
        defaultSize: { width: 800, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 100, y: 50 },
        component: () => <div>.</div>,
    },
    [AppId.CALENDAR]: {
        id: AppId.CALENDAR,
        name: "Calendar",
        icon: <Calendar className="w-6 h-6 text-white" />,
        color: "bg-red-600",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 700, height: 500 },
        minSize: { width: 400, height: 300 },
        defaultPosition: { x: 160, y: 100 },
        component: () => <div className="p-4">Calendar App (Coming Soon)</div>,
    },
    [AppId.CONTACTS]: {
        id: AppId.CONTACTS,
        name: "Contacts",
        icon: <User className="w-6 h-6 text-white" />,
        color: "bg-gray-500",
        category: AppCategory.PRODUCTIVITY,
        defaultSize: { width: 600, height: 400 },
        minSize: { width: 300, height: 200 },
        defaultPosition: { x: 220, y: 140 },
        component: () => <div className="p-4">Contacts App (Coming Soon)</div>,
    },
}

export const DOCK_APPS: AppId[] = [
    AppId.FINDER,
    // AppId.MAIL,
    AppId.SAFARI,
    // AppId.MESSAGES,
    AppId.NOTES,
    AppId.CALCULATOR,
    // AppId.TERMINAL,
    AppId.SETTINGS,
]

export const DESKTOP_APPS: AppId[] = [
    AppId.FINDER,
    AppId.SETTINGS,
    AppId.NOTES,
    AppId.CALCULATOR,
    AppId.TERMINAL,
    AppId.SAFARI,
    AppId.MAIL,
    AppId.MESSAGES,
    AppId.MUSIC,
    AppId.PHOTOS,
    AppId.CALENDAR,
    AppId.CONTACTS,
    AppId.MOVIES,
    AppId.DRIVE,
]
