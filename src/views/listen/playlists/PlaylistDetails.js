import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetPlaylistByIdQuery } from "../../../state/playlistApi";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { ShareIcon } from "../../../components/shared/Icons";
import { trackUIEvent } from "../../../utils/analytics";
import "./PlaylistDetails.css";
import themes from "../../../components/shared/themes";

export default function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  // Try to find playlist in RTK Query cache first
  const playlists = useSelector((state) => state.playlistApi?.queries);
  const existingPlaylist = useMemo(() => {
    if (!playlists) return null;
    for (const key in playlists) {
      const data = playlists[key]?.data;
      if (Array.isArray(data)) {
        const match = data.find((p) => p._id === id);
        if (match) return match;
      }
    }
    return null;
  }, [playlists, id]);

  // Fetch only if not cached
  const { data: fetchedPlaylist, isLoading } = useGetPlaylistByIdQuery(id, {
    skip: !!existingPlaylist,
  });

  const playlist = existingPlaylist || fetchedPlaylist;
  const theme = themes[playlist?.theme] || themes.Faith;

  // Share functionality
  const [shareCopied, setShareCopied] = useState(false);

  // --- Handlers ---

  const handlePlayAll = () => {
    if (!playlist?.songs?.length) return;

    dispatch(
      setQueue({
        songs: playlist.songs,
        source: "playlist",
        sourceId: playlist._id,
      })
    );

    dispatch(setCurrentSong(playlist.songs[0]._id));
    dispatch(setPlaying(true));
  };

  const handlePlaySong = (songId) => {
    if (!playlist?.songs?.length) return;

    dispatch(
      setQueue({
        songs: playlist.songs,
        source: "playlist",
        sourceId: playlist._id,
      })
    );

    dispatch(setCurrentSong(songId));
    dispatch(setPlaying(true));
  };

  const handleEdit = () => {
    navigate("edit");
  };

  // Copy link to clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      trackUIEvent("Share Playlist", "Copy Link");
      setTimeout(() => setShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // --- Render ---

  if (isLoading) return <p>Loading playlist...</p>;
  if (!playlist) return <p>Playlist not found.</p>;

  // Only show edit button if logged in and owner
  // If playlist.owner is undefined but user is authenticated, assume ownership
  const isOwner =
    isAuthenticated &&
    user &&
    (playlist.owner === user.sub ||
      (playlist.owner === undefined && isAuthenticated));

  return (
    <div className="playlist-details-page">
      <div className="playlist-edit-top">
        {isOwner && (
          <button className="open-editor-btn" onClick={handleEdit}>
            ✏️ Open in Editor
          </button>
        )}
        <button
          className="share-button"
          onClick={handleShare}
          title="Copy link to share"
        >
          {shareCopied ? (
            "✓ Copied!"
          ) : (
            <>
              <ShareIcon size={16} /> Share
            </>
          )}
        </button>
      </div>

      <div
        className="playlist-details-container"
        style={{
          "--theme-gradient": theme.gradient,
          "--theme-image": `url(${theme.image})`,
        }}
      >
        <div className="playlist-details-header">
          <h2>{playlist.name}</h2>
          <button className="play-all-btn" onClick={handlePlayAll}>
            ▶ Play All
          </button>
        </div>

        <div className="playlist-song-list">
          {playlist.songs.map((song) => (
            <div key={song._id} className="playlist-song-row">
              <img
                src={song.songThumbnail}
                alt={song.title}
                className="playlist-song-thumb"
              />
              <span className="playlist-song-title">{song.title}</span>
              <span className="playlist-song-genre">{song.genre}</span>
              <button
                className="playlist-song-play"
                onClick={() => handlePlaySong(song._id)}
                title="Play this song"
              >
                ▶
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
