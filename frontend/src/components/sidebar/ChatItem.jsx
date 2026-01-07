export default function ChatItem({ title }) {
  return (
    <div className="text-sm cursor-pointer hover:bg-gray-100 rounded px-2 py-1">
      {title}
    </div>
  );
}
