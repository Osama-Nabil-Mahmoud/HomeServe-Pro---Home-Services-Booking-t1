import "./globals.css";
import { SettingsProvider } from "../context/SettingsProvider";

export const metadata = {
  title: "HomeServe Pro | خدمات منزلية محترفة",
  description: "منصة حجز الخدمات المنزلية الأسرع والأكثر أماناً في مصر",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  var lang = localStorage.getItem('lang') || 'ar';
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.setAttribute('lang', lang);
                  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-slate-900 transition-colors duration-300">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}