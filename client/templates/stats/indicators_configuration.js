var helpers = {
  months: function () {
    return _.times(13, function (i) {
      var month = moment().subtract(12 - i, 'months')

      return {
        label: month.format('MMMYY').toUpperCase(),
        value: +month.format('YYYYMM')
      }
    })
  },

  showCopy: function () {
    var firstMonth = moment().subtract(12, 'months')

    return this.value !== +firstMonth.format('YYYYMM')
  }
}

Template.statsIndicatorsConfigurationDispatchedPercentages.helpers(helpers)
Template.statsIndicatorsConfigurationDispatchedVolume.helpers(helpers)
Template.statsIndicatorsConfigurationClaimsVolume.helpers(helpers)
Template.statsIndicatorsConfigurationNonconformVolume.helpers(helpers)

Template.statsIndicatorsConfiguration.events({
  'click [data-copy-from]': function (event, template) {
    $element     = $(event.currentTarget)
    $sourceInput = template.$('[name="' + $element.data('copyFrom') + '"]')
    $targetInput = template.$('[name="' + $element.data('copyTo') + '"]')

    $targetInput.val($sourceInput.val()).trigger('change')
  }
})
