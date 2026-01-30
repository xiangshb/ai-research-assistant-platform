import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import featureGraph from "@/assets/feature-graph.jpg";
import featureAi from "@/assets/feature-ai.jpg";
import featureInnovation from "@/assets/feature-innovation.jpg";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "management",
    title: "AI 科研助理 (The AI Associate)",
    description: "全周期科研知识管理。不仅是文献阅读，更是你的全职科研助手。深度阅读、自动综述、灵感管理一站式解决。",
    details: [
      "深度阅读：自动总结摘要，横向对比50+篇论文",
      "智能综述：自动生成State-of-the-Art (SOTA) 报告",
      "效率革命：将3-5天的文献调研缩短至3小时"
    ],
    image: featureAi,
    align: "left"
  },
  {
    id: "navigation",
    title: "知识图谱导航 (Knowledge GPS)",
    description: "告别碎片化阅读。构建动态知识演化网络，可视化前沿技术与方法演进路径。",
    details: [
      "全景视野：上帝视角查看领域技术演进",
      "精准定位：快速明确你的研究在知识网络中的位置",
      "零幻觉：基于GraphRAG架构，每一条路径都有据可依"
    ],
    image: featureGraph,
    align: "right"
  },
  {
    id: "discovery",
    title: "结构洞与创新发现 (Innovation Engine)",
    description: "发现别人看不到的机会。基于因果推理探测知识网络的“结构洞”，推荐跨学科融合的创新方向。",
    details: [
      "假设生成：AI基于推理自动生成可验证的科学假设",
      "跨界融合：发现未被充分探索的跨学科结合点",
      "蓝海挖掘：避开内卷红海，锁定高价值研究方向"
    ],
    image: featureInnovation,
    align: "left"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1">核心功能</Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            不仅仅是工具，<br />
            更是您的 <span className="text-primary">外脑</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            解决科研人员“文献读不完、逻辑理不清、创新想不出”的核心痛点，重构科研工作流。
          </p>
        </div>

        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={cn(
                "flex flex-col md:flex-row items-center gap-12 md:gap-24",
                feature.align === "right" ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl aspect-video">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay UI elements for tech feel */}
                  <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md p-4 rounded-lg border border-border flex items-center justify-between shadow-lg">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs font-mono text-primary/80">AI PROCESSING...</div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 space-y-8">
                <div>
                  <div className="text-5xl font-heading font-bold text-muted-foreground/20 mb-4 -ml-2">0{index + 1}</div>
                  <h3 className="text-3xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <ul className="space-y-4">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="group text-primary hover:text-primary/80 p-0 hover:bg-transparent">
                  了解更多 <span className="group-hover:translate-x-1 transition-transform inline-block ml-1">→</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}