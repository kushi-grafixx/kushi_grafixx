const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Nav Dock Update
html = html.replace(
    '<a href="#contact" class="dock-icon" data-tooltip="Contact">',
    `<a href="#faq" class="dock-icon" data-tooltip="FAQ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        </a>
        <a href="#contact" class="dock-icon" data-tooltip="Contact">`
);

// FAQ Rethink Update
// Pattern to match: <div class="chat-bubble">QUESTION TEXT <span class="faq-toggle">...svg...</span></div>
const toggleHtml = `</span></div>`;

html = html.replace(/<div class="chat-bubble">([^<]+?)\s*<span class="faq-toggle">[\s\S]*?<\/span><\/div>/g, 
    `<span class="faq-toggle">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="faq-icon-v" />
                                        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="faq-icon-h" />
                                    </svg>
                                </span>
                                <div class="chat-bubble">$1</div>`
);

fs.writeFileSync('index.html', html);
console.log('done');
