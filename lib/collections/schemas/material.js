Schemas.Material = new SimpleSchema([Schemas.Base, {
  aggregates: {
    type: [Object],
    minCount: 1
  },

  'aggregates.$.name': {
    type: String
  },

  'aggregates.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  'aggregates.$.default': {
    type: Boolean,
    defaultValue: false
  },

  concretes: {
    type: [Object],
    minCount: 1
  },

  'concretes.$.name': {
    type: String
  },

  'concretes.$.default': {
    type: Boolean,
    defaultValue: false
  }
}])

Schemas.Material.labels({
  aggregates:                function () { return TAPi18n.__('material_aggregates') },
  'aggregates.$.name':       function () { return TAPi18n.__('material_aggregates_name') },
  'aggregates.$.absorption': function () { return TAPi18n.__('material_aggregates_absorption') },
  'aggregates.$.default':    function () { return TAPi18n.__('material_aggregates_default') },
  concretes:                 function () { return TAPi18n.__('material_concretes') },
  'concretes.$.name':        function () { return TAPi18n.__('material_concretes_name') },
  'concretes.$.default':     function () { return TAPi18n.__('material_concretes_default') },
  userId:                    function () { return TAPi18n.__('user') },
  createdAt:                 function () { return TAPi18n.__('created_at') },
  updatedAt:                 function () { return TAPi18n.__('updated_at') }
})
