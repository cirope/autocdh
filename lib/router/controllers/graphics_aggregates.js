var defaultMaterial = function () {
  var material = Materials.first()

  return material && _.first(_.compact(_.union(material.sands, material.gravels)))
}

var findMaterial = function (materialId) {
  var material = Materials.first()

  return material && _.find(_.union(material.sands, material.gravels), function (m) { return m._id == materialId })
}

var finenessData = function () {
  var series     = []
  var labels     = []
  var material   = defaultMaterial()
  var query      = _.defaults(this.params.query, {
    materialId: material && material._id,
    start:      moment().subtract(1, 'year').startOf('day').format('YYYY-MM-DD'),
    end:        moment().startOf('day').format('YYYY-MM-DD')
  })
  var filter     = Graphics.castQuery(query)
  var material   = findMaterial(filter.materialId)
  var finenesses = []

  if (Graphics.filterGranulometries(filter).count()) {
    while (filter.start.isBefore(filter.end)) {
      var dayEnd         = filter.start.clone().endOf('day')
      var granulometries = Graphics.filterGranulometries(_.extend(_.clone(filter), { end: dayEnd }))
      var serie          = -1
      var noValue        = -1
      var bySample       = {}
      var i              = 0

      granulometries.forEach(function (granulometry) {
        if (! series[serie = i])
          series[serie] = { className: 'ct-series ct-series-a only-points', data: [] }

        finenesses.push(series[serie].data[labels.length] = granulometry.fineness)

        i++
      })

      labels.push(filter.start.format('L'))

      filter.start.add(1, 'day')
    }

    for (var i = 0, l = series.length; i < l; i++)
      for (var j = 0, k = labels.length; j < k; j++)
        series[i].data[j] = series[i].data[j] || noValue

    var average  = _.reduce(finenesses, function (memo, f) { return memo + f }, 0) / finenesses.length

    series.unshift({
      className: 'ct-series ct-series-m only-line dotted-a',
      data:      Graphics.arrayOf(average, labels.length)
    })
  }

  return {
    granulometries: Graphics.filterGranulometries(Graphics.castQuery(query)),
    material:       material,
    labels:         labels,
    series:         series,
    filter:         {
      start: moment(query.start).toDate(),
      end:   moment(query.end).toDate()
    }
  }
}

GraphicAggregateFinenessController = RouteController.extend({
  data: function () { return finenessData.call(this) }
})
