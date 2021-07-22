# Database Documentation

## Technicals
* Hosted on a Digital Ocean Ubuntu 18.04 Apache2
* MongoDB v4.4.6

## Data Model
The data is all contained in a single collection called **Users**. This collection contains all the user data in the form of mongodb documents as shown in the below model.

```
[
  {
    "username": "insert_username_here",
    "password": "insert_password_here",
    "email": "insert_email_here",
    "verified": true/false,
    "sets": {
      "base1": ["first_card", "second_card", "third_card", ...],
      "base2": ["first_card", "second_card", "third_card", ...],
      "base3": ["first_card", "second_card", "third_card", ...],
      ...
    }
  },
  {
  ...
  },
  ...
]
```

Each user will have their verified state set to false until they click the link in the verification email. That will then return them to the website and call an API endpoint to update that status to true.

Each pokemon set is an array of card_id strings that will track what cards the users do and don't own. Initially, this was going to be a dictionary/object of dictionarys/objects that have card names as keys mapped to booleans. This was changed
due to the uncertainty of whether or not cards could be added to a set after the inital release. If this were the case, we would have to support checking for set size changes and remapping all registered user's data model with
the new cards. It's unknow if this will be necessary, but to prevent this problem from occurring right before presentation we changed to arrays.
