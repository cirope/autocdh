var events = {
  'change [data-period-modifier], dp.change [name="date"]': function (event, template) {
    var date   = template.$('[name="date"]').val()
    var period = +template.$('[name="period"]').val()

    if (date) {
      var validUntil  = moment(date, 'L').add(period, 'months')
      var $validUntil = template.$('[name="validUntil"]')

      $validUntil.val(validUntil.format('L')).trigger('change')
    }
  }
}

Template.maintenanceNew.events(events)
Template.maintenanceEdit.events(events)
