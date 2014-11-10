Schemas.Setting = new SimpleSchema([Schemas.Base, {
  flowmeterCorrection: {
    type: Number,
    decimal: true,
    defaultValue: 1,
    min: 0.8,
    max: 1.2
  }
}])

Schemas.Setting.labels({
  flowmeterCorrection: function () { return TAPi18n.__('settings_flowmeter_correction') },
  userId:              function () { return TAPi18n.__('user') },
  createdAt:           function () { return TAPi18n.__('created_at') },
  updatedAt:           function () { return TAPi18n.__('updated_at') }
})
