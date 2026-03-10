import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SideDock from "@/components/SideDock";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Kushi Grafixx | Premium Visual Design",
    description: "Your brand called. It needs help. Don't worry. I got this.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${outfit.variable} font-sans antialiased bg-black text-white`}>
                <Preloader />
                <CustomCursor />
                <Navbar />
                <SideDock />
                <main id="smooth-wrapper">
                    <div id="smooth-content">
                        {children}
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
