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
        type: Number,
        decimal: false,
        min: 0
    },
    liquid_code_p1: {
        type: String,
        max: 255,
        optional: true
    },
    liquid_empty_mass_p1: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_wet_mass_p1: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_dry_mass_p1: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_humidity_p1: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    liquid_hits_p2: {
        type: Number,
        decimal: false,
        min: 0,
        custom: function () {
            if (this.isSet) {
                //if(this.value < this.field('liquid_hits_p1').value) {
                //    return 'error_minor_than'
                //}
            }
        }
    },
    liquid_code_p2: {
        type: String,
        max: 255,
        optional: true
    },
    liquid_empty_mass_p2: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_wet_mass_p2: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_dry_mass_p2: {
        type: Number,
        decimal: true,
        min: 0
    },
    liquid_humidity_p2: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    liquid_hits_p3: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        custom: function () {
            if (this.isSet) {
                //if(this.value < this.field('liquid_hits_p1').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p2').value) {
                //    return 'error_minor_than'
                //}
            }
        }
    },
    liquid_code_p3: {
        type: String,
        max: 255,
        optional: true
    },
    liquid_empty_mass_p3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_wet_mass_p3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_dry_mass_p3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_humidity_p3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },


    liquid_hits_p4: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        custom: function () {
            if (this.isSet) {
                //if(this.value < this.field('liquid_hits_p1').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p2').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p3').value) {
                //    return 'error_minor_than'
                //}
            }
        }
    },
    liquid_code_p4: {
        type: String,
        max: 255,
        optional: true
    },
    liquid_empty_mass_p4: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_wet_mass_p4: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_dry_mass_p4: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_humidity_p4: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },


    liquid_hits_p5: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        custom: function () {
            if (this.isSet) {
                //if(this.value < this.field('liquid_hits_p1').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p2').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p3').value) {
                //    return 'error_minor_than'
                //}
                //if(this.value < this.field('liquid_hits_p4').value) {
                //    return 'error_minor_than'
                //}
            }
        }
    },
    liquid_code_p5: {
        type: String,
        max: 255,
        optional: true
    },
    liquid_empty_mass_p5: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_wet_mass_p5: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_dry_mass_p5: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    liquid_humidity_p5: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    plastic_code_d1: {
        type: String,
        max: 255,
        optional: true
    },
    plastic_empty_mass_d1: {
        type: Number,
        decimal: true,
        min: 0
    },
    plastic_wet_mass_d1: {
        type: Number,
        decimal: true,
        min: 0
    },
    plastic_dry_mass_d1: {
        type: Number,
        decimal: true,
        min: 0
    },
    plastic_humidity_d1: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    plastic_code_d2: {
        type: String,
        max: 255,
        optional: true
    },
    plastic_empty_mass_d2: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_wet_mass_d2: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_dry_mass_d2: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_humidity_d2: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    plastic_code_d3: {
        type: String,
        max: 255,
        optional: true
    },
    plastic_empty_mass_d3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_wet_mass_d3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_dry_mass_d3: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0
    },
    plastic_humidity_d3: {
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

Schemas.Limit.messages({
    'error_minor_than': TAPi18n.__('limit_error_minor_than')
})

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
        liquid_hits_p4:           function () { return TAPi18n.__('limit_liquid_hits') },
        liquid_code_p4:           function () { return TAPi18n.__('limit_liquid_code') },
        liquid_empty_mass_p4:     function () { return TAPi18n.__('limit_liquid_empty_mass') },
        liquid_wet_mass_p4:       function () { return TAPi18n.__('limit_liquid_wet_mass') },
        liquid_dry_mass_p4:       function () { return TAPi18n.__('limit_liquid_dry_mass') },
        liquid_humidity_p4:       function () { return TAPi18n.__('limit_liquid_humidity') },
        liquid_hits_p5:           function () { return TAPi18n.__('limit_liquid_hits') },
        liquid_code_p5:           function () { return TAPi18n.__('limit_liquid_code') },
        liquid_empty_mass_p5:     function () { return TAPi18n.__('limit_liquid_empty_mass') },
        liquid_wet_mass_p5:       function () { return TAPi18n.__('limit_liquid_wet_mass') },
        liquid_dry_mass_p5:       function () { return TAPi18n.__('limit_liquid_dry_mass') },
        liquid_humidity_p5:       function () { return TAPi18n.__('limit_liquid_humidity') },
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
        plastic_code_d3:          function () { return TAPi18n.__('limit_plastic_code') },
        plastic_empty_mass_d3:    function () { return TAPi18n.__('limit_plastic_empty_mass') },
        plastic_wet_mass_d3:      function () { return TAPi18n.__('limit_plastic_wet_mass') },
        plastic_dry_mass_d3:      function () { return TAPi18n.__('limit_plastic_dry_mass') },
        plastic_humidity_d3:      function () { return TAPi18n.__('limit_plastic_humidity') },
        observations:             function () { return TAPi18n.__('limit_observations') },
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}
