# Building and Testing a Go API with Keploy

A documentation-style interactive tutorial that explains how to test a Go API using Keploy.

The tutorial walks through recording real API interactions, generating test cases and PostgreSQL mocks, replaying those tests, and understanding what Keploy is doing behind the scenes.

## 🚀 Live Demo

**Tutorial:** https://keploy-go-tutorial-one.vercel.app/

## 📖 About the Project

This project was created as a hands-on tutorial based on the Keploy Go quickstart workflow.

The tutorial uses a Go URL-shortener API backed by PostgreSQL and explains how Keploy can capture real API interactions and convert them into reusable automated test cases.

Instead of simply listing commands, the tutorial explains **what each step does and why it is useful** for a Go developer.

## ✨ What You'll Learn

The tutorial covers:

- Setting up the Go sample application
- Starting PostgreSQL with Docker
- Verifying that the API is working
- Recording API interactions with Keploy
- Generating HTTP test cases
- Capturing PostgreSQL mocks
- Replaying recorded tests
- Inspecting generated Keploy artifacts
- Understanding the coverage report
- Understanding how Keploy works behind the scenes
- Troubleshooting common setup issues

## 🧩 Tutorial Sections

The documentation is organized into the following sections:

1. **Overview**
2. **Prerequisites**
3. **Start PostgreSQL**
4. **Verify the API**
5. **Record with Keploy**
6. **Replay the Tests**
7. **Inspect Generated Artifacts**
8. **Understand the Coverage Report**
9. **Behind the Scenes**
10. **Troubleshooting**
11. **Tutorial Complete**

## 🛠️ Tech Stack

### Application

- Go
- Echo
- PostgreSQL
- Docker

### Testing

- Keploy
- HTTP API testing
- PostgreSQL mocking
- Test replay

### Documentation Website

- Next.js
- React
- MDX
- JavaScript
- CSS

### Deployment

- Vercel
- GitHub

## 🎨 UI Features

The tutorial is designed as a documentation-style learning experience with:

- Responsive documentation layout
- Sidebar navigation
- Dark/light mode
- Syntax-highlighted code blocks
- Step-by-step sections
- Terminal-style command blocks
- Information and success callouts
- Interactive visual diagrams
- Clear explanations of each Keploy workflow
- Responsive content layout

Custom MDX components are used to make the tutorial more readable and interactive.

## 📁 Project Structure

```text
keploy-go-tutorial/
│
├── app/
│   ├── page.mdx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── DocsLayout.tsx
│   ├── MdxClient.jsx
│   └── ThemeToggle.jsx
│
├── public/
│
├── mdx-components.js
├── next.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
