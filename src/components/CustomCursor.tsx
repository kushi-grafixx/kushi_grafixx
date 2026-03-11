"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
                opacity: 1
            });
        };

        const onMouseDown = () => cursor.classList.add("clicking");
        const onMouseUp = () => cursor.classList.remove("clicking");

        const onDoubleClick = () => {
            cursor.classList.add("reload-anim");
            setTimeout(() => cursor.classList.remove("reload-anim"), 600);
        };

        // Delegate mouseover for hover states
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .dock-icon, .filter-btn, .svc-card, .lb-tag, .logo-card, .gallery-card-v2')) {
                cursor.classList.add("hovering");
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, .dock-icon, .filter-btn, .svc-card, .lb-tag, .logo-card, .gallery-card-v2')) {
                cursor.classList.remove("hovering");
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("dblclick", onDoubleClick);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        // Initial state
        gsap.set(cursor, { opacity: 0 });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("dblclick", onDoubleClick);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="cursor-dot fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion transition-all duration-200"
        />
    );
};

export default CustomCursor;
