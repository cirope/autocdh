Meteor.startup(function () {
  languageLoaded.set(false)

  TAPi18n.setLanguage('es').done(function () {
    languageLoaded.set(true)
    loadSimpleSchemaMessages()
  })
})
