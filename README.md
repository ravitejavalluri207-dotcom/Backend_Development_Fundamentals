# Backend Development Fundamentals

## Student Details
- **Name:** Valluri Ravi Teja
- **Registration Number:** 252U1R9166
- **Section:** CSE GEN-AI 2C
- **Course:** Backend Development Fundamentals
- **Institution:** Aurora University
- **Faculty:** Joel Prashanth D
- **GitHub Repository:** [https://github.com/ravitejavalluri207-dotcom/Backend_Development_Fundamentals](https://github.com/ravitejavalluri207-dotcom/Backend_Development_Fundamentals)

---

## Course Overview

This repository contains all laboratory exercises, source code, and documentation for the **Backend Development Fundamentals** course at **Aurora University**. The coursework covers server-side programming using Node.js, Express.js, relational and NoSQL databases, RESTful API architecture, authentication, and backend engineering best practices.

---

## Repository Structure

```text
Backend_Development_Fundamentals/
├── README.md               # Overall course repository README
├── .gitignore              # Repository-level ignore rules
└── BDF LAB-1/              # Lab 1: Node.js and Express Server
    ├── screenshots/        # Output verification screenshots
    │   ├── about.png
    │   ├── error.png
    │   ├── home.png
    │   ├── http-server.png
    │   ├── not-found.png
    │   └── time.png
    ├── .gitignore          # Lab 1 local gitignore
    ├── package.json        # Dependencies and scripts
    ├── package-lock.json   # Dependency lock file
    ├── README.md           # Lab 1 comprehensive documentation
    ├── server-http.js      # Basic HTTP server using built-in http module
    └── server.js           # Express.js REST API server
```

---

## Laboratories

### [Lab 1: Node.js and Express Server](./BDF%20LAB-1/)
- **Objectives:**
  1. Build a basic HTTP web server using Node.js built-in `http` module.
  2. Implement an Express.js REST API server with custom routing.
  3. Handle HTTP status codes (`200 OK`, `404 Not Found`).
  4. Implement dynamic port configuration via `process.env.PORT || 3000`.
  5. Establish Git hygiene by excluding `node_modules/` and environment variables.
- **Key Files:** [`server.js`](./BDF%20LAB-1/server.js), [`server-http.js`](./BDF%20LAB-1/server-http.js), [`README.md`](./BDF%20LAB-1/README.md).

---

## Setup & Execution

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Clone the Repository
```bash
git clone https://github.com/ravitejavalluri207-dotcom/Backend_Development_Fundamentals.git
cd Backend_Development_Fundamentals
```

### Running a Specific Lab
Navigate to any lab directory and follow its respective instructions:
```bash
cd "BDF LAB-1"
npm install
npm start
```
