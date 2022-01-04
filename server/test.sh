#!/bin/bash

curl -X POST \
	-s \
	-d@request.json \
	-H 'Content-Type: application/json' \
	http://localhost:8080/search


