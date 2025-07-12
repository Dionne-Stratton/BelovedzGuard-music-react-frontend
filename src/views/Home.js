import React from "react";
import { NavLink } from "react-router-dom";

export default function Home({ setCurrentIndex }) {
  return (
    <div className="home">
      <h1>Welcome to BelovedzGuard</h1>
      <p>
        This is a space devoted to uplifting, Christ-centered music — songs
        birthed in worship, grounded in Scripture, and overflowing with love for
        Jesus. Everything here was created to stir your heart, strengthen your
        spirit, and help you draw near to Him.
      </p>

      <p>
        Whether you're weary or rejoicing, searching or sure — you're welcome
        here. Come listen, rest, and be refreshed in the presence of the One who
        loves you most.
      </p>

      <p>
        If you have yet to come to know Jesus, I invite you to explore the music
        and let it lead you to Him. He is waiting with open arms, ready to fill
        your heart with His love and grace.
      </p>

      <h3>The Gospel Message:</h3>

      <p>
        God created us to be in a loving relationship with Him, but our sin
        separates us from Him (Romans 3:23). Sin brings spiritual death and
        brokenness, but God, in His great love, sent His Son, Jesus Christ, to
        pay for our sins through His death on the cross (John 3:16, Romans 5:8).
        Jesus rose from the dead, conquering sin and death, and offering us new
        life in Him (1 Corinthians 15:3-4).
      </p>

      <p>
        When we turn from our sins and trust Jesus as our Savior, we are
        forgiven, and we become children of God, united with Him forever (Acts
        3:19, Ephesians 2:8-9). This gift of salvation is free—by faith, not by
        works—and brings us into a new, eternal relationship with God (John
        1:12).
      </p>

      <h4>
        If you’re ready to receive this gift, you can pray this simple prayer:
      </h4>

      <p>
        “Lord Jesus, I know I am a sinner, and I need Your forgiveness. Thank
        You for dying for my sins and rising again to give me life. I turn from
        my sins and invite You into my heart. Please be my Lord and Savior. Help
        me to follow You all my days. Thank You for Your love and for making me
        a child of God. Amen.”
      </p>

      <p>
        If you just prayed that prayer, or you are already following Jesus, this
        is my prayer for you:
      </p>

      <p>
        “Lord Jesus, I lift up everyone who hears this song. May they grow in
        grace and in the knowledge of You, our Savior. Fill them with Your
        Spirit, guide them, and draw them closer to Your heart every day.
        Strengthen their faith, give them peace and joy in Your presence, and
        help them to live fully for You. Let Your love flow through them to
        those around them, and may they walk in the fullness of Your purpose for
        their lives. Thank You, Lord, for Your unending love. Amen.”
      </p>

      <p>Seek Him today!</p>

      <div className="home-links">
        <p>
          <NavLink to="/music" className="main-nav">
            Start Listening
          </NavLink>{" "}
          |{" "}
          <NavLink to="/about" className="main-nav">
            Learn More
          </NavLink>
        </p>
      </div>

      <blockquote className="home-verse">
        “He has given me a new song to sing…” – Psalm 40:3
      </blockquote>
    </div>
  );
}
