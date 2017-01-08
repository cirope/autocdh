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

  work: {
    type: String,
    max: 255
  },

}])

if (Meteor.isClient) {
  Schemas.Limit.labels({
    sampleResponsibleId:      function () { return TAPi18n.__('field_density_sample_responsible') },
    fieldDate:                function () { return TAPi18n.__('field_density_field_date') },
    sampleName:               function () { return TAPi18n.__('field_density_sample_name') },
    work:                     function () { return TAPi18n.__('field_density_work') },
    organizationId:           function () { return TAPi18n.__('organization') },
    createdAt:                function () { return TAPi18n.__('created_at') },
    updatedAt:                function () { return TAPi18n.__('updated_at') }
  })
}
