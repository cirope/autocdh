Template.crackEdit.events({
  'change [name="pressId"]': function (event) {
    var press = $(event.currentTarget)
    var params   = Router.current() && Router.current().params

    if (press.val() === 'new') {
      press.val('')
      AutoForm.resetForm('editCrackForm')
      Router.go('crackPressNew', { crack_id: params && params._id })
    }
  },

  'change [name="tubeType"]': function (event) {
    var tubeType   = $(event.currentTarget).val()
    var dimensions = _.map(tubeType.split('x'), function (d) { return +d * 10 })

    $('[name="diameter"]').val(dimensions[0]).trigger('keyup')
    $('[name="height"]').val(dimensions[1]).trigger('keyup')
  },

  'keyup [data-stress-modifier], change [name="pressId"]': function (event) {
    var measuredLoad = +$('[name="load"]').val()
    var diameter     = +$('[name="diameter"]').val()
    var press        = Presses.findOne($('[name="pressId"]').val())
    var load         = press && (press.constant.a * Math.pow(measuredLoad, 2) + press.constant.b * measuredLoad + press.constant.c)
    var stress       = diameter && (load / (Math.PI * Math.pow(diameter, 2) / 4)) * 10

    $('[name="stress"]').val(stress.toFixed(1))
  }
})
