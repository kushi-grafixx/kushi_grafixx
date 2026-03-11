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
        <section className="about-section py-32" id="about">
            <div className="container container-wide">
                <div className="about-grid">
                    <div className="about-text">
                        <h2 className="section-title heading-split">Meet Kushi</h2>
                        <p className="bio">
                            I’m Kushi, the designer brands accidentally stick with for years. I build identities that look premium, feel intentional, and make people say “who designed this?” (I promise I won’t expose the “temporary logo” you used for 2 years.)
                        </p>

                        <div className="experience-list">
                            {experience.map((exp, i) => (
                                <div key={i} className="exp-item">
                                    <div className="exp-role">{exp.role}</div>
                                    <div className="exp-company">{exp.company}</div>
                                    <div className="exp-date">{exp.date}</div>
                                </div>
                            ))}
                        </div>

                        <div className="skill-pills">
                            {skills.map((skill, i) => (
                                <span key={i}>{skill}</span>
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
