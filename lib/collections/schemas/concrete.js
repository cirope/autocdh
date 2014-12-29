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
          return Strengths.find().map(function (strength) {
            return { value: strength._id, label: strength.name }
          })
        }
      }
    }
  },

  downloadId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Downloads.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        options: function () {
          return Downloads.find().map(function (download) {
            return { value: download._id, label: download.name }
          })
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
          return Aggregates.find().map(function (aggregate) {
            return { value: aggregate._id, label: aggregate.name }
          })
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
          return Settlements.find().map(function (settlement) {
            return { value: settlement._id, label: settlement.name }
          })
        }
      }
    }
  },

  additiveId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Additives.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      afFieldInput: {
        options: function () {
          return Additives.find().map(function (additive) {
            return { value: additive._id, label: additive.name }
          })
        }
      }
    }
  },

  water: {
    type: Number,
    min: 0,
    max: 1000
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
      var materials  = Materials.findOne()
      var concreteId = this.value
      var concrete   = _.find(materials.concretes, function (concrete) {
        return concrete._id == concreteId
      })

      if (! concrete) return 'required'
    },
    autoform: {
      firstOption: '',
      afFieldInput: {
        options: function () {
          var materials = Materials.findOne() || { concretes: [] }

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
    max: 1000
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
      var materials = Materials.findOne()
      var sandId    = this.value
      var sand      = _.find(materials.sands, function (sand) {
        return sand._id == sandId
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

  'sands.$.amount': {
    type: Number,
    min: 0,
    max: 1000
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
      var materials = Materials.findOne()
      var gravelId  = this.value
      var gravel    = _.find(materials.gravels, function (gravel) {
        return gravel._id == gravelId
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

  'gravels.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },
}])

Schemas.Concrete.labels({
  strengthId:           function () { return TAPi18n.__('strength') },
  downloadId:           function () { return TAPi18n.__('download') },
  aggregateId:          function () { return TAPi18n.__('aggregate') },
  settlementId:         function () { return TAPi18n.__('settlement') },
  typeId:               function () { return TAPi18n.__('type') },
  additiveId:           function () { return TAPi18n.__('additive') },
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
