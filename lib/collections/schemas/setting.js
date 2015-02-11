Schemas.Setting = new SimpleSchema([Schemas.Base, {
  stressConstant: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    autoform: {
      afFieldInput: {
        hint: function () { return TAPi18n.__('settings_stress_constant') }
      }
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Setting.labels({
    stressConstant: function () { return TAPi18n.__('settings_stress_constant') },
    userId:         function () { return TAPi18n.__('user') },
    createdAt:      function () { return TAPi18n.__('created_at') },
    updatedAt:      function () { return TAPi18n.__('updated_at') }
  })
}
