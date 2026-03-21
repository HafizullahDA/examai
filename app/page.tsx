export default function Home() {
  return (
    <main style={{
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#0F1F3D",
      color: "#ffffff",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
    }}>

      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(181,137,42,0.3)",
        position: "sticky",
        top: 0,
        backgroundColor: "#0F1F3D",
        zIndex: 100,
      }}>
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#C8A44A", letterSpacing: "2px" }}>
          ExamAI
        </div>
        <nav style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <a href="#features" style={{ color: "#ccc", textDecoration: "none" }}>Features</a>
          <a href="#pricing" style={{ color: "#ccc", textDecoration: "none" }}>Pricing</a>
          <a href="#" style={{
            backgroundColor: "#C8A44A", color: "#0F1F3D",
            padding: "10px 24px", borderRadius: "6px",
            fontWeight: "bold", textDecoration: "none",
          }}>Start Free</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 40px 80px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{
          display: "inline-block",
          backgroundColor: "rgba(200,164,74,0.15)",
          border: "1px solid #C8A44A",
          color: "#C8A44A",
          padding: "6px 18px", borderRadius: "20px",
          fontSize: "13px", marginBottom: "30px", letterSpacing: "1px",
        }}>
          UPSC · SSC CGL · AI-POWERED
        </div>
        <h1 style={{ fontSize: "52px", fontWeight: "800", lineHeight: "1.2", marginBottom: "24px" }}>
          Turn Your Notes Into{" "}
          <span style={{ color: "#C8A44A" }}>Exam-Ready MCQs</span>{" "}
          in 30 Seconds
        </h1>
        <p style={{ fontSize: "20px", color: "#aaaaaa", marginBottom: "40px", lineHeight: "1.7" }}>
          Upload your notes. Select UPSC or SSC CGL.
          Get exam-style questions instantly with explanations and topic tags.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#" style={{
            backgroundColor: "#C8A44A", color: "#0F1F3D",
            padding: "16px 36px", borderRadius: "8px",
            fontWeight: "bold", fontSize: "18px", textDecoration: "none",
          }}>Start Free — No Card Needed</a>
          <a href="#features" style={{
            border: "2px solid #C8A44A", color: "#C8A44A",
            padding: "16px 36px", borderRadius: "8px",
            fontWeight: "bold", fontSize: "18px", textDecoration: "none",
          }}>See Features</a>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "60px", marginTop: "70px", flexWrap: "wrap" }}>
          {[
            { num: "10,000+", label: "Questions Generated" },
            { num: "UPSC + SSC", label: "Exams Covered" },
            { num: "94%", label: "Accuracy Rate" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#C8A44A" }}>{stat.num}</div>
              <div style={{ fontSize: "14px", color: "#888", marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "80px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "60px" }}>How It Works</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { step: "01", title: "Upload Your Notes", desc: "PDF, image, typed or handwritten — any format works." },
            { step: "02", title: "Select Your Exam", desc: "Choose UPSC or SSC CGL. AI calibrates the question style automatically." },
            { step: "03", title: "Practice & Improve", desc: "Get exam-style MCQs with explanations. Track weak topics. Revise smarter." },
          ].map((item) => (
            <div key={item.step} style={{
              backgroundColor: "#0F1F3D",
              border: "1px solid rgba(200,164,74,0.3)",
              borderRadius: "12px", padding: "40px 30px", width: "280px", textAlign: "left",
            }}>
              <div style={{ fontSize: "48px", fontWeight: "900", color: "rgba(200,164,74,0.2)", marginBottom: "16px" }}>{item.step}</div>
              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#C8A44A", marginBottom: "12px" }}>{item.title}</h3>
              <p style={{ color: "#aaa", lineHeight: "1.6", fontSize: "15px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "60px" }}>Everything You Need to Clear Your Exam</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px", maxWidth: "1000px", margin: "0 auto",
        }}>
          {[
            { icon: "📄", title: "Notes to MCQ Engine", desc: "Upload any notes. Get UPSC or SSC-style questions in 30 seconds.", badge: "CORE" },
            { icon: "📊", title: "PYQ Pattern Engine", desc: "15 years of past papers analysed. Know exactly what to study next.", badge: "UNIQUE" },
            { icon: "⚡", title: "Memory Simulator", desc: "30-second recall drills. Train your brain for exam day pressure.", badge: "UNIQUE" },
            { icon: "🎯", title: "Weak Zone Rebuilder", desc: "AI detects weak topics and auto-generates targeted practice.", badge: "HIGH VALUE" },
            { icon: "📰", title: "Daily Current Affairs", desc: "10 questions every morning linked to today's PIB and newspapers.", badge: "DAILY" },
            { icon: "📚", title: "Mistake Book", desc: "Wrong answers resurface at the right time using spaced repetition.", badge: "SMART" },
          ].map((f) => (
            <div key={f.title} style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(200,164,74,0.2)",
              borderRadius: "12px", padding: "30px", textAlign: "left",
            }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
              <div style={{
                display: "inline-block", fontSize: "11px", color: "#C8A44A",
                border: "1px solid #C8A44A", borderRadius: "4px",
                padding: "2px 8px", marginBottom: "10px", letterSpacing: "1px",
              }}>{f.badge}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ backgroundColor: "rgba(255,255,255,0.03)", padding: "80px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "60px" }}>Simple Pricing</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { plan: "Free", price: "₹0", features: ["5 questions/day", "1 upload/week", "Basic quiz mode"], highlight: false },
            { plan: "Student", price: "₹149", features: ["Unlimited questions", "10 uploads/day", "Analytics dashboard", "Current Affairs"], highlight: true },
            { plan: "Pro", price: "₹299", features: ["Everything in Student", "AI Tutor", "Hindi/Urdu support", "PYQ Engine + Memory Sim"], highlight: false },
          ].map((p) => (
            <div key={p.plan} style={{
              backgroundColor: p.highlight ? "rgba(200,164,74,0.08)" : "#0F1F3D",
              border: p.highlight ? "2px solid #C8A44A" : "1px solid rgba(200,164,74,0.2)",
              borderRadius: "12px", padding: "40px 30px", width: "240px",
              boxShadow: p.highlight ? "0 0 30px rgba(200,164,74,0.2)" : "none",
            }}>
              {p.highlight && (
                <div style={{
                  backgroundColor: "#C8A44A", color: "#0F1F3D",
                  fontSize: "11px", fontWeight: "bold",
                  padding: "4px 12px", borderRadius: "20px",
                  display: "inline-block", marginBottom: "16px", letterSpacing: "1px",
                }}>MOST POPULAR</div>
              )}
              <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#C8A44A", marginBottom: "8px" }}>{p.plan}</h3>
              <div style={{ fontSize: "42px", fontWeight: "900", marginBottom: "4px" }}>{p.price}</div>
              <div style={{ color: "#888", fontSize: "14px", marginBottom: "28px" }}>/month</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", textAlign: "left" }}>
                {p.features.map((f) => (
                  <li key={f} style={{ color: "#ccc", fontSize: "14px", marginBottom: "10px", paddingLeft: "20px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#C8A44A" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" style={{
                display: "block",
                backgroundColor: p.highlight ? "#C8A44A" : "transparent",
                color: p.highlight ? "#0F1F3D" : "#C8A44A",
                border: "2px solid #C8A44A",
                padding: "12px", borderRadius: "8px",
                fontWeight: "bold", textDecoration: "none", fontSize: "15px",
              }}>
                {p.plan === "Free" ? "Get Started" : `Subscribe ${p.price}/mo`}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(200,164,74,0.2)",
        padding: "40px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#C8A44A", marginBottom: "12px" }}>
          ExamAI
        </div>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>
          AI-powered exam preparation for UPSC and SSC CGL aspirants across India.
        </p>
        <p style={{ color: "#444", fontSize: "13px" }}>
          © 2025 ExamAI. All rights reserved.
        </p>
      </footer>

    </main>
  );
}