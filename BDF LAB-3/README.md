# Lab 3 – Advanced REST API with Query Parameters, Validation and Status Codes

## Student Details

| Field           | Details               |
|-----------------|-----------------------|
| Name            | Valluri Ravi Teja     |
| Reg. Number     | 252U1R9166            |
| Section         | CSE GEN-AI 2C         |
| Institution     | Aurora University     |
| Faculty         | Joel Prashanth D      |

---

## Live Deployment URL

> *(To be updated after Render deployment)*

---

## Objective

Build an advanced REST API using Node.js, Express.js and SQLite that supports:

- Full CRUD operations on a `book` table
- Query parameters for search, sorting, pagination and price filtering
- Input validation with proper HTTP status codes
- Parameterized SQL queries to prevent SQL injection

---

## Technologies Used

| Technology | Purpose                    |
|------------|----------------------------|
| Node.js    | JavaScript runtime         |
| Express.js | HTTP server and routing    |
| SQLite3    | Embedded database          |
| sqlite     | Promise-based SQLite wrapper |
| nodemon    | Auto-restart during development |

---

## Project Structure

```
BDF LAB-3/
├── server.js          ← Express application with all 5 APIs
├── seed.sql           ← Database schema and sample data
├── database.db        ← SQLite database (auto-created from seed.sql)
├── package.json       ← Project metadata and scripts
├── package-lock.json  ← Dependency lock file
└── README.md          ← This file
```

---

## Installation and Running

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database (first time only)

The `database.db` file is already included. If you need to recreate it, run `seed.sql` using any SQLite tool or the SQLite3 CLI:

```bash
sqlite3 database.db < seed.sql
```

### 3. Start the server

```bash
npm start
```

Server runs at: `http://localhost:3000/`

### 4. Development mode (auto-restart)

```bash
npm run dev
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS book (
    id     INTEGER PRIMARY KEY AUTOINCREMENT,
    title  TEXT    NOT NULL,
    author TEXT    NOT NULL,
    price  INTEGER NOT NULL,
    pages  INTEGER NOT NULL
);
```

### Sample Data (from seed.sql)

| id | title                        | author             | price | pages |
|----|------------------------------|--------------------|-------|-------|
| 1  | JavaScript for Beginners     | Mark Myers         | 350   | 280   |
| 2  | Clean Code Basics            | Daniel Green       | 480   | 320   |
| 3  | Computer Organization        | William Stallings  | 620   | 720   |
| 4  | Practical SQL                | Anthony DeBarros   | 450   | 390   |
| 5  | Python Projects              | Laura Cassell      | 390   | 300   |
| 6  | Fundamentals of Networking   | James Kurose       | 580   | 650   |
| 7  | Learning Node.js             | Ethan Brown        | 520   | 410   |
| 8  | C++ Programming Guide        | Stephen Prata      | 550   | 850   |
| 9  | Basics of Cloud Computing    | Thomas Erl         | 470   | 360   |
| 10 | Introduction to Data Science | Joel Grus          | 490   | 340   |

---

## API Endpoints

| Method | Endpoint          | Description              | Success Code |
|--------|-------------------|--------------------------|--------------|
| GET    | /books/           | Get all books (filtered) | 200          |
| GET    | /books/:bookId/   | Get a single book        | 200          |
| POST   | /books/           | Add a new book           | 201          |
| PUT    | /books/:bookId/   | Update a book            | 200          |
| DELETE | /books/:bookId/   | Delete a book            | 200          |

---

## Query Parameters — GET /books/

| Parameter  | Default | Description                                              |
|------------|---------|----------------------------------------------------------|
| search_q   | `""`    | Search books by title (partial match)                    |
| order_by   | `id`    | Column to sort by: `id`, `title`, `author`, `price`, `pages` |
| order      | `ASC`   | Sort direction: `ASC` or `DESC`                          |
| limit      | `10`    | Number of results to return                              |
| offset     | `0`     | Number of results to skip                                |
| min_price  | `0`     | Show books with price greater than or equal to this      |
| max_price  | `999999`| Show books with price less than or equal to this         |

### Example Request

```
GET /books/?search_q=python&order_by=price&order=DESC&limit=5&offset=0&min_price=300&max_price=600
```

---

## Sample Requests and Responses

### GET /books/ — All Books

```
GET http://localhost:3000/books/
```

Response `200`:
```json
[
  { "id": 1, "title": "JavaScript for Beginners", "author": "Mark Myers", "price": 350, "pages": 280 },
  { "id": 2, "title": "Clean Code Basics", "author": "Daniel Green", "price": 480, "pages": 320 }
]
```

---

### GET /books/1/ — Single Book

Response `200`:
```json
{ "id": 1, "title": "JavaScript for Beginners", "author": "Mark Myers", "price": 350, "pages": 280 }
```

Response `404`:
```text
Book Not Found
```

---

### POST /books/ — Add a Book

Request body:
```json
{ "title": "Learning Python", "author": "Mark Lutz", "price": 450, "pages": 500 }
```

Response `201`:
```json
{ "bookId": 11 }
```

Response `400` (missing or invalid fields):
```text
Invalid Request
```

---

### PUT /books/1/ — Update a Book

Request body:
```json
{ "title": "JavaScript Advanced", "author": "Mark Myers", "price": 400, "pages": 300 }
```

Response `200`:
```text
Book Updated Successfully
```

---

### DELETE /books/1/ — Delete a Book

Response `200`:
```text
Book Deleted Successfully
```

---

## Validation Rules

### POST /books/ and PUT /books/:bookId/

| Field  | Rule                              |
|--------|-----------------------------------|
| title  | Required, must not be empty       |
| author | Required, must not be empty       |
| price  | Required, must be a numeric value |
| pages  | Optional                          |

### GET /books/ Query Parameters

| Parameter | Validation                                              |
|-----------|---------------------------------------------------------|
| order_by  | Must be one of: `id`, `title`, `author`, `price`, `pages` |
| order     | Must be `ASC` or `DESC`                                 |

---

## HTTP Status Codes

| Code | Meaning                        |
|------|--------------------------------|
| 200  | Success (GET, PUT, DELETE)     |
| 201  | Created (POST)                 |
| 400  | Bad Request (invalid input)    |
| 404  | Not Found (book does not exist)|

---

## Postman / Thunder Client Testing Checklist

### CRUD

| # | Method | URL              | Body                                                      | Expected |
|---|--------|------------------|-----------------------------------------------------------|----------|
| 1 | GET    | /books/          | —                                                         | 200      |
| 2 | GET    | /books/1/        | —                                                         | 200      |
| 3 | POST   | /books/          | `{"title":"T","author":"A","price":100,"pages":50}`       | 201      |
| 4 | PUT    | /books/1/        | `{"title":"New","author":"Auth","price":200,"pages":60}`  | 200      |
| 5 | DELETE | /books/11/       | —                                                         | 200      |

### Search and Sorting

| # | URL                                    | Expected |
|---|----------------------------------------|----------|
| 6 | /books/?search_q=python                | 200      |
| 7 | /books/?order_by=price&order=ASC       | 200      |
| 8 | /books/?order_by=price&order=DESC      | 200      |

### Pagination

| #  | URL                             | Expected |
|----|---------------------------------|----------|
| 9  | /books/?limit=3&offset=0        | 200      |
| 10 | /books/?limit=3&offset=3        | 200      |

### Price Filters

| #  | URL                                    | Expected |
|----|----------------------------------------|----------|
| 11 | /books/?min_price=400                  | 200      |
| 12 | /books/?max_price=500                  | 200      |
| 13 | /books/?min_price=400&max_price=550    | 200      |

### Combined

| #  | URL                                                                                           | Expected |
|----|-----------------------------------------------------------------------------------------------|----------|
| 14 | /books/?search_q=python&order_by=price&order=DESC&limit=5&offset=0&min_price=300&max_price=600 | 200     |

### Validation — 400 Bad Request

| #  | Method | URL       | Body                                       | Expected |
|----|--------|-----------|--------------------------------------------|----------|
| 15 | POST   | /books/   | `{"author":"A","price":100}`               | 400      |
| 16 | POST   | /books/   | `{"title":"T","price":100}`                | 400      |
| 17 | POST   | /books/   | `{"title":"T","author":"A","price":"abc"}` | 400      |
| 18 | GET    | /books/?order_by=xyz | —                               | 400      |
| 19 | GET    | /books/?order=RANDOM | —                               | 400      |

### Not Found — 404

| #  | Method | URL             | Expected |
|----|--------|-----------------|----------|
| 20 | GET    | /books/9999/    | 404      |
| 21 | PUT    | /books/9999/    | 404      |
| 22 | DELETE | /books/9999/    | 404      |

---

## Debugging Problems and Solutions

### 1. EADDRINUSE — Port already in use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Cause:** Another process is already running on port 3000.

**Fix:**
```bash
# Windows — find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```
Or change the port in `server.js`:
```js
app.listen(3001, ...)
```

---

### 2. Wrong import path

**Error:**
```
Error: Cannot find module './databse'
```
**Cause:** Typo in `require()` path.

**Fix:** Double-check the path:
```js
// Wrong
const {open} = require('sqlit')

// Correct
const {open} = require('sqlite')
```

---

### 3. SQLite table-name typo

**Error:**
```
SQLITE_ERROR: no such table: books
```
**Cause:** Query uses `books` but the table was created as `book`.

**Fix:** Make sure the table name in every query matches exactly:
```js
// Wrong
await db.all('SELECT * FROM books;')

// Correct
await db.all('SELECT * FROM book;')
```

---

### 4. Missing await

**Error:** Response returns `undefined` or an unresolved Promise.

**Cause:** Forgot `await` before a database call.

**Fix:**
```js
// Wrong
const book = db.get('SELECT * FROM book WHERE id = ?;', [bookId])

// Correct
const book = await db.get('SELECT * FROM book WHERE id = ?;', [bookId])
```

---

## Render Deployment

### SQLite Limitation on Render

Render's free tier uses an **ephemeral file system** — the `database.db` file resets on every restart. Any data added after deployment is lost. For this lab, that is acceptable since we only need to demonstrate the API.

### Deployment Steps

1. Push code to GitHub (`main` branch)
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect the `Backend_Development_Fundamentals` repository

| Setting        | Value        |
|----------------|--------------|
| Branch         | main         |
| Root Directory | BDF LAB-3    |
| Build Command  | npm install  |
| Start Command  | npm start    |

4. Click **Deploy**
5. Copy the live URL and paste it at the top of this README

---

## GitHub Push Commands

```bash
git add "BDF LAB-3/" .gitignore
git commit -m "Add Lab 3: Advanced REST API with query params, validation and status codes"
git push
```

---

## Conclusion

Lab 3 builds on Lab 2 by adding advanced query parameters, input validation, proper HTTP status codes, and SQL injection prevention using parameterized queries — all written in a simple, beginner-friendly Express and SQLite style.
