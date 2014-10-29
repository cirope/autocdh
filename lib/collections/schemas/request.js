Schemas.Request = new SimpleSchema([Schemas.Base, {
  plantId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Plants.findOne(this.value)) return 'required'
    }
  },
  workId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Works.findOne(this.value)) return 'required'
    }
  },
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
  vehicle: {
    type: Number
  },
  volume: {
    type: Number
  }
}])

if (Meteor.isClient) {
  Schemas.Request.labels({
    day:          function () { return TAPi18n.__('request_day') },
    molding:      function () { return TAPi18n.__('request_molding') },
    date:         function () { return TAPi18n.__('request_date') },
    paston:       function () { return TAPi18n.__('request_paston') },
    receipt:      function () { return TAPi18n.__('request_receipt') },
    concreteType: function () { return TAPi18n.__('request_concrete_type') },
    vehicle:      function () { return TAPi18n.__('request_vehicle') },
    volume:       function () { return TAPi18n.__('request_volume') },
    workId:       function () { return TAPi18n.__('work') },
    plantId:      function () { return TAPi18n.__('plant') },
    userId:       function () { return TAPi18n.__('user') },
    createdAt:    function () { return TAPi18n.__('created_at') },
    updatedAt:    function () { return TAPi18n.__('updated_at') }
  })
}
