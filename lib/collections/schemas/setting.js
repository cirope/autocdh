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

  resistance7Days: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0,
    max: 200
  }
}])

if (Meteor.isClient) {
  Schemas.Setting.labels({
    efficiencyDesirable:    function () { return TAPi18n.__('setting_efficiency_desirable') },
    efficiencyDesirableLow: function () { return TAPi18n.__('setting_efficiency_desirable_low') },
    resistance7Days:        function () { return TAPi18n.__('setting_resistance_7_days') }
  })
}
