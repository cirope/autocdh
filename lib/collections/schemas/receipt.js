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

  structure: {
    type: String,
    optional: true
  },

  number: {
    type: String,
    custom: function () {
      var other = Receipts.findOne({
        number: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  volume: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.5,
    max: 12,
    autoform: {
      template: 'measure',
      unit: 'm³',
      step: 0.5
    }
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
      rows: 3
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Receipt.labels({
    sampleId:       function () { return TAPi18n.__('sample') },
    customerId:     function () { return TAPi18n.__('customer') },
    workId:         function () { return TAPi18n.__('work') },
    truckId:        function () { return TAPi18n.__('truck') },
    truckDriver:    function () { return TAPi18n.__('truck_driver') },
    structure:      function () { return TAPi18n.__('receipt_structure') },
    number:         function () { return TAPi18n.__('receipt_number') },
    volume:         function () { return TAPi18n.__('receipt_volume') },
    surplus:        function () { return TAPi18n.__('receipt_surplus') },
    surplusComment: function () { return TAPi18n.__('receipt_surplus_comment') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
