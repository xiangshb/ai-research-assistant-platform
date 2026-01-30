import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background - Visible in both modes but adjusted via opacity/blending */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
        <img
          src={heroBg}
          alt="Scientific Knowledge Graph"
          className="w-full h-full object-cover opacity-60 dark:opacity-60 opacity-20 invert dark:invert-0"
        />
      </div>

      <div className="container relative z-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              AI Powered Science Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-tight">
            <span className="block text-foreground">构建下一代</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-500 to-secondary">
              AI驱动的科学发现引擎
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            让AI成为您的科研合作伙伴。从海量文献中提炼结构化知识，发现跨学科的创新机会，
            将科研效率提升 <span className="text-foreground font-bold">10倍</span> 以上。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app/chat">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-heading rounded-full shadow-lg shadow-primary/20 transition-all">
                立即开始体验 <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-input hover:bg-accent hover:text-accent-foreground rounded-full backdrop-blur-sm">
              <Play className="mr-2 w-4 h-4" /> 观看演示
            </Button>
          </div>
          
          {/* Stats / Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-8">
            {[
              { label: "覆盖文献", value: "2.6亿+" },
              { label: "AI 节点", value: "10B+" },
              { label: "科研用户", value: "2900万+" },
              { label: "效率提升", value: "10x" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}