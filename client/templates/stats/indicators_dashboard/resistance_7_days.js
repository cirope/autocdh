var resistanceSettings = null
var strengths          = null
var concretes          = null
var samples            = null

var resistance = function (month) {
  var _samples     = samples[month]
  var sampleIds    = _.pluck(_samples, '_id')
  var bySample     = {}
  var cracks       = []
  var values       = []
  var details      = {}
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
    var concrete  = _.findWhere(concretes, { sampleId: crack.sampleId })
    var strength  = _.findWhere(strengths, { _id: concrete.strengthId })
    var resistant = strength && strength.resistant
    var crackedIn = moment(crack.crackedIn).endOf('day')
    var moldingIn = moment(crack.moldingIn).endOf('day')
    var dateDiff  = crackedIn.diff(moldingIn, 'days')

    if (resistant && dateDiff >= 6 && dateDiff <= 11) {
      var _resistance = crack.stress / resistant * 100

      if (! details[resistant]) details[resistant] = []

      details[resistant].push(_resistance)
      values.push(_resistance)
    }
  })

  return {
    values:  values,
    details: details
  }
}

var resistanceFor = function (month) {
  var values = resistance(month).values

  return Math.round(Stats.mean(values))
}

Template.statsIndicatorsDashboardResistance7Days.onCreated(function () {
  var qaSettings = this.data.settings && this.data.settings.qa
  var indicators = qaSettings && qaSettings.indicators
  var options    = { sort: { resistant: 1 }, reactive: false }

  if (! indicators) return

  strengths          = Strengths.find({}, options).fetch()
  concretes          = this.data.concretes
  samples            = this.data.samples
  resistanceSettings = indicators.resistance7DaysMin && indicators.resistance7DaysMax && {
    min: indicators.resistance7DaysMin,
    max: indicators.resistance7DaysMax
  }
})

Template.statsIndicatorsDashboardResistance7Days.onDestroyed(function () {
  strength           = null
  concretes          = null
  samples            = null
  resistanceSettings = null
})

Template.statsIndicatorsDashboardResistance7Days.helpers({
  resistance: function () {
    if (resistanceSettings) {
      var result   = resistanceFor(this.value)
      var cssClass = 'success'

      if (result < resistanceSettings.min) cssClass = 'danger'
      if (result > resistanceSettings.max) cssClass = 'warning'

      return {
        value: result ? result + '%' : TAPi18n.__('no_data_abbr'),
        class: result && (cssClass + ' pointer-cursor')
      }
    } else {
      return {
        value: TAPi18n.__('no_data_abbr')
      }
    }
  }
})

Template.statsIndicatorsDashboardResistance7Days.events({
  'click [data-details-for]': function (event, template) {
    var month       = $(event.currentTarget).data('detailsFor')
    var _resistance = resistance(month).details
    var data        = {
      month:      moment(month, 'YYYYMM').format('MMMM YYYY').toUpperCase(),
      resistance: _.map(strengths, function (strength) {
        var r = _resistance[strength.resistant]

        return {
          strength:   strength.name,
          resistance: r ?
            Math.round(Stats.mean(r)) + '%' :
            TAPi18n.__('no_data_abbr')
        }
      })
    }

    Session.set('indicatorDetailsTemplateData', data)
    Session.set('indicatorDetailsTemplate', 'statsIndicatorsDashboardResistance7DaysDetails')
  }
})
