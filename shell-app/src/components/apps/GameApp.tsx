"use client"

import { useWindowManager } from "@/hooks/useWindowManager"
import type { AppId } from "@/types/window"
import DynamicWebApp from "./DynamicWebApp"

interface GameAppProps {
    gameConfig: any
    appId: AppId
}

export default function GameApp({ gameConfig, appId }: GameAppProps) {
    const { closeWindow } = useWindowManager();
    const gameName = gameConfig.name;
   

    const gameUrl = `https://huuhieu17.github.io/games/games/${gameConfig.path}/`

    return (
        <DynamicWebApp
            app={{
                id: appId,
                name: gameName,
                type: "iframe",
                url: gameUrl,
                icon: "gamepad2",
                color: "bg-green-500",
                allowFullscreen: true,
            }}
            onClose={() => closeWindow(appId)}
        />
    )
}
