Schemas.FieldDensity = new SimpleSchema([Schemas.Base, {
  responsibleId: {
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

  dateAssay: {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Granulometries.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  origin: {
    type: String,
    optional: true
  },

  receipt: {
    type: String,
    optional: true
  },

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
