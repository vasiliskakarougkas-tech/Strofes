import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import NewsletterPopup from "../components/NewsletterPopup";

export const metadata = {
  metadataBase: new URL("https://strofes.gr"),
  title: {
    default: "ΣΤΡΟΦΕΣ — Αυτοκίνητο χωρίς φίλτρο",
    template: "%s | ΣΤΡΟΦΕΣ",
  },
  description:
    "Δοκιμές, νέα και οδηγοί αγοράς αυτοκινήτων για την ελληνική αγορά — test drives, συγκρίσεις και πρακτικές συμβουλές.",
  openGraph: {
    siteName: "ΣΤΡΟΦΕΣ",
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "zh5vK8oXGwrIHKWqmG2T0P9Hf8Su_V14qXDu6xkD5y0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body>
        {children}
        <CookieBanner />
        <NewsletterPopup />
      </body>
    </html>
  );
}
