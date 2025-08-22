import { MatrixBackground } from "@/components/matrix-background"
import { InteractiveLogo } from "@/components/interactive-logo"
import { CyberpunkNav } from "@/components/cyberpunk-nav"
import { DecryptionText } from "@/components/decryption-text"
import { InteractiveText } from "@/components/interactive-text"
import Link from "next/link"
import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Matrix background effect */}
      <MatrixBackground />

    

      {/* Main content */}
      <div className="relative z-10">
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <div className="text-center">
            <InteractiveLogo />
            <div className="mt-8">
              <InteractiveText variant="access">
                <DecryptionText
                  text="CYBERPUNK UPDATES SYSTEM"
                  className="text-primary text-xl font-mono"
                  delay={1000}
                />
              </InteractiveText>
            </div>
            <div className="mt-6 p-4 rounded-lg border border-primary/30 hover:border-primary transition-all duration-300">
              <InteractiveText variant="access">
                <span className="text-secondary font-mono text-sm">TAP FOR SYSTEM ACCESS</span>
              </InteractiveText>
            </div>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-primary font-mono">
              <DecryptionText text="ABOUT THE SYSTEM" delay={300} />
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group">
                <h3 className="text-xl font-bold text-secondary mb-4 font-mono">SECURITY PROTOCOLS</h3>
                <p className="text-muted-foreground">
                  Advanced encryption and quantum-resistant security measures protect all system operations.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group">
                <h3 className="text-xl font-bold text-secondary mb-4 font-mono">NEURAL INTERFACE</h3>
                <p className="text-muted-foreground">
                  Direct brain-computer integration for seamless human-machine interaction.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group">
                <h3 className="text-xl font-bold text-secondary mb-4 font-mono">AI INTEGRATION</h3>
                <p className="text-muted-foreground">
                  Next-generation artificial intelligence powers all system functions and updates.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors group">
                <h3 className="text-xl font-bold text-secondary mb-4 font-mono">QUANTUM COMPUTING</h3>
                <p className="text-muted-foreground">
                  Quantum processors enable unprecedented computational capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="updates" className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-primary font-mono">
              <DecryptionText text="LATEST UPDATES" delay={500} />
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "SECURITY PATCH 2K25.1",
                  desc: "Enhanced encryption protocols activated",
                  date: "2025-01-15",
                  type: "Security",
                },
                {
                  title: "NEURAL INTERFACE UPDATE",
                  desc: "Improved brain-computer synchronization",
                  date: "2025-01-12",
                  type: "Interface",
                },
                {
                  title: "QUANTUM FIREWALL",
                  desc: "Next-gen protection against cyber threats",
                  date: "2025-01-10",
                  type: "Security",
                },
                {
                  title: "AI ASSISTANT 3.0",
                  desc: "Advanced artificial intelligence integration",
                  date: "2025-01-08",
                  type: "AI",
                },
                {
                  title: "SYSTEM OPTIMIZATION",
                  desc: "Performance improvements across all modules",
                  date: "2025-01-05",
                  type: "Performance",
                },
                {
                  title: "DATA ENCRYPTION 4.0",
                  desc: "Military-grade data protection protocols",
                  date: "2025-01-03",
                  type: "Security",
                },
              ].map((update, index) => (
                <Link href="/events" key={index}>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,204,0.1)] transition-all duration-300 cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs text-secondary font-mono bg-secondary/20 px-2 py-1 rounded">
                        {update.type}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{update.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2 font-mono group-hover:text-secondary transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{update.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/events">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded font-mono font-bold hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-300">
                  VIEW ALL EVENTS
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <ChatWidget/>
    </main>
  )
}
