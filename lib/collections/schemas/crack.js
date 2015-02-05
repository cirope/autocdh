var requiredOnUpdate = function () {
  if (this.docId && ! this.isSet) return 'required'
}

Schemas.Crack = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        type: 'hidden'
      }
    }
  },

  moldingIn: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        'data-date-pickTime': false
      }
    }
  },

  crackedIn: {
    type: Date,
    index: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        'data-date-pickTime': false
      }
    }
  },

  tubeType: {
    type: String,
    allowedValues: ['15x30', '10x20'],
    optional: true,
    defaultValue: '15x30',
    custom: requiredOnUpdate,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: 'allowed'
      }
    }
  },

  designation: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'hidden'
      }
    }
  },

  diameter: {
    type: Number,
    optional: true,
    defaultValue: 150,
    custom: requiredOnUpdate,
    min: 10,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'mm'
    }
  },

  height: {
    type: Number,
    optional: true,
    defaultValue: 300,
    custom: requiredOnUpdate,
    min: 10,
    max: 1000,
    autoform: {
      template: 'measure',
      unit: 'mm'
    }
  },

  load: {
    type: Number,
    decimal: true,
    optional: true,
    custom: requiredOnUpdate
  },

  stress: {
    type: Number,
    decimal: true,
    optional: true,
    custom: requiredOnUpdate,
    autoform: {
      template: 'measure',
      unit: 'MPa'
    }
  },

  otherAssays: {
    type: String,
    optional: true
  }
}])

Schemas.Crack.labels({
  sampleId:     function () { return TAPi18n.__('sample') },
  moldingIn:    function () { return TAPi18n.__('crack_molding_in') },
  crackedIn:    function () { return TAPi18n.__('crack_cracked_in') },
  tubeType:     function () { return TAPi18n.__('crack_tube_type') },
  diameter:     function () { return TAPi18n.__('crack_diameter') },
  height:       function () { return TAPi18n.__('crack_height') },
  load:         function () { return TAPi18n.__('crack_load') },
  stress:       function () { return TAPi18n.__('crack_stress') },
  otherAssays:  function () { return TAPi18n.__('crack_other_assays') },
  userId:       function () { return TAPi18n.__('user') },
  createdAt:    function () { return TAPi18n.__('created_at') },
  updatedAt:    function () { return TAPi18n.__('updated_at') }
})
