import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, FileText, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: string[];
  isThinking?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "你好！我是你的AI科研助理。我可以帮你阅读文献、生成综述、寻找结构洞，或者讨论任何科研想法。\n\n试着问我：\n- “帮我总结最新的GraphRAG技术进展”\n- “分析一下Transformer架构在生物信息学中的应用空白”",
    timestamp: new Date(),
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "这是一个模拟的回复。在真实系统中，这里会连接到后端的大模型推理引擎，基于知识图谱进行深度检索与生成。\n\n目前你可以通过点击左侧菜单体验其他功能页面。",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col max-w-5xl mx-auto">
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium text-sm">DeepResearch-V1 (Online)</span>
          </div>
          <Badge variant="outline" className="text-xs font-mono text-primary border-primary/20 bg-primary/5">
            Reading 2.6M+ Papers
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-4 max-w-3xl",
                msg.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <Avatar className={cn("w-8 h-8 mt-1", msg.role === "assistant" ? "bg-primary/20 text-primary border border-primary/50" : "bg-white/10")}>
                <AvatarFallback>
                  {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </AvatarFallback>
              </Avatar>
              
              <div className={cn(
                "flex flex-col gap-2",
                msg.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-card border border-white/5 text-foreground rounded-tl-none"
                )}>
                  {msg.content}
                </div>
                <div className="text-xs text-muted-foreground opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <Avatar className="w-8 h-8 mt-1 bg-primary/20 text-primary border border-primary/50">
                <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
              </Avatar>
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-card border border-white/5 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">正在思考...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/5">
          <div className="relative flex items-end gap-2 p-2 rounded-xl bg-background border border-white/10 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground rounded-lg">
              <Paperclip className="w-5 h-5" />
            </Button>
            
            <textarea
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2 text-sm leading-relaxed scrollbar-hide outline-none placeholder:text-muted-foreground/50"
              placeholder="输入你的研究问题，或粘贴论文链接..."
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            <Button 
              size="icon" 
              className={cn(
                "h-10 w-10 shrink-0 rounded-lg transition-all",
                inputValue.trim() ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground cursor-not-allowed"
              )}
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground/50">
            AI可能会产生错误，请核实重要信息。
          </div>
        </div>
      </div>
    </div>
  );
}