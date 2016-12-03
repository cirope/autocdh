Schemas.FieldDensity = new SimpleSchema([Schemas.Base, {

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
    optional: true
  },

  work: {
    type: String,
    optional: true
  },

  zone: {
    type: String,
    optional: true
  },

  coordinate: {
    type: String,
    optional: true
  },

  sandConeCode: {
    type: String,
    optional: true
  },

  moistMassMaterial: {
    type: String,
    optional: true
  },

  massTotal: {
    type: String,
    optional: true
  },

  massOver: {
    type: String,
    optional: true
  },

  sampleObservations: {
    type: String,
    optional: true
  },

  assayResponsibleId: {
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

  labDate: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  massUsed: {
    type: String,
    optional: true
  },

  massBelow: {
    type: String,
    optional: true
  },

  massSandHole: {
    type: String,
    optional: true
  },

  bulkDensity: {
    type: String,
    optional: true
  },

  volumeTestHole: {
    type: String,
    optional: true
  },

  wetDensity: {
    type: String,
    optional: true
  },

  dryingContainerCode: {
    type: String,
    optional: true
  },

  massContainer: {
    type: String,
    optional: true
  },

  massContainerWet: {
    type: String,
    optional: true
  },

  massContainerDry: {
    type: String,
    optional: true
  },

  waterMass: {
    type: String,
    optional: true
  },

  massWet: {
    type: String,
    optional: true
  },

  humidity: {
    type: String,
    optional: true
  },

  dryDensity: {
    type: String,
    optional: true
  },

  maxDryDensity: {
    type: String,
    optional: true
  },

  percentage: {
    type: String,
    optional: true
  },

  assayObservations: {
    type: String,
    optional: true
  }

}])

if (Meteor.isClient) {
  Schemas.FieldDensity.labels({
    sampleResponsibleId:      function () { return TAPi18n.__('field_density_sample_responsible') },
    sampleName:               function () { return TAPi18n.__('field_density_sample_name') },
    zone:                     function () { return TAPi18n.__('field_density_zone') },
    fieldDate:                function () { return TAPi18n.__('field_density_field_date') },
    work:                     function () { return TAPi18n.__('field_density_work') },
    coordinate:               function () { return TAPi18n.__('field_density_coordinate') },
    sandConeCode:             function () { return TAPi18n.__('field_density_sand_cone_code') },
    moistMassMaterial:        function () { return TAPi18n.__('field_density_moist_mass_material') },
    massTotal:                function () { return TAPi18n.__('field_density_mass_total') },
    massOver:                 function () { return TAPi18n.__('field_density_mass_over') },
    sampleObservations:       function () { return TAPi18n.__('field_density_sample_observations') },
    assayResponsibleId:       function () { return TAPi18n.__('field_density_assay_responsible') },
    labDate:                  function () { return TAPi18n.__('field_density_lab_date') },
    massUsed:                 function () { return TAPi18n.__('field_density_mass_used') },
    massBelow:                function () { return TAPi18n.__('field_density_mass_below') },
    massSandHole:             function () { return TAPi18n.__('field_density_mass_sand_hole') },
    bulkDensity:              function () { return TAPi18n.__('field_density_bulk_density') },
    volumeTestHole:           function () { return TAPi18n.__('field_density_volume_test_hole') },
    wetDensity:               function () { return TAPi18n.__('field_density_wet_density') },
    dryingContainerCode:      function () { return TAPi18n.__('field_density_drying_container_code') },
    massContainer:            function () { return TAPi18n.__('field_density_mass_container') },
    massContainerWet:         function () { return TAPi18n.__('field_density_mass_container_wet') },
    massContainerDry:         function () { return TAPi18n.__('field_density_mass_container_dry') },
    waterMass:                function () { return TAPi18n.__('field_density_water_mass') },
    massWet:                  function () { return TAPi18n.__('field_density_mass_wet') },
    humidity:                 function () { return TAPi18n.__('field_density_humidity') },
    dryDensity:               function () { return TAPi18n.__('field_density_dry_density') },
    maxDryDensity:            function () { return TAPi18n.__('field_density_max_dry_density') },
    percentage:               function () { return TAPi18n.__('field_density_percentage') },
    assayObservations:        function () { return TAPi18n.__('field_density_assay_observations') },
    organizationId:           function () { return TAPi18n.__('organization') },
    createdAt:                function () { return TAPi18n.__('created_at') },
    updatedAt:                function () { return TAPi18n.__('updated_at') }
  })
}
