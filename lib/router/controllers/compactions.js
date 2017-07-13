var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.sampleName) selector.sampleName = new RegExp('.*' + query.sampleName + '.*', 'gi')
  if (query.origin) selector.origin = new RegExp('.*' + query.origin + '.*', 'gi')
  if (query.fieldDate) selector.fieldDate = dateRange(query.fieldDate)

  return selector
}

CompactionsController = RouteController.extend({
  increment: 30,

  compactionsLimit: function () {
     return +this.params.limit || this.increment
  },

  findOptions: function () {
    return { sort: { fieldDate: -1 }, limit: this.compactionsLimit() }
  },

  subscriptions: function () {
    this.compactionsSub = this.subscribe('compactionsLimited', this.findOptions())
  },

  compactions: function (query) {
    return Compactions.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
  },

  data: function () {
    var hasMore  = this.compactions(this.params.query).count() === this.compactionsLimit()
    var nextPath = this.route.path({ limit: this.compactionsLimit() + this.increment })

    return {
      compactions:  this.compactions(this.params.query),
      ready:        this.compactionsSub.ready,
      nextPath:     hasMore ? nextPath : null,
      hasQuery:     ! _.isEmpty(this.params.query)
    }
  }
})

CompactionEditController = RouteController.extend({
  data: function () {
    return Compactions.findOne(this.params._id)
  }
})

var compactionAssayData = function () {
  var series         = []
  var labels         = []

  var compaction = Compactions.findOne(this.params._id)

  var values = [];
  if(compaction) {
    if (compaction.container_humidity_p1 && compaction.dry_density_p1) values.push({
      x: compaction.container_humidity_p1,
      y: compaction.dry_density_p1
    });
    if (compaction.container_humidity_p2 && compaction.dry_density_p2) values.push({
      x: compaction.container_humidity_p2,
      y: compaction.dry_density_p2
    });
    if (compaction.container_humidity_p3 && compaction.dry_density_p3) values.push({
      x: compaction.container_humidity_p3,
      y: compaction.dry_density_p3
    });
    if (compaction.container_humidity_p4 && compaction.dry_density_p4) values.push({
      x: compaction.container_humidity_p4,
      y: compaction.dry_density_p4
    });
    if (compaction.container_humidity_p5 && compaction.dry_density_p5) values.push({
      x: compaction.container_humidity_p5,
      y: compaction.dry_density_p5
    });
  }

  var xx = _.pluck(values, 'x')
  var yy = _.pluck(values, 'y')
  var spline = new MonotonicCubicSpline(xx, yy)

  var xm = xx[0];
  var ym = yy[0];

  var values2 = [];
  if(xx.length > 2) {
    for (var xi = xm; xi <= xx[xx.length - 1]; xi += .2) {
      var yi = spline.interpolate(xi);
      if(ym < yi){
        xm = xi;
        ym = yi;
      }

      values2.push({x: xi, y: yi});
    }
  }

  var low = 100000;
  var min = 100000;
  var high = -100000;
  var max = -100000;
  for(var iy in values){
    if(values[iy].y < low){
      low = values[iy].y;
    }
    if(values[iy].x < min){
      min = values[iy].x;
    }
    if(values[iy].y > high){
      high = values[iy].y;
    }
    if(values[iy].x > max){
      max = values[iy].x;
    }
  }
  // y limits
  if(high < low){
    low = 0;
    high = 10;
  } else {
    var dy = Math.abs(high - low);
    low -= (dy * 0.33);
    high += (dy * 0.33);
  }

  // x limits
  if(max < min){
    min = 0;
    max = 100;
  } else {
    var dx = Math.abs(max - min);
    var oMin = min;
    min -= dx * 0.33;
    min = min < 0 ? (min < oMin ? oMin : 0) : min;
    var oMax = max;
    max += dx * 0.33;
    max = max > 100 ? (max > oMax ? oMax : 100) : max;
  }

  series.push({
    data: values2,
    className: 'ct-series ct-series-a only-line'
  })
  series.push({
    data: values,
    className: 'ct-series ct-series-a only-points'
  })
  if(!! xm && !!ym) {
    series.push({
      data: [{x: xm.toFixed(1) , y: ym.toFixed(2) }],
      className: 'ct-series ct-series-b only-points'
    })
  }

  return {
    compaction: compaction,
    labels:     labels,
    series:     series,
    low:        low,
    high:       high,
    min:        min,
    max:        max,
    maxHumidity:  !!xm ? xm.toFixed(1) : '-',
    maxDensity:   !!ym ? ym.toFixed(2) : '-'
  }
}

CompactionAssayController = RouteController.extend({
  data: function () {
    var self = this

    return Tracker.nonreactive(compactionAssayData.bind(self))
  }
})
