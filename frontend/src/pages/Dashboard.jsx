import Sidebar from "../components/sidebar/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

export default function Dashboard() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
