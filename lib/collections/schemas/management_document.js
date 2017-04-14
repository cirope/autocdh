Schemas.ManagementDocument = new SimpleSchema([Schemas.Base, {
  code: {
    type: String,
    max: 255,
    optional: false,
    custom: function () {
      var other = ManagementDocuments.findOne({
        code: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  name: {
    type: String,
    max: 255,
    optional: false,
    custom: function () {
      var other = ManagementDocuments.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  revision: {
    type: String,
    optional: false,
    index: true,
    allowedValues: [
      'in_rev',
      'rev_1',
      'rev_2',
      'rev_3',
      'rev_4',
      'rev_5'
    ],
    autoform: {
      firstOption: '',
      options: function () {
        var options = ['in_rev', 'rev_1', 'rev_2', 'rev_3', 'rev_4', 'rev_5']

        return _.map(options, function (category) {
          return {
            label: TAPi18n.__('management_document_revision_' + category),
            value: category
          }
        })
      }
    }
  },

  date: {
    type: Date,
    optional: false,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L',
      'data-period-modifier': true
    }
  },

  type: {
    type: String,
    optional: false,
    index: true,
    allowedValues: [
      'procedure',
      'instructive',
      'register',
      'other'
    ],
    autoform: {
      firstOption: '',
      options: function () {
        var options = ['procedure', 'instructive', 'register', 'other']

        return _.map(options, function (category) {
          return {
            label: TAPi18n.__('management_document_type_' + category),
            value: category
          }
        })
      }
    }
  },

  category: {
    type: String,
    optional: false,
    index: true,
    allowedValues: [
      'quality',
      'production',
      'procedure',
      'purchase',
      'sale',
      'administrative',
      'maintenance',
      'human_resources',
      'technical',
      'other'
    ],
    autoform: {
      firstOption: '',
      options: function () {
        var options = ['quality', 'production', 'procedure', 'purchase', 'sale', 'administrative', 'maintenance', 'human_resources', 'technical', 'other']

        return _.map(options, function (category) {
          return {
            label: TAPi18n.__('management_document_category_' + category),
            value: category
          }
        })
      }
    }
  },

  active: {
    type: Boolean,
    optional: true,
    index: true,
    defaultValue: true,
    autoform: {
      type: 'hidden'
    }
  },

  reason: {
    type: String,
    optional: true,
    max: 4096,
    custom: function () {
      var activeField = this.field('active')
      var shouldBeRequired = activeField.isSet && ! activeField.value

      if (shouldBeRequired && ! this.value) return 'required'
    },
    autoform: {
      rows: 3
    }
  },

  fileId: {
    type: String,
    index: true,
    autoform: {
      type:       'cfs-file',
      collection: 'files'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.ManagementDocument.labels({
    code:             function () { return TAPi18n.__('management_document_code') },
    name:             function () { return TAPi18n.__('management_document_name') },
    revision:         function () { return TAPi18n.__('management_document_revision') },
    date:             function () { return TAPi18n.__('management_document_date') },
    type:             function () { return TAPi18n.__('management_document_type') },
    category:         function () { return TAPi18n.__('management_document_category') },
    active:           function () { return TAPi18n.__('management_document_active') },
    reason:           function () { return TAPi18n.__('management_document_reason') },
    fileId:           function () { return TAPi18n.__('management_document_file') },
    organizationId:   function () { return TAPi18n.__('organization') },
    createdAt:        function () { return TAPi18n.__('created_at') },
    updatedAt:        function () { return TAPi18n.__('updated_at') }
  })
}
