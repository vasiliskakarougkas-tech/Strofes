import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <h3 className="display">Στρόφες στα εισερχόμενά σου</h3>
          <p>
            Ένα email την εβδομάδα με τις καλύτερες δοκιμές, νέα και οδηγούς.
            Χωρίς σπαμ, χωρίς περιττά.
          </p>
        </div>
        <form
          className="subscribe"
          action="https://formspree.io/f/mgaeovob"
          method="POST"
        >
          <input type="email" name="email" placeholder="το email σου" required />
          <button type="submit">Εγγραφή</button>
        </form>
      </div>

      <div className="footer-contact">
        <div className="footer-contact-item">
          <span className="footer-contact-label mono">EMAIL</span>
          <a href="mailto:strofes.gr@gmail.com">strofes.gr@gmail.com</a>
        </div>
        <div className="footer-contact-item">
          <span className="footer-contact-label mono">INSTAGRAM</span>
          <a
            href="https://instagram.com/strofes.gr"
            target="_blank"
            rel="noopener noreferrer"
          >
            @strofes.gr
          </a>
        </div>
        <div className="footer-contact-item">
          <span className="footer-contact-label mono">ΕΠΙΚΟΙΝΩΝΙΑ</span>
          <Link href="/epikoinonia">Φόρμα επικοινωνίας</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ΣΤΡΟΦΕΣ</span>
        <span>
          <Link href="/epikoinonia">Επικοινωνία</Link>
        </span>
      </div>
    </footer>
  );
}
