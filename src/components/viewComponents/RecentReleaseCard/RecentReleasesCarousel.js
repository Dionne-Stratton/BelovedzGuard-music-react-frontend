import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SongThumbnail from "../../shared/SongThumbnail";
import "./RecentReleasesCarousel.css";

const RecentReleasesCarousel = ({ songs }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Get player state
  const currentSongId = useSelector((state) => state.player?.currentSongId);
  const queue = useSelector((state) => state.player?.queue || []);
  const isPlaying = useSelector((state) => state.player?.isPlaying);

  // Check if we're playing from the recent releases queue (first 6 songs)
  const recentSongsIds = songs.slice(0, 6).map((s) => s._id);
  const queueIds = queue.map((song) => song._id);
  const isRecentReleasesQueue =
    queue.length === 6 &&
    queueIds.every((id, idx) => id === recentSongsIds[idx]);

  // Firefox fix: Force carousel to always behave as "active"
  const forceActive = true;

  // Force re-render on mount to "prime" video elements for Firefox
  useEffect(() => {
    // This effect runs on mount and should trigger the same state changes
    // that happen when the carousel becomes "active"
    console.log("Carousel mounted - priming for Firefox");
  }, []);

  // Firefox fix: Keep video elements "active" even when player is paused
  useEffect(() => {
    if (!isPlaying) {
      // When player is paused, force video elements to stay active
      const videos = document.querySelectorAll(".carousel-card video");
      videos.forEach((video) => {
        if (video.paused) {
          // Trigger a small play/pause cycle to keep element "active"
          video
            .play()
            .then(() => {
              video.pause();
            })
            .catch(() => {
              // Ignore errors
            });
        }
      });
    }
  }, [isPlaying]);

  // Determine which carousel song is currently playing (songs 1-5, indices 1-5)
  const carouselSongs = songs.slice(1, 6); // Songs at indices 1-5
  const currentCarouselIndex = carouselSongs.findIndex(
    (song) => song._id === currentSongId
  );

  // Auto-scroll to highlighted card
  useEffect(() => {
    if (
      isRecentReleasesQueue &&
      isPlaying &&
      currentCarouselIndex >= 0 &&
      scrollContainerRef.current
    ) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll(".carousel-card");
      const targetCard = cards[currentCarouselIndex];

      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentCarouselIndex, isRecentReleasesQueue, isPlaying]);

  return (
    <div className={`recent-releases-carousel ${forceActive ? "engaged" : ""}`}>
      <div className="carousel-scroll-container" ref={scrollContainerRef}>
        {/* Song thumbnails (songs 1-5) */}
        {carouselSongs.map((song, index) => {
          const isHighlighted =
            isRecentReleasesQueue &&
            isPlaying &&
            currentCarouselIndex === index;

          return (
            <div
              key={song._id}
              className={`carousel-card ${isHighlighted ? "highlighted" : ""}`}
            >
              <SongThumbnail
                title={song.title}
                thumbnail={song.songThumbnail}
                animatedThumbnail={song.animatedSongThumbnail}
                playOnLoad={false}
                playOnHover={true}
              />
            </div>
          );
        })}

        {/* End card */}
        <div className="carousel-card end-card">
          <div className="end-card-content">
            <p>Keep listening</p>
            <button
              className="end-card-button"
              onClick={() => navigate("/listen/songs")}
            >
              Songs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentReleasesCarousel;
