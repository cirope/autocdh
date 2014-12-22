Template.material.helpers({
  absorption: function () {
    return this.noAbsorption ? TAPi18n.__('no') : this.absorption
  },

  defaultMaterial: function () {
    return TAPi18n.__(this.defaultMaterial ? 'yes' : 'no')
  }
})
