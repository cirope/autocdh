Schemas.ProvidedCrack = new SimpleSchema([Schemas.Base, {
  workId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Works.findOne(this.value)) return 'required'
    }
  },

  customerId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (! Customers.findOne(this.value)) return 'required'
    }
  },

  pressId: {
    type: String,
    index: true,
    regEx: SimpleSchema.RegEx.Id,
    custom: function () {
      if (this.isUpdate && ! Presses.findOne(this.value)) return 'required'
    },
    autoform: {
      firstOption: false,
      options: function () {
        return Presses.find({}, { sort: { createdAt: 1 } }).map(function (press) {
          return { value: press._id, label: press.name }
        })
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
        return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
          return { value: r._id, label: r.name }
        })
      }
    }
  },

  quantity: {
    type: Number,
    min: 1,
    defaultValue: 1,
    autoform: {
      step: 1
    }
  },

  tubeType: {
    type: String,
    defaultValue: '15x30',
    allowedValues: ['15x30', '10x20', /*'bending',*/ 'other'],
    optional: true,
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: '15x30',   label: TAPi18n.__('assay_tube_type_15x30') },
          { value: '10x20',   label: TAPi18n.__('assay_tube_type_10x20') },
          //{ value: 'bending', label: TAPi18n.__('assay_tube_type_bending') },
          { value: 'other',   label: TAPi18n.__('assay_tube_type_other') }
        ]
      }
    }
  },

  date: {
    type: Date,
    optional: true,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  crackDate: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  headerType: {
    type: String,
    defaultValue: 'neoprene_plates',
    allowedValues: ['neoprene_plates', 'sulfur_mortar'],
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: 'sulfur_mortar',   label: TAPi18n.__('provided_crack_header_type_sulfur_mortar') },
          { value: 'neoprene_plates', label: TAPi18n.__('provided_crack_header_type_neoprene_plates') }
        ]
      }
    }
  },

  defects: {
    type: String,
    optional: true,
    max: 65536,
    autoform: {
      rows: 3
    }
  },

  observations: {
    type: String,
    optional: true,
    max: 65536,
    autoform: {
      rows: 3
    }
  },

  tubes: {
    type: [Object],
    minCount: 1,
    maxCount: 1000,
    autoform: {
      template: 'tubes'
    }
  },

  'tubes.$.identification': {
    type: String,
    autoform: {
      label: false,
			template: 'bootstrap3'
    }
  },

  'tubes.$.castedAt': {
    type: Date,
    optional: true,
    autoform: {
      label: false,
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  'tubes.$.crackedAt': {
    type: Date,
    autoform: {
      label: false,
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  'tubes.$.age': {
    type: Number,
    min: 1,
    optional: true,
    custom: function () {
      if (this.siblingField('castedAt').value && ! this.value) return 'required'
    },
    autoform: {
      label: false,
      template: 'bootstrap3',
      readonly: true
    }
  },

  'tubes.$.diameter': {
    type: Number,
    decimal: true,
    defaultValue: 150,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required'

      var limits = {
        '15x30': { min: 140, max: 160 },
        '10x20': { min: 90, max: 110 },
        //'bending': { min: 10, max: 500 },
        'other': { min: 10, max: 500 }
      }[this.field('tubeType').value]

      if (this.value < limits.min) return 'minNumber'
      if (this.value > limits.max) return 'maxNumber'
    },
    autoform: {
      label: false,
      step: 1,
      template: 'bootstrap3',
      'data-stress-modifier': true
    }
  },

  'tubes.$.height': {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 300,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required'

      var limits = {
        '15x30': { min: 290, max: 310 },
        '10x20': { min: 190, max: 210 },
        //'bending': { min: 50, max: 600 },
        'other': { min: 50, max: 600 }
      }[this.field('tubeType').value]

      if (this.value < limits.min) return 'minNumber'
      if (this.value > limits.max) return 'maxNumber'
    },
    autoform: {
      label: false,
      step: 1,
      template: 'bootstrap3'
    }
  },

  /*
  'tubes.$.light': {
    type: Number,
    decimal: true,
    optional: true,
    defaultValue: 0,
    custom: function () {
      if (this.isUpdate && ! this.isSet) return 'required'

      if(this.field('tubeType').value !== 'bending'){
        this.value = 0;
      } else {
        if (this.value < 0) return 'minNumber'
      }
    },
    autoform: {
      label: false,
      step: 1,
      template: 'bootstrap3'
    }
  },
*/
  'tubes.$.load': {
    type: Number,
    decimal: true,
    autoform: {
      label: false,
			template: 'bootstrap3',
      'data-stress-modifier': 'load'
    }
  },

  'tubes.$.stress': {
    type: Number,
    decimal: true,
    min: 0.1,
    autoform: {
      label: false,
      template: 'bootstrap3',
      readonly: true
    }
  }
}])

if (Meteor.isClient) {
  Schemas.ProvidedCrack.labels({
    workId:                   function () { return TAPi18n.__('work') },
    customerId:               function () { return TAPi18n.__('customer') },
    pressId:                  function () { return TAPi18n.__('press') },
    responsibleId:            function () { return TAPi18n.__('responsible') },
    quantity:                 function () { return TAPi18n.__('provided_crack_quantity') },
    tubeType:                 function () { return TAPi18n.__('provided_crack_tube_type') },
    date:                     function () { return TAPi18n.__('provided_crack_date') },
    crackDate:                function () { return TAPi18n.__('provided_crack_crack_date') },
    headerType:               function () { return TAPi18n.__('provided_crack_header_type') },
    defects:                  function () { return TAPi18n.__('provided_crack_defects') },
    observations:             function () { return TAPi18n.__('provided_crack_observations') },
    tubes:                    function () { return TAPi18n.__('provided_crack_tubes') },
    'tubes.$.identification': function () { return TAPi18n.__('provided_crack_tubes_identification') },
    'tubes.$.castedAt':       function () { return TAPi18n.__('provided_crack_tubes_casted_at') },
    'tubes.$.crackedAt':      function () { return TAPi18n.__('provided_crack_tubes_cracked_at') },
    'tubes.$.age':            function () { return TAPi18n.__('provided_crack_tubes_age') },
    'tubes.$.diameter':       function () { return TAPi18n.__('provided_crack_tubes_diameter') },
    'tubes.$.height':         function () { return TAPi18n.__('provided_crack_tubes_height') },
    //'tubes.$.light':          function () { return TAPi18n.__('provided_crack_tubes_light') },
    'tubes.$.load':           function () { return TAPi18n.__('provided_crack_tubes_load') },
    'tubes.$.stress':         function () { return TAPi18n.__('provided_crack_tubes_stress') },
    organizationId:           function () { return TAPi18n.__('organization') },
    createdAt:                function () { return TAPi18n.__('created_at') },
    updatedAt:                function () { return TAPi18n.__('updated_at') }
  })
}
