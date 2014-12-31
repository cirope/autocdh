Schemas.Receipt = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    }
  },

  customerId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Customers.findOne(this.value)) return 'required'
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

  truckId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Trucks.findOne(this.value)) return 'required'
    }
  },

  truckDriver: {
    type: String,
    optional: true
  },

  number: {
    type: Number,
    min: 1,
    custom: function () {
      var other = Trucks.findOne({
        number: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  volume: {
    type: Number,
    decimal: true,
    min: 0.5,
    max: 12
  },

  surplus: {
    type: Boolean,
    defaultValue: false
  },

  surplusComment: {
    type: String,
    optional: true,
    autoform: {
      label: false,
      afFieldInput: {
        rows: 3
      }
    }
  }
}])

Schemas.Receipt.labels({
  sampleId:       function () { return TAPi18n.__('sample') },
  customerId:     function () { return TAPi18n.__('customer') },
  workId:         function () { return TAPi18n.__('work') },
  truckId:        function () { return TAPi18n.__('truck') },
  number:         function () { return TAPi18n.__('receipt_number') },
  volume:         function () { return TAPi18n.__('receipt_volume') },
  surplus:        function () { return TAPi18n.__('receipt_surplus') },
  surplusComment: function () { return TAPi18n.__('receipt_surplus_comment') },
  userId:         function () { return TAPi18n.__('user') },
  createdAt:      function () { return TAPi18n.__('created_at') },
  updatedAt:      function () { return TAPi18n.__('updated_at') }
})
