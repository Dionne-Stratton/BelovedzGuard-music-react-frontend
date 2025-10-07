import React from "react";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaSpotify,
  FaItunes,
  FaBandcamp,
} from "react-icons/fa";
import colors from "../styles/colors";

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#7d7771", // between header and player tone
      color: colors.textSecondary,
      textAlign: "center",
      padding: "18px 10px",
      fontSize: "0.9rem",
      boxShadow: "0 -2px 6px rgba(0,0,0,0.4)",
    },
    socialContainer: {
      marginBottom: "10px",
    },
    icon: {
      color: colors.textSecondary,
      margin: "0 12px",
      fontSize: "1.45rem",
      transition: "color 0.25s ease, transform 0.25s ease, filter 0.25s ease",
      cursor: "pointer",
      display: "inline-block",
    },
    iconHover: {
      color: colors.textTitle, // brighter tone on hover
      transform: "scale(1.15)",
      filter: "brightness(1.3)",
    },
    copyright: {
      marginTop: "6px",
      fontSize: "0.85rem",
      opacity: 0.8,
    },
  };

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
    <footer style={styles.footer}>
      <div style={styles.socialContainer}>
        {socialLinks.map(({ id, icon, url }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...styles.icon,
              ...(hovered === id ? styles.iconHover : {}),
            }}
          >
            {icon}
          </a>
        ))}
      </div>
      <div style={styles.copyright}>
        © {new Date().getFullYear()} BelovedzGuard. All rights reserved.
      </div>
      <div
        style={{
          marginTop: "8px",
          cursor: "pointer",
          color: colors.textSecondary,
          textDecoration: "underline",
          transition: "color 0.3s ease",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={(e) => (e.target.style.color = colors.textTitle)}
        onMouseLeave={(e) => (e.target.style.color = colors.textSecondary)}
      >
        Back to top ↑
      </div>
    </footer>
  );
}
