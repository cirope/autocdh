Schemas.Sample = new SimpleSchema([Schemas.Base, {
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
          return Plants.find().map(function (plant) {
            return { value: plant._id, label: plant.name }
          })
        }
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
      afFieldInput: {
        firstOption: false,
        options: function () {
          return Responsible.find().map(function (responsible) {
            return { value: responsible._id, label: responsible.name }
          })
        }
      }
    }
  },

  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Samples.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    },
    autoform: {
      afFieldInput: {
        autofocus: true,
        placeholder: function () {
          return TAPi18n.__('sample_name_placeholder')
        }
      }
    }
  },

  molding: {
    type: String,
    allowedValues: ['plant', 'work', 'remote'],
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: 'plant',  label: TAPi18n.__('sample_molding_plant') },
            { value: 'work',   label: TAPi18n.__('sample_molding_work') },
            { value: 'remote', label: TAPi18n.__('sample_molding_remote') }
          ]
        }
      }
    }
  },

  date: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'datetime-local'
      }
    }
  },

  temperature: {
    type: Number,
    decimal: true,
    optional: true,
    min: -20,
    max: 55
  },

  humidity: {
    type: Number,
    decimal: true,
    optional: true,
    min: 1,
    max: 99
  }
}])

Schemas.Sample.labels({
  plantId:       function () { return TAPi18n.__('plant') },
  responsibleId: function () { return TAPi18n.__('responsible') },
  name:          function () { return TAPi18n.__('sample_name') },
  molding:       function () { return TAPi18n.__('sample_molding') },
  date:          function () { return TAPi18n.__('sample_date') },
  temperature:   function () { return TAPi18n.__('sample_temperature') },
  humidity:      function () { return TAPi18n.__('sample_humidity') },
  userId:        function () { return TAPi18n.__('user') },
  createdAt:     function () { return TAPi18n.__('created_at') },
  updatedAt:     function () { return TAPi18n.__('updated_at') }
})
