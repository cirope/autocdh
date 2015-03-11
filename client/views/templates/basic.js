var cols  = {}
var route = function () {
  return Router.current() && Router.current().route.getName()
}

Template.afArrayField_basic.helpers({
  cols: function () {
    var attsCols = this.atts.cols || 3
    var key      = route() + '.' + this.atts.name

    return (cols[key] = 12 / +attsCols)
  }
})

Template.afFormGroup_basic.helpers({
  cols: function () {
    var name = this.name.substring(0, this.name.indexOf('.'))

    return cols[route() + '.' + name]
  },

  bsFieldLabelAtts: function () {
    var atts = _.clone(this.afFieldLabelAtts)

    return AutoForm.Utility.addClass(atts, 'control-label')
  },

  bsFieldInputAtts: function () {
    var atts = _.clone(this.afFieldInputAtts)

    return _.extend(atts, { template: 'bootstrap3' })
  }
})
