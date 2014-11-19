Schemas.Crack = new SimpleSchema([Schemas.Base, {
  sampleId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Samples.findOne(this.value)) return 'required'
    }
  },

  moldingIn: {
    type: Date
  },

  crackedIn: {
    type: Date
  },

  testTubeType: {
    type: String,
    allowedValues: ['15x30', '10x20']
  },

  diameter: {
    type: String,
    allowedValues: ['150 mm', '100 mm']
  },

  load: {
    type: Number,
    decimal: true
  },

  stress: {
    type: Number,
    decimal: true
  },

  otherAssays: {
    type: String
  }
}])

Schemas.Crack.labels({
  sampleId:     function () { return TAPi18n.__('sample') },
  moldingIn:    function () { return TAPi18n.__('crack_molding_in') },
  crackedIn:    function () { return TAPi18n.__('crack_cracked_in') },
  testTubeType: function () { return TAPi18n.__('crack_test_tube_type') },
  diameter:     function () { return TAPi18n.__('crack_diameter') },
  load:         function () { return TAPi18n.__('crack_load') },
  stress:       function () { return TAPi18n.__('crack_stress') },
  otherAssays:  function () { return TAPi18n.__('crack_other_assays') },
  userId:       function () { return TAPi18n.__('user') },
  createdAt:    function () { return TAPi18n.__('created_at') },
  updatedAt:    function () { return TAPi18n.__('updated_at') }
})
