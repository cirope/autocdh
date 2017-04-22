
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
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
            var diff = high - low;
            low -= (diff * 0.33);
            high += (diff * 0.33);

            var options = {
                low: low,
                high: high,
                lineSmooth: true,
                showPoint:  true,
                fullWidth:  false,
                showLine: true,
                axisX: {
                    type: Chartist.FixedScaleAxis,
                    divisor: 20,
                    labelInterpolationFnc: function(value) {
                        return value.toFixed(1);
                    }
                },
                chartPadding: {
                    top: 10,
                    right: 10,
                    bottom: 50,
                    left: 50
                },
                plugins: [
                    Chartist.plugins.tooltip(),
                    Chartist.plugins.ctAxisTitle({
                        axisX: {
                            axisTitle: TAPi18n.__('compaction_graphic_density'),
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 100,
                                y: 0
                            }
                        },
                        axisY: {
                            axisTitle: TAPi18n.__('compaction_graphic_humidity'),
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 0
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
