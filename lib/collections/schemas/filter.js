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

  additiveId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return Additives.find({}, { sort: { createdAt: 1 } }).map(function (additive) {
          return { value: additive._id, label: additive.name }
        })
      }
    }
  },

  download: {
    type: String,
    allowedValues: ['canal', 'pump', 'canal_2', 'pump_2', 'canal_3', 'canal_4', 'pavement', 'dump'],
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        var settings = Settings.findOne()
        var options  = [
          { value: 'canal', label: TAPi18n.__('download_canal') },
          { value: 'pump',  label: TAPi18n.__('download_pump') },
          { value: 'canal_2', label: TAPi18n.__('download_canal_2') },
          { value: 'pump_2',  label: TAPi18n.__('download_pump_2') }
        ]

        if(settings && settings.customOptions){
          if(settings.customOptions.showCanals3And4){
            options.push({value: 'canal_3', label: TAPi18n.__('download_canal_3')})
            options.push({value: 'canal_4', label: TAPi18n.__('download_canal_4')})
          }

          if(settings.customOptions.showPavement) {
            options.push({value: 'pavement', label: TAPi18n.__('download_pavement')})
          }

          if(settings.customOptions.showDump) {
            options.push({value: 'dump', label: TAPi18n.__('download_dump')})
          }
        }

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

  providerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },

  workId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },

  truckId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },

  truckDriver: {
    type: String,
    optional: true
  },

  concretes: {
    type: [Object],
    minCount: 0,
    maxCount: 3,
    optional: true,
    autoform: {
      template: 'slim',
      cols: 1
    }
  },

  'concretes.$.id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        var material = Materials.first() || {}

        return material && _.map(material.concretes, function (m) {
          return { label: m.name, value: m._id }
        })
      }
    }
  },

  molding: {
    type: String,
    allowedValues: ['plant', 'work', 'remote'],
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return [
          { value: 'plant',  label: TAPi18n.__('sample_molding_plant') },
          { value: 'work',   label: TAPi18n.__('sample_molding_work') },
          { value: 'remote', label: TAPi18n.__('sample_molding_remote') }
        ]
      }
    }
  },

  cured: {
    type: String,
    allowedValues: ['normalized', 'real', 'accelerated', 'alongside'],
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return [
          { value: 'normalized',  label: TAPi18n.__('assay_cured_normalized') },
          { value: 'real',        label: TAPi18n.__('assay_cured_real') },
          { value: 'accelerated', label: TAPi18n.__('assay_cured_accelerated') },
          { value: 'alongside',   label: TAPi18n.__('assay_cured_alongside') }
        ]
      }
    }
  },

  additions: {
    type: String,
    allowedValues: ['5_to_10', '11_to_20'],
    optional: true,
    autoform: {
      firstOption: function () {
        return TAPi18n.__('graphic_filter_all')
      },
      options: function () {
        return [
          { value: '5_to_10',  label: TAPi18n.__('graphic_filter_additions_5_to_10') },
          { value: '11_to_20', label: TAPi18n.__('graphic_filter_additions_11_to_20') }
        ]
      }
    }
  },

  tenPercentCriteria: {
    type: Boolean,
    optional: true
  },

  discardHighErraticValues: {
    type: Boolean,
    optional: true
  },

  discardLess28Days: {
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
    additiveId:               function () { return TAPi18n.__('additive') },
    download:                 function () { return TAPi18n.__('download') },
    plantId:                  function () { return TAPi18n.__('plant') },
    materialId:               function () { return TAPi18n.__('material') },
    customerId:               function () { return TAPi18n.__('customer') },
    providerId:               function () { return TAPi18n.__('provider') },
    workId:                   function () { return TAPi18n.__('work') },
    truckId:                  function () { return TAPi18n.__('truck') },
    truckDriver:              function () { return TAPi18n.__('truck_driver') },
    concretes:                function () { return TAPi18n.__('material_concretes') },
    'concretes.$.id':         function () { return TAPi18n.__('material_concretes_name') },
    molding:                  function () { return TAPi18n.__('sample_molding') },
    cured:                    function () { return TAPi18n.__('assay_cured') },
    additions:                function () { return TAPi18n.__('graphic_filter_additions') },
    tenPercentCriteria:       function () { return TAPi18n.__('stats_ten_percent_criteria') },
    discardHighErraticValues: function () { return TAPi18n.__('stats_discard_high_erratic_values') },
    discardLess28Days:        function () { return TAPi18n.__('stats_discard_less_28_days') }
  })
}
