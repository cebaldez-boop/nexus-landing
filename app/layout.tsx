import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });

export const metadata: Metadata = {
  title: "NEXUS | Infraestrutura de IA em Produção",
  description: "Camada de orquestração que unifica agentes, canais e sistemas corporativos em uma arquitetura escalável, observável e estável.",
  keywords: ["IA", "infraestrutura", "orquestração", "agentes", "SaaS", "B2B", "NEXUS"],
  authors: [{ name: "NEXUS" }],
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  metadataBase: new URL("https://orbitflow-vault.web.app"),
  openGraph: {
    title: "NEXUS | Infraestrutura de IA em Produção",
    description: "Camada de orquestração que unifica agentes, canais e sistemas corporativos.",
    url: "https://orbitflow-vault.web.app",
    siteName: "NEXUS",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS | Infraestrutura de IA em Produção",
    description: "Camada de orquestração que unifica agentes, canais e sistemas corporativos.",
  },
  robots: { index: true, follow: true },
  verification: { google: "GOOGLE_SITE_VERIFICATION" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DQ3V3Q1Z9Y" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DQ3V3Q1Z9Y');`}</Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
