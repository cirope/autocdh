Template.stats.helpers({
  customersPath: function () {
    if (Customers.find().count() === 1)
      return Router.path('customerCracks', Customers.findOne())
    else
      return Router.path('customers')
  },

  showAirGraphic: function () {
    var settings = Settings.findOne()

    return settings && settings.customOptions && settings.customOptions.showAirGraphic
  },

  showProductionIndicators: function () {
    var settings = Settings.findOne()

    return settings && settings.customOptions && settings.customOptions.showProductionIndicators
  }
})
