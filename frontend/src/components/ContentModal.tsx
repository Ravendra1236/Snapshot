import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

type ContentTypeValues = (typeof ContentType)[keyof typeof ContentType];

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

function ContentModal({ open, onClose }: ContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentTypeValues>(ContentType.Youtube);
  const [isLoading, setIsLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      alert("Please fill in both title and link!");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please sign in first!");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success feedback
      alert("🎉 Content saved successfully!");
      console.log(response.data);

      // Clear the form
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";

      // Close the modal after a brief delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`❌ ${error.response.data.mssg || "Failed to save content!"}`);
        console.error("Content save error:", error.response.data);
      } else {
        alert("🌐 Network error. Please try again!");
        console.error("Content save error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      {open && (
        <>
          {/* Backdrop with smooth fade */}
          <div
            className="w-screen h-screen bg-black fixed top-0 left-0 opacity-50 flex justify-center transition-opacity duration-300 ease-out z-40"
            onClick={onClose}
          ></div>

          {/* Modal Container */}
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <div className="transform transition-all duration-300 ease-out scale-100 opacity-100">
              <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-md mx-4 border border-gray-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Content
                  </h2>
                  <button
                    onClick={onClose}
                    className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <CrossIcon />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      ref={titleRef}
                      placeholder="Enter content title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link
                    </label>
                    <Input
                      ref={linkRef}
                      placeholder="Paste your YouTube or Twitter link..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Content Type
                    </label>
                    <div className="flex gap-2 mb-6">
                      <Button
                        text="🎥 YouTube"
                        variant={
                          type === ContentType.Youtube ? "primary" : "secondary"
                        }
                        onClick={() => setType(ContentType.Youtube)}
                      />
                      <Button
                        text="🐦 Twitter"
                        variant={
                          type === ContentType.Twitter ? "primary" : "secondary"
                        }
                        onClick={() => setType(ContentType.Twitter)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      text={isLoading ? "💫 Saving..." : "✨ Save Content"}
                      onClick={addContent}
                    />
                  </div>
                </div>

                {/* Helper Text */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Supported: YouTube videos and Twitter/X posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContentModal;
