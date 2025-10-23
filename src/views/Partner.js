import React from "react";
import "./Partner.css";
import { trackLinkClick } from "../utils/analytics"; // ✅ use your existing function

const Partner = () => {
  return (
    <div className="partner">
      <p className="border-below"></p>
      <h2>Partner With Me</h2>
      <div className="partner-section-with-media">
        <video
          className="partner-media drop-shadow-thick"
          src="/marketingPages/partner/offering.mp4"
          autoPlay
          muted
          playsInline
          onMouseEnter={(e) => {
            e.target.currentTime = 0;
            e.target.play();
          }}
          onMouseLeave={(e) => {
            e.target.pause();
            e.target.currentTime = 0;
          }}
        />

        <p>
          Creating music is a labor of love — one that I've given to the Lord to
          use however He desires. Every lyric, melody, and video is crafted with
          the hope of drawing people closer to Jesus. If you've been blessed by
          these songs and want to be part of what God is doing through them, I
          invite you to partner with me.
        </p>

        <p>
          Your support helps cover the costs of production, equipment, and
          sharing these songs with a wider audience. It also allows me to
          dedicate more time to creating new music and worship experiences.
        </p>
      </div>
      <p className="border-below"></p>
      <h2>🎧 Patreon – Studio Access</h2>
      <p>
        By joining my Patreon at the <strong>Studio Access</strong> tier, you'll
        get exclusive early access to alternate mixes of my songs — different
        versions I create and love but don’t publicly share. I release 2–5
        private versions per month just for patrons.
      </p>
      <div className="partner-button-container">
        <a
          href="https://www.patreon.com/BelovedzGuard"
          target="_blank"
          rel="noopener noreferrer"
          className="drop-shadow-thick partner-button"
          onClick={() => trackLinkClick("Patreon")}
        >
          Become a Patron
        </a>
      </div>

      <p className="border-below"></p>
      <h2>♫ Bandcamp – Music Downloads</h2>
      <p>
        Purchase songs directly through Bandcamp, a platform that gives artists
        a much larger share of each sale than other sites. It’s a great way to
        own the music, support my work, and enjoy high-quality downloads.
      </p>
      <div className="partner-button-container">
        <a
          href="https://belovedzguard.bandcamp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="drop-shadow-thick partner-button"
          onClick={() => trackLinkClick("Bandcamp")}
        >
          Purchase Music
        </a>
      </div>
      <p className="border-below"></p>
      <h2>💌 One-Time Donations</h2>
      <p>
        Prefer a small, casual way to show support? Ko-fi is like a digital tip
        jar — a simple way to “buy me a coffee” and say thanks. For larger or
        recurring gifts, you can use PayPal. Every bit of support helps me keep
        creating new songs for God’s glory.
      </p>
      <div className="partner-button-container">
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=2VSS3CEY7QUPE"
          target="_blank"
          rel="noopener noreferrer"
          className="partner-button drop-shadow-thick"
          onClick={() => trackLinkClick("PayPal")}
        >
          Donate via PayPal
        </a>
        <a
          href="https://ko-fi.com/belovedzguard"
          target="_blank"
          rel="noopener noreferrer"
          className="drop-shadow-thick partner-button"
          onClick={() => trackLinkClick("Ko-fi")}
        >
          Support me on Ko-fi
        </a>
      </div>
      <p className="border-below"></p>
      <h4>
        Thank you for helping me share these songs with the world. It means more
        than I can say.
      </h4>
    </div>
  );
};

export default Partner;
