Schemas.Granulometry = new SimpleSchema([Schemas.Base, {
  responsibleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Responsible.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        autofocus: true,
        firstOption: false,
        options: function () {
          return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
            return { value: r._id, label: r.name }
          })
        }
      }
    }
  },

  plantId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Plants.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return Plants.find({}, { sort: { name: 1 } }).map(function (plant) {
            return { value: plant._id, label: plant.name }
          })
        }
      }
    }
  },

  type: {
    type: String,
    allowedValues: ['sand', 'gravel'],
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: 'sand',   label: TAPi18n.__('granulometry_type_sand') },
            { value: 'gravel', label: TAPi18n.__('granulometry_type_gravel') }
          ]
        }
      }
    }
  },

  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Granulometries.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  date: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        dateTimePickerOptions: {
          pickTime: false
        }
      }
    }
  },

  sampleWeight: {
    type: Number,
    decimal: true,
    autoform: {
      template: 'measure',
      unit: 'kg'
    }
  },

  humidity: {
    type: Object
  },

  'humidity.container': {
    type: String,
    optional: true
  },

  'humidity.massOfContainer': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  'humidity.massOfWetAggregate': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  'humidity.massOfDryAggregate': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  thin: {
    type: Object
  },

  'thin.container': {
    type: String,
    optional: true
  },

  'thin.massOfContainer': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  'thin.massBeforeWash': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  'thin.massAfterWash': {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  granulometryWeight: {
    type: Number,
    decimal: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  dried: {
    type: Boolean
  },

  washed: {
    type: Boolean
  },

  test: {
    type: [Object],
    minCount: 8,
    maxCount: 8,
    autoform: {
      template: 'slim',
      cols: 3
    }
  },

  'test.$.sieve': {
    type: String,
    autoform: {
      unit: 'mm',
      afFieldInput: {
        readonly: true
      }
    }
  },

  'test.$.netWeight': {
    type: Number,
    decimal: true,
    autoform: {
      unit: 'g'
    }
  },

  'test.$.grossWeight': {
    type: Number,
    decimal: true,
    autoform: {
      unit: 'g'
    }
  },

  idealCurves: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    autoform: {
      template: 'measure',
      unit: 'mm'
    }
  },
}])

if (Meteor.isClient) {
  Schemas.Granulometry.labels({
    responsibleId:                 function () { return TAPi18n.__('responsible') },
    plantId:                       function () { return TAPi18n.__('plant') },
    name:                          function () { return TAPi18n.__('granulometry_name') },
    date:                          function () { return TAPi18n.__('granulometry_date') },
    type:                          function () { return TAPi18n.__('granulometry_type') },
    sampleWeight:                  function () { return TAPi18n.__('granulometry_sample_weight') },
    humidity:                      function () { return TAPi18n.__('granulometry_humidity') },
    'humidity.container':          function () { return TAPi18n.__('granulometry_humidity_container') },
    'humidity.massOfContainer':    function () { return TAPi18n.__('granulometry_humidity_mass_of_container') },
    'humidity.massOfWetAggregate': function () { return TAPi18n.__('granulometry_humidity_mass_of_wet_aggregate') },
    'humidity.massOfDryAggregate': function () { return TAPi18n.__('granulometry_humidity_mass_of_dry_aggregate') },
    thin:                          function () { return TAPi18n.__('granulometry_thin') },
    'thin.container':              function () { return TAPi18n.__('granulometry_thin_container') },
    'thin.massOfContainer':        function () { return TAPi18n.__('granulometry_thin_mass_of_container') },
    'thin.massBeforeWash':         function () { return TAPi18n.__('granulometry_thin_mass_before_wash') },
    'thin.massAfterWash':          function () { return TAPi18n.__('granulometry_thin_mass_after_wash') },
    granulometryWeight:            function () { return TAPi18n.__('granulometry_granulometry_weight') },
    dried:                         function () { return TAPi18n.__('granulometry_dried') },
    washed:                        function () { return TAPi18n.__('granulometry_washed') },
    test:                          function () { return TAPi18n.__('granulometry_test') },
    'test.$.sieve':                function () { return TAPi18n.__('granulometry_test_sieve') },
    'test.$.netWeight':            function () { return TAPi18n.__('granulometry_test_net_weight') },
    'test.$.grossWeight':          function () { return TAPi18n.__('granulometry_test_gross_weight') },
    idealCurves:                   function () { return TAPi18n.__('granulometry_ideal_curves') },
    userId:                        function () { return TAPi18n.__('user') },
    createdAt:                     function () { return TAPi18n.__('created_at') },
    updatedAt:                     function () { return TAPi18n.__('updated_at') }
  })
}