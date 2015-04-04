var showIce = new ReactiveVar

var setShowIce = function () {
  showIce.set(this.data.humidity.hasIce)
}

var events = {
  'change [name="hasIce"]': function (event) {
    showIce.set($(event.currentTarget).is(':checked'))
  }
}

var helpers = {
  showIce: function () {
    return showIce.get()
  }
}

Template._humidityNew.onRendered(setShowIce)
Template._humidityEdit.onRendered(setShowIce)

Template._humidityNew.helpers(helpers)
Template._humidityEdit.helpers(helpers)

Template._humidityNew.events(events)
Template._humidityEdit.events(events)
