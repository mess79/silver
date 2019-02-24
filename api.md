# JSON Api Crud map

for each url the following http verbs are matched

GET - retrieve document,
POST - create document,
PUT - update document,
DELETE - delete document,

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
