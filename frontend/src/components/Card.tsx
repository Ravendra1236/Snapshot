import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";
import DeleteIcon from "../icons/DeleteIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  contentId: string;
  onDelete: (contentId: string) => void;
  isSharedView?: boolean;
}

// Function to convert YouTube URL to embed format
function getYouTubeEmbedUrl(url: string): string {
  try {
    // Extract video ID from various YouTube URL formats
    let videoId = "";

    if (url.includes("youtube.com/watch")) {
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match ? match[1] : "";
    } else if (url.includes("youtu.be/")) {
      // Format: https://youtu.be/VIDEO_ID
      const match = url.match(/youtu\.be\/([^?]+)/);
      videoId = match ? match[1] : "";
    } else if (url.includes("youtube.com/embed/")) {
      // Already in embed format
      return url;
    }

    // Return proper embed URL if video ID found
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    console.error("Could not extract video ID from URL:", url);
    return url; // Fallback to original URL
  } catch (error) {
    console.error("Error converting YouTube URL:", error);
    return url;
  }
}

// Declare Twitter widgets type extension
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

function Card({
  title,
  link,
  type,
  contentId,
  onDelete,
  isSharedView = false,
}: CardProps) {
  // Load Twitter widgets script for Twitter embeds
  useEffect(() => {
    if (type === "twitter") {
      // Check if Twitter widgets script is already loaded
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          // Refresh Twitter widgets after script loads
          if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
          }
        };
        document.head.appendChild(script);
      } else {
        // If script is already loaded, just refresh widgets
        if (window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      }
    }
  }, [type]);

  // Debug YouTube URL conversion
  if (type === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(link);
    console.log("Original URL:", link);
    console.log("Embed URL:", embedUrl);
  }

  const handleDelete = async () => {
    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this content?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { contentId },
      });

      // Call the parent's onDelete to update the UI
      onDelete(contentId);
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 w-80 flex-shrink-0">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center text-lg font-medium text-gray-900 flex-1 mr-2">
            <div className="text-gray-500 mr-2 flex-shrink-0">
              {type === "youtube" && <YoutubeIcon />}
              {type === "twitter" && <TwitterIcon />}
            </div>
            <span className="truncate">{title}</span>
          </div>
          {!isSharedView && (
            <div
              className="flex items-center gap-2 flex-shrink-0 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="w-full h-48 bg-gray-50 rounded-md overflow-hidden">
          {type === "youtube" && (
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <div className="twitter-embed-container w-full h-full overflow-hidden">
              <blockquote
                className="twitter-tweet h-full"
                data-theme="light"
                data-dnt="true"
                data-cards="hidden"
                data-conversation="none"
              >
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
