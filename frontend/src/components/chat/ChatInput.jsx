import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function ChatInput() {
  return (
    <div className="p-4 border-t bg-white flex gap-2">
      <Textarea
        placeholder="Ask something..."
        className="resize-none"
      />
      <Button>Send</Button>
    </div>
  );
}
