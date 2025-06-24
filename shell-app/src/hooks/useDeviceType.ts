import { useState, useEffect } from "react"

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop")

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobile =
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setDeviceType(isMobile ? "mobile" : "desktop")
    }

    checkDeviceType()
    window.addEventListener("resize", checkDeviceType)

    return () => window.removeEventListener("resize", checkDeviceType)
  }, [])

  return deviceType
}
