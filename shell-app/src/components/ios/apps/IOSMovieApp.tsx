"use client"

import React from "react"
import IOSApp from "../IOSApp"
import MovieApp from "@/components/apps/MovieApp"
interface IOSMovieAppProps {
    onClose: () => void

}

export default function IOSMovieApp({ onClose }: IOSMovieAppProps) {


    return (
        <IOSApp title="Movie App" onClose={onClose} showBackButton={false}>
            <div className="bg-gray-100 min-h-full">
                <React.Suspense fallback={<></>}>
                    <MovieApp />
                </React.Suspense>
            </div>
        </IOSApp>
    )
}
