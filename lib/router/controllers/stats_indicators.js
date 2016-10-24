StatsIndicatorsConfigurationController = RouteController.extend({
  data: function () {
    return {
      settings: Settings.findOne()
    }
  }
})

StatsIndicatorsDashboardController = RouteController.extend({
  data: function () {
    var start     = moment().subtract(2, 'years').startOf('day')
    var end       = moment().endOf('day')
    var strengths = Strengths.find({}, { reactive: false })
    var samples   = Samples.find({
      date: {
        $gte: start.toDate(),
        $lte: end.toDate()
      }
    }, {
      reactive: false
    }).fetch()
    var sampleIds = _.pluck(samples, '_id')
    var concretes = Concretes.find({
      sampleId: { $in: sampleIds }
    }, {
      reactive: false
    }).fetch()
    var cracks    = Cracks.find({
      days:     28,
      stress:   { $ne: null },
      error:    { $lte: 15 },
      sampleId: { $in: sampleIds }
    }, {
      sort:     { crackedIn: 1 },
      reactive: false
    }).fetch()

    var strengthCracks = {}

    strengths.forEach(function (strength) {
      var _concretes = _.where(concretes, { strengthId: strength._id })
      var _sampleIds = _.pluck(_concretes, 'sampleId')
      var _cracks    = _.map(_sampleIds, function (sampleId) {
        var sample       = _.findWhere(samples, { _id: sampleId })
        var sampleCracks = _.where(cracks, { sampleId: sampleId })
        var crack        = _.first(sampleCracks)

        if (crack) {
          crack.sample = sample
          crack.stress = _.reduce(sampleCracks, function (memo, _crack) {
            return memo + crack.stress
          }, 0) / sampleCracks.length
        }

        return crack
      })
      var sortedCracks = _.sortBy(_.compact(_cracks), function (crack) {
        return -crack.sample.date.getTime()
      })

      if (strengthCracks[strength.resistant]) {
        var strengthCrack = strengthCracks[strength.resistant]
        var joinedCracks  = strengthCrack.cracks.concat(sortedCracks)

        strengthCracks[strength.resistant]['cracks'] = joinedCracks
      } else {
        strengthCracks[strength.resistant] = {
          name:      strength.name,
          resistant: strength.resistant,
          cracks:    sortedCracks
        }
      }
    })

    return {
      settings:  Settings.findOne(),
      strengths: strengthCracks,
      concretes: concretes,
      samples:   _.groupBy(samples, function (sample) {
        return moment(sample.date).format('YYYYMM')
      })
    }
  }
})
