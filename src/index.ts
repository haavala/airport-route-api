import express = require('express');
import { RouteFinder } from './route/route-finder'

const port = process.env.PORT || 3000

let routeFinder = new RouteFinder()

let app = express();

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json')
    next()
});

app.get('/routes', function (request, response) {
	console.log(request.query)
	let from = request.query.from
	let to = request.query.to
	let limit = request.query.limit || 1

	console.log(limit)

	routeFinder.find(from, to, limit)
		.then((res) => response.send(JSON.stringify(res)))
		.catch((err) => {
			response.status(400).end(err)
		})
});

app.listen(port, (err: any) => {
	if (err) {
	  console.log(err)
	}
  
	console.log(`server is listening on ${port}`)
})