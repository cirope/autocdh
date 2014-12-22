Template.materialsList.helpers({
  _absorption: function (noAbsorption, absorption) {
    return noAbsorption ? TAPi18n.__('no') : absorption
  },

  _defaultMaterial: function (defaultMaterial) {
    return TAPi18n.__(defaultMaterial ? 'yes' : 'no')
  }
})
