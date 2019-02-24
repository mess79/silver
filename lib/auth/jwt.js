const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)



var privateKEY  = process.env.KEYS_PRIVATE || fs.readFileSync('./keys/private.key', 'utf8');
var publicKEY  = process.env.KEYS_PUBLIC || fs.readFileSync('./keys/public.key', 'utf8');
module.exports = {
 sign: (payload, options) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me",
    audience: "Client_Identity" // this should be provided by client
   }
  */

  options.issuer = "test server"
    //, subject : "tbc"
//, audience : "tbc"
//  }

  // Token signing options
  let signOptions = {
      issuer:  options.issuer,
      //subject:  options.subject,
      audience:  options.audience,
      expiresIn:  "1h",    // 30 days validity
      algorithm:  "RS256"
  };

  return jwt.sign(payload, privateKEY, signOptions);
},
verify: (token, option) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me",
    audience: "Client_Identity" // this should be provided by client
   }
  */

  option.issuer = "test server"
  //, subject : "tbc"
  //,audience : "tbc"
  //}
  let verifyOptions = {
      issuer:  option.issuer,
      //subject:  option.subject,
      audience:  option.audience,
      expiresIn:  "1h",
      algorithm:  ["RS256"]
  };
    //console.log(verifyOptions);
   try{
     return jwt.verify(token, publicKEY, verifyOptions);
   }catch (err){
     //console.log(err);
     return false;
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}
