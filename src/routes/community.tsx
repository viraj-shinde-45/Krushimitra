import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { safeRandomUUID } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — KrishiMitra AI" }] }),
  component: CommunityPage,
});

interface Post {
  id: string; author: string; initials: string; region: string; category: string;
  body: string; likes: number; liked: boolean; comments: string[];
}

const seed: Post[] = [
  { id: "1", author: "Suresh Pawar", initials: "SP", region: "Latur, MH", category: "Success Story",
    body: "Switched from soybean to moong using KrishiMitra advice — profit up by ₹38,000 this season! 🌱",
    likes: 124, liked: false, comments: ["Inspiring!", "Which variety did you use?"] },
  { id: "2", author: "Lakshmi Reddy", initials: "LR", region: "Kurnool, AP", category: "Disease",
    body: "Found early blight on tomato leaves. Sprayed Mancozeb as suggested, leaves recovered in a week.",
    likes: 89, liked: false, comments: ["Same issue here, thanks!"] },
  { id: "3", author: "Harpreet Singh", initials: "HS", region: "Bathinda, PB", category: "Market",
    body: "Wheat at Bathinda mandi touched ₹2,485 yesterday. Anyone seeing higher prices nearby?",
    likes: 56, liked: false, comments: [] },
];

const categories = ["All", "Success Story", "Disease", "Market", "Weather", "Schemes"];

function CommunityPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState(seed);
  const [filter, setFilter] = useState("All");
  const [draft, setDraft] = useState("");

  const getLocalizedPost = (post: Post): Post => {
    if (post.id === "1") {
      return {
        ...post,
        author: t("community.seedPosts.p1.author", post.author),
        region: t("community.seedPosts.p1.region", post.region),
        body: t("community.seedPosts.p1.body", post.body),
        comments: [
          t("community.seedPosts.p1.c1", "Inspiring!"),
          t("community.seedPosts.p1.c2", "Which variety did you use?"),
          ...post.comments.slice(2)
        ]
      };
    }
    if (post.id === "2") {
      return {
        ...post,
        author: t("community.seedPosts.p2.author", post.author),
        region: t("community.seedPosts.p2.region", post.region),
        body: t("community.seedPosts.p2.body", post.body),
        comments: [
          t("community.seedPosts.p2.c1", "Same issue here, thanks!"),
          ...post.comments.slice(1)
        ]
      };
    }
    if (post.id === "3") {
      return {
        ...post,
        author: t("community.seedPosts.p3.author", post.author),
        region: t("community.seedPosts.p3.region", post.region),
        body: t("community.seedPosts.p3.body", post.body),
      };
    }
    return post;
  };

  const localizedPosts = posts.map(getLocalizedPost);
  const visible = filter === "All" ? localizedPosts : localizedPosts.filter((p) => p.category === filter);

  const toggleLike = (id: string) =>
    setPosts((p) => p.map((x) => x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x));

  const addPost = () => {
    if (!draft.trim()) return;
    setPosts((p) => [{
      id: safeRandomUUID(), author: t("community.you"), initials: "YO", region: t("community.yourVillage"),
      category: "Success Story", body: draft.trim(), likes: 0, liked: false, comments: [],
    }, ...p]);
    setDraft("");
  };

  const addComment = (id: string, text: string) => {
    if (!text.trim()) return;
    setPosts((p) => p.map((x) => x.id === id ? { ...x, comments: [...x.comments, text.trim()] } : x));
  };

  const getTranslatedCategory = (cat: string) => {
    const keyMap: Record<string, string> = {
      "All": "all",
      "Success Story": "successstory",
      "Disease": "disease",
      "Market": "market",
      "Weather": "weather",
      "Schemes": "schemes"
    };
    const k = keyMap[cat];
    return t("community.categories." + k, cat);
  };

  return (
    <DashboardShell title={t("community.title")}>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === c ? "bg-gradient-leaf text-primary-foreground shadow-soft" : "bg-card border border-border hover:bg-secondary"
            }`}
          >{getTranslatedCategory(c)}</button>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft mb-6">
        <textarea
          value={draft} onChange={(e) => setDraft(e.target.value)}
          rows={3} placeholder={t("community.placeholder")}
          className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="mt-3 flex justify-end">
          <Button onClick={addPost} className="bg-gradient-leaf text-primary-foreground"><Send className="mr-2 h-4 w-4"/>{t("community.post")}</Button>
        </div>
      </div>

      <div className="space-y-4">
        {visible.map((p) => (
          <PostCard key={p.id} post={p} onLike={() => toggleLike(p.id)} onComment={(txt) => addComment(p.id, txt)} />
        ))}
      </div>
    </DashboardShell>
  );
}

function PostCard({ post, onLike, onComment }: { post: Post; onLike: () => void; onComment: (t: string) => void }) {
  const { t } = useTranslation();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const getTranslatedCategory = (cat: string) => {
    const keyMap: Record<string, string> = {
      "All": "all",
      "Success Story": "successstory",
      "Disease": "disease",
      "Market": "market",
      "Weather": "weather",
      "Schemes": "schemes"
    };
    const k = keyMap[cat];
    return t("community.categories." + k, cat);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-wheat font-semibold">{post.initials}</div>
        <div className="flex-1">
          <div className="font-semibold">{post.author} <span className="text-xs font-normal text-muted-foreground">· {post.region}</span></div>
          <div className="text-xs text-muted-foreground">{getTranslatedCategory(post.category)}</div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed">{post.body}</p>
      <div className="mt-4 flex items-center gap-1 text-sm">
        <button onClick={onLike} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition ${post.liked ? "text-terracotta" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
          <Heart className={`h-4 w-4 ${post.liked ? "fill-terracotta" : ""}`}/>{post.likes}
        </button>
        <button onClick={() => setShowComments((s) => !s)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary">
          <MessageCircle className="h-4 w-4"/>{post.comments.length}
        </button>
        <button onClick={() => navigator.clipboard?.writeText(post.body)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary">
          <Share2 className="h-4 w-4"/>{t("community.share")}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 space-y-2 border-t border-border pt-3">
          {post.comments.map((cm, i) => (
            <div key={i} className="rounded-lg bg-secondary/40 px-3 py-2 text-sm">{cm}</div>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); onComment(commentInput); setCommentInput(""); }} className="flex gap-2">
            <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder={t("community.commentPlaceholder")} className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"/>
            <Button type="submit" size="sm">{t("common.submit")}</Button>
          </form>
        </div>
      )}
    </div>
  );
}
