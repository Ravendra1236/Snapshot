import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import ShareModal from "../components/ShareModal";
import AddIcon from "../icons/AddIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import useContent from "../hooks/useContent";

type FilterType = "all" | "youtube" | "twitter";

interface ContentItem {
  _id: string;
  type: "youtube" | "twitter";
  link: string;
  title: string;
}

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [content, setContent] = useState<ContentItem[]>([]);
  const rawContent = useContent() as ContentItem[];

  // Update content when rawContent changes
  useEffect(() => {
    if (rawContent.length >= 0) {
      setContent(rawContent);
    }
  }, [rawContent]);

  const handleDelete = (contentId: string) => {
    setContent((prevContent) =>
      prevContent.filter((item) => item._id !== contentId)
    );
  };

  // Filter content based on active filter
  const filteredContent = content.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });
  return (
    <div>
      <Sidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <ContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        ></ContentModal>
        <ShareModal
          open={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
          }}
        ></ShareModal>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<AddIcon />}
          ></Button>
          <Button
            onClick={() => setShareModalOpen(true)}
            variant="secondary"
            text="Share Snap"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-6">
          {filteredContent.length > 0 ? (
            filteredContent.map(({ type, link, title, _id }) => {
              return (
                <Card
                  type={type}
                  link={link}
                  title={title}
                  contentId={_id}
                  onDelete={handleDelete}
                  key={`${type}-${title}-${_id}`}
                ></Card>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full py-12">
              <div className="text-gray-400 text-lg mb-2">
                No {activeFilter === "all" ? "content" : activeFilter} found
              </div>
              <div className="text-gray-500 text-sm">
                {activeFilter === "all"
                  ? "Add some content to get started"
                  : `Add some ${activeFilter} content to see it here`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
