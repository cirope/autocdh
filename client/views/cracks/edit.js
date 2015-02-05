Template.crackEdit.events({
  'change [name="tubeType"]': function (event) {
    var tubeType   = $(event.currentTarget).val()
    var dimensions = _.map(tubeType.split('x'), function (d) { return +d * 10 })

    $('[name="diameter"]').val(dimensions[0]).trigger('keyup')
    $('[name="height"]').val(dimensions[1]).trigger('keyup')
  },

  'keyup [data-stress-modifier]': function (event) {
    var load           = +$('[name="load"]').val()
    var diameter       = +$('[name="diameter"]').val() / 1000
    var settings       = Settings.findOne() || {}
    var stressConstant = settings.stressConstant || 1
    var stress         = diameter && ((load * stressConstant) / (Math.PI * Math.pow(diameter, 2) / 4))

    $('[name="stress"]').val(stress.toFixed(2))
  }
})
