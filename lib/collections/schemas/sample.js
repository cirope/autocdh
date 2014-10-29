Schemas.Sample = new SimpleSchema([Schemas.Base, {
  plantId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Plants.findOne(this.value)) return 'required'
    }
  },

  responsibleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Responsible.findOne(this.value)) return 'required'
    }
  },

  molding: {
    type: String,
    allowedValues: ['plant', 'work', 'remote']
  },

  date: {
    type: Date
  },

  temperature: {
    type: Number,
    decimal: true,
    optional: true,
    min: -100,
    max: 100
  },

  humidity: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 100
  }
}])

Schemas.Sample.labels({
  plantId:       function () { return TAPi18n.__('plant') },
  responsibleId: function () { return TAPi18n.__('responsible') },
  molding:       function () { return TAPi18n.__('sample_molding') },
  date:          function () { return TAPi18n.__('sample_date') },
  temperature:   function () { return TAPi18n.__('sample_temperature') },
  humidity:      function () { return TAPi18n.__('sample_humidity') },
  userId:        function () { return TAPi18n.__('user') },
  createdAt:     function () { return TAPi18n.__('created_at') },
  updatedAt:     function () { return TAPi18n.__('updated_at') }
})
