//.log("here");
//import(/* webpackChunkName: "lodash" */ 'lodash').then({ default: _ } =>
//import _ from 'lodash';
//import a from "./users";

import "./css/style.css";

console.log("here");
function getComponent() {
  return import (/* webpackChunkName: "lodash" */ 'lodash').then(({
    default: _
  }) => {
    console.log(
      _.join(['Another', 'module', 'loaded!'], ' ')
    );
  })

}
setTimeout(function(){
  getComponent();
}, 2000 )
