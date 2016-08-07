Schemas.Document = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Documents.findOne({
        name: this.value,
        organizationId: organizationIdFor(this.userId),
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  },

  type: {
    type: String,
    index: true,
    allowedValues: [
      'protocols',
      'instructive',
      'manuals',
      'controls',
      'fissures',
      'techniques',
      'sustainability',
      'others'
    ],
    autoform: {
      type: 'hidden'
    }
  },

  category: {
    type: String,
    optional: true,
    allowedValues: [
      'concretes',
      'extra',
      'aggregates',
      'additives',
      'fibers',
      'others'
    ],
    custom: function () {
      var shouldBeRequired = this.field('type').value === 'protocols'

      if (shouldBeRequired && ! this.value) return 'required'
    },
    autoform: {
      firstOption: '',
      options: function () {
        var options = ['concretes', 'extra', 'aggregates', 'additives', 'fibers', 'others']

        return _.map(options, function (category) {
          return {
            label: TAPi18n.__('document_category_' + category),
            value: category
          }
        })
      }
    }
  },

  validity: {
    type: Object,
    optional: true,
    autoform: {
      template: 'slim',
      cols: 2
    }
  },

  'validity.start': {
    type: Date,
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
    }
  },

  'validity.end': {
    type: Date,
    min: function () {
      return Meteor.isClient && Session.get('document.validity.start')
    },
    autoform: {
      type: 'bootstrap-datetimepicker',
      'data-date-format': 'L'
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
  Schemas.Document.labels({
    name:             function () { return TAPi18n.__('document_name') },
    type:             function () { return TAPi18n.__('document_type') },
    category:         function () { return TAPi18n.__('document_category') },
    validity:         function () { return TAPi18n.__('document_validity') },
    'validity.start': function () { return TAPi18n.__('document_validity_start') },
    'validity.end':   function () { return TAPi18n.__('document_validity_end') },
    fileId:           function () { return TAPi18n.__('document_file') },
    organizationId:   function () { return TAPi18n.__('organization') },
    createdAt:        function () { return TAPi18n.__('created_at') },
    updatedAt:        function () { return TAPi18n.__('updated_at') }
  })
}
