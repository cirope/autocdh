Schemas.Complaint = new SimpleSchema([Schemas.Base, {

    date: {
        type: Date,
        autoform: {
            type: 'bootstrap-datetimepicker',
            'data-date-format': 'L'
        }
    },

}])

if (Meteor.isClient) {
    Schemas.Complaint.labels({
        date:                     function () { return TAPi18n.__('complaint_date') },

        organizationId:           function () { return TAPi18n.__('organization') },
        createdAt:                function () { return TAPi18n.__('created_at') },
        updatedAt:                function () { return TAPi18n.__('updated_at') }
    })
}
