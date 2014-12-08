Schemas.Humidity = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    }
  },

  incorporated: {
    type: Number,
    min: 0,
    max: 1000
  },

  ice: {
    type: Number,
    optional: true,
    min: 0,
    max: 1000
  },

  inTruck: {
    type: Boolean,
    defaultValue: false
  },

  aggregates: {
    type: [Object],
    minCount: 2,
    maxCount: 6
  },

  'aggregates.$.name': {
    type: String,
    defaultValue: function () {
      return TAPi18n.__('humidity_aggregate')
    }
  },

  'aggregates.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'aggregates.$.humidity': {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 15
  },

  'aggregates.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  flowmeterCorrection: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.8,
    max: 1.2
  },

  ratio: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000
  }
}])

Schemas.Humidity.labels({
  sampleId:                  function () { return TAPi18n.__('sample') },
  incorporated:              function () { return TAPi18n.__('humidity_incorporated') },
  ice:                       function () { return TAPi18n.__('humidity_ice') },
  inTruck:                   function () { return TAPi18n.__('humidity_in_truck') },
  aggregates:                function () { return TAPi18n.__('humidity_aggregates') },
  'aggregates.$.name':       function () { return TAPi18n.__('humidity_aggregates_name') },
  'aggregates.$.amount':     function () { return TAPi18n.__('humidity_aggregates_amount') },
  'aggregates.$.humidity':   function () { return TAPi18n.__('humidity_aggregates_humidity') },
  'aggregates.$.absorption': function () { return TAPi18n.__('humidity_aggregates_absorption') },
  flowmeterCorrection:       function () { return TAPi18n.__('humidity_flowmeter_correction') },
  ratio:                     function () { return TAPi18n.__('humidity_ratio') },
  userId:                    function () { return TAPi18n.__('user') },
  createdAt:                 function () { return TAPi18n.__('created_at') },
  updatedAt:                 function () { return TAPi18n.__('updated_at') }
})
