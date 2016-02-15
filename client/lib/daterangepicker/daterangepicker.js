DateRangeHelper = {
  filterOptions: function () {
    return {
      autoUpdateInput: false,
      locale: {
        format:      'L',
        applyLabel:  TAPi18n.__('apply'),
        cancelLabel: TAPi18n.__('clear')
      }
    }
  },

  getRange: function ($input, format) {
    var picker = $input.data('daterangepicker')

    return $input.val() && [
      picker.startDate.format(format || 'YYYY-MM-DD'),
      picker.endDate.format(format || 'YYYY-MM-DD')
    ]
  }
}
