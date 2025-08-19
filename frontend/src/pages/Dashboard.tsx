import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import AddIcon from "../icons/AddIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";
import useContent from "../hooks/useContent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const content = useContent();
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <ContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        ></ContentModal>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<AddIcon />}
          ></Button>
          <Button
            variant="secondary"
            text="Share Snap"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-6">
          {content.map(({ type, link, title }) => {
            return (
              <Card
                type={type}
                link={link}
                title={title}
                key={`${type}-${title}`}
              ></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
