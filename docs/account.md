# Collection: Account

```javascript
active: {
  Type: Boolean,
  default: false
}
```
Describes whether the account has been activated or deactivated.
```javascript
activation: {
  hash: String,
  exp: Date
}
```
Contains the unique hash and the expiry time of the hash, this is emailed to the account holder to follow the link to activate the account.  Set automatically by the application.
```javascript
reset: {
  hash: String,
  exp: Date
}
```
As for account activation, this contains a unique hash with an expiry and this is included in a link emailed to the account holder to access the password rest page.  Set automatically by the application.
```javascript
username: String
```
This is the email of the account holder, this is unique to the host, the same email can be used in multiple accounts so long as there are different hosts (i.e. localhost, xyz.com).
```javascript
password: {
  salt: String,
  hash: String
}
```
Contains the password salt and hash, set automatcially by the server.
```javascript
csrf_hash: String
```
Contains a unique CSRF hash, set automatcially by the server
```javascript
first_name: String
```
Account holder's first name
```javascript
surname: String
```
Account holder's surname
```javascript
address: [{
  _id: false,
  line1: String,
  line2: String,
  line3: String,
  city: String,
  county: String,
  zip: String,
  country: String
}]
```
Account holders address(s) this is an array of addresses
```javascript
company: {
  type: Schema.Types.ObjectId,
  ref: 'company'
}
```
Details of the company that the account holder is from
```javascript
processing_company: {
  type: Schema.Types.ObjectId,
  ref: 'company'
}
```
Details of the company that is processing the requests (applicable if the account is for a consultant working in a specific office where there host may have numerous locations)
```javascript
people: [{
  type: Schema.Types.ObjectId,
  ref: 'person'
}]
```
Link to Person document id's associated with the account holder as a client
```javascript
order: [{
  type: Schema.Types.ObjectId,
  ref: 'order'
}]
```
Link to order document id's associated with the account holder as a client
```javascript
invoice: [{
  type: Schema.Types.ObjectId,
  ref: 'invoice'
}]
```
Link to invoice document id's associated with the account holder as a client
```javascript
host: {
  type: Schema.Types.ObjectId,
  ref: 'host'
}
```
Link to the host document that this account belongs to
```javascript
role: String
```
This dictates the level of permissons for the account holder:
* client
* client_manager
* consultant
* manager
* company_admin
* server_admin
* superuser
