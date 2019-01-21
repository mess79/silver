//const _ = require('lodash');
const params = function(req){
  let pathObj = {};
  if(req.params.options){
    let pathArray = req.params[0].split("/")
    for(i=0; pathArray.length > i+1; i=i+2){
      pathObj[pathArray[i]] = pathArray[i+1];
    }
  }
  req.params = pathObj;
  //console.log(req.params);
  return req
}

module.exports = params
