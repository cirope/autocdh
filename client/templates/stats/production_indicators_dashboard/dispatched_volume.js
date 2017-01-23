var dispatchedSettings = null

var dispatchedVolumeFor = function (month) {
  var dispatched = _.findWhere(dispatchedSettings, { month: +month })

  if (dispatched && dispatched.value)
    return dispatched.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardDispatchedVolume.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var volumes            = this.data.settings && this.data.settings.qa && this.data.settings.qa.dispatchedVolume

  if (! volumes) return

  dispatchedSettings = volumes
})

Template.statsProductionIndicatorsDashboardDispatchedVolume.onDestroyed(function () {
  dispatchedSettings = null
})

Template.statsProductionIndicatorsDashboardDispatchedVolume.helpers({
  dispatchedVolume: function () {
    var month            = moment(this.value, 'YYYYMM')
    var dispatchedVolume = dispatchedVolumeFor(month.format('YYYYMM'))

    return {
      value: _.isNumber(dispatchedVolume) ? Math.round(dispatchedVolume) : dispatchedVolume
    }
  }
})
