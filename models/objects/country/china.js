const map = require("../common/map");
//console.log(map);

const china =
  /*[{
  "section": "owner",
  "import": map.owner
},*/
  [{
    "section": "Personal",
    "import": map.personal
  },
  {
    "section": "passport",
    "import": map.passport,
    "custom": {
      additional_nationality: {
        label: "Additional Nationalites"
        , altText: "Please disclose all nationalities you are hold whether or not you hold a passport"
      },
      previous_nationality: {
        label: "Previous Nationality"
      },
      previous_nationality: {
        label: "Previous Nationality"
        , nationalitySpecific: ["LBN", "AFG"]
      },
      flights: {
        label: "Flight details"
        , consulateSpecific: ["London", "Belfast"]
      },
      import: map.inviter
    }
  }]

module.exports = china;
