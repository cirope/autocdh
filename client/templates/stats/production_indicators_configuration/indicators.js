var productionSettings = null

Template.statsProductionIndicatorsConfigurationIndicators.onCreated(function () {
  productionSettings = this.data && this.data.settings && this.data.settings.production
})

Template.statsProductionIndicatorsConfigurationIndicators.onDestroyed(function () {
  productionSettings = null
})

Template.statsProductionIndicatorsConfigurationIndicators.helpers({
  indicatorValue: function (indicator) {
    var indicators = productionSettings && productionSettings.indicators

    return indicators && indicators[indicator]
  },

  indicatorJoinedValue: function (indicator) {
    var indicators = productionSettings && productionSettings.indicators
    var max        = indicators && indicators[indicator + 'Max']
    var min        = indicators && indicators[indicator + 'Min']

    return min && max && TAPi18n.__('stats_indicators_indicators_join', {
      lower:  min,
      higher: max
    })
  }
})

Template.statsProductionIndicatorsConfigurationIndicators.events({
  'change [data-indicator]': function (event, template) {
    var $input       = $(event.currentTarget)
    var $target      = $('[name="' + $input.data('target') + '"]')
    var $min         = $('[data-indicator="' + $input.data('join') + 'Min"]')
    var $max         = $('[data-indicator="' + $input.data('join') + 'Max"]')
    var minIndicator = $min.data('indicator')
    var maxIndicator = $max.data('indicator')
    var id           = template.data.settings && template.data.settings._id
    var selector     = { _id: id }
    var operation    = {
      modifier:    { $set: {} },
      aggregation: { $set: {} }
    }

    if (+$min.val())
      operation.modifier.$set['production.indicators.' + minIndicator] = +$min.val()

    if (+$max.val())
      operation.modifier.$set['production.indicators.' + maxIndicator] = +$max.val()

    operation.aggregation = operation.modifier

    $input.prop('disabled', true)
    $input.closest('.form-group').removeClass('has-error')

    if (+$input.val()) {
      Meteor.call('updateSettingValue', operation, id, selector, function (error, result) {
        var joined = +$min.val() && +$max.val() && TAPi18n.__('stats_indicators_indicators_join', {
          lower:  +$min.val(),
          higher: +$max.val()
        })

        if (error)  $input.closest('.form-group').addClass('has-error')
        if (joined) $target.val(joined)

        $input.removeProp('disabled')
      })
    } else {
      $input.closest('.form-group').addClass('has-error')
      $input.removeProp('disabled')
    }
  }
})
