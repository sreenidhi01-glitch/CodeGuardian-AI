# 🛡️ CodeGuardian AI

<p align="center">

AI-Powered Secure Code Review Assistant

Detect • Analyze • Secure • Report

</p>

---

## 🚀 Live Demo

### 🌐 Frontend (Vercel)

https://code-guardian-ai-wine.vercel.app/

### ⚡ Backend API (Render)

https://codeguardian-ai-mr3r.onrender.com

---

## 📌 Overview

CodeGuardian AI is an AI-powered secure code review assistant that automatically scans source code for security vulnerabilities, performs static analysis, detects exposed secrets, reviews GitHub Pull Requests, generates AI-powered remediation suggestions, and creates professional PDF security reports.

The platform is designed to help developers identify security risks early in the development lifecycle and improve code quality before deployment.

---

# ✨ Features

## 🔍 Automated Security Analysis

Detects multiple security vulnerabilities including:

- Hardcoded Passwords
- API Keys
- GitHub Tokens
- AWS Access Keys
- Command Injection
- Dangerous eval()
- Unsafe Deserialization
- Weak Hashing (MD5)
- Debug Mode Enabled
- HTTP URLs
- Hardcoded Database URLs
- Disabled SSL Verification
- Wildcard Host Binding

---

## 🤖 AI Security Advisor

For every detected vulnerability CodeGuardian AI provides:

- Why the issue is dangerous
- Secure coding recommendations
- AI-generated secure code
- Best practices
- Fix explanation
- Professional remediation guidance

---

## 📊 Security Dashboard

Interactive dashboard displaying:

- Security Score
- Risk Level
- Total Findings
- AI Review Summary
- Detailed Vulnerability Reports

---

## 🔄 GitHub Pull Request Review

Analyze GitHub Pull Requests automatically by:

- Fetching PR files
- Running security analysis
- Reviewing code quality
- Generating AI review summaries

---

## 📄 PDF Report Generator

Generate professional security reports containing:

- Security Score
- Risk Assessment
- Detailed Findings
- AI Recommendations
- Secure Code Examples
- Best Practices

---

# 🏗️ System Architecture

```
                  React + TypeScript
                          │
                          │
                      Axios API
                          │
                          ▼
                 FastAPI Backend Server
                          │
 ┌──────────────┬──────────────┬──────────────┬──────────────┐
 │              │              │              │
 ▼              ▼              ▼              ▼
Secret      Static        Dependency     Architecture
Scanner     Analysis       Scanner         Scanner
 │              │              │              │
 └──────────────┴──────────────┴──────────────┘
                          │
                    Risk Engine
                          │
                 AI Security Advisor
                          │
        ┌─────────────────┴──────────────────┐
        ▼                                    ▼
 GitHub PR Review                   PDF Report Generator
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Icons

---

## Backend

- FastAPI
- Python
- Uvicorn

---

## AI Components

- AI Security Advisor
- AI Secure Fix Generator
- AI Pull Request Reviewer

---

## Security Engine

- Secret Scanner
- Static Analysis
- Dependency Scanner
- Architecture Scanner
- Risk Engine

---

## GitHub Integration

- PyGithub

---

## Report Generation

- ReportLab

---

# 📂 Project Structure

```
CodeGuardian-AI

├── backend
│   ├── ai
│   ├── github
│   ├── models
│   ├── reports
│   ├── scanners
│   ├── services
│   └── main.py
│
├── frontend
│   ├── components
│   ├── services
│   ├── assets
│   └── App.tsx
│
├── README.md
└── requirements.txt
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sreenidhi01-glitch/CodeGuardian-AI.git

cd CodeGuardian-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```
---

# 👨‍💻 Developer

## Sree Nidhi

**B.Tech – Computer Science & Engineering**

AI • Machine Learning • Cybersecurity • Generative AI

---

## 🔗 Links

### GitHub Repository

https://github.com/sreenidhi01-glitch/CodeGuardian-AI

### Live Application

https://code-guardian-ai-wine.vercel.app/

### Backend API

https://codeguardian-ai-mr3r.onrender.com

---

# 🌟 Project Highlights

✅ AI-Powered Secure Code Review

✅ GitHub Pull Request Analysis

✅ Automated Vulnerability Detection

✅ AI Generated Secure Fixes

✅ Interactive Security Dashboard

✅ Professional PDF Security Reports

✅ Modern React + FastAPI Architecture

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational, research, and demonstration purposes.

© 2026 Sree Nidhi. All Rights Reserved.