Template._humidityEdit.helpers({
  iceCheckAttrs: function () {
    if (this.humidity.ice) return { checked: true }
  },

  iceInputClass: function () {
    if (! this.humidity.ice) return 'hidden'
  }
})

Template._humidityEdit.events({
  'change [name="toggleIce"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="ice"]').removeClass('hidden').focus()
    else
      $('[name="ice"]').addClass('hidden').val('')
  }
})

