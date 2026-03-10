import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import ProjectsGallery from "@/components/ProjectsGallery";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessFlow from "@/components/ProcessFlow";
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
            <ServicesGrid />
            <Stats />

            <section id="process" className="py-20 bg-black">
                <div className="container container-wide">
                    <h2 className="section-title text-center">The KG Workflow</h2>
                    <p className="text-center text-white/40 max-w-2xl mx-auto mb-12">
                        A simple, no-nonsense workflow that keeps things clean, fast, and drama-free.
                    </p>
                    <ProcessFlow />
                </div>
            </section>

            <AboutSection />
            <Testimonials />
            <TagsMarquee />
            <FAQ />
        </main>
    );
}
