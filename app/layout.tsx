import type { Metadata } from "next";
import "./globals.css";
import DocsLayout from "../components/DocsLayout";

export const metadata: Metadata = {
  title: "Building and Testing a Go API with Keploy",
  description:
    "A beginner-friendly tutorial for recording and replaying Go API interactions with Keploy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DocsLayout>{children}</DocsLayout>
      </body>
    </html>
  );
}
