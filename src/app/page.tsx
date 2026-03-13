import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import ProjectsGallery from "@/components/ProjectsGallery";
import ServicesSection from "@/components/ServicesSection";
import WorkflowSection from "@/components/WorkflowSection";
import AboutSection from "@/components/AboutSection";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import TagsMarquee from "@/components/TagsMarquee";
import FAQ from "@/components/FAQ";

export default function Home() {
    return (
        <main>
            <Hero />
            <ClientMarquee />
            <ProjectsGallery />
            <ServicesSection />

            <div className="section-divider" aria-hidden="true" />

            <WorkflowSection />

            <AboutSection />

            {/* Testimonials marquee first, then the stats */}
            <section id="testimonials" className="py-32 bg-black">
                <div className="container container-wide mb-6">
                    <h2 className="section-title text-center heading-split">Don&apos;t just take my word for it.</h2>
                </div>
                <Testimonials hideHeading />
                <div className="container container-wide mt-0 flex justify-center">
                    <Stats inline />
                </div>
            </section>

            <TagsMarquee />
            <FAQ />
        </main>
    );
}
