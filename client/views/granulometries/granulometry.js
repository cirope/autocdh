Template.granulometry.helpers({
  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  },

  plant: function () {
    return Plants.findOne(this.plantId).name
  },

  dried: function () {
    return TAPi18n.__(this.dried ? 'yes' : 'no')
  },

  washed: function () {
    return TAPi18n.__(this.washed ? 'yes' : 'no')
  },

  humidityPercentage: function () {
    var netWet = this.humidity.massOfWetAggregate - this.humidity.massOfContainer
    var netDry = this.humidity.massOfDryAggregate - this.humidity.massOfContainer

    return netDry > 0 ? ((netWet - netDry) / netDry * 100).toFixed(1) : 0
  },

  thinPercentage: function () {
    var netBefore = this.thin.massBeforeWash - this.thin.massOfContainer
    var netAfter  = this.thin.massAfterWash  - this.thin.massOfContainer

    return netAfter > 0 ? ((netBefore - netAfter) / netAfter * 100).toFixed(1) : 0
  }
})
