Meteor.startup(function () {
  var lang = 'es'

  languageLoaded.set(false)

  TAPi18n.setLanguage(lang).done(function () {
    $.fn.datetimepicker.defaults.locale = lang

    loadSimpleSchemaMessages()
    languageLoaded.set(true)
  })
})
