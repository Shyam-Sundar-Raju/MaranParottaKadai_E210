import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <MessageBubble text="Explain photosynthesis" isUser />
        <MessageBubble text="Photosynthesis is the process by which..." />
      </div>

      <ChatInput />
    </div>
  );
}
