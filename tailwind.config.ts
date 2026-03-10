import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                kushi: {
                    red: "#ff3c3c",
                    blue: "#3c78ff",
                    purple: "#c83cff",
                    green: "#3cff96",
                    orange: "#ff963c",
                },
            },
            fontFamily: {
                outfit: ["var(--font-outfit)"],
            },
        },
    },
    plugins: [],
};
export default config;
