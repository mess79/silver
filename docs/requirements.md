# Collection: Requirements

```javascript
country_from: String,
country_to: String,
category: [{
  _id: false,
  purpose: String,
  requirement: [{
    origin : [{ type: Schema.Types.ObjectId, ref: 'requirement_item' }],
    _id: false,
    name: String,
    link: String,
    quantity: Number,
    icon: String,
    description: String,
    variable: [],
    variableInput: {},
    nationality: {
      exclude : Boolean,
      countryCodes: []
    }
  }]
}]
```
