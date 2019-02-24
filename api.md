# JSON Api Crud map

for each url the following http verbs are matched

GET - retrieve document,
POST - create document,
PUT - update document,
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

### URL: /person_country && /person_country/:options/*

#### GET

currently the below link is not working: `/person_country`

Retrieve data:

`/person_country/options/country/<country i.e. china>/id/<person document id>`

returns the data for the person and country

#### POST

Create a new person

`/person_country/options/country/<country i.e. china>`

returns the data for the new person and country

#### PUT

Update a document

`/person_country/options/country/<country i.e. china>/id/<person document id>`

returns the updated data for the person and country

#### DELETE

Delete a person

`/person_country/options/id/<person document id>`

returns a message to confirm deletion and the ID
