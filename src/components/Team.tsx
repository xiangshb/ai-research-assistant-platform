import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  {
    name: "马一方",
    role: "首席科学家",
    title: "南方科技大学副教授 / 博导",
    desc: "Nature, PNAS 等顶刊发表多篇论文。深耕网络科学与科学学研究，把握AI for Science战略方向。",
    avatar: "MY"
  },
  {
    name: "向仕兵",
    role: "创始人 & CEO",
    title: "南科大-鹏城实验室联合培养博士",
    desc: "数学、统计与计算机AI复合背景。主导核心技术研发，具备从算法研究到产品落地的全栈能力。",
    avatar: "XS"
  },
  {
    name: "覃孟",
    role: "科学顾问",
    title: "鹏城实验室助理研究员",
    desc: "香港科技大学博士。图机器学习与复杂网络专家，提供前沿算法洞察与核心技术支持。",
    avatar: "QM"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">核心团队</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            由顶尖学术研究者与前沿技术实践者构成，深度融合数学、网络科学与AI的跨学科梦之队。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <Card key={i} className="bg-transparent border-transparent hover:bg-card hover:border-border hover:shadow-lg transition-all duration-300 text-center">
              <CardHeader className="pt-10 pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/20 bg-background">
                  <AvatarFallback className="bg-primary/10 text-primary font-heading text-xl">{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="text-primary font-medium text-sm mb-1">{member.role}</div>
                <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                <div className="text-sm text-muted-foreground">{member.title}</div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}