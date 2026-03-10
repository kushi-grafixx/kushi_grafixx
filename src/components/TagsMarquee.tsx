"use client";

const TagsMarquee = () => {
    return (
        <section className="tags-marquee-section">
            {/* Row 1: Left to Right */}
            <div className="tags-marquee-row">
                <div className="tags-marquee-track tags-marquee-left">
                    <div className="tags-marquee-inner">
                        <span className="tag-item">Art Direction</span>
                        <span className="tag-item">Brand Identity</span>
                        <span className="tag-item">Logo Design</span>
                        <span className="tag-item">Packaging Design</span>
                        <span className="tag-item">Marketing Assets</span>
                        <span className="tag-item">Social Media</span>
                        <span className="tag-item">Design Systems</span>
                        <span className="tag-item">Presentation Design</span>
                    </div>
                    <div className="tags-marquee-inner" aria-hidden="true">
                        <span className="tag-item">Art Direction</span>
                        <span className="tag-item">Brand Identity</span>
                        <span className="tag-item">Logo Design</span>
                        <span className="tag-item">Packaging Design</span>
                        <span className="tag-item">Marketing Assets</span>
                        <span className="tag-item">Social Media</span>
                        <span className="tag-item">Design Systems</span>
                        <span className="tag-item">Presentation Design</span>
                    </div>
                </div>
            </div>
            {/* Row 2: Right to Left */}
            <div className="tags-marquee-row">
                <div className="tags-marquee-track tags-marquee-right">
                    <div className="tags-marquee-inner">
                        <span className="tag-item">Copywriting</span>
                        <span className="tag-item">Web Design</span>
                        <span className="tag-item">Framer Development</span>
                        <span className="tag-item">Visual Strategy</span>
                        <span className="tag-item">Creative Direction</span>
                        <span className="tag-item">Mockup Design</span>
                        <span className="tag-item">Brand Guidelines</span>
                        <span className="tag-item">Attention to Detail</span>
                    </div>
                    <div className="tags-marquee-inner" aria-hidden="true">
                        <span className="tag-item">Copywriting</span>
                        <span className="tag-item">Web Design</span>
                        <span className="tag-item">Framer Development</span>
                        <span className="tag-item">Visual Strategy</span>
                        <span className="tag-item">Creative Direction</span>
                        <span className="tag-item">Mockup Design</span>
                        <span className="tag-item">Brand Guidelines</span>
                        <span className="tag-item">Attention to Detail</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TagsMarquee;
