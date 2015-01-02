Template.humidity.helpers({
  ice: function () {
    return this.ice || TAPi18n.__('no')
  },

  inTruck: function () {
    return TAPi18n.__(this.inTruck ? 'yes' : 'no')
  },

  sandName: function () {
    var materials = Materials.findOne() || { sands: [] }
    var sandId    = this.id
    var sand      = _.find(materials.sands, function (sand) {
      return sand._id === sandId
    })

    return sand && sand.name
  },

  gravelName: function () {
    var materials = Materials.findOne() || { gravels: [] }
    var gravelId  = this.id
    var gravel    = _.find(materials.gravels, function (gravel) {
      return gravel._id === gravelId
    })

    return gravel && gravel.name
  },
})
