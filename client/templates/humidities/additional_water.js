var showAdditionalWater = new ReactiveVar

var setShowAdditionalWater = function () {
  showAdditionalWater.set(this.data.humidity && this.data.humidity.hasAdditionalWater)
}

var events = {
  'change [name="hasAdditionalWater"]': function (event) {
    showAdditionalWater.set($(event.currentTarget).is(':checked'))
  }
}

var helpers = {
  showAdditionalWater: function () {
    return showAdditionalWater.get()
  }
}

Template._humidityNew.onRendered(setShowAdditionalWater)
Template._humidityEdit.onRendered(setShowAdditionalWater)

Template._humidityNew.helpers(helpers)
Template._humidityEdit.helpers(helpers)

Template._humidityNew.events(events)
Template._humidityEdit.events(events)
