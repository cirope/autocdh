Schemas.Nonconformity = new SimpleSchema([Schemas.Base, {

    status: {
        type: String,
        defaultValue: 'initial',
        allowedValues: ['initial', 'started', 'finished'],
        optional: false,
        autoform: {
            firstOption: false,
            options: function () {
                return [
                    { value: 'initial',  label: TAPi18n.__('nonconformity_status_initial') },
                    { value: 'started',  label: TAPi18n.__('nonconformity_status_started') },
                    { value: 'finished', label: TAPi18n.__('nonconformity_status_finished') }
                ]
            }
        }
    },

    date: {
        type: Date,
        autoform: {
            type: 'bootstrap-datetimepicker',
            'data-date-format': 'L'
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
            autofocus: true,
            firstOption: false,
            options: function () {
                return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
                    return { value: r._id, label: r.name }
                })
            }
        }
    },

    code: {
        type: String,
        max: 255,
        optional: true
    },

    areas: {
        type: [Object],
        minCount: 1,
        autoform: {
            template: 'basic',
            cols: 1
        }
    },

    'areas.$.areaId': {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        custom: function () {
            if (! Areas.findOne(this.value))  return 'required'
            //if (this.isInsert && exists.call(this)) return 'notUnique'
        },
        autoform: {
            label: false,
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                var areas = Areas.find({}, { sort: { createdAt: 1 } }).map(function (area) {
                    return { value: area._id, label: area.name }
                })
                var group  = areas.length ? {
                    optgroup: TAPi18n.__('areas'),
                    options: areas
                } :  { optgroup: ' ', options: [{ value: '', label: '' }] }

                return [
                    group,
                    {
                        optgroup: TAPi18n.__('actions'),
                        options: [
                            { value: 'new', label: TAPi18n.__('area_new') },
                        ]
                    }
                ]
            }
        }
    },

    origins: {
        type: [Object],
        minCount: 1,
        autoform: {
            template: 'basic',
            cols: 1
        }
    },

    'origins.$.originId': {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        custom: function () {
            if (! Origins.findOne(this.value))  return 'required'
            //if (this.isInsert && exists.call(this)) return 'notUnique'
        },
        autoform: {
            label: false,
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                var origins = Origins.find({}, { sort: { createdAt: 1 } }).map(function (origin) {
                    return { value: origin._id, label: origin.name }
                })
                var group  = origins.length ? {
                    optgroup: TAPi18n.__('origins'),
                    options: origins
                } :  { optgroup: ' ', options: [{ value: '', label: '' }] }

                return [
                    group,
                    {
                        optgroup: TAPi18n.__('actions'),
                        options: [
                            { value: 'new', label: TAPi18n.__('origin_new') },
                        ]
                    }
                ]
            }
        }
    },

    types: {
        type: [Object],
        minCount: 1,
        autoform: {
            template: 'basic',
            cols: 1
        }
    },

    'types.$.typeId': {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        custom: function () {
            if (! NcTypes.findOne(this.value))  return 'required'
            //if (this.isInsert && exists.call(this)) return 'notUnique'
        },
        autoform: {
            label: false,
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                var types = NcTypes.find({}, { sort: { createdAt: 1 } }).map(function (type) {
                    return { value: type._id, label: type.name }
                })
                var group  = types.length ? {
                    optgroup: TAPi18n.__('nctypes'),
                    options: types
                } :  { optgroup: ' ', options: [{ value: '', label: '' }] }

                return [
                    group,
                    {
                        optgroup: TAPi18n.__('actions'),
                        options: [
                            { value: 'new', label: TAPi18n.__('nctype_new') },
                        ]
                    }
                ]
            }
        }
    },

    involvedAreas: {
        type: [Object],
        minCount: 1,
        autoform: {
            template: 'basic',
            cols: 1
        }
    },

    'involvedAreas.$.involvedAreaId': {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        custom: function () {
            if (! Areas.findOne(this.value))  return 'required'
            //if (this.isInsert && exists.call(this)) return 'notUnique'
        },
        autoform: {
            label: false,
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                var areas = Areas.find({}, { sort: { createdAt: 1 } }).map(function (area) {
                    return { value: area._id, label: area.name }
                })
                return areas
            }
        }
    },

    character: {
        type: String,
        allowedValues: ['oportunity', 'real', 'potencial'],
        autoform: {
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                return [
                    { value: 'oportunity', label: TAPi18n.__('nonconformity_character_oportunity') },
                    { value: 'real',       label: TAPi18n.__('nonconformity_character_real') },
                    { value: 'potencial',  label: TAPi18n.__('nonconformity_character_potencial') }
                ]
            }
        }
    },

    description: {
        type: String,
        optional: false,
        max: 65536,
        autoform: {
            rows: 3
        }
    },

    actionDescription: {
        type: String,
        optional: true,
        max: 65536,
        autoform: {
            rows: 4
        }
    },

    actionDate: {
        type: Date,
        optional: true,
        autoform: {
            type: 'bootstrap-datetimepicker',
            'data-date-format': 'L'
        }
    },

    actionResponsibleId: {
        type: String,
        index: true,
        optional: true,
        regEx: SimpleSchema.RegEx.Id,
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

    causes: {
        type: String,
        optional: true,
        max: 65536,
        autoform: {
            rows: 3
        }
    },

    solutions: {
        type: [Object],
        optional: true,
        minCount: 0,
        autoform: {
            template: 'slim'
        }
    },

    'solutions.$.number': {
        type: Number,
        decimal: false,
        optional: true,
        min: 1,
        autoform: {
            label: false,
            readonly: true
        }
    },

    'solutions.$.type': {
        type: String,
        allowedValues: ['corrective', 'preventive', 'evolutionary'],
        autoform: {
            label: false,
            firstOption: function () {
                return TAPi18n.__('first_option_for_select')
            },
            options: function () {
                return [
                    { value: 'corrective',   label: TAPi18n.__('nonconformity_solutions_type_corrective') },
                    { value: 'preventive',   label: TAPi18n.__('nonconformity_solutions_type_preventive') },
                    { value: 'evolutionary', label: TAPi18n.__('nonconformity_solutions_type_evolutionary') }
                ]
            }
        }
    },

    'solutions.$.description': {
        type: String,
        max: 255,
        autoform: {
            label: false
        }
    },

    'solutions.$.date': {
        type: Date,
        autoform: {
            label: false,
            type: 'bootstrap-datetimepicker',
            'data-date-format': 'L'
        }
    },

    'solutions.$.responsibles': {
        type: [Object],
        autoform: {
            label: false,
            template: 'basic',
            cols: 1
        }
    },

    'solutions.$.responsibles.$.id': {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        autoform: {
            label: false,
            firstOption: false,
            options: function () {
                return Responsible.find({}, { sort: { name: 1 } }).map(function (r) {
                    return { value: r._id, label: r.name }
                })
            }
        }
    },

}])

if (Meteor.isClient) {
    Schemas.Nonconformity.labels({
        status:                    function () { return TAPi18n.__('nonconformity_status') },
        date:                      function () { return TAPi18n.__('nonconformity_date') },
        responsibleId:             function () { return TAPi18n.__('nonconformity_responsible') },
        code:                      function () { return TAPi18n.__('nonconformity_code') },
        areas:                     function () { return TAPi18n.__('nonconformity_areas') },
        'areas.$.areaId':          function () { return TAPi18n.__('nonconformity_area_id') },
        origins:                   function () { return TAPi18n.__('nonconformity_origins') },
        'origins.$.originId':      function () { return TAPi18n.__('nonconformity_origin_id') },
        types:                     function () { return TAPi18n.__('nonconformity_types') },
        'types.$.typeId':          function () { return TAPi18n.__('nonconformity_type_id') },
        involvedAreas:             function () { return TAPi18n.__('nonconformity_involved_areas') },
        'involvedAreas.$.involvedAreaId': function () { return TAPi18n.__('nonconformity_area_id') },
        character:                 function () { return TAPi18n.__('nonconformity_character') },
        description:               function () { return TAPi18n.__('nonconformity_description') },
        actionDescription:         function () { return TAPi18n.__('nonconformity_action_desc') },
        actionDate:                function () { return TAPi18n.__('nonconformity_action_date') },
        actionResponsibleId:       function () { return TAPi18n.__('nonconformity_action_resp') },
        causes:                    function () { return TAPi18n.__('nonconformity_causes') },
        solutions:                 function () { return TAPi18n.__('nonconformity_solutions') },
        'solutions.$.number':      function () { return TAPi18n.__('nonconformity_solutions_number') },
        'solutions.$.type':        function () { return TAPi18n.__('nonconformity_solutions_type') },
        'solutions.$.description': function () { return TAPi18n.__('nonconformity_solutions_desc') },
        'solutions.$.date':        function () { return TAPi18n.__('nonconformity_solutions_date') },
        'solutions.$.responsibles':      function () { return TAPi18n.__('nonconformity_solutions_resp') },
        'solutions.$.responsibles.$.id': function () { return TAPi18n.__('nonconformity_solutions_resp_id') },
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}
