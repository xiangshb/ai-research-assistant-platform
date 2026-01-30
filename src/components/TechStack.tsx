import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Database, Layers, Network, Share2, ShieldCheck } from "lucide-react";

export default function TechStack() {
  const layers = [
    {
      icon: <Database className="w-8 h-8 text-cyan-500" />,
      title: "数据基座 (Data Layer)",
      desc: "arXiv, PubMed, 专利库全量接入。Entities Resolution与知识对齐，构建高质量AI-Ready语料库。",
      color: "border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/10"
    },
    {
      icon: <Network className="w-8 h-8 text-purple-500" />,
      title: "GraphRAG 架构",
      desc: "知识图谱 + 寻路的零幻觉设计。相比通用LLM，准确性大幅提升，每一条路径都有文献溯源。",
      color: "border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10"
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-amber-500" />,
      title: "Agentic Workflow",
      desc: "Planner规划任务，Explorer探索路径，Verifier核查事实。多智能体协作完成复杂科研任务。",
      color: "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10"
    }
  ];

  return (
    <section id="tech" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">技术架构</h2>
          <p className="text-muted-foreground text-lg">
            融合 <span className="text-foreground font-bold">GraphRAG</span> 与 <span className="text-foreground font-bold">Agentic Workflow</span> 的混合架构，
            实现从“关键词搜索”到“知识路径导航”的代际跨越。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 z-0" />

          {layers.map((layer, i) => (
            <Card key={i} className={`relative z-10 border bg-card/80 backdrop-blur-sm hover:bg-card transition-colors shadow-sm hover:shadow-md ${layer.color}`}>
              <CardHeader>
                <div className="mb-4 w-16 h-16 rounded-2xl bg-background flex items-center justify-center border border-border shadow-sm mx-auto md:mx-0">
                  {layer.icon}
                </div>
                <CardTitle className="font-heading text-xl text-foreground">{layer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {layer.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Deep Tech Highlights */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Layers, label: "双模态存储 (Graph+Vector)" },
            { icon: ShieldCheck, label: "Zero-Hallucination 零幻觉" },
            { icon: Share2, label: "LangGraph 智能体编排" },
            { icon: Database, label: "Neo4j + Milvus 引擎" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border shadow-sm">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-sm text-foreground/80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}