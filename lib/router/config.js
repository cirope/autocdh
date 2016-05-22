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
      subs.subscribe('granulometries'),
      subs.subscribe('trucks'),
      subs.subscribe('works'),
      subs.subscribe('additives'),
      subs.subscribe('aggregates'),
      subs.subscribe('settlements'),
      subs.subscribe('strengths'),
      subs.subscribe('formulas'),
      subs.subscribe('humidities'),
      subs.subscribe('assays'),
      subs.subscribe('cracks'),
      subs.subscribe('materials'),
      subs.subscribe('presses'),
      subs.subscribe('organizations'),
      subs.subscribe('images'),
      subs.subscribe('files'),
      subs.subscribe('deviations'),
      subs.subscribe('containers'),
      subs.subscribe('settings'),
      subs.subscribe('instruments'),
      subs.subscribe('maintenances'),
      subs.subscribe('provided_cracks'),
      language
    ]
  }
})
