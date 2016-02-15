Schemas.Filter = new SimpleSchema({
  start: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  end: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
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
  },

  download: {
    type: String,
    allowedValues: ['canal', 'pump', 'pavement'],
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        var settings = Settings.findOne()
        var options  = [
          { value: 'canal', label: TAPi18n.__('download_canal') },
          { value: 'pump',  label: TAPi18n.__('download_pump') }
        ]

        if (settings && settings.showPavement)
          options.push({
            value: 'pavement',
            label: TAPi18n.__('download_pavement')
          })

        return options
      }
    }
  },

  plantId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return Plants.find({}, { sort: { createdAt: 1 } }).map(function (plant) {
          return { value: plant._id, label: plant.name }
        })
      }
    }
  },

  materialId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        var material = Materials.first() || {}
        var map      = function (m) { return { label: m.name, value: m._id } }
        var sands    = material && _.map(material.sands, map)
        var gravels  = material && _.map(material.gravels, map)

        return [
          {
            optgroup: TAPi18n.__('material_sands'),
            options:  sands || [{ label: '', value: '' }]
          },

          {
            optgroup: TAPi18n.__('material_gravels'),
            options:  gravels || [{ label: '', value: '' }]
          }
        ]
      }
    }
  },

  customerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },

  workId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },

  tenPercentCriteria: {
    type: Boolean,
    optional: true
  },

  discardHighErraticValues: {
    type: Boolean,
    optional: true
  }
})

if (Meteor.isClient) {
  Schemas.Filter.labels({
    start:                    function () { return TAPi18n.__('graphic_filter_start') },
    end:                      function () { return TAPi18n.__('graphic_filter_end') },
    strengthId:               function () { return TAPi18n.__('strength') },
    aggregateId:              function () { return TAPi18n.__('aggregate') },
    settlementId:             function () { return TAPi18n.__('settlement') },
    download:                 function () { return TAPi18n.__('download') },
    plantId:                  function () { return TAPi18n.__('plant') },
    materialId:               function () { return TAPi18n.__('material') },
    customerId:               function () { return TAPi18n.__('customer') },
    workId:                   function () { return TAPi18n.__('work') },
    tenPercentCriteria:       function () { return TAPi18n.__('stats_ten_percent_criteria') },
    discardHighErraticValues: function () { return TAPi18n.__('stats_discard_high_erratic_values') }
  })
}
