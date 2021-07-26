# API Documentation
API for COP4331 Group 5's Large Project
## Deployment
1. Take the index.js file and paste it into /var/www/api/ directory alongside package.json and package-lock.json
2. Run `npm install` to install all library dependencies the code needs to run.
3. To manually run the APi on your local machine or the server, enter the command `node index.js`

## Using
All API endpoints are prefixed with `http://198.199.67.109:5000` if run on the Digital Ocean server. Otherwise if you're testing on your local machine use `http://localhost:5000`

## Endpoints

### /api/ping
Returns a simple `Ping!` message if teh API is running

### /api/login
Query Parameters:
1. **username** -> **String**
2. **password** -> **String**

Returns a JSON response of 500 if there was an API issue, 401 if the username and password don't correspond to a valid user, or 200 if the credentials prompt a successful login

Sample 200 Response
```
{
	message: "Successful Login",
	username: "Insert_username_here",
	sets: {
		set1: ["card1_name", "card2_name", "card3_name", "card4_name", etc..],
		set2: [],
		set3: [],
		set4: []
	}
}
```

### /api/register
Query Parameters

1. **username** -> **String**
2. **password** -> **String**

Returns a response code of 500 if database crud fails, 409 if a user with the associated username already exists, and 200 if the user was registered successfully

### /api/register
Query Parameters:
1. **username** -> **String**
2. **password** -> **String**
3. **email** -> **String**

Returns a status code of 200 if user was inserted successfully and 409 if the user already exists

### /api/update
Query Parameters
1. **username** -> **String**
2. **sets** -> **Object**

Returns a 200 if the user has its sets data overwritten and 500 if any error occurs

### /api/verify

Query Parameters
1. **username** -> **String**

Returns 200 if a user successfuly has its verify attribute seet from false to true and 500 otherwise

### /api/updatepassword

Query Parameters
1. **username** -> **String**
2. **password*8 -> **String**

returns 200 if the user with the corresponding username has its password data overwritten with the passed password string

### /api/email

Query Parameters
1. **username** -> **String**

returns 200 if an email attached to the passed username was retrieved
