var requiredIfCalibratable = function () {
  var shouldBeRequired = this.field('type').value === 'calibratable'

  if (shouldBeRequired && ! this.value) return 'required'
}

var blankWhenNoCalibratable = function () {
  var shouldBeBlank = this.field('type').value === 'no_calibratable'

  return shouldBeBlank ? null : this.value
}

Schemas.Maintenance = new SimpleSchema([Schemas.Base, {
  instrumentId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Instruments.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: '',
      options: function () {
        return Instruments.find({}, { sort: { name: 1 } }).map(function (instrument) {
          return { value: instrument._id, label: instrument.name }
        })
      }
    }
  },

  type: {
    type: String,
    max: 255,
    allowedValues: ['calibratable', 'no_calibratable'],
    autoform: {
      firstOption: '',
      options: function () {
        return [
          { value: 'calibratable', label: TAPi18n.__('maintenance_calibratable') },
          { value: 'no_calibratable', label: TAPi18n.__('maintenance_no_calibratable') }
        ]
      }
    }
  },

  quantity: {
    type: Number,
    min: 1,
    max: 99
  },

  brand: {
    type: String,
    max: 255,
    optional: true
  },

  serial: {
    type: String,
    max: 255,
    optional: true
  },

  characteristics: {
    type: String,
    max: 255,
    optional: true,
    autoform: {
      rows: 3
    }
  },

  code: {
    type: String,
    optional: true,
    max: 10,
    custom: function () {
      var other = Maintenances.findOne({
        code: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  report: {
    type: String,
    optional: true,
    custom: requiredIfCalibratable,
    autoValue: blankWhenNoCalibratable,
    autoform: {
      rows: 3
    }
  },

  date: {
    type: Date,
    optional: true,
    custom: requiredIfCalibratable,
    autoValue: blankWhenNoCalibratable,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L',
      'data-period-modifier': true
    }
  },

  period: {
    type: Number,
    optional: true,
    min: 1,
    max: 96,
    custom: requiredIfCalibratable,
    autoValue: blankWhenNoCalibratable,
    autoform: {
      template: 'measure',
      unit: function () {
        return TAPi18n.__('maintenance_period_unit_plural')
      },
      'data-period-modifier': true
    }
  },

  validUntil: {
    type: Date,
    optional: true,
    custom: requiredIfCalibratable,
    autoValue: blankWhenNoCalibratable,
    autoform: {
      readonly: true,
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  active: {
    type: Boolean,
    optional: true,
    defaultValue: true
  },

  reason: {
    type: String,
    optional: true,
    max: 4096,
    custom: function () {
      var activeField = this.field('active')
      var shouldBeRequired = activeField.isSet && ! activeField.value

      if (shouldBeRequired && ! this.value) return 'required'
    },
    autoform: {
      rows: 3
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Maintenance.labels({
    instrumentId:    function () { return TAPi18n.__('maintenance_instrument') },
    type:            function () { return TAPi18n.__('maintenance_type') },
    quantity:        function () { return TAPi18n.__('maintenance_quantity') },
    brand:           function () { return TAPi18n.__('maintenance_brand') },
    serial:          function () { return TAPi18n.__('maintenance_serial') },
    characteristics: function () { return TAPi18n.__('maintenance_characteristics') },
    code:            function () { return TAPi18n.__('maintenance_code') },
    report:          function () { return TAPi18n.__('maintenance_report') },
    date:            function () { return TAPi18n.__('maintenance_date') },
    period:          function () { return TAPi18n.__('maintenance_period') },
    validUntil:      function () { return TAPi18n.__('maintenance_valid_until') },
    active:          function () { return TAPi18n.__('maintenance_active') },
    reason:          function () { return TAPi18n.__('maintenance_reason') },
    organizationId:  function () { return TAPi18n.__('organization') },
    createdAt:       function () { return TAPi18n.__('created_at') },
    updatedAt:       function () { return TAPi18n.__('updated_at') }
  })
}
