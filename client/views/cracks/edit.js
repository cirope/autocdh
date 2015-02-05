Template.crackEdit.events({
  'change [name="tubeType"]': function (event) {
    var tubeType   = $(event.currentTarget).val()
    var dimensions = _.map(tubeType.split('x'), function (d) { return +d * 10 })

    $('[name="diameter"]').val(dimensions[0])
    $('[name="height"]').val(dimensions[1])
  }
})
