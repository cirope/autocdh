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

  hSands: {
    type: [Object],
    minCount: 1,
    maxCount: 4,
    autoform: {
      template: 'basic',
      cols: 3
    }
  },

  'hSands.$.id': {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      var materials = Materials.findOne()
      var sandId    = this.value
      var sand      = _.find(materials.sands, function (sand) {
        return sand._id === sandId
      })

      if (! sand) return 'required'
    },
    autoform: {
      firstOption: '',
      afFieldInput: {
        options: function () {
          var materials = Materials.findOne() || { sands: [] }

          return materials.sands.map(function (sand) {
            return { value: sand._id, label: sand.name }
          })
        }
      }
    }
  },

  'hSands.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'hSands.$.humidity': {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 15
  },

  hGravels: {
    type: [Object],
    minCount: 1,
    maxCount: 4,
    autoform: {
      template: 'basic',
      cols: 3
    }
  },

  'hGravels.$.id': {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      var materials = Materials.findOne()
      var gravelId  = this.value
      var gravel    = _.find(materials.gravels, function (gravel) {
        return gravel._id === gravelId
      })

      if (! gravel) return 'required'
    },
    autoform: {
      firstOption: '',
      afFieldInput: {
        options: function () {
          var materials = Materials.findOne() || { gravels: [] }

          return materials.gravels.map(function (gravel) {
            return { value: gravel._id, label: gravel.name }
          })
        }
      }
    }
  },

  'hGravels.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'hGravels.$.humidity': {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 15
  },

  flowmeterCorrection: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.8,
    max: 1.2,
    autoform: {
      afFieldInput: {
        readonly: true
      }
    }
  },

  ratio: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    autoform: {
      afFieldInput: {
        readonly: true
      }
    }
  }
}])

Schemas.Humidity.labels({
  sampleId:              function () { return TAPi18n.__('sample') },
  incorporated:          function () { return TAPi18n.__('humidity_incorporated') },
  ice:                   function () { return TAPi18n.__('humidity_ice') },
  inTruck:               function () { return TAPi18n.__('humidity_in_truck') },
  aggregates:            function () { return TAPi18n.__('humidity_aggregates') },
  hSands:                function () { return TAPi18n.__('humidity_sands') },
  'hSands.$.id':         function () { return TAPi18n.__('humidity_sands_id') },
  'hSands.$.amount':     function () { return TAPi18n.__('humidity_sands_amount') },
  'hSands.$.humidity':   function () { return TAPi18n.__('humidity_sands_humidity') },
  hGravels:              function () { return TAPi18n.__('humidity_gravels') },
  'hGravels.$.id':       function () { return TAPi18n.__('humidity_gravels_id') },
  'hGravels.$.amount':   function () { return TAPi18n.__('humidity_gravels_amount') },
  'hGravels.$.humidity': function () { return TAPi18n.__('humidity_gravels_humidity') },
  flowmeterCorrection:   function () { return TAPi18n.__('humidity_flowmeter_correction') },
  ratio:                 function () { return TAPi18n.__('humidity_ratio') },
  userId:                function () { return TAPi18n.__('user') },
  createdAt:             function () { return TAPi18n.__('created_at') },
  updatedAt:             function () { return TAPi18n.__('updated_at') }
})
