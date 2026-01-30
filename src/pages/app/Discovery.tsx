import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowUpRight, TrendingUp, Zap, ArrowRight, BrainCircuit } from "lucide-react";

export default function DiscoveryPage() {
  return (
    <div className="h-full overflow-y-auto space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2 flex items-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            结构洞与创新发现
          </h1>
          <p className="text-muted-foreground">
            AI基于因果推理，为您探测知识网络中未被充分探索的“蓝海”机会。
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Zap className="w-4 h-4 mr-2" /> 生成新的假设
        </Button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">潜在创新机会</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">12</div>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +3 本周新增
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">结构洞评分 (平均)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">8.4<span className="text-sm text-muted-foreground font-normal">/10</span></div>
            <Progress value={84} className="h-1.5 mt-2 bg-white/10" />
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">已验证假设</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-heading">85%</div>
            <p className="text-xs text-muted-foreground mt-1">基于 2.6M+ 文献数据支持</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Recommended Directions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-heading">推荐研究方向</h2>
          
          {[
            {
              title: "基于GraphRAG的材料发现通用范式",
              score: 9.8,
              tags: ["Material Science", "GNN", "LLM"],
              desc: "结合图神经网络的结构感知能力与大模型的推理能力，解决材料属性预测中的少样本问题。目前该交叉领域存在明显的知识断层。",
              impact: "High Impact"
            },
            {
              title: "多模态因果推断在气候建模中的应用",
              score: 9.2,
              tags: ["Climate", "Causal Inference", "Multimodal"],
              desc: "传统气候模型缺乏物理可解释性。引入因果图模型可以显著提升极端天气预测的鲁棒性。",
              impact: "Medium Impact"
            },
            {
              title: "蛋白质折叠中的非欧几何深度学习",
              score: 8.9,
              tags: ["Biology", "Geometric DL", "Protein"],
              desc: "探索双曲空间嵌入在蛋白质三维结构表征中的优势，可能突破现有AlphaFold架构的瓶颈。",
              impact: "Emerging"
            }
          ].map((item, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-colors bg-card/30 border-white/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/5 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-center bg-white/5 p-2 rounded-lg border border-white/5">
                    <div className="text-xs text-muted-foreground uppercase">Novelty</div>
                    <div className="text-xl font-bold text-primary">{item.score}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={item.impact === "High Impact" ? "border-red-500/50 text-red-400" : "border-yellow-500/50 text-yellow-400"}>
                    {item.impact}
                  </Badge>
                  <Button variant="ghost" size="sm" className="group/btn text-primary hover:text-primary hover:bg-primary/10">
                    生成实验方案 <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar: Knowledge Evolution */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading">演化趋势雷达</h2>
          <Card className="bg-card/30 border-white/10 h-[calc(100%-3rem)]">
            <CardContent className="pt-6 space-y-8">
              <div className="relative aspect-square flex items-center justify-center bg-black/20 rounded-full border border-white/5 mx-auto w-48 h-48">
                <BrainCircuit className="w-16 h-16 text-primary/20" />
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-2xl font-bold font-heading">85%</div>
                  <div className="text-xs text-muted-foreground">趋势匹配度</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Top Rising Concepts</h3>
                {[
                  { name: "Graph RAG", val: 92 },
                  { name: "Agentic Flow", val: 88 },
                  { name: "Causal AI", val: 75 }
                ].map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{c.name}</span>
                      <span className="text-primary">{c.val}%</span>
                    </div>
                    <Progress value={c.val} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}