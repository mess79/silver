# JSON Api Crud map

for each url the following http verbs are matched

GET - retrieve document,
POST - update document,
PUT - create document,
DELETE - delete document,

## Authorization

### URL: /register

#### POST

Post is the only active verb for this route.  Expecting a payload in JSON

Returns a JSON object with registration/login confirmation and user details

### URL: /logon && /login

#### POST

Post is the only active verb for this route.  Expecting a payload in JSON

Reurns a JSON object with login confirmation and user details

### URL: /logoff

#### POST
#### GET

Logs off, both post and get verbs will activate this.  No payload sent but JSON returned to confirm log off

### URL /reset_request

#### GET

This will return the html for the reset request form

#### POST

This will submit the password reset request and send an email.  JSON is returned to confirmation

### URL /reset/:user/:hash

#### GET

This will return the html for the password reset.  The user is the ID and the hash a cryptohash with a time limit

#### POST

This will submit the new password JSON is returned to confirmation. The user is the ID and the hash a cryptohash with a time limit

## Person data

### URL: /person_country && /person_country/:options/*

#### GET

currently the below link is not working: `/person_country`

Retrieve data:

`/person_country/options/country/<country i.e. china>/id/<person document id>`

returns the data for the person and country

#### PUT

Create a new person

`/person_country/options/country/<country i.e. china>`

returns the data for the new person and country

#### POST

Update a document

`/person_country/options/country/<country i.e. china>/id/<person document id>`

returns the updated data for the person and country

#### DELETE

Delete a person

`/person_country/options/id/<person document id>`

returns a message to confirm deletion and the ID

## Orders

### URL: /order && /order/:id

#### GET

retrieve an order by :id <order number>, must be logged in as a user authorised to access the order

`/order/<order number>`

returns JSON object with data or error

#### PUT

Create a new order

`/order`

must send a JSON Payload.

```javascript
{
  account: <account holder Mongo ID from the user/jwt object>,
  person: [<[optional] if against a person or an array of people, can be empty if a new person to be created>],
  case_type :[<[optional, an array of case details]>]
    {
      country_from: application country,
      country_to: destination country,
      purpose: case type
    }
  ]
}
```

Will return a JSON object containing the order details including the order number or an error  

#### POST

Update an order

`/order/:id`

this will update an order, expects JSON payload

Returns a JSON object or an error

#### DELETE

Deletes an order

`/order/:id`

An order can only be deleted if it has not been initiated, otherwise it would need to be cancelled which would be an update request.

Will return a JSON onbject or an error.
