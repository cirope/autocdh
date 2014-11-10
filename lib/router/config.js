languageLoaded = new ReactiveVar(false)

var subs = new SubsManager({ cacheLimit: 30 })
var language = {
  ready: function () { return languageLoaded.get() }
}

Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      subs.subscribe('concretes'),
      subs.subscribe('customers'),
      subs.subscribe('plants'),
      subs.subscribe('receipts'),
      subs.subscribe('responsible'),
      subs.subscribe('samples'),
      subs.subscribe('trucks'),
      subs.subscribe('works'),
      subs.subscribe('additives'),
      subs.subscribe('aggregates'),
      subs.subscribe('downloads'),
      subs.subscribe('settlements'),
      subs.subscribe('strengths'),
      subs.subscribe('types'),
      subs.subscribe('formulas'),
      language
    ]
  }
})
