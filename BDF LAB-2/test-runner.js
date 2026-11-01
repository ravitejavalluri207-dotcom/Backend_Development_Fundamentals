// test-runner.js — local test script (not part of the lab, delete after use)
process.env.PORT = '4006'

const app = require('./server.js')
const http = require('http')

setTimeout(async () => {
  const server = http.createServer(app)
  server.listen(4006, '127.0.0.1', async () => {
    const base = 'http://127.0.0.1:4006'
    let res, body
    let passed = 0
    let failed = 0

    const check = (label, status, expectedStatus, body, expectedBody) => {
      const statusOk = status === expectedStatus
      const bodyOk = expectedBody ? JSON.stringify(body).includes(expectedBody) : true
      const ok = statusOk && bodyOk
      if (ok) {
        console.log('  PASS ', label.padEnd(45), '| status:', status)
        passed++
      } else {
        console.log('  FAIL ', label.padEnd(45), '| got status:', status, '| body:', JSON.stringify(body).slice(0, 60))
        failed++
      }
      return body
    }

    console.log('\n====== Lab 2 API Tests ======\n')

    res = await fetch(base + '/books/')
    body = await res.json()
    check('GET /books/ returns 200', res.status, 200, body, null)
    check('GET /books/ returns array with 10 items', body.length, 10, {}, null)

    res = await fetch(base + '/books/1/')
    body = await res.json()
    check('GET /books/1/ returns 200', res.status, 200, body, null)
    check('GET /books/1/ returns correct title', body.title, 'JavaScript for Beginners', {}, null)

    res = await fetch(base + '/books/999/')
    body = await res.json()
    check('GET /books/999/ returns 404', res.status, 404, body, null)
    check('GET /books/999/ error message', 1, 1, body, 'Book not found')

    res = await fetch(base + '/books/abc/')
    body = await res.json()
    check('GET /books/abc/ returns 400', res.status, 400, body, null)

    res = await fetch(base + '/books/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'Web Dev Basics', author: 'David Miller', price: 400, pages: 350})
    })
    body = await res.json()
    check('POST /books/ valid returns 201', res.status, 201, body, null)
    check('POST /books/ returns bookId', !!body.bookId, true, {}, null)
    const newId = body.bookId

    res = await fetch(base + '/books/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'Missing Fields'})
    })
    body = await res.json()
    check('POST missing fields returns 400', res.status, 400, body, null)

    res = await fetch(base + '/books/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'T', author: 'A', price: -5, pages: 100})
    })
    body = await res.json()
    check('POST invalid price returns 400', res.status, 400, body, null)

    res = await fetch(base + '/books/' + newId + '/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'Updated Web Dev', author: 'David Miller', price: 450, pages: 380})
    })
    body = await res.json()
    check('PUT /books/' + newId + '/ valid returns 200', res.status, 200, body, null)

    res = await fetch(base + '/books/' + newId + '/')
    body = await res.json()
    check('GET after PUT shows updated title', body.title, 'Updated Web Dev', {}, null)
    check('GET after PUT shows updated price', body.price, 450, {}, null)

    res = await fetch(base + '/books/999/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'X', author: 'Y', price: 100, pages: 100})
    })
    body = await res.json()
    check('PUT /books/999/ returns 404', res.status, 404, body, null)

    res = await fetch(base + '/books/abc/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'X', author: 'Y', price: 100, pages: 100})
    })
    body = await res.json()
    check('PUT /books/abc/ returns 400', res.status, 400, body, null)

    res = await fetch(base + '/books/' + newId + '/', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'Only title'})
    })
    body = await res.json()
    check('PUT missing fields returns 400', res.status, 400, body, null)

    res = await fetch(base + '/books/' + newId + '/', {method: 'DELETE'})
    body = await res.json()
    check('DELETE /books/' + newId + '/ returns 200', res.status, 200, body, null)

    res = await fetch(base + '/books/' + newId + '/')
    body = await res.json()
    check('GET after DELETE returns 404', res.status, 404, body, null)

    res = await fetch(base + '/books/999/', {method: 'DELETE'})
    body = await res.json()
    check('DELETE /books/999/ returns 404', res.status, 404, body, null)

    res = await fetch(base + '/books/abc/', {method: 'DELETE'})
    body = await res.json()
    check('DELETE /books/abc/ returns 400', res.status, 400, body, null)

    console.log('\n============================')
    console.log('  Results: ' + passed + ' passed, ' + failed + ' failed')
    console.log('============================\n')

    server.close(() => process.exit(failed > 0 ? 1 : 0))
  })
}, 600)

