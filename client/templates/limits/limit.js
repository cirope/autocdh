
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

var updateChart = function (data) {
	setTimeout(function () {
		if ($('[data-chart]').length) {
			var values = [];
			if(data.liquid_hits_p1 && data.liquid_humidity_p1) values.push({x: data.liquid_hits_p1, y: data.liquid_humidity_p1 });
			if(data.liquid_hits_p2 && data.liquid_humidity_p2) values.push({x: data.liquid_hits_p2, y: data.liquid_humidity_p2 });
			if(data.liquid_hits_p3 && data.liquid_humidity_p3) values.push({x: data.liquid_hits_p3, y: data.liquid_humidity_p3 });

			var xx = _.pluck(values, 'x')
			var yy = _.pluck(values, 'y')

			var spline = new MonotonicCubicSpline(xx, yy)
			var y25 = spline.interpolate(25);

			var gData = {
				series: [
					{
						data: [{x: xx[0], y: spline.interpolate(xx[0])+.4}, {x: 25, y: y25},{x: xx[xx.length - 1], y: spline.interpolate(xx[xx.length - 1])+.4}],
						className: 'ct-series ct-series-a transparent-points dotted-a'
					},
					{
						data: values,
						className: 'ct-series ct-series-a only-points'
					},
					{
						data: [{x: 25, y: y25}],
						className: 'ct-series ct-series-b only-points'
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
						return Math.round(value)
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
					})
				]
			};

			new Chartist.Line('.ct-chart.ct-limits', gData, options)

			_limit_liquid.set(y25.toFixed(0))

			var lp = (data.plastic_humidity_d2 + data.plastic_humidity_d1) / (data.plastic_humidity_d2 ? 2 : 1)
			_limit_plastic.set(lp.toFixed(0))

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
