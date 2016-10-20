var resistanceSettings = null

Template.statsIndicatorsDashboardResistance7Days.onCreated(function () {
  var indicators = this.data && this.data.settings && this.data.settings.qa && this.data.settings.qa.indicators

  if (! indicators) return

  resistanceSettings = indicators.resistance7DaysMin && indicators.resistance7DaysMax && {
    min: indicators.resistance7DaysMin,
    max: indicators.resistance7DaysMax
  }
})

Template.statsIndicatorsDashboardResistance7Days.onDestroyed(function () {
  resistanceSettings = null
})

Template.statsIndicatorsDashboardResistance7Days.helpers({
  resistance: function (context) {
    if (resistanceSettings) {
      var samples      = context.samples[this.value]
      var sampleIds    = _.pluck(samples, '_id')
      var bySample     = {}
      var cracks       = []
      var values       = []
      var cracksCursor = Cracks.find({
        days: 7, stress: { $ne: null }, sampleId: { $in: sampleIds }
      }, { reactive: false })

      cracksCursor.forEach(function (crack) {
        var sibling = bySample[crack.sampleId]

        if (sibling) {
          var stress = Math.round((crack.stress + sibling.stress) * 100) / 200

          cracks.push(_.extend(crack, { stress:  stress }))
        } else if (_.isNumber(crack.error)) {
          bySample[crack.sampleId] = crack
        } else {
          cracks.push(crack)
        }
      })

      _.each(cracks, function (crack) {
        var concrete  = Concretes.findOne({ sampleId: crack.sampleId }, { reactive: false })
        var strength  = Strengths.findOne(concrete.strengthId, { reactive: false })
        var resistant = strength && strength.resistant
        var crackedIn = moment(crack.crackedIn).endOf('day')
        var moldingIn = moment(crack.moldingIn).endOf('day')
        var dateDiff  = crackedIn.diff(moldingIn, 'days')

        if (resistant && dateDiff >= 6 && dateDiff <= 11)
          values.push(Math.round(crack.stress / resistant * 100))
      })

      var result   = Math.round(Graphics.mean(values))
      var cssClass = 'success'

      if (result < resistanceSettings.min) cssClass = 'danger'
      if (result > resistanceSettings.max) cssClass = 'warning'

      return {
        value: result ? result + '%' : TAPi18n.__('no_data_abbr'),
        class: result && cssClass
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})
