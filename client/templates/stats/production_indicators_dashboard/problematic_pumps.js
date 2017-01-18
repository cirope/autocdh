var pumpsSettings            = null
var pumpBreaksSettings       = null
var problematicPumpsSettings = null

var problematicPumpsFor = function (month) {
  var pumps      = _.findWhere(pumpsSettings, { month: +month })
  var pumpBreaks = _.findWhere(pumpBreaksSettings, { month: +month })

  if (pumps && pumps.value && pumpBreaks && _.isNumber(pumpBreaks.value))
    return (pumpBreaks.value / pumps.value) * 100
  else
    return TAPi18n.__('no_data_abbr')
}

Template.statsProductionIndicatorsDashboardProblematicPumps.onCreated(function () {
  var productionSettings = this.data.settings && this.data.settings.production
  var indicators         = productionSettings && productionSettings.indicators
  var pumps              = productionSettings && productionSettings.pumps
  var pumpBreaks         = productionSettings && productionSettings.pumpBreaks

  if (! pumps || ! pumpBreaks || ! indicators) return

  pumpsSettings            = pumps
  pumpBreaksSettings       = pumpBreaks
  problematicPumpsSettings = indicators.problematicPumpsMin && indicators.problematicPumpsMax && {
    min: indicators.problematicPumpsMin,
    max: indicators.problematicPumpsMax
  }
})

Template.statsProductionIndicatorsDashboardProblematicPumps.onDestroyed(function () {
  pumpsSettings            = null
  pumpBreaksSettings       = null
  problematicPumpsSettings = null
})

Template.statsProductionIndicatorsDashboardProblematicPumps.helpers({
  problematicPumps: function () {
    if (problematicPumpsSettings) {
      var month            = moment(this.value, 'YYYYMM')
      var problematicPumps = problematicPumpsFor(month.format('YYYYMM'))
      var rounded          = Math.round(problematicPumps * 10) / 10
      var cssClass         = 'warning'

      if (rounded < problematicPumpsSettings.min) cssClass = 'success'
      if (rounded > problematicPumpsSettings.max) cssClass = 'danger'

      return {
        value: _.isNumber(problematicPumps) ? problematicPumps.toFixed(1) + '%' : problematicPumps,
        class: problematicPumps !== TAPi18n.__('no_data_abbr') && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})


