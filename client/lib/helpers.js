Template.registerHelper('firstOptionForSelect', function () {
  return TAPi18n.__('first_option_for_select')
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
  return Cracks.find({ updatedAt: null, crackIn: { $lt: new Date } }).count()
})
