import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useGetPlaylistByIdQuery as useGetPublicPlaylistByIdQuery } from "../../../state/publicApi";
import { useGetPlaylistByIdQuery as useGetAuthPlaylistByIdQuery } from "../../../state/playlistApi";
import {
  setQueue,
  setCurrentSong,
  setPlaying,
} from "../../../state/playerSlice";
import { useAuth0 } from "@auth0/auth0-react";
import {
  EditIcon,
  ShareIcon,
  PlayIcon,
} from "../../../components/shared/Icons";
import ShareModal from "../../../components/shared/ShareModal";
import { trackUIEvent } from "../../../utils/analytics";
import "./PlaylistDetails.css";
import themes from "../../../components/shared/themes";

export default function PlaylistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [showShareModal, setShowShareModal] = React.useState(false);

  // Try to find playlist in RTK Query cache first (for optimistic updates from edits)
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

  // Fetch from auth API only if not cached (for optimistic updates)
  const { data: fetchedAuthPlaylist } = useGetAuthPlaylistByIdQuery(id, {
    skip: !!existingPlaylist,
  });

  // Always fetch from public API as fallback (for Prerender.io compatibility)
  const { data: publicPlaylist, isLoading } = useGetPublicPlaylistByIdQuery(id);

  // Use cached playlist first (for immediate updates), then auth API, then public API
  const playlist = existingPlaylist || fetchedAuthPlaylist || publicPlaylist;
  // Always use public API for meta tags (Prerender.io can access it)
  // Use full playlist for UI, but ensure meta tags have public data
  const playlistForMeta = publicPlaylist || playlist;
  const theme = themes[playlist?.theme] || themes.Faith;

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

  // Open share modal
  const handleShare = () => {
    setShowShareModal(true);
    trackUIEvent("Share Playlist", "Open share modal");
  };

  // Signal to prerender.io that page is ready once playlist is loaded
  // Use publicPlaylist specifically so Prerender.io waits for the public API (which it can access)
  React.useEffect(() => {
    if (publicPlaylist && !isLoading && window.prerenderReady !== undefined) {
      // Delay to ensure Helmet has rendered meta tags after React hydration
      // Wait longer for playlist data to fully load (songs array populated)
      setTimeout(() => {
        window.prerenderReady = true;
      }, 1000);
    }
  }, [publicPlaylist, isLoading]);

  // --- Render ---

  // Meta tags for social sharing (always render, even during loading)
  // Use publicPlaylist for meta tags so Prerender.io can always access the data
  const pageUrl = window.location.href;
  const playlistName = playlistForMeta?.name || playlist?.name || "Playlist";
  const songCount =
    playlistForMeta?.songs?.length || playlist?.songs?.length || 0;
  const displayTitle = `My Playlist: ${playlistName}`;
  const description =
    playlistForMeta || playlist
      ? `${songCount} ${
          songCount === 1 ? "song" : "songs"
        } - A playlist by BelovedzGuard`
      : "A playlist by BelovedzGuard";
  // Use first song's videoThumbnail, fallback to songThumbnail, then default logo
  // Use publicPlaylist for meta tags so Prerender.io can always access the data
  // Note: theme.image is a relative path and not suitable for meta tags (need absolute URL)
  // We still use theme.image for CSS styling, but skip it for meta tags
  const thumbnail =
    playlistForMeta?.songs?.[0]?.videoThumbnail ||
    playlistForMeta?.songs?.[0]?.songThumbnail ||
    playlist?.songs?.[0]?.videoThumbnail ||
    playlist?.songs?.[0]?.songThumbnail ||
    "https://media.belovedzguard.com/assets/logo192.png";

  return (
    <>
      <Helmet>
        <title>{`${playlistName} | BelovedzGaurd Music`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="music.playlist" />
        <meta property="og:site_name" content="BelovedzGaurd Music" />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnail} />
      </Helmet>
      {isLoading && <p>Loading playlist...</p>}
      {!isLoading && !playlist && <p>Playlist not found.</p>}
      {!isLoading && playlist && (
        <>
          {/* Only show edit button if logged in and owner */}
          {/* If playlist.owner is undefined but user is authenticated, assume ownership */}
          {(() => {
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
                      <EditIcon size={20} /> Open in Editor
                    </button>
                  )}
                  <button
                    className="share-button"
                    onClick={handleShare}
                    title="Copy link to share"
                  >
                    <ShareIcon size={20} /> Share
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
                      <PlayIcon size={20} /> Play All
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
                        <span className="playlist-song-title">
                          {song.title}
                        </span>
                        <span className="playlist-song-genre">
                          {song.genre}
                        </span>
                        <button
                          className="playlist-song-play"
                          onClick={() => handlePlaySong(song._id)}
                          title="Play this song"
                        >
                          <PlayIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Modal */}
                <ShareModal
                  isOpen={showShareModal}
                  onClose={() => setShowShareModal(false)}
                  title={playlist.name}
                  url={window.location.href}
                  text={`Check out the "${playlist.name}" playlist by BelovedzGuard`}
                />
              </div>
            );
          })()}
        </>
      )}
    </>
  );
}
