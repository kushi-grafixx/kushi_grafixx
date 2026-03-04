import re

with open("/Users/kushi/Documents/kushi-grafixx/style.css", "r") as f:
    text = f.read()

# remove old footer-v2 references 
pattern = re.compile(r'/\* ═══════════════════════════════════════════════════════════════════════\n   FOOTER V2 — Multi-column nav \+ CTA panel style.*?@media \(max-width: 900px\) {.*?\}', re.DOTALL)
replacement = ""

new_text = pattern.sub(replacement, text)

# actually wait, let's just make sure we clear anything down below and append what we want cleanly.
new_text = re.sub(r'\n\.footer-v2 \{.*?} \n/\* ── Top section.*', '', new_text, flags=re.DOTALL)

with open("/Users/kushi/Documents/kushi-grafixx/style.css", "w") as f:
    f.write(new_text)

