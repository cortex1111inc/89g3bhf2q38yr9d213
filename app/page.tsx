"use client";

import { useState, useEffect } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) {
      setError(true);
      setTimeout(() => setError(false), 1200);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Syne', sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #000;
          color: #fff;
          overflow-x: hidden;
          overflow-y: auto;
          min-height: 100vh;
        }

        .font-syne { font-family: 'Syne', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }

        /* GRID */
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
        }

        /* SOFT LIGHT */
        .spotlight {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* REMOVE HEAVY BLOBS */
        .orb { display: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up-0 { animation: fadeUp 0.9s ease both; }
        .fade-up-1 { animation: fadeUp 0.9s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.9s 0.15s ease both; }

        /* BADGE */
        .badge-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
        }

        /* TITLE */
        .wordmark {
          font-size: clamp(40px, 14vw, 110px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.95;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .wordmark-accent {
          color: #aaa;
          -webkit-text-fill-color: #aaa;
        }

        /* DIVIDER */
        .divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        }

        /* BUTTON */
        .notify-btn {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 8px;
          padding: 12px 18px;
          font-weight: 600;
          cursor: pointer;
        }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 520px) {
          .spotlight {
            width: 260px;
            height: 260px;
          }
        }

        @media (max-width: 360px) {
          .wordmark {
            font-size: 34px;
          }
        }
      `}</style>

      {/* Background */}
      <div className="grid-bg" />
      <div className="spotlight" />

      {/* Main */}
      <main
        className="fade-up-0"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "1.5rem 1rem",
          maxWidth: 800,
          width: "100%",
          minHeight: "100vh",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div
          className="fade-up-1 font-mono-dm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 100,
            padding: "5px 14px",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "#fff",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          <div className="badge-dot" />
        Finding our pace
        </div>

        {/* Title */}
        <h1 className="wordmark fade-up-2" style={{ marginBottom: "1.2rem" }}>
          Launching <span className="wordmark-accent">Soon</span>
        </h1>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: "2.5rem" }} />
      </main>
    </>
  );
}