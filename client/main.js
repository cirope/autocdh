Meteor.startup(function () {
  languageLoaded.set(false)

  TAPi18n.setLanguage('es').done(function () {
    languageLoaded.set(true)
    loadSimpleSchemaMessages()
  })
})

Template.registerHelper('firstOptionForSelect', function () {
  return TAPi18n.__('first_option_for_select')
})

Template.registerHelper('l', function (date, format) {
  if (typeof format !== 'string')
    format = TAPi18n.__('datetime_default')

  return moment(date).format(format)
})
