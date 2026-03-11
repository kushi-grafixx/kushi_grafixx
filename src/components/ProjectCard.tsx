"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

interface ProjectCardProps {
    href: string;
    category: string;
    niche: string;
    bgClass: string;
    logoSrc: string;
    projectName: string;
    customContent?: string;
}

const ProjectCard = ({ href, category, niche, bgClass, logoSrc, projectName, customContent }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRotate = 10;

        const rotateY = ((x - centerX) / centerX) * maxRotate;
        const rotateX = -((y - centerY) / centerY) * maxRotate;

        const mousePercentX = (x / rect.width) * 100;
        const mousePercentY = (y / rect.height) * 100;

        cardRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
        cardRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
        cardRef.current.style.setProperty("--mouse-x", `${mousePercentX}%`);
        cardRef.current.style.setProperty("--mouse-y", `${mousePercentY}%`);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.setProperty("--rotate-y", "0deg");
        cardRef.current.style.setProperty("--rotate-x", "0deg");
    };

    return (
        <Link
            href={href}
            className="gallery-card-v2 group"
            data-category={category}
            data-niche={niche}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-logo-tag">
                <Image src="/assets/kushi_logo_exact.png" alt="KG" width={40} height={20} />
            </div>
            <div
                ref={cardRef}
                className={`card-content-v2 ${bgClass}`}
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
            >
                {logoSrc ? (
                    <Image
                        src={logoSrc}
                        alt={`${projectName} Logo`}
                        width={300}
                        height={200}
                        style={{ objectFit: 'contain', maxWidth: '72%', maxHeight: '72%', width: 'auto', height: 'auto' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="wip-text-v2 p-8 text-center text-xl font-bold leading-tight">
                        {customContent}
                    </div>
                )}
            </div>
            <div className="card-cta-btn">
                View Casestudy
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l10-10M7 7h10v10" />
                </svg>
            </div>
        </Link>
    );
};

export default ProjectCard;
