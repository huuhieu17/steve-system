"use client"

import React from "react"
import IOSApp from "../IOSApp"
const ComputerControlMicroApp = React.lazy(() => import('ComputerControlMicroApp/ComputerControlMicroApp'))
interface IOSComputerControlAppProps {
    onClose: () => void

}

export default function IOSComputerControlApp({ onClose }: IOSComputerControlAppProps) {


    return (
        <IOSApp title="Computer Control" onClose={onClose} showBackButton={false}>
            <div className="bg-gray-100 min-h-full">
                <React.Suspense fallback={<div>Launching App...</div>}>
                    <ComputerControlMicroApp />
                </React.Suspense>
            </div>
        </IOSApp>
    )
}
