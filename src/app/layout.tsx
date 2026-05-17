import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import packageInfo from "../../package.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auditoría Web - PDP SEO Optimizer",
  description: "Plataforma avanzada para expertos SEO para optimización masiva de descripciones de producto mediante n8n, ScrapingBee e Inteligencia Artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased relative`}>
        {children}
        {/* Indicador de Versión */}
        <div className="fixed bottom-2 right-3 z-50 pointer-events-none opacity-50 text-[10px] font-mono text-slate-500 font-medium tracking-wider">
          v{packageInfo.version}
        </div>
      </body>
    </html>
  );
}
