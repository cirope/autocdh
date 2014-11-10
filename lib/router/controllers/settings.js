SettingsController = RouteController.extend({
  action: function () {
    var setting = Settings.findOne()

    if (setting)
      this.redirect('setting', setting)
    else
      this.redirect('settingNew')
  }
})

SettingController = RouteController.extend({
  data: function () {
    return Settings.findOne(this.params._id)
  }
})
