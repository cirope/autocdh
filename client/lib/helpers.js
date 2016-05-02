Template.registerHelper('firstOptionForSelect', function () {
  return TAPi18n.__('first_option_for_select')
})

Template.registerHelper('filterSchema', function () {
  return Schemas.Filter
})

Template.registerHelper('r', function (number, decimals) {
  return (+number).toFixed(decimals || 0)
})

Template.registerHelper('l', function (date, format) {
  if (typeof format !== 'string')
    format = TAPi18n.__('datetime_default')

  return date && moment(date).format(format)
})

Template.registerHelper('activeRouteClass', function () {
  var router = Router.current()
  var active = router && _.any(_.initial(arguments), function (name) {
    return router.route.getName() === name
  })

  return active && 'active'
})

Template.registerHelper('overdueCracks', function () {
  return Cracks.find({ stress: null, crackIn: { $lt: new Date } }).count()
})

Template.registerHelper('nextToOverdueMaintenances', function () {
  var validUntil = moment().add(15, 'days').toDate()

  return Maintenances.find({
    active:     true,
    validUntil: { $lt: validUntil }
  }).count()
})

Template.registerHelper('overdueMaintenances', function () {
  return Maintenances.find({
    active:     true,
    validUntil: { $lt: new Date }
  }).count()
})

Template.registerHelper('show3daysResistanceOptions', function () {
  var settings = Settings.findOne()

  return settings && settings.customOptions && settings.customOptions.show3daysResistanceOptions
})
