import { useState } from "react";
import ChatItem from "./ChatItem";

export default function ProjectItem({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4">
      <div
        className="cursor-pointer font-medium py-2"
        onClick={() => setOpen(!open)}
      >
        {title}
      </div>

      {open && (
        <div className="pl-4 space-y-1">
          <ChatItem title="Photosynthesis" />
          <ChatItem title="Chapter 2 Summary" />
          <button className="text-sm text-blue-600">
            + New Chat
          </button>
        </div>
      )}
    </div>
  );
}
