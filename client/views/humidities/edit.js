var ratio = new ReactiveVar

Tracker.autorun(function () {
  var inTruck             = AutoForm.getFieldValue('editHumidityForm', 'inTruck')
  var incorporated        = AutoForm.getFieldValue('editHumidityForm', 'incorporated')
  var flowmeterCorrection = AutoForm.getFieldValue('editHumidityForm', 'flowmeterCorrection')

  // var aggregatesHumidity  = aggregates.reduce(function (accumulator, aggregate) {
  //   return accumulator + (aggregate.amount * (aggregate.humidity - aggregate.absorption) / 100)
  // }, 0)
  var _ratio              = incorporated * flowmeterCorrection

  ratio.set(inTruck ? null : _ratio.toFixed(2))
})

Template.humidityEdit.helpers({
  iceCheckAttrs: function () {
    if (this.ice) return { checked: true }
  },

  iceInputClass: function () {
    if (! this.ice) return 'hidden'
  },

  reactiveRatio: function () {
    return ratio.get()
  }
})

Template.humidityEdit.events({
  'change [name="toggleIce"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="ice"]').removeClass('hidden').focus()
    else
      $('[name="ice"]').addClass('hidden').val('')
  }
})

