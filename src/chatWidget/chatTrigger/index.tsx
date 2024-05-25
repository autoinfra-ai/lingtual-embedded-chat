import { MessageSquare, X } from "lucide-react";

export default function ChatTrigger({
  style,
  open,
  setOpen,
  triggerRef,
}: {
  style?: React.CSSProperties;
  open: boolean;
  setOpen: Function;
  triggerRef: React.RefObject<HTMLButtonElement> | null;
}) {
  // here is the button that triggers and closes chat
  return (
    <div className="cl-trigger_wrapper">
      <button
        ref={triggerRef}
        style={style}
        onClick={() => {
          setOpen(!open);
        }}
        className="cl-trigger"
      >
        <X
          className={
            "cl-trigger-icon " + (open ? "cl-scale-100" : "cl-scale-0")
          }
        />
        <MessageSquare
          className={
            "cl-trigger-icon " + (open ? "cl-scale-0" : "cl-scale-100")
          }
        />
      </button>
    </div>
  );
}
