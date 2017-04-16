Schemas.FieldGranulometry = new SimpleSchema([Schemas.Base, {

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
            var other = FieldGranulometries.findOne({
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

    sampling: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    humidity_code: {
        type: String,
        max: 255
    },
    humidity_empty_mass: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    humidity_wet: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    humidity_dry: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    humidity_percentage: {
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

    thin_code: {
        type: String,
        max: 255
    },
    thin_empty_mass: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    thin_before: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    thin_after: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    thin_percentage: {
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

    weight: {
        type: Number,
        decimal: false,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    /*
    sieve_weight_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_76: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_63: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_51: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_38: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_25: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_19: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    /*
    sieve_weight_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    */
    retained_partial_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_total_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_95: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_48: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_20: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_04: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_02: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_01: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_00: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    sieve_weight_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_sieve_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0
    },
    retained_partial_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    retained_total_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    passed_percentage_b: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },
    total: {
        type: Number,
        optional: true,
        decimal: false,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    observations: {
        max: 65536,
        optional: true,
        type: String,
        autoform: {
            rows: 3
        }
    }
}])

if (Meteor.isClient) {
    Schemas.FieldGranulometry.labels({
        sampleResponsibleId:      function () { return TAPi18n.__('field_granulometry_responsible') },
        fieldDate:                function () { return TAPi18n.__('field_granulometry_date') },
        sampleName:               function () { return TAPi18n.__('field_granulometry_name') },
        origin:                   function () { return TAPi18n.__('field_granulometry_origin') },
        sampling:                 function () { return TAPi18n.__('field_granulometry_sampling') },
        humidity_code:            function () { return TAPi18n.__('field_granulometry_humidity_code') },
        humidity_empty_mass:      function () { return TAPi18n.__('field_granulometry_humidity_empty_mass') },
        humidity_wet:             function () { return TAPi18n.__('field_granulometry_humidity_wet') },
        humidity_dry:             function () { return TAPi18n.__('field_granulometry_humidity_dry') },
        humidity_percentage:      function () { return TAPi18n.__('field_granulometry_humidity_percentage') },
        thin_code:                function () { return TAPi18n.__('field_granulometry_thin_code') },
        thin_empty_mass:          function () { return TAPi18n.__('field_granulometry_thin_empty_mass') },
        thin_before:              function () { return TAPi18n.__('field_granulometry_thin_before') },
        thin_after:               function () { return TAPi18n.__('field_granulometry_thin_after') },
        thin_percentage:          function () { return TAPi18n.__('field_granulometry_thin_percentage') },
        weight:                   function () { return TAPi18n.__('field_granulometry_weight') },
        sieve_weight_76:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_76:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_76:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_76:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_76:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_76:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_63:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_63:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_63:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_63:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_63:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_63:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_51:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_51:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_51:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_51:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_51:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_51:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_38:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_38:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_38:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_38:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_38:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_38:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_25:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_25:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_25:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_25:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_25:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_25:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_19:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_19:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_19:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_19:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_19:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_19:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_95:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_95:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_95:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_95:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_95:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_95:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_48:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_48:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_48:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_48:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_48:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_48:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_20:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_20:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_20:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_20:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_20:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_20:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_04:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_04:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_04:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_04:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_04:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_04:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_02:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_02:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_02:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_02:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_02:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_02:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_01:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_01:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_01:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_01:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_01:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_01:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_00:          function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_00:        function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_00:      function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_00:        function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_00:                function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_00:     function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        sieve_weight_b:           function () { return TAPi18n.__('field_granulometry_sieve_weight') },
        retained_sieve_b:         function () { return TAPi18n.__('field_granulometry_retained_sieve') },
        retained_partial_b:       function () { return TAPi18n.__('field_granulometry_retained_partial') },
        retained_total_b:         function () { return TAPi18n.__('field_granulometry_retained_total') },
        passed_b:                 function () { return TAPi18n.__('field_granulometry_passed') },
        passed_percentage_b:      function () { return TAPi18n.__('field_granulometry_passed_percentage') },
        total:                    function () { return TAPi18n.__('field_granulometry_total') },
        observations:             function () { return TAPi18n.__('field_granulometry_observations') },
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}
