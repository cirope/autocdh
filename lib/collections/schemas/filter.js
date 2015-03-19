Schemas.Filter = new SimpleSchema({
  start: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      dateTimePickerOptions: {
        pickTime: false
      }
    }
  },

  end: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      dateTimePickerOptions: {
        pickTime: false
      }
    }
  },

  strengthId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return Strengths.find({}, { sort: { createdAt: 1 } }).map(function (strength) {
          return { value: strength._id, label: strength.name }
        })
      }
    }
  },

  aggregateId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return Aggregates.find({}, { sort: { createdAt: 1 } }).map(function (aggregate) {
          return { value: aggregate._id, label: aggregate.name }
        })
      }
    }
  },

  settlementId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return Settlements.find({}, { sort: { createdAt: 1 } }).map(function (settlement) {
          return { value: settlement._id, label: settlement.name }
        })
      }
    }
  }
})

if (Meteor.isClient) {
  Schemas.Filter.labels({
    start:        function () { return TAPi18n.__('graphic_filter_start') },
    end:          function () { return TAPi18n.__('graphic_filter_end') },
    strengthId:   function () { return TAPi18n.__('strength') },
    aggregateId:  function () { return TAPi18n.__('aggregate') },
    settlementId: function () { return TAPi18n.__('settlement') }
  })
}
