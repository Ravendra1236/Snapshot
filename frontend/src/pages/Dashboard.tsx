import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import AddIcon from "../icons/AddIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
        <div className="flex gap-4">
          <Card
            type="twitter"
            link="https://x.com/XDevelopers/status/1861111894100320572"
            title="First Tweet"
          ></Card>

          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=eBTBG4nda2A"
            title="First Video"
          ></Card>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
