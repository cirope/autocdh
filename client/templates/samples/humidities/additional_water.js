var showAdditionalWater = new ReactiveVar
var showAdditionalAdditive = new ReactiveVar

var setShowAdditionalWater = function () {
  showAdditionalWater.set(this.data.humidity && this.data.humidity.hasAdditionalWater)
}

var setShowAdditionalAdditive = function () {
  showAdditionalAdditive.set(this.data.humidity && this.data.humidity.hasAdditionalAdditive)
}

var events = {
  'change [name="hasAdditionalWater"]': function (event) {
    showAdditionalWater.set($(event.currentTarget).is(':checked'))
  },

  'change [name="hasAdditionalAdditive"]': function (event) {
    showAdditionalAdditive.set($(event.currentTarget).is(':checked'))
  }
}

var helpers = {
  showAdditionalWater: function () {
    return showAdditionalWater.get()
  },

  showAdditionalAdditive: function () {
    return showAdditionalAdditive.get()
  }
}

Template._humidityNew.onRendered(setShowAdditionalWater)
Template._humidityEdit.onRendered(setShowAdditionalWater)

Template._humidityNew.onRendered(setShowAdditionalAdditive)
Template._humidityEdit.onRendered(setShowAdditionalAdditive)

Template._humidityNew.helpers(helpers)
Template._humidityEdit.helpers(helpers)

Template._humidityNew.events(events)
Template._humidityEdit.events(events)
