"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        id: 1,
        href: "/projects/vitalyx",
        category: "branding",
        niche: "health-tech",
        bgClass: "bg-vitalyx-v2",
        logoSrc: "/assets/vitalyx/Logo.png",
        projectName: "Vitalyx"
    },
    {
        id: 2,
        href: "#about",
        category: "all",
        niche: "lifestyle",
        bgClass: "bg-silhouette-v2",
        logoSrc: "/assets/silhouette.jpg",
        projectName: "Kushi Silhouette"
    },
    {
        id: 3,
        href: "/projects/logo-design",
        category: "logo-design",
        niche: "all",
        bgClass: "bg-logos-grid-v2",
        logoSrc: "/assets/footer_final_logo3.png",
        projectName: "Logos Grid"
    },
    {
        id: 4,
        href: "/projects/social-media-design",
        category: "social",
        niche: "saas",
        bgClass: "bg-wip-grid-v2",
        logoSrc: "",
        projectName: "Zero Studios",
        customContent: "ZERO STUDIOS. SOCIAL SYSTEMS."
    },
    {
        id: 5,
        href: "/projects/event-branding",
        category: "event",
        niche: "fnb",
        bgClass: "bg-wip-grid-v2",
        logoSrc: "",
        projectName: "Echo Platform",
        customContent: "ECHO PLATFORM. EVENT IDENTITY."
    },
    {
        id: 6,
        href: "/projects/posters",
        category: "posters",
        niche: "hospitality",
        bgClass: "bg-wip-grid-v2",
        logoSrc: "",
        projectName: "Lumi Wellness",
        customContent: "LUMI WELLNESS. POSTER SERIES."
    }
];

const categories = [
    { id: "all", label: "All Projects" },
    { id: "branding", label: "Brand Identity" },
    { id: "logo-design", label: "Logo Design" },
    { id: "social", label: "Social Media" },
    { id: "event", label: "Event Brand Identity" },
    { id: "posters", label: "Posters and Others" }
];

const niches = [
    { id: "all", label: "All Niches" },
    { id: "fnb", label: "F&B" },
    { id: "saas", label: "SaaS" },
    { id: "health-tech", label: "Health Tech" },
    { id: "agri-tech", label: "Agri Tech" },
    { id: "hospitality", label: "Hospitality" },
    { id: "lifestyle", label: "Lifestyle" }
];

const ProjectsGallery = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeNiche, setActiveNiche] = useState("all");

    useEffect(() => {
        // Handle returning from projects (auto-reset and scroll)
        const shouldReturnToProjects = sessionStorage.getItem("returnToProjects") === "1";
        if (shouldReturnToProjects || window.location.hash === "#projects") {
            sessionStorage.removeItem("returnToProjects");
            setActiveCategory("all");
            setActiveNiche("all");

            setTimeout(() => {
                const el = document.getElementById("projects");
                if (el) {
                    const navHeight = document.querySelector(".top-nav")?.clientHeight || 80;
                    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }, 100);
        }
    }, []);

    const filteredProjects = projects.filter(project => {
        const categoryMatch = activeCategory === "all" || project.category === activeCategory;
        const nicheMatch = activeNiche === "all" || project.niche === activeNiche;
        return categoryMatch && nicheMatch;
    });

    return (
        <section className="projects-section" id="projects">
            <div className="container container-wide">
                <div className="gallery-header">
                    <div className="filter-nav">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''} ${cat.id === 'logo-design' ? 'logo-glow-btn' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="sub-filter-nav">
                        {niches.map(niche => (
                            <button
                                key={niche.id}
                                className={`sub-filter-btn ${activeNiche === niche.id ? 'active' : ''}`}
                                onClick={() => setActiveNiche(niche.id)}
                            >
                                {niche.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gallery-grid-v2">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsGallery;
