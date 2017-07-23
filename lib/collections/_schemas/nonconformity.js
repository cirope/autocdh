Schemas.Nonconformity = new SimpleSchema([Schemas.Base, {

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
            firstOption: '',
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
            firstOption: '',
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
            firstOption: '',
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
            firstOption: '',
            options: function () {
                var areas = Areas.find({}, { sort: { createdAt: 1 } }).map(function (area) {
                    return { value: area._id, label: area.name }
                })
                return areas
            }
        }
    },



}])

if (Meteor.isClient) {
    Schemas.Nonconformity.labels({
        date:                     function () { return TAPi18n.__('nonconformity_date') },
        responsibleId:            function () { return TAPi18n.__('nonconformity_responsible') },
        code:                     function () { return TAPi18n.__('nonconformity_code') },
        areas:                    function () { return TAPi18n.__('nonconformity_areas') },
        'areas.$.areaId':         function () { return TAPi18n.__('nonconformity_area_id') },
        origins:                  function () { return TAPi18n.__('nonconformity_origins') },
        'origins.$.originId':     function () { return TAPi18n.__('nonconformity_origin_id') },
        types:                    function () { return TAPi18n.__('nonconformity_types') },
        'types.$.typeId':         function () { return TAPi18n.__('nonconformity_type_id') },
        involvedAreas:            function () { return TAPi18n.__('nonconformity_involved_areas') },
        'involvedAreas.$.involvedAreaId': function () { return TAPi18n.__('nonconformity_area_id') },
        /*
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        */
        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}

/*

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



 */