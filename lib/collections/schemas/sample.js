Schemas.Sample = new SimpleSchema([Schemas.Base, {
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
        var plants = Plants.find({}, { sort: { name: 1 } }).map(function (plant) {
          return { value: plant._id, label: plant.name }
        })
        var group  = plants.length ? {
          optgroup: TAPi18n.__('plants'),
          options: plants
        } :  { optgroup: ' ', options: [{ value: '', label: '' }] }
        var options = [
          group,
          {
            optgroup: TAPi18n.__('actions'),
            options: [
              { value: 'new', label: TAPi18n.__('plant_new') },
            ]
          }
        ]

        return options
      }
    }
  },

  responsibleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Responsible.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      options: function () {
        var responsible = Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
          return { value: r._id, label: r.name }
        })
        var group  = responsible.length ? {
          optgroup: TAPi18n.__('responsible'),
          options: responsible
        } :  { optgroup: ' ', options: [{ value: '', label: '' }] }

        return [
          group,
          {
            optgroup: TAPi18n.__('actions'),
            options: [
              { value: 'new', label: TAPi18n.__('responsible_new') },
            ]
          }
        ]
      }
    }
  },

  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Samples.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    },
    autoform: {
      autofocus: true,
      placeholder: function () {
        return TAPi18n.__('sample_name_placeholder')
      }
    }
  },

  molding: {
    type: String,
    allowedValues: ['plant', 'work', 'remote'],
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: 'plant',  label: TAPi18n.__('sample_molding_plant') },
          { value: 'work',   label: TAPi18n.__('sample_molding_work') },
          { value: 'remote', label: TAPi18n.__('sample_molding_remote') }
        ]
      }
    }
  },

  date: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-side-by-side': true
    }
  },

  temperature: {
    type: Number,
    decimal: true,
    optional: true,
    min: -20,
    max: 55,
    autoform: {
      template: 'measure',
      unit: '°C'
    }
  },

  humidity: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 99,
    autoform: {
      template: 'measure',
      unit: '%'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Sample.labels({
    plantId:        function () { return TAPi18n.__('plant') },
    responsibleId:  function () { return TAPi18n.__('responsible') },
    name:           function () { return TAPi18n.__('sample_name') },
    molding:        function () { return TAPi18n.__('sample_molding') },
    date:           function () { return TAPi18n.__('sample_date') },
    temperature:    function () { return TAPi18n.__('sample_temperature') },
    humidity:       function () { return TAPi18n.__('sample_humidity') },
    organizationId: function () { return TAPi18n.__('organization') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
