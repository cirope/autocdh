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
    max: 255
  },
  layers: {
    type: String,
    max: 255
  },
  hits: {
    type: String,
    max: 255
  },
  sieve: {
    type: String,
    max: 255
  },
  real_density: {
    type: String,
    max: 255
  },
  total_weight: {
    type: String,
    max: 255
  },
  separation: {
    type: String,
    max: 255
  },
  through: {
    type: String,
    max: 255
  },
  retained: {
    type: String,
    max: 255
  },
  retained_percentage: {
    type: String,
    max: 255
  },
  mold_code_p1: {
    type: String,
    max: 255
  },
  volume_p1: {
    type: String,
    max: 255
  },
  water_p1: {
    type: String,
    max: 255
  },
  empty_mold_mass_p1: {
    type: String,
    max: 255
  },
  mold_mass_p1: {
    type: String,
    max: 255
  },
  field_density_p1: {
    type: String,
    max: 255
  },
  humidity_content_p1: {
    type: String,
    max: 255
  },
  container_code_p1: {
    type: String,
    max: 255
  },
  empty_container_mass_p1: {
    type: String,
    max: 255
  },
  wet_container_mass_p1: {
    type: String,
    max: 255
  },
  dry_container_mass_p1: {
    type: String,
    max: 255
  },
  container_humidity_p1: {
    type: String,
    max: 255
  },
  dry_density_p1: {
    type: String,
    max: 255
  },
  density_p1: {
    type: String,
    max: 255
  },
  mold_code_p2: {
    type: String,
    max: 255
  },
  volume_p2: {
    type: String,
    max: 255
  },
  water_p2: {
    type: String,
    max: 255
  },
  empty_mold_mass_p2: {
    type: String,
    max: 255
  },
  mold_mass_p2: {
    type: String,
    max: 255
  },
  field_density_p2: {
    type: String,
    max: 255
  },
  humidity_content_p2: {
    type: String,
    max: 255
  },
  container_code_p2: {
    type: String,
    max: 255
  },
  empty_container_mass_p2: {
    type: String,
    max: 255
  },
  wet_container_mass_p2: {
    type: String,
    max: 255
  },
  dry_container_mass_p2: {
    type: String,
    max: 255
  },
  container_humidity_p2: {
    type: String,
    max: 255
  },
  dry_density_p2: {
    type: String,
    max: 255
  },
  density_p2: {
    type: String,
    max: 255
  },
  mold_code_p3: {
    type: String,
    max: 255
  },
  volume_p3: {
    type: String,
    max: 255
  },
  water_p3: {
    type: String,
    max: 255
  },
  empty_mold_mass_p3: {
    type: String,
    max: 255
  },
  mold_mass_p3: {
    type: String,
    max: 255
  },
  field_density_p3: {
    type: String,
    max: 255
  },
  humidity_content_p3: {
    type: String,
    max: 255
  },
  container_code_p3: {
    type: String,
    max: 255
  },
  empty_container_mass_p3: {
    type: String,
    max: 255
  },
  wet_container_mass_p3: {
    type: String,
    max: 255
  },
  dry_container_mass_p3: {
    type: String,
    max: 255
  },
  container_humidity_p3: {
    type: String,
    max: 255
  },
  dry_density_p3: {
    type: String,
    max: 255
  },
  density_p3: {
    type: String,
    max: 255
  },
  mold_code_p4: {
    type: String,
    max: 255
  },
  volume_p4: {
    type: String,
    max: 255
  },
  water_p4: {
    type: String,
    max: 255
  },
  empty_mold_mass_p4: {
    type: String,
    max: 255
  },
  mold_mass_p4: {
    type: String,
    max: 255
  },
  field_density_p4: {
    type: String,
    max: 255
  },
  humidity_content_p4: {
    type: String,
    max: 255
  },
  container_code_p4: {
    type: String,
    max: 255
  },
  empty_container_mass_p4: {
    type: String,
    max: 255
  },
  wet_container_mass_p4: {
    type: String,
    max: 255
  },
  dry_container_mass_p4: {
    type: String,
    max: 255
  },
  container_humidity_p4: {
    type: String,
    max: 255
  },
  dry_density_p4: {
    type: String,
    max: 255
  },
  density_p4: {
    type: String,
    max: 255
  },
  mold_code_p5: {
    type: String,
    max: 255
  },
  volume_p5: {
    type: String,
    max: 255
  },
  water_p5: {
    type: String,
    max: 255
  },
  empty_mold_mass_p5: {
    type: String,
    max: 255
  },
  mold_mass_p5: {
    type: String,
    max: 255
  },
  field_density_p5: {
    type: String,
    max: 255
  },
  humidity_content_p5: {
    type: String,
    max: 255
  },
  container_code_p5: {
    type: String,
    max: 255
  },
  empty_container_mass_p5: {
    type: String,
    max: 255
  },
  wet_container_mass_p5: {
    type: String,
    max: 255
  },
  dry_container_mass_p5: {
    type: String,
    max: 255
  },
  container_humidity_p5: {
    type: String,
    max: 255
  },
  dry_density_p5: {
    type: String,
    max: 255
  },
  density_p5: {
    type: String,
    max: 255
  },
  max_density: {
    type: String,
    max: 255
  },
  max_humidity: {
    type: String,
    max: 255
  },
  observations: {
    type: String,
    max: 255
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
    separation:               function () { return TAPi18n.__('compaction_separation') },
    through:                  function () { return TAPi18n.__('compaction_through') },
    retained:                 function () { return TAPi18n.__('compaction_retained') },
    retained_percentage:      function () { return TAPi18n.__('compaction_retained_per') },
    mold_code_p1:             function () { return TAPi18n.__('compaction_mold_code') },
    volume_p1:                function () { return TAPi18n.__('compaction_volume') },
    water_p1:                 function () { return TAPi18n.__('compaction_water') },
    empty_mold_mass_p1:       function () { return TAPi18n.__('compaction_empty_mold_mass') },
    mold_mass_p1:             function () { return TAPi18n.__('compaction_mold_mass') },
    field_density_p1:         function () { return TAPi18n.__('compaction_field_density') },
    humidity_content_p1:      function () { return TAPi18n.__('compaction_humidity_content') },
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
    humidity_content_p2:      function () { return TAPi18n.__('compaction_humidity_content') },
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
    humidity_content_p3:      function () { return TAPi18n.__('compaction_humidity_content') },
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
    humidity_content_p4:      function () { return TAPi18n.__('compaction_humidity_content') },
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
    humidity_content_p5:      function () { return TAPi18n.__('compaction_humidity_content') },
    container_code_p5:        function () { return TAPi18n.__('compaction_container_code') },
    empty_container_mass_p5:  function () { return TAPi18n.__('compaction_empty_container_mass') },
    wet_container_mass_p5:    function () { return TAPi18n.__('compaction_wet_container_mass') },
    dry_container_mass_p5:    function () { return TAPi18n.__('compaction_dry_container_mass') },
    container_humidity_p5:    function () { return TAPi18n.__('compaction_container_humidity') },
    dry_density_p5:           function () { return TAPi18n.__('compaction_dry_density') },
    density_p5:               function () { return TAPi18n.__('compaction_density') },
    max_density:              function () { return TAPi18n.__('compaction_max_density') },
    max_humidity:             function () { return TAPi18n.__('compaction_max_humidity') },
    observations:             function () { return TAPi18n.__('compaction_observations') },
    organizationId:           function () { return TAPi18n.__('organization') },
    createdAt:                function () { return TAPi18n.__('created_at') },
    updatedAt:                function () { return TAPi18n.__('updated_at') }
  })
}
