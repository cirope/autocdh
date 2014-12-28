Template.formula.helpers({
  concreteName: function () {
    var materials  = Materials.findOne() || { concretes: [] }
    var concreteId = this.id
    var concrete   = _.find(materials.concretes, function (concrete) {
      return concrete._id == concreteId
    })

    return concrete && concrete.name
  },

  sandName: function () {
    var materials = Materials.findOne() || { sands: [] }
    var sandId    = this.id
    var sand      = _.find(materials.sands, function (sand) {
      return sand._id == sandId
    })

    return sand && [sand.name, '(' + sand.absorption + '%)'].join(' ')
  },

  gravelName: function () {
    var materials = Materials.findOne() || { gravels: [] }
    var gravelId  = this.id
    var gravel    = _.find(materials.gravels, function (gravel) {
      return gravel._id == gravelId
    })

    return gravel && [gravel.name, '(' + gravel.absorption + '%)'].join(' ')
  },

  strength: function () {
    return Strengths.findOne(this.strengthId).name
  },

  settlement: function () {
    return Settlements.findOne(this.settlementId).name
  },

  aggregate: function () {
    return Aggregates.findOne(this.aggregateId).name
  },

  download: function () {
    return Downloads.findOne(this.downloadId).name
  }
})
