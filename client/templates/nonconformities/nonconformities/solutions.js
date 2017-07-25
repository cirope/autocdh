Template.afArrayField_solutions1.helpers({
  quickFieldAtts: function () {
    var defaultOptions = AutoForm._getOptionsForField(this.name)
    var atts = {}

    if (defaultOptions) atts.options = defaultOptions

    return _.extend(atts, this)
  },

  cols: function () {
    var name = this.name.replace(/solutions\.\d+\./, '')

    return _.contains(['diameter', 'height', 'age', 'load'], name) && '1' || '2'
  }
})
