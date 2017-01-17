var tripsSettings            = null
var reportedProblemsSettings = null
var complaintsSettings       = null

var complaintsFor = function (month) {
  var trips            = _.findWhere(tripsSettings, { month: +month })
  var reportedProblems = _.findWhere(reportedProblemsSettings, { month: +month })

  if (trips && trips.value && reportedProblems && reportedProblems.value)
    return (reportedProblems.value / trips.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardComplaints.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var trips              = productionSettings && productionSettings.trips
  var reportedProblems   = productionSettings && productionSettings.reportedProblems

  if (! trips || ! reportedProblems || ! indicators) return

  tripsSettings            = trips
  reportedProblemsSettings = reportedProblems
  complaintsSettings       = indicators.complaintsMin && indicators.complaintsMax && {
    min: indicators.complaintsMin,
    max: indicators.complaintsMax
  }
})

Template.statsProductionIndicatorsDashboardComplaints.onDestroyed(function () {
  tripsSettings            = null
  reportedProblemsSettings = null
  complaintsSettings       = null
})

Template.statsProductionIndicatorsDashboardComplaints.helpers({
  complaints: function () {
    if (complaintsSettings) {
      var month      = moment(this.value, 'YYYYMM')
      var complaints = complaintsFor(month.format('YYYYMM'))
      var rounded    = Math.round(complaints * 10) / 10
      var cssClass   = 'warning'

      if (rounded < complaintsSettings.min) cssClass = 'success'
      if (rounded > complaintsSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(complaints) ? complaints.toFixed(1) + '%' : complaints,
        class: complaints !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
