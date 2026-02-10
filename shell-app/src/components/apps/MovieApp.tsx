import { useEffect, useRef } from "react"
export default function MovieApp() {
    const containerRef = useRef(null)

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
        <div className="w-full h-full relative">
            <div ref={containerRef}></div>
        </div>
    )
}
