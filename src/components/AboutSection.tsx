import Image from "next/image";
import PortraitCanvas from "./PortraitCanvas";

const experience = [
    { role: "Lead Graphic Designer", company: "DripDigital®", date: "2024 - Current" },
    { role: "Lead Graphic Designer", company: "Code&Craft Designs", date: "2022-23" },
    { role: "Graphic Design Intern", company: "Groglobally", date: "2021-22" }
];

const skills = [
    "Art Direction", "Design Systems", "Brand Identity Design",
    "Marketing Assets", "Presentation Design", "Packaging Design",
    "Social Media Design", "Brand Guidelines", "Attention to Detail"
];

const AboutSection = () => {
    return (
        <section className="about-section" id="about">
            <div className="container container-wide">
                <div className="about-grid">
                    <div className="about-text">
                        <h2 className="section-title mb-8">Meet Kushi</h2>
                        <p className="bio text-xl text-white/60 leading-relaxed mb-10">
                            I’m Kushi, the designer brands accidentally stick with for years. I build identities that look premium, feel intentional, and make people say “who designed this?” (I promise I won’t expose the “temporary logo” you used for 2 years.)
                        </p>

                        <div className="experience-list space-y-6 mb-12">
                            {experience.map((exp, i) => (
                                <div key={i} className="exp-item border-b border-white/5 pb-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="exp-role text-white font-medium">{exp.role}</div>
                                            <div className="exp-company text-white/40">{exp.company}</div>
                                        </div>
                                        <div className="exp-date text-white/30 text-sm whitespace-nowrap">{exp.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="skill-pills flex flex-wrap gap-3">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="about-image">
                        <PortraitCanvas />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
