
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
            /*
            var options = {
                showLine: true,
             chartPadding: {
             top: 15,
             right: 15,
             bottom: 20,
             left: 10
             },
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        var module = Math.round(data.labels.length / 24)

                        return index % module === 0 ? value : null
                    }
                },
            }
            */
            var values = [
                {x: data.container_humidity_p1, y: data.dry_density_p1 },
                {x: data.container_humidity_p2, y: data.dry_density_p2 },
                {x: data.container_humidity_p3, y: data.dry_density_p3 },
                {x: data.container_humidity_p4, y: data.dry_density_p4 },
                {x: data.container_humidity_p5, y: data.dry_density_p5 }
            ];

            var gData = {
                series: [
                    {
                        data: values
                    }
                ]
            };

            var low = 100000;
            var high = -100000;
            for(var iy in values){
                if(values[iy].y < low){
                    low = values[iy].y;
                }
                if(values[iy].y > high){
                    high = values[iy].y;
                }
            }
            low -= .3;
            high += .3;

            var options = {
                low: low,
                high: high,
                lineSmooth: true,
                showPoint:  true,
                fullWidth:  true,
                showLine: true,
                axisX: {
                    type: Chartist.FixedScaleAxis,
                    divisor: 10,
                    labelInterpolationFnc: function(value) {
                        return value.toFixed(1);
                    }
                },
                chartPadding: {
                    top: 30,
                    right: 30,
                    bottom: 30,
                    left: 30
                },
                plugins: [
                    Chartist.plugins.tooltip(),
                    Chartist.plugins.ctAxisTitle({
                        axisX: {
                            axisTitle: TAPi18n.__('compaction_graphic_density'),
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 35
                            }
                        },
                        axisY: {
                            axisTitle: TAPi18n.__('compaction_graphic_humidity'),
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 5,
                                y: 5
                            },
                            textAnchor: 'middle',
                            flipTitle: true
                        }
                    })
                ],
                classNames: {
                    label: 'ct-label'
                }
            };

            new Chartist.Line('[data-chart]', gData, options)
        }
    })
};

Template.compaction.onCreated(function () {
})

Template.compaction.onRendered(function () {
    updateChart(this.data)
})

Template.compaction.helpers({
    sampleResponsible: function () {
        return this.sampleResponsibleId && Responsible.findOne(this.sampleResponsibleId).name
    },

    typeName: function () {
        return TAPi18n.__('compaction_type_' + this.type)
    },

    sieveName: function () {
        return TAPi18n.__('compaction_sieve_' + this.sieve)
    },
})

Template.compaction.events({
    'click [data-delete]': function (event, template) {
        if (confirm(TAPi18n.__('confirm_delete'))){
            Meteor.call('removeCompaction', template.data._id, function (error) {
                if (!error) Router.go('compactions')
            })
        }
    }
})
