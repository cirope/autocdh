var graphLabels = function () {
  var seedLabels = _.pluck(this.data.test, 'sieve').slice(0, -1).reverse()

  if (type === 'gravel') {
    seedLabels.splice(1, 0, '')
    seedLabels.splice(3, 0, '')
    seedLabels.splice(10, 1)
  }

  return seedLabels
}

var graphData = function () {
  var seedData = this.data.chartData.slice(0, -1).reverse()

  if (type === 'gravel') {
    seedData.splice(1, 0, (seedData[0] + seedData[1]) / 2)
    seedData.splice(3, 0, (seedData[2] + seedData[3]) / 2)
    seedData.splice(10, 1)
  }

  return seedData
}

var type = 'sand'

Template.granulometry.onCreated(function () {
  type = this.data.type
})

Template.granulometry.onRendered(function () {
  var data = {
    labels: graphLabels.apply(this),
    series: [graphData.apply(this)]
  }

  new Chartist.Line('.ct-chart', data, {
    lineSmooth:   false,
    showPoint:    false,
    fullWidth:    true,
    chartPadding: 20,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value.split(' | ')[0]
      }
    }
  })
})

Template.granulometry.helpers({
  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  sand: function () {
    return type === 'sand'
  },

  responsible: function () {
    return this.responsibleId && Responsible.findOne(this.responsibleId).name
  },

  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  dried: function () {
    return TAPi18n.__(this.dried ? 'yes' : 'no')
  },

  washed: function () {
    return TAPi18n.__(this.washed ? 'yes' : 'no')
  }
})

Template.granulometry.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeGranulometry', template.data._id, function (error) {
        if (! error) Router.go('granulometries')
      })
  }
})
