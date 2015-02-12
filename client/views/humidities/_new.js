Template._humidityNew.events({
  'change [name="hasIce"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (selected)
      $('[name="ice"]').removeClass('hidden').focus()
    else
      $('[name="ice"]').addClass('hidden').val('')
  }
})

AutoForm.addHooks('newHumidityForm', {
  before: {
    createHumidity: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
