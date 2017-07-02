Schemas.Compaction = new SimpleSchema([Schemas.Base, {

  sampleResponsibleId: {
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

  fieldDate: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  sampleName: {
    type: String,
    max: 255,
    custom: function () {
      var other = Compactions.findOne({
        sampleName: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  origin: {
    type: String,
    max: 255
  },

  type: {
    type: String,
    defaultValue: 't99',
    allowedValues: ['t99', 't180', 'other'],
    optional: false,
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: 't99',   label: TAPi18n.__('compaction_type_t99') },
          { value: 't180',  label: TAPi18n.__('compaction_type_t180') },
          { value: 'other', label: TAPi18n.__('compaction_type_other') }
        ]
      }
    }
  },

  layers: {
    type: Number,
    decimal: false,
    min: 0
  },

  hits: {
    type: Number,
    decimal: false,
    min: 0
  },

  sieve: {
    type: String,
    defaultValue: '3_4',
    allowedValues: ['3_4', '1_2', '3_8', '4'],
    optional: false,
    autoform: {
      firstOption: false,
      options: function () {
        return [
          { value: '3_4', label: TAPi18n.__('compaction_sieve_3_4') },
          { value: '1_2', label: TAPi18n.__('compaction_sieve_1_2') },
          { value: '3_8', label: TAPi18n.__('compaction_sieve_3_8') },
          { value: '4',   label: TAPi18n.__('compaction_sieve_4') }
        ]
      }
    }
  },

  real_density: {
    type: Number,
    decimal: true,
    optional: true,
    custom: function () {
      if (!this.isSet) return 'required'

      var limits = {min: 1.5, max: 3.0};
      if (limits.min > this.value) return 'minNumber'
      if (limits.max < this.value) return 'maxNumber'
    }
  },

  total_weight: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  through: {
    type: Number,
    decimal: false,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  retained: {
    type: Number,
    decimal: false,
    min: 0,
    autoform: {
      template: 'measure',
      unit: 'g'
    }
  },

  retained_percentage: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      template: 'measure',
      unit: '%',
      readonly: true
    }
  },

  mold_code_p1: {
    type: String,
    max: 255,
    optional: true
  },
  volume_p1: {
    type: Number,
    decimal: false,
    min: 0
  },
  water_p1: {
    type: Number,
    decimal: false,
    min: 0
  },
  empty_mold_mass_p1: {
    type: Number,
    decimal: false,
    min: 0
  },
  mold_mass_p1: {
    type: Number,
    decimal: false,
    min: 0,
    optional: false
  },
  field_density_p1: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  container_code_p1: {
    type: String,
    max: 255,
    optional: true
  },
  empty_container_mass_p1: {
    type: Number,
    decimal: true,
    min: 0
  },
  wet_container_mass_p1: {
    type: Number,
    decimal: true,
    min: 0
  },
  dry_container_mass_p1: {
    type: Number,
    decimal: true,
    min: 0
  },
  container_humidity_p1: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  dry_density_p1: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  density_p1: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },

  mold_code_p2: {
    type: String,
    max: 255,
    optional: true
  },
  volume_p2: {
    type: Number,
    decimal: false,
    min: 0
  },
  water_p2: {
    type: Number,
    decimal: false,
    min: 0
  },
  empty_mold_mass_p2: {
    type: Number,
    decimal: false,
    min: 0
  },
  mold_mass_p2: {
    type: Number,
    decimal: false,
    min: 0,
    optional: false
  },
  field_density_p2: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  container_code_p2: {
    type: String,
    max: 255,
    optional: true
  },
  empty_container_mass_p2: {
    type: Number,
    decimal: true,
    min: 0
  },
  wet_container_mass_p2: {
    type: Number,
    decimal: true,
    min: 0
  },
  dry_container_mass_p2: {
    type: Number,
    decimal: true,
    min: 0
  },
  container_humidity_p2: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  dry_density_p2: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  density_p2: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },

  mold_code_p3: {
    type: String,
    max: 255,
    optional: true
  },
  volume_p3: {
    type: Number,
    decimal: false,
    min: 0
  },
  water_p3: {
    type: Number,
    decimal: false,
    min: 0
  },
  empty_mold_mass_p3: {
    type: Number,
    decimal: false,
    min: 0
  },
  mold_mass_p3: {
    type: Number,
    decimal: false,
    min: 0,
    optional: false
  },
  field_density_p3: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  container_code_p3: {
    type: String,
    max: 255,
    optional: true
  },
  empty_container_mass_p3: {
    type: Number,
    decimal: true,
    min: 0
  },
  wet_container_mass_p3: {
    type: Number,
    decimal: true,
    min: 0
  },
  dry_container_mass_p3: {
    type: Number,
    decimal: true,
    min: 0
  },
  container_humidity_p3: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  dry_density_p3: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  density_p3: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },

  mold_code_p4: {
    type: String,
    max: 255,
    optional: true
  },
  volume_p4: {
    type: Number,
    decimal: false,
    min: 0
  },
  water_p4: {
    type: Number,
    decimal: false,
    min: 0
  },
  empty_mold_mass_p4: {
    type: Number,
    decimal: false,
    min: 0
  },
  mold_mass_p4: {
    type: Number,
    decimal: false,
    min: 0,
    optional: false
  },
  field_density_p4: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  container_code_p4: {
    type: String,
    max: 255,
    optional: true
  },
  empty_container_mass_p4: {
    type: Number,
    decimal: true,
    min: 0
  },
  wet_container_mass_p4: {
    type: Number,
    decimal: true,
    min: 0
  },
  dry_container_mass_p4: {
    type: Number,
    decimal: true,
    min: 0
  },
  container_humidity_p4: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  dry_density_p4: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  density_p4: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },

  mold_code_p5: {
    type: String,
    max: 255,
    optional: true
  },
  volume_p5: {
    type: Number,
    optional: true,
    decimal: false,
    min: 0
  },
  water_p5: {
    type: Number,
    optional: true,
    decimal: false,
    min: 0
  },
  empty_mold_mass_p5: {
    type: Number,
    optional: true,
    decimal: false,
    min: 0
  },
  mold_mass_p5: {
    type: Number,
    optional: true,
    decimal: false,
    min: 0
  },
  field_density_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  container_code_p5: {
    type: String,
    max: 255,
    optional: true
  },
  empty_container_mass_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0
  },
  wet_container_mass_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0
  },
  dry_container_mass_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0
  },
  container_humidity_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  dry_density_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },
  density_p5: {
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    autoform: {
      readonly: true
    }
  },

  observations: {
    type: String,
    optional: true,
    max: 65536,
    autoform: {
      rows: 3
    }
  }

}])

if (Meteor.isClient) {
  Schemas.Compaction.labels({
    sampleResponsibleId:      function () { return TAPi18n.__('compaction_responsible') },
    fieldDate:                function () { return TAPi18n.__('compaction_date') },
    sampleName:               function () { return TAPi18n.__('compaction_name') },
    origin:                   function () { return TAPi18n.__('compaction_origin') },
    type:                     function () { return TAPi18n.__('compaction_type') },
    layers:                   function () { return TAPi18n.__('compaction_layers') },
    hits:                     function () { return TAPi18n.__('compaction_hits') },
    sieve:                    function () { return TAPi18n.__('compaction_sieve') },
    real_density:             function () { return TAPi18n.__('compaction_real_density') },
    total_weight:             function () { return TAPi18n.__('compaction_total_weight') },
    through:                  function () { return TAPi18n.__('compaction_through') },
    retained:                 function () { return TAPi18n.__('compaction_retained') },
    retained_percentage:      function () { return TAPi18n.__('compaction_retained_percentage') },
    mold_code_p1:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p1:                function () { return TAPi18n.__('compaction_volume') },
    water_p1:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p1:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p1:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p1:         function () { return TAPi18n.__('compaction_field_density') },
    container_code_p1:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p1:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p1:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p1:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p1:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p1:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p1:               function () { return TAPi18n.__('compaction_density') },
    mold_code_p2:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p2:                function () { return TAPi18n.__('compaction_volume') },
    water_p2:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p2:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p2:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p2:         function () { return TAPi18n.__('compaction_field_density') },
    container_code_p2:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p2:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p2:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p2:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p2:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p2:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p2:               function () { return TAPi18n.__('compaction_density') },
    mold_code_p3:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p3:                function () { return TAPi18n.__('compaction_volume') },
    water_p3:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p3:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p3:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p3:         function () { return TAPi18n.__('compaction_field_density') },
    container_code_p3:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p3:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p3:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p3:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p3:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p3:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p3:               function () { return TAPi18n.__('compaction_density') },
    mold_code_p4:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p4:                function () { return TAPi18n.__('compaction_volume') },
    water_p4:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p4:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p4:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p4:         function () { return TAPi18n.__('compaction_field_density') },
    container_code_p4:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p4:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p4:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p4:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p4:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p4:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p4:               function () { return TAPi18n.__('compaction_density') },
    mold_code_p5:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p5:                function () { return TAPi18n.__('compaction_volume') },
    water_p5:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p5:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p5:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p5:         function () { return TAPi18n.__('compaction_field_density') },
    container_code_p5:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p5:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p5:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p5:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p5:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p5:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p5:               function () { return TAPi18n.__('compaction_density') },
    observations:             function () { return TAPi18n.__('compaction_observations') },
    organizationId:           function () { return TAPi18n.__('organization') },
    createdAt:                function () { return TAPi18n.__('created_at') },
    updatedAt:                function () { return TAPi18n.__('updated_at') }
  })
}
