Schemas.Setting = new SimpleSchema([Schemas.Base, {
  efficiencyDesirable: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50,
    autoform: {
      autofocus: true
    }
  },

  efficiencyDesirableLow: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0.01,
    max: 50
  },

  resistance3Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  },

  resistance7Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  },

  customOptions: {
    type: Object
  },

  'customOptions.showPavement': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.showStructure': {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  'customOptions.receiptNumberLabel': {
    type: String,
    optional: true
  }
}])

if (Meteor.isClient) {
  Schemas.Setting.labels({
    efficiencyDesirable:    function () { return TAPi18n.__('setting_efficiency_desirable') },
    efficiencyDesirableLow: function () { return TAPi18n.__('setting_efficiency_desirable_low') },
    resistance3Days:        function () { return TAPi18n.__('setting_resistance_3_days') },
    resistance7Days:        function () { return TAPi18n.__('setting_resistance_7_days') }
  })
}
