import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Card from "../components/Card";

interface ContentItem {
  _id: string;
  type: "youtube" | "twitter";
  link: string;
  title: string;
}

interface SharedData {
  name: string;
  content: ContentItem[];
}

function SharedContent() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!shareLink) {
        setError("Invalid share link");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/share/share/${shareLink}`
        );
        setSharedData(response.data);
      } catch (error: unknown) {
        console.error("Error fetching shared content:", error);
        if (axios.isAxiosError(error) && error.response?.status === 411) {
          setError("Invalid or expired share link");
        } else {
          setError("Failed to load shared content");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {sharedData?.name}'s Content Collection
              </h1>
              <p className="text-gray-600 mt-1">Shared content from SnapShot</p>
            </div>
            <div className="text-2xl font-bold text-blue-600">SnapShot</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {sharedData?.content && sharedData.content.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedData.content.map((item) => (
              <Card
                key={item._id}
                type={item.type}
                link={item.link}
                title={item.title}
                contentId={item._id}
                onDelete={() => {}} // No delete functionality in shared view
                isSharedView={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              No content shared yet
            </div>
            <div className="text-gray-500 text-sm">
              This user hasn't shared any content.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            Powered by SnapShot - Your content sharing platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default SharedContent;
