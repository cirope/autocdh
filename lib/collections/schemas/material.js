Schemas.Material = new SimpleSchema([Schemas.Base, {
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
  },

  sands: {
    type: [Object],
    minCount: 1
  },

  'sands.$.name': {
    type: String
  },

  'sands.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  'sands.$.default': {
    type: Boolean,
    defaultValue: false
  },

  gravels: {
    type: [Object],
    minCount: 1
  },

  'gravels.$.name': {
    type: String
  },

  'gravels.$.absorption': {
    type: Number,
    decimal: true,
    min: -50,
    max: 50
  },

  'gravels.$.default': {
    type: Boolean,
    defaultValue: false
  }
}])

Schemas.Material.labels({
  concretes:              function () { return TAPi18n.__('material_concretes') },
  'concretes.$.name':     function () { return TAPi18n.__('material_concretes_name') },
  'concretes.$.default':  function () { return TAPi18n.__('material_concretes_default') },
  sands:                  function () { return TAPi18n.__('material_sands') },
  'sands.$.name':         function () { return TAPi18n.__('material_sands_name') },
  'sands.$.absorption':   function () { return TAPi18n.__('material_sands_absorption') },
  'sands.$.default':      function () { return TAPi18n.__('material_sands_default') },
  gravels:                function () { return TAPi18n.__('material_gravels') },
  'gravels.$.name':       function () { return TAPi18n.__('material_gravels_name') },
  'gravels.$.absorption': function () { return TAPi18n.__('material_gravels_absorption') },
  'gravels.$.default':    function () { return TAPi18n.__('material_gravels_default') },
  userId:                 function () { return TAPi18n.__('user') },
  createdAt:              function () { return TAPi18n.__('created_at') },
  updatedAt:              function () { return TAPi18n.__('updated_at') }
})
