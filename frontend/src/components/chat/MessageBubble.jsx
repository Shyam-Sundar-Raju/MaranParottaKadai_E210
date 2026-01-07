export default function MessageBubble({ text, isUser }) {
  return (
    <div
      className={`max-w-xl px-4 py-2 rounded-lg ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-white border"
      }`}
    >
      {text}
    </div>
  );
}
