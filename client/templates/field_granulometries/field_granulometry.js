
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
            var values = [
              data.passed_percentage_76 ? data.passed_percentage_76 : 0,
              data.passed_percentage_63 ? data.passed_percentage_63 : 0,
              data.passed_percentage_51 ? data.passed_percentage_51 : 0,
              data.passed_percentage_38 ? data.passed_percentage_38 : 0,
              data.passed_percentage_25 ? data.passed_percentage_25 : 0,
              data.passed_percentage_19 ? data.passed_percentage_19 : 0,
              data.passed_percentage_95 ? data.passed_percentage_95 : 0,
              data.passed_percentage_48 ? data.passed_percentage_48 : 0,
              data.passed_percentage_20 ? data.passed_percentage_20 : 0,
              data.passed_percentage_04 ? data.passed_percentage_04 : 0,
              data.passed_percentage_02 ? data.passed_percentage_02 : 0,
              data.passed_percentage_01 ? data.passed_percentage_01 : 0,
              data.passed_percentage_00 ? data.passed_percentage_00 : 0,
              data.passed_percentage_b ? data.passed_percentage_b : 0
            ].reverse();

            var seedLabels = [
                '76 mm',
                '63 mm',
                '51 mm',
                '38 mm',
                '25 mm',
                '19 mm',
                '9.5 mm',
                '4.8 mm',
                '2.0 mm',
                '0.420 mm',
                '0.250 mm',
                '0.149 mm',
                '0.075 mm',
                TAPi18n.__('field_granulometry_background')
            ].reverse()

            var gData = {
                labels: seedLabels,
                series: [{data: values}]
            };

            var options = {
                low: 0,
                high: 100,
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
                            axisTitle: TAPi18n.__('field_granulometry_graphic_sieve'),
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 35
                            },
                            textAnchor: 'middle'
                        },
                        axisY: {
                            axisTitle: TAPi18n.__('field_granulometry_graphic_percentage'),
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

            new Chartist.Line('.ct-chart.ct-field-granulometry', gData, options)
        }
    })
};

Template.fieldGranulometry.onCreated(function () {
})

Template.fieldGranulometry.onRendered(function () {
    updateChart(this.data)
})

Template.fieldGranulometry.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    }
})

Template.fieldGranulometry.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeFieldGranulometry', template.data._id, function (error) {
                if (!error) Router.go('fieldGranulometries')
            })
        }
    }
})
