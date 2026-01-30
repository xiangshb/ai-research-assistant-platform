import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ZoomIn, ZoomOut, Maximize, Share2, Layers, Filter } from "lucide-react";

export default function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mock Data for Graph
    const nodes = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 3,
      color: i < 5 ? "#00f0ff" : i < 15 ? "#a855f7" : "#334155",
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const connections: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.85) {
          connections.push([i, j]);
        }
      }
    }

    // Animation Loop
    let animationId: number;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.lineWidth = 0.5;
      connections.forEach(([i, j]) => {
        const nodeA = nodes[i];
        const nodeB = nodes[j];
        const dist = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
        
        if (dist < 200) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 200)})`;
          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      });

      // Draw nodes and update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
        
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-card/50 backdrop-blur border border-white/5 rounded-xl">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="搜索概念节点 (如: Diffusion Models)" className="pl-9 bg-background/50 border-white/10" />
          </div>
          <Button variant="outline" className="gap-2 border-white/10">
            <Filter className="w-4 h-4" /> 筛选
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost"><ZoomIn className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost"><ZoomOut className="w-4 h-4" /></Button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <Button size="icon" variant="ghost"><Layers className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost"><Share2 className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost"><Maximize className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 relative rounded-xl border border-white/5 bg-black/40 overflow-hidden group">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
        
        {/* Overlay Info Card */}
        <Card className="absolute top-4 right-4 w-72 bg-black/80 backdrop-blur-md border-white/10 p-4 translate-x-full group-hover:translate-x-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-bold text-sm">当前选中: LLM Reasoning</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            该节点与 "Chain of Thought" 和 "GraphRAG" 高度关联。近期引用量激增 (+45%)。
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="w-full text-xs h-8">查看文献 (128)</Button>
            <Button size="sm" variant="outline" className="w-full text-xs h-8 border-white/20">追踪演化</Button>
          </div>
        </Card>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-black/60 backdrop-blur border border-white/5 flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            <span>Core Concepts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
            <span>Emerging Tech</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#334155]" />
            <span>Historical</span>
          </div>
        </div>
      </div>
    </div>
  );
}