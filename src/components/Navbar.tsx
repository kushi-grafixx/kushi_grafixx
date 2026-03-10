"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="top-nav">
            <Link href="/" className="logo">
                <Image
                    src="/assets/kushi_logo_exact.png"
                    alt="Kushi Grafixx Logo"
                    width={100}
                    height={35}
                    className="h-[35px] w-auto"
                />
            </Link>
            <div className="nav-links">
                <Link href="#services">Services</Link>
                <Link href="#projects">Projects</Link>
                <Link href="#testimonials">Testimonials</Link>
            </div>
            <a
                href="https://cal.com/kushi-grafixx-lfgzty/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                Get Your Brand Fixed
            </a>
        </header>
    );
};

export default Navbar;
