import Link from "next/link";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Επικοινωνία",
  description: "Επικοινώνησε με το ΣΤΡΟΦΕΣ.",
};

export default function ContactPage() {
  return (
    <>
      <header>
        <Link href="/" className="logo">
          <div className="mark">
            ΣΤΡΟ<span>Φ</span>ΕΣ
          </div>
        </Link>
        <nav>
          <a href="/#reviews">Δοκιμές</a>
          <a href="/#news">Νέα</a>
          <a href="/#guides-section">Οδηγοί Αγοράς</a>
        </nav>
      </header>

      <div className="article-wrap">
        <a href="/" className="back-link">
          ← Πίσω στην αρχική
        </a>

        <h1 className="article-title">Επικοινωνία</h1>
        <p className="article-excerpt">
          Θες να μας στείλεις ιδέα για άρθρο, διόρθωση, ή πρόταση συνεργασίας;
          Γράψε μας παρακάτω, ή στείλε email απευθείας στο{" "}
          <a href="mailto:strofes.gr@gmail.com">strofes.gr@gmail.com</a>.
        </p>

        <form
          action="https://formspree.io/f/mgaeovob"
          method="POST"
          className="contact-form"
        >
          <label>
            Όνομα
            <input type="text" name="name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Μήνυμα
            <textarea name="message" rows={6} required></textarea>
          </label>
          <button type="submit" className="hero-cta contact-submit">
            Αποστολή
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
