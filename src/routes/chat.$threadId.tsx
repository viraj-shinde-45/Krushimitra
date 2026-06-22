import { createFileRoute } from "@tanstack/react-router";
import { ChatThreadView } from "./chat";

export const Route = createFileRoute("/chat/$threadId")({
  head: () => ({ meta: [{ title: "AI Chat — KrishiMitra AI" }] }),
  component: () => {
    const { threadId } = Route.useParams();
    return <ChatThreadView threadId={threadId} />;
  },
});
