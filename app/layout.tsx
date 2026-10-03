import type { Metadata } from "next";
import "./globals.css";
import DocsLayout from "@/components/DocsLayout";

export const metadata: Metadata = {
  title: "Keploy Go API Tutorial",
  description: "Building and Testing a Go API with Keploy",
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
