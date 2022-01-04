#!/usr/bin/env node

const fs = require('fs')
const _ = require('lodash')
const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')

let data

app.use(bodyParser.json())

async function loadFile(filename) {
	return fs.readFileSync(filename)
}

async function main() {
	try {
		data = JSON.parse(await loadFile('data.json'))
	} catch (err) {
		console.error(err.message)
		process.exit(1)
	}

	app.post('/search', function (req, res) {
		console.log('request:')
		console.log(JSON.stringify(req.body, null, '  '))

		let found = _.find(data, req.body)

		let respObj

		if (found) {
			respObj = { price: found.price }
			res.json(respObj)
		} else {
			respObj = { price: null }
			res.json(respObj)
		}

		console.log('response:')
		console.log(JSON.stringify(respObj, null, '  '))
		console.log()
	})

	http.createServer(app).listen(8080)
}

main()

