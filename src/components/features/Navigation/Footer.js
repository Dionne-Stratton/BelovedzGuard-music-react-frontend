import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  //   FaSpotify,
  //   FaItunes,
  FaBandcamp,
} from "react-icons/fa";
import "./styles.css";

export default function Footer() {
  const [hovered, setHovered] = React.useState(null);

  const socialLinks = [
    {
      id: "facebook",
      icon: <FaFacebook />,
      url: "https://www.facebook.com/BelovedzGuard",
    },
    {
      id: "youtube",
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@BelovedzGuard",
    },
    {
      id: "instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/BelovedzGuard",
    },
    {
      id: "bandcamp",
      icon: <FaBandcamp />,
      url: "https://belovedzguard.bandcamp.com",
    },
    // {
    //   id: "spotify",
    //   icon: <FaSpotify />,
    //   url: "https://open.spotify.com/artist/BelovedzGuard",
    // },
    // {
    //   id: "itunes",
    //   icon: <FaItunes />,
    //   url: "https://music.apple.com/us/artist/belovedzguard",
    // },
  ];

  return (
    <footer className="footer">
      <div className="footer-social-container">
        {socialLinks.map(({ id, icon, url }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            className={`footer-icon ${hovered === id ? 'footer-icon:hover' : ''}`}
          >
            {icon}
          </a>
        ))}
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} BelovedzGuard. All rights reserved.
      </div>
      <div
        className="footer-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top ↑
      </div>
    </footer>
  );
}
