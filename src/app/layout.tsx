import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>
        {/* Prueba de Despliegue Continuo (CI/CD) - Imagen de Maradona */}
        <div className="fixed top-4 right-4 z-50 pointer-events-none">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Maradona-Mundial_86_con_la_copa.JPG" 
            alt="Maradona" 
            className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-xl object-cover"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
