var cols = 4

Template.afArrayField_slim.helpers({
  cols: function () {
    var attsCols = this.atts.cols

    if (attsCols) cols = 12 / +attsCols

    return cols
  }
})

Template.afFormGroup_slim.helpers({
  cols: function () {
    return cols
  }
})
