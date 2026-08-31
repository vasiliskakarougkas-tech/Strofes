"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("strofes-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("strofes-cookie-consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("strofes-cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Αυτό το site χρησιμοποιεί cookies για βασική λειτουργία και ανάλυση
        επισκεψιμότητας. Συνεχίζοντας, αποδέχεσαι τη χρήση τους.
      </p>
      <div className="cookie-banner-actions">
        <button className="cookie-btn-reject" onClick={reject}>
          Απόρριψη
        </button>
        <button className="cookie-btn-accept" onClick={accept}>
          Αποδοχή
        </button>
      </div>
    </div>
  );
}
