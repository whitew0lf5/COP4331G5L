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
const port = 3000;
app.use(cors())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var database, collection;

// -- API ROUTES --

// Ping the api to see if it's running
app.get('/api/ping', (req, res) => res.status(200).send('Ping!!!'));

// Get a list of users. Params <username(String), password(String)>
app.get('/api/login', (req, res) => {
	collection.findOne({ "username": req.query.username, "password": req.query.password}, function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		if (result) {
			res.status(200).send({"message": "Login Successful", "username": req.query.username, "sets": result.sets, "verified": result.verified});
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
			console.log(result)
			console.log(result.status)
			return res.status(409).send({"message": "Username Already Associated With Existing User"});
		} else {
			// Build a dictionary/hashmap/object of set IDs that will map to an array of owned cards
			var userSets = {};
			for (var i = 0; i < sets.data.length; i++) {
				var setID = sets.data[i]["id"];
				userSets[setID] = []; 
			}

			collection.insertOne({"username": req.query.username, "email": req.query.email, "verified": false, "password": req.query.password, "sets": userSets}, (error, result) => {
				if (error) {
					return res.status(500).send(error);
				}
				if (result) {
					return res.status(200).send({"message": "Register Successful"});
				} else {
					return res.status(500).send({"message": "Database Write Operation Failed"});
				}
			})
		}
	});
});

// Update the user's set data with the input JS object. Params <username(String), sets(Object)>
app.post('/api/update', (req, res) => {
	collection.updateOne({"username": req.query.username}, {$set: {"sets": req.body.sets}}).then( result => {
		if(result) {
			return res.status(200).send({"message": "Sets Data Updated"})
		} else {
			return res.status(502).send({"message": "Sets Data Not Updated"})
		}
	}).catch( error => {
		if(error) {
			return res.status(501).send(error)
		} else {
			return res.status(503).send({"message": "Unknown Database Error"})
		}
	})
})

// Update the user's verified status to true. Params <username(String)>
app.post('/api/verify', (req, res) => {
	collection.update({"username": req.query.username}, {$set: {"verified": true}}).then( result => {
		if(result) {
			return res.status(200).send({"message": "verified"})
		} else {
			return res.status(500).send({"message": "Internal Database Error"})
		}
	}).catch( error => {
		if (error) {
			return res.status(500).send(error)
		} else {
			return res.status(500).send({"message": "Unknown Error"})
		}
	})
})

// Update the user's verified status to true. Params <username(String)>
app.post('/api/updatepassword', (req, res) => {
	collection.update({"username": req.query.username}, {$set: {"password": req.query.password}}).then(result => {
		if(result) {
			return res.status(200).send({"message": "Password Updated"});
		} else {
			return res.status(500).send({"message": "Internal Database Error"})
		}
	}).catch( error => {
		if (error) {
			return res.status(500).send(error)
		} else {
			return res.status(500).send({"message": "Unknown Error"})
		}
	})
})

// Get a user's email. Params <username(String)>
app.get('/api/email', (req, res) => {
	collection.findOne({ "username": req.query.username}, function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		if (result) {
			res.status(200).send({"message": "Email Retrieved", "email": result.email});
		} else {
			res.status(401).send({"message": "Invalid User"});
		}
	});
})

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