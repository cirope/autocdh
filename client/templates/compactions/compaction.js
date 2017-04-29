
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
            var values = [];
            if(data.container_humidity_p1 && data.dry_density_p1) values.push({x: data.container_humidity_p1, y: data.dry_density_p1 });
            if(data.container_humidity_p2 && data.dry_density_p2) values.push({x: data.container_humidity_p2, y: data.dry_density_p2 });
            if(data.container_humidity_p3 && data.dry_density_p3) values.push({x: data.container_humidity_p3, y: data.dry_density_p3 });
            if(data.container_humidity_p4 && data.dry_density_p4) values.push({x: data.container_humidity_p4, y: data.dry_density_p4 });
            if(data.container_humidity_p5 && data.dry_density_p5) values.push({x: data.container_humidity_p5, y: data.dry_density_p5 });

            var xx = _.pluck(values, 'x')
            var yy = _.pluck(values, 'y')
            var spline = new MonotonicCubicSpline(xx, yy)

            var xm = xx[0];
            var ym = yy[0];

            var values2 = [];
            if(xx.length > 2) {
                for (var xi = xm; xi <= xx[xx.length - 1]; xi += .1) {
                    var yi = spline.interpolate(xi);
                    if(ym < yi){
                        xm = xi;
                        ym = yi;
                    }

                    values2.push({x: xi, y: yi});
                }
            }

            xm = xm.toFixed(1);
            ym = ym.toFixed(2);

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

            var gData = { series: [
                //{
                //    data: [{x: 0, y: ym}, {x: xm, y: ym}, {x: xm, y: 0}],
                //   className: 'ct-series ct-series-b transparent-points dotted-a'
                //},
                {
                    data: values2,
                    className: 'ct-series ct-series-a only-line'
                }, {
                    data: values,
                    className: 'ct-series ct-series-a only-points'
                }, {
                    data: [{x: xm, y: ym}],
                    className: 'ct-series ct-series-b only-points'
                }
            ]};

            var options = {
                low: low,
                high: high,
                showPoint:  true,
                fullWidth:  false,
                showLine: true,
                lineSmooth: false,
                axisX: {
                    type: Chartist.FixedScaleAxis,
                    divisor: 10,
                    low: min,
                    high: max,
                    labelOffset: {
                        x: -10,
                        y: 0
                    },
                    labelInterpolationFnc: function(value) {
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

            new Chartist.Line('.ct-chart.ct-compaction', gData, options)
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
