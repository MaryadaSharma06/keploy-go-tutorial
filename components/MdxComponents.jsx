"use client";

import { useState } from "react";

export function Callout({ type = "info", title, children }) {
  const config = {
    info: {
      icon: "ℹ️",
      label: "Info",
    },
    tip: {
      icon: "💡",
      label: "Tip",
    },
    warning: {
      icon: "⚠️",
      label: "Warning",
    },
    success: {
      icon: "✅",
      label: "Success",
    },
  };

  const current = config[type] || config.info;

  return (
    <div className={`mdx-callout mdx-callout-${type}`}>
      <div className="mdx-callout-header">
        <span className="mdx-callout-icon">{current.icon}</span>
        <strong>{title || current.label}</strong>
      </div>

      <div className="mdx-callout-content">{children}</div>
    </div>
  );
}

export function Step({ number, title, children }) {
  return (
    <div className="mdx-step">
      <div className="mdx-step-number">{number}</div>

      <div className="mdx-step-content">
        {title && <h3>{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Command({ children, title = "Terminal" }) {
  const [copied, setCopied] = useState(false);

  const text = String(children).trim();

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mdx-command">
      <div className="mdx-command-header">
        <span>{title}</span>

        <button onClick={copyCommand}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}

export function InfoCard({ title, icon = "✨", children }) {
  return (
    <div className="mdx-info-card">
      <div className="mdx-info-icon">{icon}</div>

      <div>
        {title && <strong>{title}</strong>}
        <div className="mdx-info-content">{children}</div>
      </div>
    </div>
  );
}
