Template.formula.helpers({
  concreteName: function () {
    var materials  = Materials.first() || { concretes: [] }
    var concreteId = this.id
    var concrete   = _.find(materials.concretes, function (concrete) {
      return concrete && concrete._id === concreteId
    })

    return concrete && concrete.name
  },

  sandName: function () {
    var materials = Materials.first() || { sands: [] }
    var sandId    = this.id
    var sand      = _.find(materials.sands, function (sand) {
      return sand && sand._id === sandId
    })

    return sand && [sand.name, '(' + sand.absorption + '%)'].join(' ')
  },

  gravelName: function () {
    var materials = Materials.first() || { gravels: [] }
    var gravelId  = this.id
    var gravel    = _.find(materials.gravels, function (gravel) {
      return gravel && gravel._id === gravelId
    })

    return gravel && [gravel.name, '(' + gravel.absorption + '%)'].join(' ')
  },

  strength: function () {
    return this.strengthId && Strengths.findOne(this.strengthId).name
  },

  settlement: function () {
    return this.settlementId && Settlements.findOne(this.settlementId).name
  },

  aggregate: function () {
    return this.aggregateId && Aggregates.findOne(this.aggregateId).name
  },

  download: function () {
    return this.download && TAPi18n.__('download_' + this.download)
  }
})

Template.formula.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeFormula', template.data._id, function (error) {
        if (! error) Router.go('formulas')
      })
  }
})
