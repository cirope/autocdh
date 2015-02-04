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
    type: String,
    allowedValues: ['150 mm', '100 mm'],
    optional: true,
    custom: requiredOnUpdate,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: 'allowed'
      }
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
  load:         function () { return TAPi18n.__('crack_load') },
  stress:       function () { return TAPi18n.__('crack_stress') },
  otherAssays:  function () { return TAPi18n.__('crack_other_assays') },
  userId:       function () { return TAPi18n.__('user') },
  createdAt:    function () { return TAPi18n.__('created_at') },
  updatedAt:    function () { return TAPi18n.__('updated_at') }
})
