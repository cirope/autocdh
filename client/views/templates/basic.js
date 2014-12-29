var cols  = {}
var route = function () {
  return Router.current() && Router.current().route.getName()
}

Template.afArrayField_basic.helpers({
  cols: function () {
    var attsCols = this.atts.cols || 3
    var key      = route() + '.' + this.atts.name

    return (cols[key] = cols[key] || 12 / +attsCols)
  }
})

Template.afFormGroup_basic.helpers({
  cols: function () {
    var name = this.atts.name.substring(0, this.atts.name.indexOf('.'))

    return cols[route() + '.' + name]
  }
})
