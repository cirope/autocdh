languageLoaded = new ReactiveVar(false)

var subs = new SubsManager()
var language = {
  ready: function () { return languageLoaded.get() }
}

Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      subs.subscribe('customers'),
      subs.subscribe('plants'),
      language
    ]
  }
})
