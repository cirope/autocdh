Meteor.startup(function () {
  var lang = 'es'

  languageLoaded.set(false)

  TAPi18n.setLanguage(lang).done(function () {
    languageLoaded.set(true)
    loadSimpleSchemaMessages()

    $.fn.datetimepicker.defaults.language = 'es'
  })
})

// Global helpers

Template.registerHelper('firstOptionForSelect', function () {
  return TAPi18n.__('first_option_for_select')
})

Template.registerHelper('l', function (date, format) {
  if (typeof format !== 'string')
    format = TAPi18n.__('datetime_default')

  return moment(date).format(format)
})

Template.registerHelper('activeRouteClass', function () {
  var router = Router.current()
  var active = router && _.any(_.initial(arguments), function (name) {
    return router.route.getName() === name
  })

  return active && 'active'
})
