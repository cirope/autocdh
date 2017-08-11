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
        optional: true,
        max: 255
    },
    humidity_empty_mass: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    humidity_wet: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    humidity_dry: {
        type: Number,
        decimal: true,
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
        optional: true,
        max: 255
    },
    thin_empty_mass: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    thin_before: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    thin_after: {
        type: Number,
        decimal: true,
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
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    separation_sieve: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    separation_thin: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    observations: {
        max: 65536,
        optional: true,
        type: String,
        autoform: {
            rows: 3
        }
    },

    heavy_weight: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    retained_sieve_76: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_63: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_51: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_38: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_25: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_19: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_12: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_95: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_48: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    thin_reduce: {
        type: String,
        defaultValue: 'no',
        allowedValues: ['no', 'yes'],
        optional: false,
        autoform: {
            firstOption: false,
            options: function () {
                return [
                    { value: 'no',   label: TAPi18n.__('no') },
                    { value: 'yes',  label: TAPi18n.__('yes') }
                ]
            }
        }
    },

    thin_weight: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        },
        custom: function () {
            var reduceField = this.field('thin_reduce')
            var shouldBeRequired = reduceField.isSet && reduceField.value === 'yes'

            if (shouldBeRequired && !this.value) return 'required'
        }
    },

    sieve_weight_20: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    sieve_weight_04: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    sieve_weight_01: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    sieve_weight_p: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_20: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_04: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_01: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },
    retained_sieve_p: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            template: 'measure',
            unit: 'g'
        }
    },

    thin_ver_ret: {
        type: Number,
        optional: true,
        decimal: true,
        autoform: {
            readonly: true,
            template: 'measure',
            unit: '%'
        }
    },
    thin_ver_pass: {
        type: Number,
        optional: true,
        decimal: true,
        autoform: {
            readonly: true,
            template: 'measure',
            unit: '%'
        }
    },

    thin_ver_ret_label: {
        max: 65536,
        optional: true,
        type: String,
        autoform: {
            readonly: true
        }
    },
    thin_ver_pass_label: {
        max: 65536,
        optional: true,
        type: String,
        autoform: {
            readonly: true
        }
    },

    thin_pass_200: {
        type: String,
        defaultValue: 'no',
        allowedValues: ['no', 'yes'],
        optional: false,
        autoform: {
            firstOption: false,
            options: function () {
                return [
                    { value: 'no',   label: TAPi18n.__('no') },
                    { value: 'yes',  label: TAPi18n.__('yes') }
                ]
            }
        }
    },

    factor: {
        type: Number,
        optional: true,
        decimal: true,
        min: 0,
        autoform: {
            readonly: true
        }
    },

    //a_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //a_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    a_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    a_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    a_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    a_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //b_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //b_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    b_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    b_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    b_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    b_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //c_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //c_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    c_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    c_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    c_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    c_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //d_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //d_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    d_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    d_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    d_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    d_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //e_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //e_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    e_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    e_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    e_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    e_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //f_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //f_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    f_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    f_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    f_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    f_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //g_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //g_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    g_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    g_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    g_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    g_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    //h_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    //h_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    h_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    h_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    h_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    h_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    i_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    i_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    i_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    i_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    i_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    i_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    j_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    j_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    j_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    j_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    j_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    j_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    k_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    k_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    k_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    k_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    k_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    k_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    l_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    l_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    l_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    l_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    l_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    l_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    m_1: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    m_2: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    m_3: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    m_4: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    m_5: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},
    m_6: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

    total: {type: Number, optional: true, decimal: true, autoform: {readonly: true }},

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
        separation_sieve:         function () { return TAPi18n.__('field_granulometry_separation_sieve') },
        separation_thin:          function () { return TAPi18n.__('field_granulometry_separation_thin') },
        observations:             function () { return TAPi18n.__('field_granulometry_observations') },
        heavy_weight:             function () { return TAPi18n.__('field_granulometry_heavy_weight') },
        retained_sieve_76:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_63:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_51:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_38:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_25:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_19:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_12:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_95:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        retained_sieve_48:        function () { return TAPi18n.__('field_granulometry_heavy_retained_partial') },
        thin_reduce:              function () { return TAPi18n.__('field_granulometry_thin_reduce') },
        thin_weight:              function () { return TAPi18n.__('field_granulometry_thin_weight') },
        sieve_weight_20:          function () { return TAPi18n.__('field_granulometry_thin_sieve_weight') },
        sieve_weight_04:          function () { return TAPi18n.__('field_granulometry_thin_sieve_weight') },
        sieve_weight_01:          function () { return TAPi18n.__('field_granulometry_thin_sieve_weight') },
        sieve_weight_p:           function () { return TAPi18n.__('field_granulometry_thin_sieve_weight') },
        retained_sieve_20:        function () { return TAPi18n.__('field_granulometry_thin_sieve_retained') },
        retained_sieve_04:        function () { return TAPi18n.__('field_granulometry_thin_sieve_retained') },
        retained_sieve_01:        function () { return TAPi18n.__('field_granulometry_thin_sieve_retained') },
        retained_sieve_p:         function () { return TAPi18n.__('field_granulometry_thin_sieve_retained') },
        thin_ver_ret:             function () { return TAPi18n.__('field_granulometry_thin_ver_ret') },
        thin_ver_pass:            function () { return TAPi18n.__('field_granulometry_thin_ver_pass') },
        thin_ver_ret_label:       function () { return TAPi18n.__('field_granulometry_thin_ver_ret') },
        thin_ver_pass_label:      function () { return TAPi18n.__('field_granulometry_thin_ver_pass') },
        thin_pass_200:            function () { return TAPi18n.__('field_granulometry_thin_pass_200') },
        factor:                   function () { return TAPi18n.__('field_granulometry_factor') },
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') },
        total:                    function () { return TAPi18n.__('field_granulometry_total') },
        //a_1:                    function () { return '' },
        //a_2:                    function () { return '' },
        a_3:                      function () { return '' },
        a_4:                      function () { return '' },
        a_5:                      function () { return '' },
        a_6:                      function () { return '' },
        //b_1:                    function () { return '' },
        //b_2:                    function () { return '' },
        b_3:                      function () { return '' },
        b_4:                      function () { return '' },
        b_5:                      function () { return '' },
        b_6:                      function () { return '' },
        //c_1:                    function () { return '' },
        //c_2:                    function () { return '' },
        c_3:                      function () { return '' },
        c_4:                      function () { return '' },
        c_5:                      function () { return '' },
        c_6:                      function () { return '' },
        //d_1:                    function () { return '' },
        //d_2:                    function () { return '' },
        d_3:                      function () { return '' },
        d_4:                      function () { return '' },
        d_5:                      function () { return '' },
        d_6:                      function () { return '' },
        //e_1:                    function () { return '' },
        //e_2:                    function () { return '' },
        e_3:                      function () { return '' },
        e_4:                      function () { return '' },
        e_5:                      function () { return '' },
        e_6:                      function () { return '' },
        //f_1:                    function () { return '' },
        //f_2:                    function () { return '' },
        f_3:                      function () { return '' },
        f_4:                      function () { return '' },
        f_5:                      function () { return '' },
        f_6:                      function () { return '' },
        //g_1:                    function () { return '' },
        //g_2:                    function () { return '' },
        g_3:                      function () { return '' },
        g_4:                      function () { return '' },
        g_5:                      function () { return '' },
        g_6:                      function () { return '' },
        //h_1:                    function () { return '' },
        //h_2:                    function () { return '' },
        h_3:                      function () { return '' },
        h_4:                      function () { return '' },
        h_5:                      function () { return '' },
        h_6:                      function () { return '' },
        //i_1:                    function () { return '' },
        //i_2:                    function () { return '' },
        i_3:                      function () { return '' },
        i_4:                      function () { return '' },
        i_5:                      function () { return '' },
        i_6:                      function () { return '' },
        j_1:                      function () { return '' },
        j_2:                      function () { return '' },
        j_3:                      function () { return '' },
        j_4:                      function () { return '' },
        j_5:                      function () { return '' },
        j_6:                      function () { return '' },
        k_1:                      function () { return '' },
        k_2:                      function () { return '' },
        k_3:                      function () { return '' },
        k_4:                      function () { return '' },
        k_5:                      function () { return '' },
        k_6:                      function () { return '' },
        l_1:                      function () { return '' },
        l_2:                      function () { return '' },
        l_3:                      function () { return '' },
        l_4:                      function () { return '' },
        l_5:                      function () { return '' },
        l_6:                      function () { return '' },
        m_1:                      function () { return '' },
        m_2:                      function () { return '' },
        m_3:                      function () { return '' },
        m_4:                      function () { return '' },
        m_5:                      function () { return '' },
        m_6:                      function () { return '' }
    })
}
