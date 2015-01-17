Schemas.Formula = new SimpleSchema([Schemas.Base, {
  strengthId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Strengths.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
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

  settlementId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Settlements.findOne(this.value)) return 'required'
    },
    autoform: {
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

  aggregateId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Aggregates.findOne(this.value)) return 'required'
    },
    autoform: {
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
          var downloads = Downloads.find({}, { sort: { createdAt: 1 } }).map(function (download) {
            return { value: download._id, label: download.name }
          })
          var group  = downloads.length ? {
            optgroup: TAPi18n.__('downloads'),
            options: downloads
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('download_new') },
              ]
            }
          ]
        }
      }
    }
  },

  coding: {
    type: String,
    max: 255,
    custom: function () {
      var other = Formulas.findOne({
        coding: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
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
      template: 'slim',
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
        return concrete._id === concreteId
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
      template: 'slim',
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
      template: 'slim',
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

  'gravels.$.amount': {
    type: Number,
    min: 0,
    max: 1000,
    autoform: {
      unit: 'kg/m³'
    }
  },

  reducer: {
    type: Number,
    decimal: true,
    min: 0,
    max: 5,
    autoform: {
      template: 'measure',
      unit: 'kg/m³'
    }
  }
}])

Schemas.Formula.labels({
  strengthId:           function () { return TAPi18n.__('strength') },
  settlementId:         function () { return TAPi18n.__('settlement') },
  aggregateId:          function () { return TAPi18n.__('aggregate') },
  downloadId:           function () { return TAPi18n.__('download') },
  coding:               function () { return TAPi18n.__('formula_coding') },
  water:                function () { return TAPi18n.__('formula_water') },
  concretes:            function () { return TAPi18n.__('formula_concretes') },
  'concretes.$.id':     function () { return TAPi18n.__('formula_concretes_id') },
  'concretes.$.amount': function () { return TAPi18n.__('formula_concretes_amount') },
  sands:                function () { return TAPi18n.__('formula_sands') },
  'sands.$.id':         function () { return TAPi18n.__('formula_sands_id') },
  'sands.$.amount':     function () { return TAPi18n.__('formula_sands_amount') },
  gravels:              function () { return TAPi18n.__('formula_gravels') },
  'gravels.$.id':       function () { return TAPi18n.__('formula_gravels_id') },
  'gravels.$.amount':   function () { return TAPi18n.__('formula_gravels_amount') },
  reducer:              function () { return TAPi18n.__('formula_reducer') },
  userId:               function () { return TAPi18n.__('user') },
  createdAt:            function () { return TAPi18n.__('created_at') },
  updatedAt:            function () { return TAPi18n.__('updated_at') }
})
