import React from "react";

function Callout({ type = "info", title, children }) {
  const styles = {
    info: {
      background: "#f5f3ff",
      border: "#8b5cf6",
      icon: "💡",
    },
    success: {
      background: "#f0fdf4",
      border: "#22c55e",
      icon: "✅",
    },
    warning: {
      background: "#fffbeb",
      border: "#f59e0b",
      icon: "⚠️",
    },
    error: {
      background: "#fef2f2",
      border: "#ef4444",
      icon: "❌",
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div
      style={{
        margin: "24px 0",
        padding: "18px 20px",
        background: style.background,
        borderLeft: `4px solid ${style.border}`,
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: "6px",
          color: "#171717",
        }}
      >
        {style.icon} {title}
      </div>

      <div style={{ color: "#525252", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function Command({ title = "Terminal", children }) {
  return (
    <div
      style={{
        margin: "20px 0",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          background: "#1e293b",
          color: "#cbd5e1",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <div
        style={{
          padding: "16px",
          color: "#f8fafc",
          overflowX: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#7c3aed",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {number}
        </div>

        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "#171717",
          }}
        >
          {title}
        </h3>
      </div>

      <div style={{ lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function InfoCard({ title, icon = "💡", children }) {
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "20px",
        border: "1px solid #e9d5ff",
        borderRadius: "14px",
        background: "#faf5ff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "8px",
          fontWeight: 700,
          color: "#6d28d9",
        }}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div style={{ color: "#525252", lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function Diagram({ title, items = [] }) {
  return (
    <div
      style={{
        margin: "32px 0",
        padding: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        background: "#fafafa",
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {title}
        </h3>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                minWidth: "150px",
                padding: "18px",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  fontWeight: 700,
                  color: "#171717",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "13px",
                  color: "#737373",
                }}
              >
                {item.text}
              </div>
            </div>

            {index < items.length - 1 && (
              <div
                style={{
                  fontSize: "24px",
                  color: "#7c3aed",
                  fontWeight: 700,
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function useMDXComponents(components) {
  return {
    ...components,
    Callout,
    Command,
    Diagram,
    InfoCard,
    Step,
  };
}
