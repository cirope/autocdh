var averageDownloadSettings = null
var downloadAverageSettings = null

var downloadAverageFor = function (month) {
  var averageDownload = _.findWhere(averageDownloadSettings, { month: +month })

  if (averageDownload && averageDownload.value)
    return averageDownload.value
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardDownloadAverage.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var averageDownload    = productionSettings && productionSettings.averageDownload

  if (! averageDownload) return

  averageDownloadSettings = averageDownload
})

Template.statsProductionIndicatorsDashboardDownloadAverage.onDestroyed(function () {
  averageDownloadSettings = null
})

Template.statsProductionIndicatorsDashboardDownloadAverage.helpers({
  downloadAverage: function () {
    var month           = moment(this.value, 'YYYYMM')
    var downloadAverage = downloadAverageFor(month.format('YYYYMM'))
    var rounded         = Math.round(downloadAverage * 10) / 10

    return {
      value: _.isNumber(downloadAverage) ? downloadAverage.toFixed(1) : downloadAverage
    }
  }
})
