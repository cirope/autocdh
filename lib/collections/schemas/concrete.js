Schemas.Concrete = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
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
      afFieldInput: {
        options: function () {
          return Settlements.find().map(function (settlement) {
            return { value: settlement._id, label: settlement.name }
          })
        }
      }
    }
  },

  typeId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Types.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        options: function () {
          return Types.find().map(function (type) {
            return { value: type._id, label: type.name }
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
      afFieldInput: {
        options: function () {
          return Additives.find().map(function (additive) {
            return { value: additive._id, label: additive.name }
          })
        }
      }
    }
  },

  dosages: {
    type: [Object],
    minCount: 4,
    maxCount: 10
  },

  'dosages.$.name': {
    type: String
  },

  'dosages.$.amount': {
    type: Number,
    min: 0,
    max: 1000
  },

  'dosages.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  }
}])

Schemas.Concrete.labels({
  strengthId:             function () { return TAPi18n.__('strength') },
  downloadId:             function () { return TAPi18n.__('download') },
  aggregateId:            function () { return TAPi18n.__('aggregate') },
  settlementId:           function () { return TAPi18n.__('settlement') },
  typeId:                 function () { return TAPi18n.__('type') },
  additiveId:             function () { return TAPi18n.__('additive') },
  dosages:                function () { return TAPi18n.__('concrete_dosages') },
  'dosages.$.name':       function () { return TAPi18n.__('concrete_dosages_name') },
  'dosages.$.amount':     function () { return TAPi18n.__('concrete_dosages_amount') },
  'dosages.$.absorption': function () { return TAPi18n.__('concrete_dosages_absorption') },
  userId:                 function () { return TAPi18n.__('user') },
  createdAt:              function () { return TAPi18n.__('created_at') },
  updatedAt:              function () { return TAPi18n.__('updated_at') }
})
