var providedCrack = new ReactiveVar
var setInAllTubes = function (newValues) {
  var _providedCrack = providedCrack.get()
  var tubes = _providedCrack && _providedCrack.tubes || []
  var newTubes = _.map(tubes, function (tube) {
    return _.extend(tube, newValues)
  })

  providedCrack.set(_.extend(_providedCrack, { tubes: newTubes }))
}
var setTubeType = function (tubeType) {
  var diameter = 152
  var height   = 102
  if(tubeType) {
    if (tubeType.match(/\d+x\d+/)) {
      var dimensions = _.map(tubeType.split('x'), function (d) {
        return +d * 10
      })
      diameter = dimensions[0]
      height = dimensions[1]
    }
  }

  setInAllTubes({
    diameter:  diameter || '',
    height:    height   || ''
  })
}
var tube = function (template) {
  var tubeType   = template.$('[name="tubeType"]').val()
  var crackDate  = template.$('[name="crackDate"]').val()

  var diameter = 152
  var height   = 102

  if(tubeType) {
    if (tubeType.match(/\d+x\d+/)) {
      var dimensions = _.map(tubeType.split('x'), function (d) {
        return +d * 10
      })
      diameter = dimensions[0]
      height = dimensions[1]
    }
  }

  return {
    crackedAt: moment(crackDate || new Date, 'L').toDate(),
    diameter:  diameter         || '',
    height:    height           || ''
  }
}

var helpers = {
  providedCrack: function () {
    return providedCrack.get()
  }
}

var events = {
  'change [name="quantity"]': function (event, template) {
    var formId         = {
      providedCrackNew:  'newProvidedCrackForm',
      providedCrackEdit: 'editProvidedCrackForm'
    }[Router.current().route.getName()]
    var _providedCrack = _.extend(AutoForm.getFormValues(formId).insertDoc, {
      _id: template.data && template.data._id
    })
    var quantity       = _providedCrack.quantity
    var newTube        = function () { return tube(template) }

    if (providedCrack.get().quantity !== quantity) {
      var tubes = _providedCrack.tubes

      if (quantity < tubes.length)
        tubes = _.first(tubes, quantity)
      else
        tubes = tubes.concat(_.times(quantity - tubes.length, newTube))

      providedCrack.set(_.extend(_providedCrack, { tubes: tubes }))
      ProvidedCracks.setQuantity(quantity)
    }
  },

  'change [name="tubeType"]': function (event, template) {
    setTubeType($(event.currentTarget).val())

    setTimeout(function () {
      template.$('[name$=".load"]').trigger('keyup')
    }, 500)
  },

  'change [name="pressId"]': function (event, template) {
    template.$('[name$=".load"]').trigger('keyup')
  },

  'change [name$=".diameter"]': function (event, template) {
    var $diameter = template.$(event.currentTarget)
    var index     = +$diameter.prop('name').split('.')[1]

    template.$('[name="tubes.' + index + '.load"]').trigger('keyup')
  },

  'keyup [data-stress-modifier="load"]': function (event, template) {
    var $load        = template.$(event.currentTarget)
    var $pressId     = template.$('[name="pressId"]')
    var index        = +$load.prop('name').split('.')[1]
    var measuredLoad = +$load.val()
    var diameter     = +template.$('[name="tubes.' + index + '.diameter"]').val()
    var press        = Presses.findOne($pressId.val())
    var load         = press && (press.constant.a * Math.pow(measuredLoad, 2) + press.constant.b * measuredLoad + press.constant.c)


    var stress       = diameter && (load / (Math.PI * Math.pow(diameter, 2) / 4)) * 10 * 1000

    template.$('[name="tubes.' + index + '.stress"]').val(stress.toFixed(1))
  },

  'dp.change [name="date"]': function (event, template) {
    var crackDate = $(event.currentTarget).val()
    var newDate   = moment(crackDate, 'L').toDate()
    var newValues = { date: newDate, crackDate: newDate }

    providedCrack.set(_.extend(providedCrack.get(), newValues))
  },

  'dp.change [name="crackDate"]': function (event, template) {
    var crackDate = $(event.currentTarget).val()
    var newDate   = moment(crackDate, 'L').toDate()

    providedCrack.set(_.extend(providedCrack.get(), { crackDate: newDate }))
    setInAllTubes({ crackedAt: moment(crackDate, 'L').toDate() })
  },


  'dp.change [name$=".castedAt"], dp.change [name$=".crackedAt"]': function (event, template) {
    var $element  = template.$(event.currentTarget)
    var index     = +$element.prop('name').split('.')[1]
    var castedAt  = moment(template.$('[name="tubes.' + index + '.castedAt"]').val(), 'L')
    var crackedAt = moment(template.$('[name="tubes.' + index + '.crackedAt"]').val(), 'L')
    var age       = crackedAt.diff(castedAt, 'days')

    if (age)
      template.$('[name="tubes.' + index + '.age"]').val(age).trigger('change')
  }
}

Template.providedCrackNew.onCreated(function () {
  var self = this

  Tracker.afterFlush(function () {
    providedCrack.set({
      date: new Date,
      crackDate: new Date,
      quantity: 1,
      tubes: [tube(self)]
    })
  })
})

Template.providedCrackEdit.onCreated(function () {
  var self = this

  Tracker.afterFlush(function () {
    providedCrack.set(self.data)
  })
})

Template.providedCrackNew.helpers(helpers)
Template.providedCrackEdit.helpers(helpers)

Template.providedCrackNew.events(events)
Template.providedCrackEdit.events(events)
