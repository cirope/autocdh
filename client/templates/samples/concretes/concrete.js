Template.concrete.helpers({
  concreteName: function () {
    var materials  = Materials.first() || {}
    var concreteId = this.id
    var concrete   = _.find(materials.concretes, function (concrete) {
      return concrete && concrete._id === concreteId
    })

    return concrete && concrete.name
  },

  sandName: function () {
    var materials = Materials.first() || {}
    var sandId    = this.id
    var sand      = _.find(materials.sands, function (sand) {
      return sand && sand._id === sandId
    })

    return sand && sand.name
  },

  gravelName: function () {
    var materials = Materials.first() || {}
    var gravelId  = this.id
    var gravel    = _.find(materials.gravels, function (gravel) {
      return gravel && gravel._id === gravelId
    })

    return gravel && gravel.name
  },

  strength: function () {
    return Strengths.findOne(this.strengthId).name
  },

  download: function () {
    return TAPi18n.__('download_' + this.download)
  },

  aggregate: function () {
    return this.aggregateId && Aggregates.findOne(this.aggregateId).name
  },

  settlement: function () {
    return Settlements.findOne(this.settlementId).name
  },

  additive: function () {
    return Additives.findOne(this.additiveId)
  }
})
