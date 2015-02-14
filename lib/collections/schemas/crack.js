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

  pressId: {
    type: String,
    index: true,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (this.docId && ! Presses.findOne(this.value)) return 'required'
    },
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          var presses = Presses.find({}, { sort: { createdAt: 1 } }).map(function (press) {
            return { value: press._id, label: press.name }
          })
          var group  = presses.length ? {
            optgroup: TAPi18n.__('presses'),
            options: presses
          } :  { optgroup: '', options: [''] }

          return [
            group,
            {
              optgroup: TAPi18n.__('actions'),
              options: [
                { value: 'new', label: TAPi18n.__('press_new') },
              ]
            }
          ]
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
          return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
            return { value: r._id, label: r.name }
          })
        }
      }
    }
  },

  moldingIn: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },

  crackIn: {
    type: Date,
    index: true,
    autoform: {
      afFieldInput: {
        type: 'hidden'
      }
    }
  },

  crackedIn: {
    type: Date,
    index: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
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
    decimal: true,
    optional: true,
    defaultValue: 150,
    custom: function () {
      if (this.docId && ! this.isSet) return 'required'

      var limits = this.field('tubeType').value === '15x30' ?
        { min: 140, max: 160 } : { min: 90, max: 110 }

      if (this.value < limits.min) return 'minNumber'
      if (this.value > limits.max) return 'maxNumber'
    },
    autoform: {
      template: 'measure',
      unit: 'mm',
      afFieldInput: {
        'data-stress-modifier': true
      }
    }
  },

  height: {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 300,
    custom: function () {
      if (this.docId && ! this.isSet) return 'required'

      var limits = this.field('tubeType').value === '15x30' ?
        { min: 290, max: 310 } : { min: 190, max: 210 }

      if (this.value < limits.min) return 'minNumber'
      if (this.value > limits.max) return 'maxNumber'
    },
    autoform: {
      template: 'measure',
      unit: 'mm'
    }
  },

  load: {
    type: Number,
    decimal: true,
    optional: true,
    custom: requiredOnUpdate,
    autoform: {
      afFieldInput: {
        'data-stress-modifier': true
      }
    }
  },

  stress: {
    type: Number,
    decimal: true,
    optional: true,
    custom: requiredOnUpdate,
    autoform: {
      template: 'measure',
      unit: 'MPa',
      afFieldInput: {
        readonly: true
      }
    }
  },

  otherAssay: {
    type: String,
    allowedValues: ['density', 'water_penetration', 'capillary_absorption'],
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: function () {
          return [
            { value: '',                     label: TAPi18n.__('no') },
            { value: 'density',              label: TAPi18n.__('assay_other_assay_density') },
            { value: 'water_penetration',    label: TAPi18n.__('assay_other_assay_water_penetration') },
            { value: 'capillary_absorption', label: TAPi18n.__('assay_other_assay_capillary_absorption') }
          ]
        }
      }
    }
  },

  observations: {
    type: String,
    optional: true,
    custom: function () {
      if (this.docId && this.field('otherAssay').value && ! this.value)
        return 'required'
    },
    autoform: {
      afFieldInput: {
        rows: 3
      }
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Crack.labels({
    sampleId:      function () { return TAPi18n.__('sample') },
    pressId:       function () { return TAPi18n.__('press') },
    responsibleId: function () { return TAPi18n.__('responsible') },
    moldingIn:     function () { return TAPi18n.__('crack_molding_in') },
    crackIn:       function () { return TAPi18n.__('crack_crack_in') },
    crackedIn:     function () { return TAPi18n.__('crack_cracked_in') },
    tubeType:      function () { return TAPi18n.__('crack_tube_type') },
    diameter:      function () { return TAPi18n.__('crack_diameter') },
    height:        function () { return TAPi18n.__('crack_height') },
    load:          function () { return TAPi18n.__('crack_load') },
    stress:        function () { return TAPi18n.__('crack_stress') },
    otherAssay:    function () { return TAPi18n.__('crack_other_assay') },
    observations:  function () { return TAPi18n.__('crack_observations') },
    userId:        function () { return TAPi18n.__('user') },
    createdAt:     function () { return TAPi18n.__('created_at') },
    updatedAt:     function () { return TAPi18n.__('updated_at') }
  })
}
