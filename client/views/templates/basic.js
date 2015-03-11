var cols  = {}
var route = function () {
  return Router.current() && Router.current().route.getName()
}

Template.afArrayField_basic.helpers({
  cols: function () {
    var attsCols = this.cols || 3
    var key      = route() + '.' + this.name

    return (cols[key] = 12 / +attsCols)
  }
})

Template.afFormGroup_basic.helpers({
  cols: function () {
    var name = this.name.substring(0, this.name.indexOf('.'))

    return cols[route() + '.' + name]
  }
})
