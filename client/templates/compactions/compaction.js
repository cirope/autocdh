var tests = [
    { sieve: '76 mm | 3″' },
    { sieve: '63 mm | 2 ½″' },
    { sieve: '51 mm | 2″' },
    { sieve: '38 mm | 1 ½″' },
    { sieve: '25 mm | 1' },
    { sieve: '19 mm | 3/4″' },
    { sieve: '13 mm | 1/2″' },
    { sieve: '9.5 mm | 3/8″' },
    { sieve: '4.8 mm | # 4' },
    { sieve: '2.4 mm | # 8' },
    { sieve: '1.2 mm | # 16' },
    { sieve: '0.59 mm | # 30' },
    { sieve: '0.297 mm | # 50' },
    { sieve: '0.149 mm | # 100' },
    { sieve: 'Fondo | Pasa # 100' }
]

var graphLabels = function () {
    var seedLabels = _.pluck(tests, 'sieve').slice(0, -1).reverse()

    _.each([1, 3, 5, 7, 9, 11], function (i) {
        seedLabels.splice(i, 0, '')
    })

    seedLabels.splice(18, 1)

    return seedLabels
}

var graphData = function () {
    var seedData = this.chartData.get().slice(0, -1).reverse()
    var series   = []

    series.push({
        data:      seedData,
        className: 'ct-series ct-series-a only-line',
    })

    return series
}

var updateChart = function () {
    var data = {
        labels: graphLabels.apply(this),
        series: graphData.apply(this)
    }

    setTimeout(function () {
        new Chartist.Line('.ct-chart.ct-compaction', data, {
            lineSmooth: false,
            showPoint:  false,
            fullWidth:  true,
            low:        0,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return _.first(value.split(' | '))
                }
            },
            axisY: {
                labelInterpolationFnc: function (value) {
                    return Math.round(value)
                }
            },
            plugins: [
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
        })
    })
};

Template.compaction.onCreated(function () {
    this.chartData = new ReactiveVar([])
})

Template.compaction.onRendered(function () {
    updateChart.apply(this)
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
