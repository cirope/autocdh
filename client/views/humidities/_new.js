Template._humidityNew.events({
  'change [name="hasIce"]': function (event) {
    var selected = $(event.currentTarget).is(':checked')

    if (! selected) $('[name="ice"]').val('')
  }
})

AutoForm.addHooks('newHumidityForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
