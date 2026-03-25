import { AppId } from "@/types/window"
import DynamicWebApp from "./DynamicWebApp"

interface MediaStaticDownloadAppProps {
  onClose?: () => void
}

export default function MediaStaticDownloadApp({ onClose }: MediaStaticDownloadAppProps) {
  return (
    <DynamicWebApp
      app={{
        id: AppId.MEDIA_STATIC_DOWNLOAD,
        name: "Media Static Download",
        type: "iframe",
        url: "https://media-claw.imsteve.dev/",
        icon: "hard-drive",
        color: "bg-blue-500",
        allowFullscreen: true,
      }}
      onClose={onClose}
    />
  )
}
