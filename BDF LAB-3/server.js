const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'database.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

// Get Books API
app.get('/books/', async (request, response) => {
  const {
    search_q = '',
    order_by = 'id',
    order = 'ASC',
    limit = 10,
    offset = 0,
    min_price = 0,
    max_price = 999999,
  } = request.query

  const allowedOrderBy = ['id', 'title', 'author', 'price', 'pages']
  const allowedOrder = ['ASC', 'DESC']

  if (!allowedOrderBy.includes(order_by) || !allowedOrder.includes(order.toUpperCase())) {
    response.status(400)
    response.send('Invalid query parameters')
    return
  }

  const getBooksQuery = `
    SELECT
      *
    FROM
      book
    WHERE
      title LIKE ?
      AND price >= ?
      AND price <= ?
    ORDER BY
      ${order_by} ${order.toUpperCase()}
    LIMIT ? OFFSET ?;`

  const booksArray = await db.all(getBooksQuery, [
    `%${search_q}%`,
    min_price,
    max_price,
    limit,
    offset,
  ])
  response.send(booksArray)
})

// Get Book API
app.get('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params
  const getBookQuery = `
    SELECT
      *
    FROM
      book
    WHERE
      id = ?;`
  const book = await db.get(getBookQuery, [bookId])
  if (book === undefined) {
    response.status(404)
    response.send('Book Not Found')
    return
  }
  response.send(book)
})

// Post Book API
app.post('/books/', async (request, response) => {
  const bookDetails = request.body
  const {title, author, price, pages} = bookDetails

  if (!title || !author || price === undefined || isNaN(Number(price))) {
    response.status(400)
    response.send('Invalid Request')
    return
  }

  const addBookQuery = `
    INSERT INTO
      book (title, author, price, pages)
    VALUES
      (?, ?, ?, ?);`

  const dbResponse = await db.run(addBookQuery, [title, author, price, pages])
  const bookId = dbResponse.lastID
  response.status(201)
  response.send({bookId: bookId})
})

// Put Book API
app.put('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params
  const bookDetails = request.body
  const {title, author, price, pages} = bookDetails

  const updateBookQuery = `
    UPDATE
      book
    SET
      title = ?,
      author = ?,
      price = ?,
      pages = ?
    WHERE
      id = ?;`

  await db.run(updateBookQuery, [title, author, price, pages, bookId])
  response.send('Book Updated Successfully')
})

// Delete Book API
app.delete('/books/:bookId/', async (request, response) => {
  const {bookId} = request.params
  const deleteBookQuery = `
    DELETE FROM
      book
    WHERE
      id = ?;`

  await db.run(deleteBookQuery, [bookId])
  response.send('Book Deleted Successfully')
})

module.exports = app
