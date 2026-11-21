import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { personalInfo, siteUrl } from '@/lib/data';

const title = `${personalInfo.name} | ${personalInfo.title}`;
const description = personalInfo.description;

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl) }),
  title: { default: title, template: `%s | ${personalInfo.name}` },
  description,
  openGraph: { type: 'website', locale: 'es_PE', siteName: personalInfo.name, title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
