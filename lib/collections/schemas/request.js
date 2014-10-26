Schemas.Request = new SimpleSchema([Schemas.Base, {
  day: {
    type: Number // Fucking requisites...
  },
  molding: {
    type: String,
    allowedValues: ['plant']
  },
  date: {
    type: Date
  },
  paston: {
    type: String,
    allowedValues: ['A', 'B']
  },
  receipt: {
    type: Number,
    min: 1
  },
  concreteType: {
    type: String
  },
  plantId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    denyUpdate: true,
    custom: function () {
      if (! this.isInsert && Plants.findOne(this.value)) return 'required'
    }
  },
  vehicle: {
    type: Number
  },
  volume: {
    type: Number
  }
}])

if (Meteor.isClient) {
  Schemas.Request.labels({
    day:       function () { return TAPi18n.__('request_day') },
    userId:    function () { return TAPi18n.__('user') },
    createdAt: function () { return TAPi18n.__('created_at') },
    updatedAt: function () { return TAPi18n.__('updated_at') }
  })
}
