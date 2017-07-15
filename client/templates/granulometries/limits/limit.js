
var _limit_liquid = new ReactiveVar('')
var _limit_plastic = new ReactiveVar('')
var _limit_plastic_index = new ReactiveVar('')
var _values_25 = new ReactiveVar([])
var _values_line = new ReactiveVar([])

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
		if (_values_25.get().length == 0) {
			var defaultOptions = {
				number_values: 0
			};

			options = Chartist.extend({}, defaultOptions, options);

			if (chart instanceof Chartist.Line) {
				var s1 = []
				chart.on('draw', function (data) {
					if (_values_25.get().length === 0 && data.type === 'point') {
						if(data.seriesIndex === 0) {
							// save point
							s1.push({x: data.x, y: data.y, xr: data.value.x, yr: data.value.y})
						} else if(data.seriesIndex === 3) {
							// save point
							var x25rel = data.x

							// draw trend line
							var i;
							var n = s1.length
							if (n > 1) {
								var a = 0, c = 0, d = 0
								var b1 = 0, b2 = 0
								var xmi = 10000, xmx = -10000

								var ymia, ymxa
								var xmir, xmxr
								var ymir, ymxr
								for (i = 0; i < n; i++) {
									a += (s1[i].x * s1[i].y)
									b1 += s1[i].x
									b2 += s1[i].y
									c += (s1[i].x * s1[i].x)
									d += s1[i].x
									if (s1[i].x > xmx) {
										xmx = s1[i].x
										ymxa = s1[i].y
										xmxr = s1[i].xr
										ymxr = s1[i].yr
									}
									if (s1[i].x < xmi) {
										xmi = s1[i].x
										ymia = s1[i].y
										xmir = s1[i].xr
										ymir = s1[i].yr
									}
								}

								a *= n
								var b = b1 * b2
								c *= n
								d = d * d

								var m = (a - b) / (d - c)

								var ys = 0
								for (var yi = 0; yi < s1.length; yi++) {
									ys += s1[yi].y + m * s1[yi].x
								}
								var y0 = ys / s1.length

								var ymi = y0 - m * xmi
								var ymx = y0 - m * xmx

								var ya = ((ymxr-ymir)/(ymxa-ymia)*(ymi-ymia))+ymir
								_values_line.get().push({x: xmir, y: ya.toFixed(1)})

								var yb = ((ymxr-ymir)/(ymxa-ymia)*(ymx-ymia))+ymir
								_values_line.get().push({x: xmxr, y: yb.toFixed(1)})

								var y25rel = y0 - m * x25rel

								var y25 = ((ymxr-ymir)/(ymxa-ymia)*(y25rel-ymia))+ymir
								var y25a = y25.toFixed(1)

								_values_25.get().push({x: 25, y: y25a})

								var ll = y25.toFixed(0)
								_limit_liquid.set(ll)

								var lpi = 1 * ll - _limit_plastic.get()
								_limit_plastic_index.set(lpi.toFixed(0))

								if(!!options.chart_data) updateChart(options.chart_data)
							}
						}
					}
				});
			}
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

			var gData = {
				series: [
					{
						data: values,
						className: 'ct-series ct-series-a only-points'
					},
					{
						data: _values_25.get(),
						className: 'ct-series ct-series-b only-points'
					},
					{
						data: _values_line.get(),
						className: 'ct-series ct-series-b transparent-points dotted-a'
					},
					{
						data: values.length > 0 && _values_25.get().length == 0 ? [{x: 25, y: values[0].y }] : [],
						className: 'ct-series transparent-points'
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
					Chartist.plugins.logTrendLine({
						number_values: values.length,
						chart_data: data
					})
				]
			};

			new Chartist.Line('.ct-chart.ct-limits', gData, options)

			var lp = (
					(!!data.plastic_humidity_d2 ? data.plastic_humidity_d2 : 0) +
					(!!data.plastic_humidity_d1 ? data.plastic_humidity_d1 : 0)
				) / (!!data.plastic_humidity_d2 ? 2 : 1)
			lp = lp.toFixed(0)
			_limit_plastic.set(lp)

		}
	})
};

Template.limit.onCreated(function () {
})

Template.limit.onRendered(function () {
	if(!!_limit_liquid) _limit_liquid.set('')
	if(!!_limit_plastic) _limit_plastic.set('')
	if(!!_limit_plastic_index) _limit_plastic_index.set('')
	if(!!_values_25) _values_25.set([])
	if(!!_values_line) _values_line.set([])

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
