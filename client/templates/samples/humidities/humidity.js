Template.humidity.helpers({
  ice: function () {
    var ice = (this.hasIce && this.ice) && this.ice + ' kg/m³'

    return ice || TAPi18n.__('no')
  },

  additionalWater: function () {
    var additionalWater = (this.hasAdditionalWater && this.additionalWater) && this.additionalWater + ' l/m³'

    return additionalWater || TAPi18n.__('no')
  },

  additionalAdditive: function () {
    var additionalAdditive = (this.hasAdditionalAdditive && this.additionalAdditive) && this.additionalAdditive + ' l/m³'

    if (this.additionalAdditiveId)
      additionalAdditive = additionalAdditive + ' (' + Additives.findOne(this.additionalAdditiveId).name + ')'

    return additionalAdditive || TAPi18n.__('no')
  },

  inTruck: function () {
    return TAPi18n.__(this.inTruck ? 'yes' : 'no')
  },

  sandName: function () {
    var materials = Materials.first() || { sands: [] }
    var sandId    = this.id
    var sand      = _.find(materials.sands, function (sand) {
      return sand && sand._id === sandId
    })

    return sand && sand.name
  },

  gravelName: function () {
    var materials = Materials.first() || { gravels: [] }
    var gravelId  = this.id
    var gravel    = _.find(materials.gravels, function (gravel) {
      return gravel && gravel._id === gravelId
    })

    return gravel && gravel.name
  },
})
