Schemas.Humidity = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    },
    autoform: {
      'data-ratio-changer': true
    }
  },

  incorporated: {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'l/m³',
      'data-ratio-changer': true
    }
  },

  hasIce: {
    type: Boolean,
    defaultValue: false
  },

  ice: {
    type: Number,
    optional: true,
    min: 0,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'kg/m³',
      'data-ratio-changer': true
    }
  },

  hasAdditionalWater: {
    type: Boolean,
    defaultValue: false
  },

  additionalWater: {
    type: Number,
    optional: true,
    min: 0,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'l/m³',
      'data-ratio-changer': true
    }
  },

  hasAdditionalAdditive: {
    type: Boolean,
    defaultValue: false
  },

  additionalAdditive: {
    type: Number,
    optional: true,
    min: 0,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'kg/m³',
      'data-ratio-changer': true
    }
  },

  inTruck: {
    type: Boolean,
    defaultValue: false,
    autoform: {
      'data-ratio-changer': true
    }
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
      var materials = Materials.first()
      var sandId    = this.value
      var sand      = _.find(materials.sands, function (sand) {
        return sand._id === sandId
      })

      if (! sand) return 'required'
    },
    autoform: {
      firstOption: '',
      'data-ratio-changer': true,
      options: function () {
        var materials = Materials.first() || { sands: [] }

        return materials.sands.map(function (sand) {
          return { value: sand._id, label: sand.name }
        })
      }
    }
  },

  'hSands.$.amount': {
    type: Number,
    min: 0,
    max: 1500,
    autoform: {
      unit: 'kg/m³',
      'data-ratio-changer': true
    }
  },

  'hSands.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50,
    autoValue: function () {
      var materials = Materials.first() || { sands: [] }
      var sandId    = this.siblingField('id').value

      if (sandId) {
        var sand = _.find(materials.sands, function (sand) {
          return sandId === sand._id
        })

        return sand.absorption
      } else {
        this.unset()
      }
    },
    autoform: {
      omit: true,
      'data-ratio-changer': true
    }
  },

  'hSands.$.humidity': {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 15,
    autoform: {
      unit: '%',
      'data-ratio-changer': true
    }
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
      var materials = Materials.first()
      var gravelId  = this.value
      var gravel    = _.find(materials.gravels, function (gravel) {
        return gravel._id === gravelId
      })

      if (! gravel) return 'required'
    },
    autoform: {
      firstOption: '',
      'data-ratio-changer': true,
      options: function () {
        var materials = Materials.first() || { gravels: [] }

        return materials.gravels.map(function (gravel) {
          return { value: gravel._id, label: gravel.name }
        })
      }
    }
  },

  'hGravels.$.amount': {
    type: Number,
    min: 0,
    max: 1500,
    autoform: {
      unit: 'kg/m³',
      'data-ratio-changer': true
    }
  },

  'hGravels.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50,
    autoValue: function () {
      var materials = Materials.first() || { gravels: [] }
      var gravelId  = this.siblingField('id').value

      if (gravelId) {
        var gravel = _.find(materials.gravels, function (gravel) {
          return gravelId === gravel._id
        })

        return gravel.absorption
      } else {
        this.unset()
      }
    },
    autoform: {
      omit: true,
      'data-ratio-changer': true
    }
  },

  'hGravels.$.humidity': {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 15,
    autoform: {
      unit: '%',
      'data-ratio-changer': true
    }
  },

  flowmeterCorrection: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.8,
    max: 1.2,
    autoform: {
      label: false,
      type: 'hidden',
      'data-ratio-changer': true
    }
  },

  ratio: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 1000,
    autoform: {
      type: 'text',
      readonly: true
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Humidity.labels({
    sampleId:              function () { return TAPi18n.__('sample') },
    incorporated:          function () { return TAPi18n.__('humidity_incorporated') },
    hasIce:                function () { return TAPi18n.__('humidity_ice') },
    ice:                   function () { return TAPi18n.__('humidity_ice') },
    hasAdditionalWater:    function () { return TAPi18n.__('humidity_additional_water') },
    additionalWater:       function () { return TAPi18n.__('humidity_additional_water') },
    hasAdditionalAdditive: function () { return TAPi18n.__('humidity_additional_additive') },
    additionalAdditive:    function () { return TAPi18n.__('humidity_additional_additive') },
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
    organizationId:        function () { return TAPi18n.__('organization') },
    createdAt:             function () { return TAPi18n.__('created_at') },
    updatedAt:             function () { return TAPi18n.__('updated_at') }
  })
}
