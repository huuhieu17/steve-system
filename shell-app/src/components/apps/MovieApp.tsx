import { useEffect, useRef, useState } from "react"
import '@/assets/remote-wrapper.css'
export default function MovieApp() {
    const containerRef = useRef(null)
    const [isScrolled, setIsScrolled] =  useState(false);

    const handleScroll = (target: any) => {
        console.log("scroll event detected in MovieApp wrapper");
        if (!target) return;
        
        const scrollTop = target.scrollTop || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > 50); // Adjust the threshold as needed
    };

    useEffect(() => {
        document.addEventListener(
            "scroll",
            (e) => {
                handleScroll(e.target);
            },
            true // 👈 capture = true
        );
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let unmountVue: (() => void) | undefined;

        (async () => {
            try {
                await import("MovieApp/remote-styles");
                const mod = await import("MovieApp/remote-app");
                
                if (!containerRef.current) return;
                
                const { mount, unmount } = mod.default;
                mount(containerRef.current, {  routerBase: "/", routerMode: "memory", });
                unmountVue = unmount;
            } catch (err) {
                console.error("Failed to load remote MovieApp:", err);
            }
        })();

        return () => {
            document.title = "Steve System"
            history.pushState({page: 'new'}, 'Steve System', '/');
            if (typeof unmountVue === "function") unmountVue();
        };
    }, []);



    return (
        <div className={`w-full h-full relative movie-remote-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <div ref={containerRef}></div>
        </div>
    )
}
