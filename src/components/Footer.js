import React from "react";
// import fbicon from "../images/fbicon.png";
// import instaicon from "../images/instaicon.png";
// import youtubeicon from "../images/youtubeicon.png";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <div className="ender">
          <h2>Like what you see?</h2>
          <p>Get in touch on Social Media below.</p>
        </div>
        {/* <div className="icons">
          <a
            // eslint-disable-next-line
            target="_blank"
            href="https://www.facebook.com/serenityimagesart"
          >
            <img src={fbicon} alt="facebook logo" />
          </a>
          <a
            // eslint-disable-next-line
            target="_blank"
            href="https://www.instagram.com/living_word_designs_art_studio/"
          >
            <img src={instaicon} alt="instagram logo" />
          </a>
          <a
            // eslint-disable-next-line
            target="_blank"
            href="https://www.youtube.com/channel/UCOkeCTEFbJ7zRyGgF_eZd5Q?view_as=subscriber"
          >
            <img src={youtubeicon} alt="youtube logo" />
          </a>
        </div> */}
      </footer>
    </div>
  );
};

export default Footer;
