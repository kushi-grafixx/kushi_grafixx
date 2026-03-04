import re

with open("/Users/kushi/Documents/kushi-grafixx/index.html", "r") as f:
    text = f.read()

# Replace full <div class="fv2-grid"> section.

# locate <div class="fv2-grid"> to end of </footer>
pattern = re.compile(r'<div class="fv2-grid config">.*?\s*</f', re.DOTALL)
pattern2 = re.compile(r'<div class="fv2-grid">.*?\n\s*</f', re.DOTALL)

replacement = """<div class="fv2-grid">

                    <style>
                        /* Local footer grid config representing direct-access sub elements matching reference */
                        .fv2-grid {
                            padding: 0;
                            border: none;
                            display: grid;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 1px;
                            background: rgba(255, 255, 255, 0.15); /* The border grid color */
                            border-top: 1px solid rgba(255, 255, 255, 0.15);
                            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                        }
                        .fv2-grid > div {
                            background: #050505;
                        }
                        .fv2-bottom-placeholder {
                            background: #050505;
                        }
                        @media (max-width: 900px) {
                            .fv2-grid {
                                grid-template-columns: 1fr;
                            }
                            #fv2-logo-panel {
                                grid-row: 4;
                                grid-column: 1;
                            }
                            #fv2-bottom-copy {
                                grid-column: 1 !important;
                            }
                        }
                    </style>

                    <!-- Nav cells -->
                    <div class="fv2-cell-nav" style="padding: 4rem;">
                        <h4 class="fv2-col-title" style="margin-bottom:1.5rem; color:#fff; font-size: 0.9rem; font-weight:500;">Solutions</h4>
                        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.85rem;">
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Military aerospace</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Test equipment</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Naval</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Unmanned aerial vehicle</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Industrial</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Military land vehicles</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Communications</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Medical</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Security</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Offshore energy & renewables</a></li>
                        </ul>
                    </div>

                    <div class="fv2-cell-nav" style="padding: 4rem;">
                        <h4 class="fv2-col-title" style="margin-bottom:1.5rem; color:#fff; font-size: 0.9rem; font-weight:500;">Partners</h4>
                        <div style="background:#111; border-radius:16px; width:100px; height: 160px; margin-top:2rem;"></div>
                    </div>

                    <div class="fv2-cell-nav" style="padding: 4rem;">
                        <h4 class="fv2-col-title" style="margin-bottom:1.5rem; color:#fff; font-size: 0.9rem; font-weight:500;">Resources</h4>
                        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.85rem;">
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Blog</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Policies</a></li>
                        </ul>
                    </div>

                    <div class="fv2-cell-nav" style="padding: 4rem;">
                        <h4 class="fv2-col-title" style="margin-bottom:1.5rem; color:#fff; font-size: 0.9rem; font-weight:500;">Company</h4>
                        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.85rem;">
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Mission</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Team</a></li>
                            <li><a href="#" style="color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.95rem;">Careers</a></li>
                        </ul>
                    </div>

                    <!-- Right CTA + Logo panel (spans grid right side) -->
                    <div id="fv2-logo-panel" class="fv2-cell-logo-panel" style="grid-row: 1 / 3; grid-column: 4; display:flex; flex-direction: column;">
                        <div class="fv2-panel-top" style="padding: 2.5rem 3rem; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.15);">
                            <h3 class="fv2-cta-label" style="font-size:1.05rem;margin:0;color:#fff;font-weight:400;">Making the connection</h3>
                            <a href="#" target="_blank" class="fv2-cta-btn" style="background:#0e2954;color:#fff;border-radius:2px;font-size:0.8rem;font-weight:600;letter-spacing:0.02em;padding:0.75rem 1.5rem;text-decoration:none;border-radius:2px;">
                                GET IN TOUCH
                            </a>
                        </div>
                        <div class="fv2-panel-logo" style="flex-grow:1;display:flex;align-items:center;justify-content:center;padding:4rem;background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 16px 16px;">
                            <img src="assets/footer_final_logo3.png" alt="Logo" class="fv2-logo-img" style="opacity:0.95;max-width:100%;transition:transform 0.3s ease;">
                            <style> .fv2-logo-img:hover { transform: scale(1.05); } </style>
                        </div>
                    </div>

                    <!-- Bottom Empty Space Cells -->
                    <div id="fv2-bottom-copy" class="fv2-cell-bottom fv2-cell-copy" style="grid-column: 1 / 4;">
                           <div class="fv2-bottom-placeholder" style="width:100%;height:100px;display:flex;align-items:center;padding:0 4rem;">
                               <img src="https://via.placeholder.com/300x50/111111/444444?text=Placeholder" style="border-radius:80px;height:70px;width:300px;opacity:0.6;">
                           </div>
                    </div>

                </div>
            </f"""

if '<div class="fv2-grid config">' in text:
    new_text = pattern.sub(replacement, text)
else:
    new_text = pattern2.sub(replacement, text)

with open("/Users/kushi/Documents/kushi-grafixx/index.html", "w") as f:
    f.write(new_text)

