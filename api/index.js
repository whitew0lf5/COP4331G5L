const express = require('express');
const bp = require("body-parser");
const mongoclient = require("mongodb").MongoClient;
const objectid = require("mongodb").ObjectId;
const CONNECTION_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "cop4331"

const app = express();
const port = 5000;
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var database, collection;

// -- API ROUTES --

// Ping the api to see if it's running
app.get('/ping', (req, res) => res.status(200).send('Ping!'));

// Get a list of users. Params <Username(String), Password(String)>
app.get('/login', (req, res) => {
	collection.findOne({ username: req.query.username, password: req.query.password}, function(error, result) {
		if (error) {
			return res.status(500).send(error);
		}
		if (result) {
			res.status(200).send({"message": "Login Successful", "username": req.query.username, "cards": result.cards});
		} else {
			res.status(401).send({"message": "Invalid User"});
		}
	});
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