Schemas.Formula = new SimpleSchema([Schemas.Base, {
  strengthId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Strengths.findOne(this.value)) return 'required'
    }
  },

  settlementId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Settlements.findOne(this.value)) return 'required'
    }
  },

  aggregateId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Aggregates.findOne(this.value)) return 'required'
    }
  },

  downloadId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Downloads.findOne(this.value)) return 'required'
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

  concrete: {
    type: Number,
    min: 0,
    max: 1000
  },

  water: {
    type: Number,
    min: 0,
    max: 1000
  },

  sands: {
    type: [Object],
    minCount: 1,
    maxCount: 4
  },

  'sands.$.name': {
    type: String,
    defaultValue: function () {
      return TAPi18n.__('formula_sand')
    }
  },

  'sands.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'sands.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  gravels: {
    type: [Object],
    minCount: 1,
    maxCount: 4
  },

  'gravels.$.name': {
    type: String,
    defaultValue: function () {
      return TAPi18n.__('formula_gravel')
    }
  },

  'gravels.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'gravels.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  reducer: {
    type: Number,
    decimal: true,
    min: 0.1,
    max: 5
  }
}])

Schemas.Formula.labels({
  strengthId:             function () { return TAPi18n.__('strength') },
  settlementId:           function () { return TAPi18n.__('settlement') },
  aggregateId:            function () { return TAPi18n.__('aggregate') },
  downloadId:             function () { return TAPi18n.__('download') },
  coding:                 function () { return TAPi18n.__('formula_coding') },
  concrete:               function () { return TAPi18n.__('formula_concrete') },
  water:                  function () { return TAPi18n.__('formula_water') },
  sands:                  function () { return TAPi18n.__('formula_sands') },
  'sands.$.name':         function () { return TAPi18n.__('formula_sands_name') },
  'sands.$.amount':       function () { return TAPi18n.__('formula_sands_amount') },
  'sands.$.absorption':   function () { return TAPi18n.__('formula_sands_absorption') },
  gravels:                function () { return TAPi18n.__('formula_gravels') },
  'gravels.$.name':       function () { return TAPi18n.__('formula_gravels_name') },
  'gravels.$.amount':     function () { return TAPi18n.__('formula_gravels_amount') },
  'gravels.$.absorption': function () { return TAPi18n.__('formula_gravels_absorption') },
  reducer:                function () { return TAPi18n.__('formula_reducer') },
  userId:                 function () { return TAPi18n.__('user') },
  createdAt:              function () { return TAPi18n.__('created_at') },
  updatedAt:              function () { return TAPi18n.__('updated_at') }
})
