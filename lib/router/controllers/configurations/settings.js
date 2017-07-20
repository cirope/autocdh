SettingsController = RouteController.extend({
  data: function () {
    return { settings: Settings.find() }
  }
})

SettingController = RouteController.extend({
  data: function () {
    return Settings.findOne(this.params._id)
  }
})
