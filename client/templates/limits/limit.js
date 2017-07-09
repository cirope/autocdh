
var _limit_liquid = new ReactiveVar('')
var _limit_plastic = new ReactiveVar('')
var _limit_plastic_index = new ReactiveVar('')

var baseLog = function(val, base) {
	return Math.log(val) / Math.log(base);
}

var projectValue = function(value) {
	value = +Chartist.getMultiValue(value, 'x');
	var max = this.bounds.max;
	var min = this.bounds.min;
	if (this.scale.type === 'log') {
		var base = this.scale.base;
		return this.axisLength / baseLog(max / min, base) * baseLog(value / min, base);
	}
	return this.axisLength * (value - min) / this.bounds.range;
}

var logTrendLine = function (options) {
	return function(chart) {
		var defaultOptions = {};

		options = Chartist.extend({}, defaultOptions, options);

		if(chart instanceof Chartist.Line) {
			var s1 = []
			chart.on('draw', function(data) {
				if(data.type === 'point') {
					if(data.seriesIndex === 0){
						// save point
						s1.push({x: data.x, y: data.y})
						console.log('Punto serie:'+data.seriesIndex+', x:'+data.x+', y:'+data.y+', value:'+JSON.stringify(data.value))
					} else if(data.seriesIndex === 1){
						// draw trend line
						var pr = {x: data.x, y: data.y}
						console.log('Punto posta:'+data.seriesIndex+', x:'+data.x+', y:'+data.y+', value:'+JSON.stringify(data.value))

						// http://classroom.synonym.com/calculate-trendline-2709.html
						var i;
						var n = s1.length
						if(n > 1){
							// TODO do special cases when 1 and 2 points only
							var a = 0, c = 0, d = 0
							var b1 = 0, b2 = 0
							var xmi = pr.x, xmx = pr.x

							for(i = 0; i < n; i++){
								a += (s1[i].x * s1[i].y)
								b1 += s1[i].x
								b2 += s1[i].y
								c += (s1[i].x * s1[i].x)
								d += s1[i].x
								if(s1[i].x > xmx){
									xmx = s1[i].x
								}
								if(s1[i].x < xmi){
									xmi = s1[i].x
								}
							}

							a *= n
							var b = b1 * b2
							c *= n
							d = d * d

							var m = (a - b) / (d - c)
							var y0 = pr.y + m * pr.x

							xmi -= 10
							var ymi = y0 - m * xmi
							xmx += 10
							var ymx = y0 - m * xmx

							var line = new Chartist.Svg('line', {
								x1: [xmi],
								y1: [ymi],
								x2: [xmx],
								y2: [ymx],
								style: 'stroke:rgb(50,93,136);stroke-width:1'
							}, 'ct-line');
							data.element.parent().append(line);
						}

					}
				}
			});
		}
	}
}
Chartist.plugins = Chartist.plugins || {}
Chartist.plugins.logTrendLine = logTrendLine

var updateChart = function (data) {
	setTimeout(function () {
		if ($('[data-chart]').length) {
			var values = [];
			if(data.liquid_hits_p1 && data.liquid_humidity_p1) values.push({x: data.liquid_hits_p1, y: data.liquid_humidity_p1 });
			if(data.liquid_hits_p2 && data.liquid_humidity_p2) values.push({x: data.liquid_hits_p2, y: data.liquid_humidity_p2 });
			if(data.liquid_hits_p3 && data.liquid_humidity_p3) values.push({x: data.liquid_hits_p3, y: data.liquid_humidity_p3 });
			if(data.liquid_hits_p4 && data.liquid_humidity_p4) values.push({x: data.liquid_hits_p4, y: data.liquid_humidity_p4 });
			if(data.liquid_hits_p5 && data.liquid_humidity_p5) values.push({x: data.liquid_hits_p5, y: data.liquid_humidity_p5 });

			var xx = _.pluck(values, 'x')
			var yy = _.pluck(values, 'y')

			var spline = new MonotonicCubicSpline(xx, yy)
			var y25 = spline.interpolate(25)
			y25 = y25.toFixed(0)

			var gData = {
				series: [
					{
						data: values,
						className: 'ct-series ct-series-a only-points'
					},
					{
						data: [{x: 25, y: y25}],
						className: 'ct-series ct-series-b only-points'
					},
					{
						data: [],
						className: 'ct-series ct-series-a transparent-points dotted-a'
					}
				]};

			var options = {
				showPoint:  true,
				fullWidth:  true,
				showLine: true,
				lineSmooth: false,
				chartPadding: {
					top: 10,
					right: 10,
					bottom: 20,
					left: 10
				},
				axisX: {
					type: Chartist.AutoScaleAxis,
					scale: 'log10',
					ticks: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100],
					onlyInteger: true,
					labelOffset: {
						x: -10,
						y: 0
					}
				},
				axisY: {
					divisor: 10,
					labelOffset: {
						x: 1,
						y: 8
					},
					labelInterpolationFnc: function (value) {
						return value.toFixed(1)
					}
				},
				plugins: [
					Chartist.plugins.tooltip(),
					Chartist.plugins.ctAxisTitle({
						axisX: {
							axisTitle: TAPi18n.__('limit_graphic_hits'),
							axisClass: 'ct-axis-title',
							offset: {
								x: 0,
								y: 35
							},
							textAnchor: 'middle'
						},
						axisY: {
							axisTitle: TAPi18n.__('limit_graphic_humidity'),
							axisClass: 'ct-axis-title',
							offset: {
								x: 0,
								y: 10
							},
							textAnchor: 'middle',
							flipTitle: true
						}
					}),
					Chartist.plugins.logTrendLine({})
				]
			};

			new Chartist.Line('.ct-chart.ct-limits', gData, options)

			_limit_liquid.set(y25)

			var lp = (
				(!!data.plastic_humidity_d2 ? data.plastic_humidity_d2 : 0) +
				(!!data.plastic_humidity_d1 ? data.plastic_humidity_d1 : 0)
				) / (!!data.plastic_humidity_d2 ? 2 : 1)
			lp = lp.toFixed(0)
			_limit_plastic.set(lp)

			var lpi = y25 - lp
			_limit_plastic_index.set(lpi.toFixed(0))
		}
	})
};

Template.limit.onCreated(function () {
})

Template.limit.onRendered(function () {
	updateChart(this.data)
})

Template.limit.helpers({
	sampleResponsible: function () {
		return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
	},

	limitLiquid: function () {
		return _limit_liquid.get()
	},

	limitPlastic: function () {
		return _limit_plastic.get()
	},

	limitPlasticIndex: function () {
		return _limit_plastic_index.get()
	}
})

Template.limit.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeLimit', template.data._id, function (error) {
                if (!error) Router.go('limits')
            })
        }
    }
})
