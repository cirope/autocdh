jQuery.fn.daterangepickerFilterEvents = function () {
  return this.each(function() {
    $(this).on('apply.daterangepicker', function (event, picker) {
      $(this).val(picker.startDate.format('L') + ' - ' + picker.endDate.format('L'))
    })

    $(this).on('cancel.daterangepicker', function (event, picker) {
      $(this).val('')
    })
  })
}
