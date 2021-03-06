var defaultMaterial = function () {
  var material = Materials.first()

  return material && _.first(_.compact(_.union(material.sands, material.gravels)))
}

var findMaterial = function (materialId) {
  var material = Materials.first()
  var predicate = function (m) { return m._id === materialId }
  var sand = material && _.find(material.sands, predicate)
  var gravel = material && _.find(material.gravels, predicate)

  return _.extend(sand || gravel, { type: sand ? 'sand' : 'gravel' })
}

var data = function (attribute) {
  var series   = []
  var labels   = []
  var material = defaultMaterial()
  var query    = _.defaults(this.params.query, {
    materialId: material && material._id,
    start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:        moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter   = Graphics.castQuery(query)
  var material = findMaterial(filter.materialId)
  var values   = []
  var gFilter  = Graphics.filterGranulometries
  var ghFilter = Graphics.filterGranulometryHumidities

  if (gFilter(filter, attribute).count() + ghFilter(filter, attribute).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd                 = filter.start.clone().endOf('day')
      var granulometries         = gFilter(_.extend(_.clone(filter), { end: dayEnd }), attribute)
      var granulometryHumidities = ghFilter(_.extend(_.clone(filter), { end: dayEnd }), attribute)
      var serie                  = -1
      var bySample               = {}
      var i                      = 0
      var elements               = granulometries.fetch().concat(granulometryHumidities.fetch())

      _.each(elements, function (granulometry) {
        var value = null

        if (attribute === 'thin')
          value = granulometry.thin ? granulometry.thin.percentage : 0
        else if (attribute === 'humidity')
          value = granulometry.humidity ? granulometry.humidity.percentage : 0
        else
          value = granulometry[attribute]

        if (! series[serie = i])
          series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

        series[serie].data[labels.length] = {
          meta:  granulometry.name,
          value: Math.round(value * 100) / 100
        }

        values.push(series[serie].data[labels.length].value)

        i++
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    var average = _.reduce(values, function (memo, f) { return memo + f }, 0) / values.length

    series.unshift({
      data:      Graphics.arrayOf(average, labels.length),
      className: 'ct-series ct-series-m transparent-points dotted-a'
    })
  }

  return {
    granulometries:         gFilter(Graphics.castQuery(query), attribute),
    granulometryHumidities: ghFilter(Graphics.castQuery(query), attribute),
    material:               material,
    labels:                 labels,
    series:                 series,
    filter:                 _.extend(filter, {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    })
  }
}

GraphicAggregateFinenessController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(data.bind(self, 'fineness'))
  }
})

GraphicAggregateThinController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(data.bind(self, 'thin'))
  }
})

GraphicAggregateHumidityController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(data.bind(self, 'humidity'))
  }
})
