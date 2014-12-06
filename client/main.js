Meteor.startup(function () {
  var lang = 'es'

  languageLoaded.set(false)

  TAPi18n.setLanguage(lang).done(function () {
    languageLoaded.set(true)
    loadSimpleSchemaMessages()
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
  var args = Array.prototype.slice.call(arguments)

  args.pop() // Hash added by Spacebars

  var active = _.any(args, function (name) {
    return Router.current() && Router.current().route.getName() === name
  })

  return active && 'active'
})

