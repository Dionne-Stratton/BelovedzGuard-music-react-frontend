import React from "react";
import { CheckIcon } from "./Icons";
import { useToastContext } from "../../contexts/ToastContext";
import "./ShareModal.css";

export default function ShareModal({ isOpen, onClose, title, url, text }) {
  const { success: showSuccess, error: showError } = useToastContext();
  const [copyCopied, setCopyCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyCopied(true);
      showSuccess("Link copied to clipboard!");
      setTimeout(() => setCopyCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      showError("Failed to copy link");
    }
  };

  const handleSocialShare = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "tumblr":
        shareUrl = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`;
        break;
      default:
        return;
    }

    console.log("Sharing to", platform, "with URL:", shareUrl);
    const popup = window.open(
      shareUrl,
      "_blank",
      "width=600,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
    );
    if (!popup) {
      showError("Popup blocked. Please allow popups for this site.");
    }
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share "{title}"</h3>
          <button className="share-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="share-modal-content">
          <div className="share-social-options">
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("facebook")}
              title="Share on Facebook"
            >
              <span className="share-social-icon">f</span>
              <span>Facebook</span>
            </button>
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("twitter")}
              title="Share on Twitter"
            >
              <span className="share-social-icon">𝕏</span>
              <span>X</span>
            </button>
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("reddit")}
              title="Share on Reddit"
            >
              <span className="share-social-icon">r</span>
              <span>Reddit</span>
            </button>
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("linkedin")}
              title="Share on LinkedIn"
            >
              <span className="share-social-icon">in</span>
              <span>LinkedIn</span>
            </button>
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("tumblr")}
              title="Share on Tumblr"
            >
              <span className="share-social-icon">t</span>
              <span>Tumblr</span>
            </button>
            <button
              className="share-social-btn"
              onClick={() => handleSocialShare("email")}
              title="Share via Email"
            >
              <span className="share-social-icon">✉</span>
              <span>Email</span>
            </button>
          </div>

          <div className="share-copy-section">
            <button
              className="share-copy-btn"
              onClick={handleCopyLink}
              disabled={copyCopied}
            >
              {copyCopied ? (
                <>
                  <CheckIcon size={16} /> Copied!
                </>
              ) : (
                <>
                  <span className="share-copy-icon">🔗</span> Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
