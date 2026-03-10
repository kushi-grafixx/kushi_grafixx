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

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Initial state
        gsap.set(cursor, { opacity: 0 });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="cursor-dot fixed top-0 left-0 w-4 h-4 bg-[#555555] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion transition-transform duration-200"
        />
    );
};

export default CustomCursor;
