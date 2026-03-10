"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
    {
        id: "home", label: "Home", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    },
    {
        id: "projects", label: "Projects", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
        )
    },
    {
        id: "services", label: "Services", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </svg>
        )
    },
    {
        id: "process", label: "Process", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
        )
    },
    {
        id: "about", label: "About", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
        )
    },
    {
        id: "testimonials", label: "Testimonials", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: "faq", label: "FAQ", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" fill="transparent" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        )
    },
    {
        id: "contact", label: "Contact", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        )
    }
];

const SideDock = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [indicatorY, setIndicatorY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            let currentSection = "";

            for (const item of navItems) {
                const element = document.getElementById(item.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        currentSection = item.id;
                    }
                }
            }

            if (window.scrollY < 100) currentSection = "home";

            if (currentSection) {
                setActiveTab(currentSection);
                const index = navItems.findIndex(item => item.id === currentSection);
                if (index !== -1) {
                    // Approximate calculation based on padding and gap
                    setIndicatorY(index * 66); // 44px height + 22px gap
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="side-dock">
            <div
                className="dock-indicator"
                style={{ transform: `translateY(${indicatorY}px)` }}
            />
            {navItems.map((item, index) => (
                <div key={item.id}>
                    {index === 1 && <div className="dock-divider" />}
                    <Link
                        href={`#${item.id}`}
                        className={`dock-icon ${activeTab === item.id ? 'active' : ''}`}
                        data-tooltip={item.label}
                    >
                        {item.icon}
                    </Link>
                </div>
            ))}
        </nav>
    );
};

export default SideDock;
