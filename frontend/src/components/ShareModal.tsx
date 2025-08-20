import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import CrossIcon from "../icons/CrossIcon";
import ShareIcon from "../icons/ShareIcon";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

function ShareModal({ open, onClose }: ShareModalProps) {
  const [shareLink, setShareLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [error, setError] = useState<string>("");

  const generateShareLink = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to share content");
        setIsLoading(false);
        return;
      }

      console.log("Making request to:", `${BACKEND_URL}/api/v1/share`);
      console.log("Token exists:", !!token);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/share`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      const hash = response.data.hash;
      if (!hash) {
        throw new Error("No hash received from server");
      }

      const fullShareLink = `${window.location.origin}/shared/${hash}`;
      setShareLink(fullShareLink);
      setIsShared(true);
    } catch (error) {
      console.error("Error generating share link:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);

        if (error.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else if (error.response?.status === 403) {
          setError("Authentication failed. Please login again.");
        } else if (error.response?.data?.mssg) {
          setError(error.response.data.mssg);
        } else {
          setError("Failed to generate share link. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeShareLink = async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in");
        setIsLoading(false);
        return;
      }

      await axios.post(
        `${BACKEND_URL}/api/v1/share`,
        { share: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShareLink("");
      setIsShared(false);
    } catch (error) {
      console.error("Error removing share link:", error);
      setError("Failed to remove share link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      // You could add a toast notification here
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback: select the text
      const textArea = document.createElement("textarea");
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
    }
  };

  const handleClose = () => {
    setShareLink("");
    setIsShared(false);
    setError("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <ShareIcon />
            <h2 className="text-xl font-semibold text-gray-900">
              Share Your Content
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Generate a shareable link that others can use to view your content
            collection.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!isShared ? (
            <div className="space-y-4">
              <button
                onClick={generateShareLink}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <ShareIcon />
                    Generate Share Link
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your shareable link:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={removeShareLink}
                  disabled={isLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {isLoading ? "Removing..." : "Remove Link"}
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
