var _diameterLabel = new ReactiveVar(TAPi18n.__('crack_diameter'))

var setTubeType = function (tubeType, revalidate) {
  var diameter   = 150
  var height     = 150

  if(tubeType !== 'bending') {
    var dimensions = _.map(tubeType.split('x'), function(d){return +d * 10})
    diameter = dimensions[0]
    height = dimensions[1]
    _diameterLabel.set(TAPi18n.__('crack_diameter'))
  } else {
    _diameterLabel.set(TAPi18n.__('crack_width'))
  }

  Schemas.Crack.schema().diameter.min = diameter - 10
  Schemas.Crack.schema().diameter.max = diameter + 10
  Schemas.Crack.schema().height.min   = height - 10
  Schemas.Crack.schema().height.max   = height + 10

  $('[name="diameter"]').val(diameter).trigger('keyup')
  $('[name="height"]').val(height).trigger('keyup')

  if (revalidate) {
    AutoForm.validateField('editCrackForm', 'diameter')
    AutoForm.validateField('editCrackForm', 'height')
  }
}

Template._crackEdit.helpers({
  tubeType: function () {
    setTubeType(this.tubeType)

    return this.tubeType
  },
  diameterLabel: function () {
    return _diameterLabel.get()
  },
})

Template._crackEdit.events({
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
    setTubeType($(event.currentTarget).val(), true)
  },

  'keyup [data-stress-modifier], change [name="pressId"]': function (event) {
    var measuredLoad = +$('[name="load"]').val()
    var diameter     = +$('[name="diameter"]').val()
    var press = Presses.findOne($('[name="pressId"]').val())
    var load = press && (press.constant.a * Math.pow(measuredLoad, 2) + press.constant.b * measuredLoad + press.constant.c)

    var stress;
    if($('[name="tubeType"]').val() !== 'bending') {
      stress = diameter && (load / (Math.PI * Math.pow(diameter, 2) / 4)) * 10 * 1000
    } else {
      var height = +$('[name="height"]').val()
      var light = +450
      stress = 10.0 * load * light / (diameter * height * height)
    }
    $('[name="stress"]').val(stress.toFixed(1))
  }
})
