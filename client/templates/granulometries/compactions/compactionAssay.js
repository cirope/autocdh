
var _max_density = new ReactiveVar('')
var _max_humidity = new ReactiveVar('')

var updateChart = function (data) {
	setTimeout(function () {
		if ($('[data-chart]').length) {

			var options = {
				showPoint: true,
				fullWidth: false,
				showLine: true,
				lineSmooth: false,
				axisX: {
					type: Chartist.FixedScaleAxis,
					divisor: 10,
					labelOffset: {
						x: -10,
						y: 0
					},
					labelInterpolationFnc: function (value) {
						return value.toFixed(1);
					}
				},
				axisY: {
					labelOffset: {
						x: 1,
						y: 8
					}
				},
				plugins: [
					Chartist.plugins.tooltip(),
					Chartist.plugins.ctAxisTitle({
						axisX: {
							axisTitle: TAPi18n.__('compaction_graphic_humidity'),
							axisClass: 'ct-axis-title',
							offset: {
								x: 0,
								y: 35
							},
							textAnchor: 'middle'
						},
						axisY: {
							axisTitle: TAPi18n.__('compaction_graphic_density'),
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

			if(!!data.low) options.low = data.low;
			if(!!data.high) options.high = data.high;
			if(!!data.min) options.axisX.min = data.min;
			if(!!data.max) options.axisX.max = data.max;
			if(!!data.maxHumidity) _max_humidity.set(data.maxHumidity);
			if(!!data.maxDensity) _max_density.set(data.maxDensity);

			new Chartist.Line('.ct-chart.ct-compaction-assay', data, options)
		}
	})
};

Template.compactionAssay.onCreated(function () {
})

Template.compactionAssay.onRendered(function () {
	updateChart(_.pick(this.data, 'labels', 'series', 'high', 'low', 'min', 'max', 'maxDensity', 'maxHumidity'))
})

Template.compactionAssay.helpers({
	compactionUpdate: function () {
		updateChart(_.pick(this, 'labels', 'series', 'high', 'low', 'min', 'max', 'maxDensity', 'maxHumidity'))

		return this.compaction.sampleResponsibleId && Responsible.findOne(this.compaction.sampleResponsibleId).name
	},

	sampleResponsible: function () {
		return this.compaction.sampleResponsibleId && Responsible.findOne(this.compaction.sampleResponsibleId).name
	},

	typeName: function () {
		return TAPi18n.__('compaction_type_' + this.compaction.type)
	},

	sieveName: function () {
		return TAPi18n.__('compaction_sieve_' + this.compaction.sieve)
	},

	maxDensity: function () {
		return _max_density.get()
	},

	maxHumidity: function () {
		return _max_humidity.get()
	}
})

Template.compactionAssay.events({
	'click [data-delete]': function (event, template) {
		if (confirm(TAPi18n.__('confirm_delete'))){
			Meteor.call('removeCompaction', template.data.compaction._id, function (error) {
				if (!error) Router.go('compactions')
			})
		}
	}
})