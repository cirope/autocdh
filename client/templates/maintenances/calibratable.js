var selectedType = new ReactiveVar

var helpers = {
  selectedType: function () {
    return selectedType.get()
  },

  isCalibratable: function () {
    return selectedType.get() === 'calibratable'
  }
}

var events = {
  'change [name="instrumentId"]': function (event, template) {
    var value = $(event.currentTarget).val()
    var instrument = Instruments.findOne(value)
    var type = ''

    if (instrument)
      type = instrument.calibratable && 'calibratable' || 'no_calibratable'

    template.$('[name="type"]').val(type).trigger('change')
  },

  'change [name="type"]': function (event, template) {
    var value = $(event.currentTarget).val()

    selectedType.set(value)

    setTimeout(function () {
      var $quantity = template.$('[name="quantity"]')

      if (value === 'calibratable')
        $quantity.val('1').prop('readonly', true)
      else
        $quantity.val('').prop('readonly', false)
    }, 300)
  }
}

var onCreated = function () {
  var self = this

  Tracker.afterFlush(function () {
    var value = self.$('[name="type"]').val()

    selectedType.set(value)
  })
}

Template.maintenanceNew.helpers(helpers)
Template.maintenanceNew.events(events)
Template.maintenanceNew.onCreated(onCreated)

Template.maintenanceEdit.helpers(helpers)
Template.maintenanceEdit.events(events)
Template.maintenanceEdit.onCreated(onCreated)
