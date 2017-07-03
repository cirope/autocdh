
var updateChart = function (data) {
    setTimeout(function () {
        if ($('[data-chart]').length) {
            var values = [
              data.a_6 ? data.a_6 : 0,
              data.b_6 ? data.b_6 : 0,
              data.c_6 ? data.c_6 : 0,
              data.d_6 ? data.d_6 : 0,
              data.e_6 ? data.e_6 : 0,
              data.f_6 ? data.f_6 : 0,
              data.g_6 ? data.g_6 : 0,
              data.h_6 ? data.h_6 : 0,
              data.i_6 ? data.i_6 : 0,
              data.j_6 ? data.j_6 : 0,
              data.k_6 ? data.k_6 : 0,
              data.l_6 ? data.l_6 : 0,
              data.m_6 ? data.m_6 : 0
            ] //.reverse();

            var seedLabels = [
                '76 mm',
                '63 mm',
                '51 mm',
                '38 mm',
                '25 mm',
                '19 mm',
                '9.5 mm',
                '12.5 mm',
                '4.8 mm',
                '2.0 mm',
                '0.420 mm',
                '0.149 mm',
                '0.075 mm'
            ] //.reverse()

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
    },
    thinReduce: function () {
        return this.thin_reduce ? TAPi18n.__('yes') : TAPi18n.__('no')
    },
    thinPass200: function () {
        return this.thin_pass_200 ? TAPi18n.__('yes') : TAPi18n.__('no')
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
