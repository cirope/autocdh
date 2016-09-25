var _diameterLabel = new ReactiveVar(TAPi18n.__('crack_diameter'))
var _bendingTubeType = new ReactiveVar(false)

var setTubeType = function (tubeType, revalidate) {
  var diameter = 150
  var height   = 150
  var light    = 0

  if(tubeType !== 'bending') {
    var dimensions = _.map(tubeType.split('x'), function(d){return +d * 10})
    diameter = dimensions[0]
    height = dimensions[1]
    light = 0
    _diameterLabel.set(TAPi18n.__('crack_diameter'))
    _bendingTubeType.set(false)
  } else {
    diameter = 150   // width
    height = 150
    light = 450
    _diameterLabel.set(TAPi18n.__('crack_width'))
    _bendingTubeType.set(true)
  }

  Schemas.Crack.schema().diameter.min = diameter - 10
  Schemas.Crack.schema().diameter.max = diameter + 10
  Schemas.Crack.schema().height.min   = height - 10
  Schemas.Crack.schema().height.max   = height + 10
  Schemas.Crack.schema().light.min   = light-450 > 0 ? light-450 : 0
  Schemas.Crack.schema().light.max   = light + 450

  $('[name="diameter"]').val(diameter).trigger('keyup')
  $('[name="height"]').val(height).trigger('keyup')
  $('[name="light"]').val(light).trigger('keyup')

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
  isBendingTubeType: function () {
    return _bendingTubeType.get()
  },
  responsibleClass: function () {
    return _bendingTubeType.get() ? 'col-md-6' : 'col-md-12'
  }
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
      var light = +$('[name="light"]').val()
      stress = diameter && height && (load * light / (diameter * Math.pow(height, 2))) * 10
    }
    $('[name="stress"]').val(stress.toFixed(1))
  }
})
