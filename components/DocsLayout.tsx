"use client";

import { ReactNode, useEffect, useState } from "react";

const sections = [
  {
    id: "overview",
    label: "Overview",
    search: "Building and Testing a Go API with Keploy",
  },
  {
    id: "prerequisites",
    label: "Prerequisites",
    search: "Prerequisites",
  },
  {
    id: "start-postgresql",
    label: "Start PostgreSQL",
    search: "Start PostgreSQL",
  },
  {
    id: "verify-api",
    label: "Verify the API",
    search: "Verify the API",
  },
  {
    id: "record",
    label: "Record with Keploy",
    search: "Record with Keploy",
  },
  {
    id: "test",
    label: "Replay the tests",
    search: "Replay the tests",
  },
  {
    id: "behind-the-scenes",
    label: "Behind the scenes",
    search: "Behind the scenes",
  },
];

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");

  /*
   * Find headings in the MDX page and give them the IDs
   * expected by our sidebar.
   */
  useEffect(() => {
    const main = document.querySelector(".documentation");

    if (!main) return;

    const headings = Array.from(
      main.querySelectorAll("h1, h2, h3")
    ) as HTMLElement[];

    sections.forEach((section) => {
      const heading = headings.find((h) =>
        h.textContent
          ?.toLowerCase()
          .includes(section.search.toLowerCase())
      );

      if (heading) {
        heading.id = section.id;
      }
    });

    /*
     * Overview should point to the first heading.
     */
    if (headings.length > 0) {
      headings[0].id = "overview";
    }

    /*
     * Smooth scrolling.
     */
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href?.startsWith("#")) return;

      const id = href.substring(1);
      const element = document.getElementById(id);

      if (element) {
        event.preventDefault();

        const offset = 90;

        const top =
          element.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });

        window.history.replaceState(null, "", `#${id}`);
      }
    };

    document.addEventListener("click", handleClick);

    /*
     * Detect which section is currently visible.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      document.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  /*
   * Restore dark mode.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("keploy-theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }

    /*
     * Reading progress.
     */
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Toggle dark/light mode.
   */
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

  return (
    <>
      {/* Reading progress */}
      <div
        className="reading-progress"
        style={{
          width: `${progress}%`,
        }}
      />

      {/* Top navigation */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">K</div>

          <div>
            <strong>Keploy</strong>
            <span>Developer Tutorial</span>
          </div>
        </div>

        <div className="top-actions">
          <a
            href="https://github.com/keploy"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={
              dark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main documentation layout */}
      <div className="docs-container">

        {/* LEFT SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-label">
            GO + KEPLOY
          </div>

          <nav>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={
                  activeSection === section.id
                    ? "active"
                    : ""
                }
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="sidebar-card">
            <span>🐰</span>

            <strong>Learning Keploy?</strong>

            <p>
              Follow this tutorial from setup to your
              first automated API test.
            </p>
          </div>
        </aside>

        {/* DOCUMENTATION */}
        <main className="documentation">
          {children}
        </main>

        {/* RIGHT TABLE OF CONTENTS */}
        <aside className="toc">
          <div className="toc-title">
            ON THIS PAGE
          </div>

          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                activeSection === section.id
                  ? "active"
                  : ""
              }
            >
              {section.label}
            </a>
          ))}
        </aside>
      </div>
    </>
  );
}
