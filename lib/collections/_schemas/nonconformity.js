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

    areaId: {
        type: String,
        index: true,
        regEx: SimpleSchema.RegEx.Id,
        custom: function () {
            if (! Areas.findOne(this.value))  return 'required'
            if (this.isInsert && exists.call(this)) return 'notUnique'
        },
        autoform: {
            options: function () {
                var areas = Settlements.find({}, { sort: { createdAt: 1 } }).map(function (area) {
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



}])

if (Meteor.isClient) {
    Schemas.Nonconformity.labels({
        date:                     function () { return TAPi18n.__('nonconformity_date') },
        responsibleId:            function () { return TAPi18n.__('nonconformity_responsible') },
        code:            function () { return TAPi18n.__('nonconformity_code') },

        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },
        :            function () { return TAPi18n.__('') },

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