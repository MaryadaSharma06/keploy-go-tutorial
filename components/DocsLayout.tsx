"use client";

import { ReactNode, useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "start-postgresql", label: "Start PostgreSQL" },
  { id: "verify-api", label: "Verify the API" },
  { id: "record", label: "Record with Keploy" },
  { id: "test", label: "Replay the tests" },
  { id: "inspect", label: "Inspect artifacts" },
  { id: "coverage", label: "Coverage report" },
  { id: "behind-the-scenes", label: "Behind the scenes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "complete", label: "Tutorial complete" },
];

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [showHelp, setShowHelp] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("keploy-theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);

    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -65% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;

    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("keploy-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("keploy-theme", "light");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Reading progress */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
      />

      {/* Header */}
      <header className="topbar">
        <a href="#overview" className="brand">
          <div className="brand-icon">K</div>

          <div className="brand-text">
            <strong>Keploy</strong>
            <span>Developer Tutorial</span>
          </div>
        </a>

        <div className="top-actions">
          <span className="status-pill">
            <span className="status-dot" />
            Tutorial
          </span>

          <a
            href="https://github.com/keploy"
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            GitHub ↗
          </a>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="docs-container">
        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-label">GO + KEPLOY</div>

          <nav className="sidebar-nav">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={
                  activeSection === section.id ? "active" : ""
                }
              >
                <span>{section.label}</span>

                {activeSection === section.id && (
                  <span className="active-arrow">→</span>
                )}
              </a>
            ))}
          </nav>

          <div className="sidebar-card">
            <div className="sidebar-card-icon">🚀</div>

            <strong>Learning Keploy?</strong>

            <p>
              Follow this tutorial from setup to your first
              automated API test.
            </p>

            <button onClick={() => setShowHelp(true)}>
              Quick help →
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="documentation">
          {/* Hero */}
          <section className="tutorial-hero" id="overview">
            <div className="hero-eyebrow">
              <span className="hero-dot" />
              GO + KEPLOY QUICKSTART
            </div>

            <h1>Building and Testing a Go API with Keploy</h1>

            <p className="hero-description">
              Learn how to capture real API interactions from a Go
              application and turn them into automated, reusable
              tests with Keploy.
            </p>

            <div className="tech-badges">
              <span>Go</span>
              <span>PostgreSQL</span>
              <span>Docker</span>
              <span>Keploy</span>
            </div>
          </section>

          {/* Workflow */}
          {showWorkflow && (
            <section className="workflow-card">
              <div className="workflow-header">
                <div>
                  <span className="section-kicker">
                    HOW IT WORKS
                  </span>

                  <h2>From API request to automated test</h2>

                  <p>
                    Keploy observes real API interactions and
                    converts them into repeatable test cases and
                    mocks.
                  </p>
                </div>

                <button
                  className="workflow-close"
                  onClick={() => setShowWorkflow(false)}
                  title="Hide workflow"
                >
                  ×
                </button>
              </div>

              <div className="workflow">
                <div className="workflow-step">
                  <div className="workflow-icon">⚙️</div>
                  <strong>Go API</strong>
                  <span>Your application</span>
                </div>

                <div className="workflow-arrow">→</div>

                <div className="workflow-step">
                  <div className="workflow-icon">👀</div>
                  <strong>Keploy</strong>
                  <span>Records traffic</span>
                </div>

                <div className="workflow-arrow">→</div>

                <div className="workflow-step">
                  <div className="workflow-icon">🧪</div>
                  <strong>Test Case</strong>
                  <span>Request + response</span>
                </div>

                <div className="workflow-arrow">→</div>

                <div className="workflow-step">
                  <div className="workflow-icon">🔁</div>
                  <strong>Replay</strong>
                  <span>Automated testing</span>
                </div>
              </div>
            </section>
          )}

          {/* Actual MDX content */}
          {children}
        </main>

        {/* RIGHT TOC */}
        <aside className="toc">
          <div className="toc-title">ON THIS PAGE</div>

          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                activeSection === section.id ? "active" : ""
              }
            >
              {section.label}
            </a>
          ))}

          <div className="toc-help">
            <span>💡</span>

            <div>
              <strong>Tip</strong>
              <p>
                You can use the sidebar to jump between tutorial
                sections.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Help popup */}
      {showHelp && (
        <div
          className="modal-backdrop"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="help-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowHelp(false)}
            >
              ×
            </button>

            <div className="modal-icon">🚀</div>

            <h2>How to use this tutorial</h2>

            <p>
              Follow the steps from top to bottom. Each section
              contains the commands you need, what they do, and
              why they matter.
            </p>

            <div className="modal-item">
              <span>01</span>
              <div>
                <strong>Set up</strong>
                <p>Start PostgreSQL and the Go application.</p>
              </div>
            </div>

            <div className="modal-item">
              <span>02</span>
              <div>
                <strong>Record</strong>
                <p>
                  Send real requests while Keploy records them.
                </p>
              </div>
            </div>

            <div className="modal-item">
              <span>03</span>
              <div>
                <strong>Replay</strong>
                <p>
                  Run the generated tests without manually
                  rewriting them.
                </p>
              </div>
            </div>

            <button
              className="modal-primary"
              onClick={() => setShowHelp(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Back to top */}
      {progress > 20 && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          title="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
