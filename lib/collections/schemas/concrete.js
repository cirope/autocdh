Schemas.Concrete = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    },
    autoform: {
      type: 'hidden'
    }
  },

  strengthId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Strengths.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        autofocus: true,
        options: function () {
          var strengths = Strengths.find({}, { sort: { createdAt: 1 } }).map(function (strength) {
            return { value: strength._id, label: strength.name }
          })
          var group  = strengths.length ? {
            optgroup: TAPi18n.__('strengths'),
            options: strengths
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('strength_new') },
              ]
            }
          ]
        }
      }
    }
  },

  aggregateId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Aggregates.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      afFieldInput: {
        options: function () {
          var aggregates = Aggregates.find({}, { sort: { createdAt: 1 } }).map(function (aggregate) {
            return { value: aggregate._id, label: aggregate.name }
          })
          var group  = aggregates.length ? {
            optgroup: TAPi18n.__('aggregates'),
            options: aggregates
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('aggregate_new') },
              ]
            }
          ]
        }
      }
    }
  },

  settlementId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Settlements.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      afFieldInput: {
        options: function () {
          var settlements = Settlements.find({}, { sort: { createdAt: 1 } }).map(function (settlement) {
            return { value: settlement._id, label: settlement.name }
          })
          var group  = settlements.length ? {
            optgroup: TAPi18n.__('settlements'),
            options: settlements
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('settlement_new') },
              ]
            }
          ]
        }
      }
    }
  },

  additiveId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      afFieldInput: {
        options: function () {
          var additives = Additives.find({}, { sort: { createdAt: 1 } }).map(function (additive) {
            return { value: additive._id, label: additive.name }
          })
          var group  = additives.length ? {
            optgroup: TAPi18n.__('additives'),
            options: additives
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('additive_new') },
              ]
            }
          ]
        }
      }
    }
  },

  additiveAmount: {
    type: Number,
    optional: true,
    custom: function () {
      var additive = Additives.findOne(this.field('additiveId').value)

      if (additive && ! this.value) return 'required'
    },
    autoform: {
      template: 'measure'
    }
  },

  download: {
    type: String,
    allowedValues: ['canal', 'pump'],
    autoform: {
      afFieldInput: {
        options: function () {
          return [
            { value: 'canal', label: TAPi18n.__('download_canal') },
            { value: 'pump',  label: TAPi18n.__('download_pump') }
          ]
        }
      }
    }
  },

  water: {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'l/m³'
    }
  },

  concretes: {
    type: [Object],
    minCount: 1,
    maxCount: 1,
    autoform: {
      template: 'basic',
      cols: 2
    }
  },

  'concretes.$.id': {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      var materials  = Materials.first()
      var concreteId = this.value
      var concrete   = _.find(materials.concretes, function (concrete) {
        return concrete._id === concreteId
      })

      if (! concrete) return 'required'
    },
    autoform: {
      firstOption: '',
      afFieldInput: {
        options: function () {
          var materials = Materials.first() || { concretes: [] }

          return materials.concretes.map(function (concrete) {
            return { value: concrete._id, label: concrete.name }
          })
        }
      }
    }
  },

  'concretes.$.amount': {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      unit: 'kg/m³'
    }
  },

  sands: {
    type: [Object],
    minCount: 1,
    maxCount: 4,
    autoform: {
      template: 'basic',
      cols: 2
    }
  },

  'sands.$.id': {
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
      afFieldInput: {
        options: function () {
          var materials = Materials.first() || { sands: [] }

          return materials.sands.map(function (sand) {
            return { value: sand._id, label: sand.name }
          })
        }
      }
    }
  },

  'sands.$.absorption': {
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
      omit: true
    }
  },

  'sands.$.amount': {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      unit: 'kg/m³'
    }
  },

  gravels: {
    type: [Object],
    minCount: 1,
    maxCount: 4,
    autoform: {
      template: 'basic',
      cols: 2
    }
  },

  'gravels.$.id': {
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
      afFieldInput: {
        options: function () {
          var materials = Materials.first() || { gravels: [] }

          return materials.gravels.map(function (gravel) {
            return { value: gravel._id, label: gravel.name }
          })
        }
      }
    }
  },

  'gravels.$.absorption': {
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
      omit: true
    }
  },

  'gravels.$.amount': {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      unit: 'kg/m³'
    }
  },
}])

if (Meteor.isClient) {
  Schemas.Concrete.labels({
    strengthId:           function () { return TAPi18n.__('strength') },
    aggregateId:          function () { return TAPi18n.__('aggregate') },
    settlementId:         function () { return TAPi18n.__('settlement') },
    typeId:               function () { return TAPi18n.__('type') },
    additiveId:           function () { return TAPi18n.__('additive') },
    additiveAmount:       function () { return TAPi18n.__('additive_amount') },
    download:             function () { return TAPi18n.__('download') },
    water:                function () { return TAPi18n.__('concrete_water') },
    concretes:            function () { return TAPi18n.__('concrete_concretes') },
    'concretes.$.id':     function () { return TAPi18n.__('concrete_concretes_id') },
    'concretes.$.amount': function () { return TAPi18n.__('concrete_concretes_amount') },
    sands:                function () { return TAPi18n.__('concrete_sands') },
    'sands.$.id':         function () { return TAPi18n.__('concrete_sands_id') },
    'sands.$.amount':     function () { return TAPi18n.__('concrete_sands_amount') },
    gravels:              function () { return TAPi18n.__('concrete_gravels') },
    'gravels.$.id':       function () { return TAPi18n.__('concrete_gravels_id') },
    'gravels.$.amount':   function () { return TAPi18n.__('concrete_gravels_amount') },
    userId:               function () { return TAPi18n.__('user') },
    createdAt:            function () { return TAPi18n.__('created_at') },
    updatedAt:            function () { return TAPi18n.__('updated_at') }
  })
}
