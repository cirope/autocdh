
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
            var values = [];
            if(data.liquid_hits_p1 && data.liquid_humidity_p1) values.push({x: data.liquid_hits_p1, y: data.liquid_humidity_p1 });
            if(data.liquid_hits_p2 && data.liquid_humidity_p2) values.push({x: data.liquid_hits_p2, y: data.liquid_humidity_p2 });
            if(data.liquid_hits_p3 && data.liquid_humidity_p3) values.push({x: data.liquid_hits_p3, y: data.liquid_humidity_p3 });

            var gData = { series: [
                {
                    data: values,
                    className: 'ct-series ct-series-a transparent-points dotted-a'
                },
                {
                    data: values,
                    className: 'ct-series ct-series-a only-points'
                }
            ]};

            var options = {
                //low: 0,
                //high: 50,
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
                    ticks: [1, 5, 10, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100],
                    //low: 10,
                    //high: 60,
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
