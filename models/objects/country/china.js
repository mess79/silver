const map = require("../common/map");
//console.log(map);

const china = [{
  "section": "Personal",
  "import": map.personal
}, {
  "section": "passport",
  "import": map.passport,
  "custom": {
    additional_nationality: {
      label: "Additional Nationalites"
    },
    previous_nationality: {
      label: "Previous Nationality"
    }
    , import: map.inviter
  }
}]

module.exports = china;
