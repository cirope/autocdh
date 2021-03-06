Schemas.Granulometry = new SimpleSchema([Schemas.Base, {
  responsibleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Responsible.findOne(this.value)) return 'required'
    },
    autoform: {
      autofocus: true,
      firstOption: false,
      options: function () {
        return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
          return { value: r._id, label: r.name }
        })
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
      firstOption: false,
      options: function () {
        return Plants.find({}, { sort: { name: 1 } }).map(function (plant) {
          return { value: plant._id, label: plant.name }
        })
      }
    }
  },

  materialId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      var type      = this.field('type').value || 'sand'
      var material  = Materials.first()
      var materials = material && material[type + 's']

      if (! _.contains(_.pluck(materials, '_id'), this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      options: function () {
        var type      = Session.get('granulometryType') || 'sand'
        var material  = Materials.findOne()
        var materials = material ? material[type + 's'] : []

        return _.map(_.sortBy(materials, 'default').reverse(), function (material) {
          return { value: material._id, label: material.name }
        })
      }
    }
  },

  providerId: {
    type: String,
    index: true,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (this.value && ! Providers.findOne(this.value)) return 'required'
    }
  },

  type: {
    type: String,
    allowedValues: ['sand', 'gravel'],
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: 'sand',   label: TAPi18n.__('granulometry_type_sand') },
          { value: 'gravel', label: TAPi18n.__('granulometry_type_gravel') }
        ]
      }
    }
  },

  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Granulometries.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  date: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  sampleWeight: {
    type: Number,
    decimal: true,
    optional: true,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  origin: {
    type: String,
    optional: true
  },

  receipt: {
    type: String,
    optional: true
  },

  humidity: {
    type: Object,
    optional: true
  },

  'humidity.container': {
    type: String,
    optional: true
  },

  'humidity.massOfContainer': {
    type: Number,
    decimal: true,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g',
      value: function () {
        return Session.get('humidity.massOfContainer')
      }
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

  'humidity.percentage': {
    type: Number,
    decimal: true,
    optional: true,
    autoform: {
      omit: true
    }
  },

  thin: {
    type: Object,
    optional: true
  },

  'thin.container': {
    type: String,
    optional: true
  },

  'thin.massOfContainer': {
    type: Number,
    decimal: true,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g',
      value: function () {
        return Session.get('thin.massOfContainer')
      }
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

  'thin.percentage': {
    type: Number,
    decimal: true,
    optional: true,
    autoform: {
      omit: true
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
    maxCount: 11,
    autoform: {
      template: 'slim',
      cols: 3
    }
  },

  'test.$.sieve': {
    type: String,
    autoform: {
      readonly: true
    }
  },

  'test.$.netWeight': {
    type: Number,
    decimal: true,
    min: 0,
    autoform: {
      unit: 'g'
    }
  },

  'test.$.grossWeight': {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    custom: function () {
      if (this.field('type').value === 'sand' && ! _.isNumber(this.value))
        return 'required'
    },
    autoform: {
      unit: 'g'
    }
  },

  fineness: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0
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
  }
}])

if (Meteor.isClient) {
  Schemas.Granulometry.labels({
    responsibleId:                 function () { return TAPi18n.__('responsible') },
    plantId:                       function () { return TAPi18n.__('plant') },
    materialId:                    function () { return TAPi18n.__('material') },
    providerId:                    function () { return TAPi18n.__('provider') },
    name:                          function () { return TAPi18n.__('granulometry_name') },
    date:                          function () { return TAPi18n.__('granulometry_date') },
    type:                          function () { return TAPi18n.__('granulometry_type') },
    sampleWeight:                  function () { return TAPi18n.__('granulometry_sample_weight') },
    origin:                        function () { return TAPi18n.__('granulometry_origin') },
    receipt:                       function () { return TAPi18n.__('granulometry_receipt') },
    humidity:                      function () { return TAPi18n.__('granulometry_humidity') },
    'humidity.container':          function () { return TAPi18n.__('granulometry_humidity_container') },
    'humidity.massOfContainer':    function () { return TAPi18n.__('granulometry_humidity_mass_of_container') },
    'humidity.massOfWetAggregate': function () { return TAPi18n.__('granulometry_humidity_mass_of_wet_aggregate') },
    'humidity.massOfDryAggregate': function () { return TAPi18n.__('granulometry_humidity_mass_of_dry_aggregate') },
    'humidity.percentage':         function () { return TAPi18n.__('granulometry_humidity_percentage') },
    thin:                          function () { return TAPi18n.__('granulometry_thin') },
    'thin.container':              function () { return TAPi18n.__('granulometry_thin_container') },
    'thin.massOfContainer':        function () { return TAPi18n.__('granulometry_thin_mass_of_container') },
    'thin.massBeforeWash':         function () { return TAPi18n.__('granulometry_thin_mass_before_wash') },
    'thin.massAfterWash':          function () { return TAPi18n.__('granulometry_thin_mass_after_wash') },
    'thin.percentage':             function () { return TAPi18n.__('granulometry_thin_percentage') },
    granulometryWeight:            function () { return TAPi18n.__('granulometry_granulometry_weight') },
    dried:                         function () { return TAPi18n.__('granulometry_dried') },
    washed:                        function () { return TAPi18n.__('granulometry_washed') },
    test:                          function () { return TAPi18n.__('granulometry_test') },
    'test.$.sieve':                function () { return TAPi18n.__('granulometry_test_sieve') },
    'test.$.netWeight':            function () { return TAPi18n.__('granulometry_test_net_weight') },
    'test.$.grossWeight':          function () { return TAPi18n.__('granulometry_test_gross_weight') },
    fineness:                      function () { return TAPi18n.__('granulometry_test_fineness') },
    idealCurves:                   function () { return TAPi18n.__('granulometry_ideal_curves') },
    organizationId:                function () { return TAPi18n.__('organization') },
    createdAt:                     function () { return TAPi18n.__('created_at') },
    updatedAt:                     function () { return TAPi18n.__('updated_at') }
  })
}
