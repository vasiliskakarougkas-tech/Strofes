"use client";

import { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("strofes-newsletter-popup");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  function close() {
    localStorage.setItem("strofes-newsletter-popup", "dismissed");
    setVisible(false);
  }

  function handleSubmit() {
    localStorage.setItem("strofes-newsletter-popup", "subscribed");
  }

  if (!visible) return null;

  return (
    <div className="newsletter-popup-overlay" onClick={close}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={close} aria-label="Κλείσιμο">
          ×
        </button>
        <div className="newsletter-popup-eyebrow mono">ΣΤΡΟΦΕΣ ΝΕWSLETTER</div>
        <h3>Μη χάνεις τις δοκιμές μας</h3>
        <p>Ένα email την εβδομάδα με ό,τι αξίζει. Χωρίς σπαμ.</p>
        <form
          action="https://formspree.io/f/mgaeovob"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="email" name="email" placeholder="το email σου" required />
          <button type="submit">Εγγραφή</button>
        </form>
      </div>
    </div>
  );
}
