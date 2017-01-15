Schemas.Limit = new SimpleSchema([Schemas.Base, {

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
            var other = Limits.findOne({
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


    liquid_hits_p1: {
        type: String,
        max: 255
    },
    liquid_code_p1: {
        type: String,
        max: 255
    },
    liquid_empty_mass_p1: {
        type: String,
        max: 255
    },
    liquid_wet_mass_p1: {
        type: String,
        max: 255
    },
    liquid_dry_mass_p1: {
        type: String,
        max: 255
    },
    liquid_humidity_p1: {
        type: String,
        max: 255
    },
    liquid_hits_p2: {
        type: String,
        max: 255
    },
    liquid_code_p2: {
        type: String,
        max: 255
    },
    liquid_empty_mass_p2: {
        type: String,
        max: 255
    },
    liquid_wet_mass_p2: {
        type: String,
        max: 255
    },
    liquid_dry_mass_p2: {
        type: String,
        max: 255
    },
    liquid_humidity_p2: {
        type: String,
        max: 255
    },
    liquid_hits_p3: {
        type: String,
        max: 255
    },
    liquid_code_p3: {
        type: String,
        max: 255
    },
    liquid_empty_mass_p3: {
        type: String,
        max: 255
    },
    liquid_wet_mass_p3: {
        type: String,
        max: 255
    },
    liquid_dry_mass_p3: {
        type: String,
        max: 255
    },
    liquid_humidity_p3: {
        type: String,
        max: 255
    },
    plastic_code_d1: {
        type: String,
        max: 255
    },
    plastic_empty_mass_d1: {
        type: String,
        max: 255
    },
    plastic_wet_mass_d1: {
        type: String,
        max: 255
    },
    plastic_dry_mass_d1: {
        type: String,
        max: 255
    },
    plastic_humidity_d1: {
        type: String,
        max: 255
    },
    plastic_code_d2: {
        type: String,
        max: 255
    },
    plastic_empty_mass_d2: {
        type: String,
        max: 255
    },
    plastic_wet_mass_d2: {
        type: String,
        max: 255
    },
    plastic_dry_mass_d2: {
        type: String,
        max: 255
    },
    plastic_humidity_d2: {
        type: String,
        max: 255
    },
    liquid: {
        type: String,
        max: 255
    },
    plastic: {
        type: String,
        max: 255
    },
    plastic_index: {
        type: String,
        max: 255
    },
    observations: {
        type: String,
        max: 255
    }

}])

if (Meteor.isClient) {
    Schemas.Limit.labels({
        sampleResponsibleId:      function () { return TAPi18n.__('limit_responsible') },
        fieldDate:                function () { return TAPi18n.__('limit_date') },
        sampleName:               function () { return TAPi18n.__('limit_name') },
        origin:                   function () { return TAPi18n.__('limit_origin') },
        liquid_hits_p1:           function () { return TAPi18n.__('limit_liquid_hits') },
        liquid_code_p1:           function () { return TAPi18n.__('limit_liquid_code') },
        liquid_empty_mass_p1:     function () { return TAPi18n.__('limit_liquid_empty_mass') },
        liquid_wet_mass_p1:       function () { return TAPi18n.__('limit_liquid_wet_mass') },
        liquid_dry_mass_p1:       function () { return TAPi18n.__('limit_liquid_dry_mass') },
        liquid_humidity_p1:       function () { return TAPi18n.__('limit_liquid_humidity') },
        liquid_hits_p2:           function () { return TAPi18n.__('limit_liquid_hits') },
        liquid_code_p2:           function () { return TAPi18n.__('limit_liquid_code') },
        liquid_empty_mass_p2:     function () { return TAPi18n.__('limit_liquid_empty_mass') },
        liquid_wet_mass_p2:       function () { return TAPi18n.__('limit_liquid_wet_mass') },
        liquid_dry_mass_p2:       function () { return TAPi18n.__('limit_liquid_dry_mass') },
        liquid_humidity_p2:       function () { return TAPi18n.__('limit_liquid_humidity') },
        liquid_hits_p3:           function () { return TAPi18n.__('limit_liquid_hits') },
        liquid_code_p3:           function () { return TAPi18n.__('limit_liquid_code') },
        liquid_empty_mass_p3:     function () { return TAPi18n.__('limit_liquid_empty_mass') },
        liquid_wet_mass_p3:       function () { return TAPi18n.__('limit_liquid_wet_mass') },
        liquid_dry_mass_p3:       function () { return TAPi18n.__('limit_liquid_dry_mass') },
        liquid_humidity_p3:       function () { return TAPi18n.__('limit_liquid_humidity') },
        plastic_code_d1:          function () { return TAPi18n.__('limit_plastic_code') },
        plastic_empty_mass_d1:    function () { return TAPi18n.__('limit_plastic_empty_mass') },
        plastic_wet_mass_d1:      function () { return TAPi18n.__('limit_plastic_wet_mass') },
        plastic_dry_mass_d1:      function () { return TAPi18n.__('limit_plastic_dry_mass') },
        plastic_humidity_d1:      function () { return TAPi18n.__('limit_plastic_humidity') },
        plastic_code_d2:          function () { return TAPi18n.__('limit_plastic_code') },
        plastic_empty_mass_d2:    function () { return TAPi18n.__('limit_plastic_empty_mass') },
        plastic_wet_mass_d2:      function () { return TAPi18n.__('limit_plastic_wet_mass') },
        plastic_dry_mass_d2:      function () { return TAPi18n.__('limit_plastic_dry_mass') },
        plastic_humidity_d2:      function () { return TAPi18n.__('limit_plastic_humidity') },
        liquid:                   function () { return TAPi18n.__('limit_liquid') },
        plastic:                  function () { return TAPi18n.__('limit_plastic') },
        plastic_index:            function () { return TAPi18n.__('limit_plastic_index') },
        observations:             function () { return TAPi18n.__('limit_observations') },
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}
