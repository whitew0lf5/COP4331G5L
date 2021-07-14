const express = require('express');
const bp = require("body-parser");
const mongoclient = require("mongodb").MongoClient;
const objectid = require("mongodb").ObjectId;
const https = require('https');
const sets = require('../data/sets.json')
const cors = require('cors')

const CONNECTION_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "cop4331"

const app = express();
const port = 5000;
app.use(cors())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var database, collection;

// -- API ROUTES --

// Ping the api to see if it's running
app.get('/api/ping', (req, res) => res.status(200).send('Ping!'));

// Get a list of users. Params <username(String), password(String)>
app.get('/api/login', (req, res) => {
	collection.findOne({ "username": req.query.username, "password": req.query.password}, function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		if (result) {
			res.status(200).send({"message": "Login Successful", "username": req.query.username, "sets": result.sets});
		} else {
			res.status(401).send({"message": "Invalid User"});
		}
	});
});

// Attempt to register a user if there isn't one with the passed username already. Params <username(String), password(String)>
app.post('/api/register', (req, res) => {
	collection.findOne({ username: req.query.username }, function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		if (result) {
			return res.status(409).send({"message": "Username already associated with existing user"});
		}
	});

	// Build a dictionary/hashmap/object of set IDs that will map to an array of owned cards
	var userSets = {};
	for (var i = 0; i < sets.data.length; i++) {
		var setID = sets.data[i]["id"];
		userSets[setID] = []; 
	}

	collection.insertOne({"username": req.query.username, "password": req.query.password, "sets": userSets}, (error, result) => {
		if (error) {
			return res.status(500).send(error);
		}
		res.status(200).send({"message": "Register Successful"})
	})
});

// Connect to the database and launch the API
app.listen(port, () => {
	mongoclient.connect(CONNECTION_URL, { useUnifiedTopology: true }, function(error, client) {
		if(error) {
			throw error;
		}
		database = client.db(DATABASE_NAME);
		collection = database.collection("Users");
		console.log("API running on port `" + port + "`");
	});
});