languageLoaded = new ReactiveVar(false)

var language = {
  ready: function () { return languageLoaded.get() }
}

var loading = {
  ready: function () { return ! Session.get('loading') }
}

Router.configure({
  layoutTemplate:   'layout',
  loadingTemplate:  'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      this.subscribe('concretes'),
      this.subscribe('customers'),
      this.subscribe('providers'),
      this.subscribe('plants'),
      this.subscribe('receipts'),
      this.subscribe('responsible'),
      this.subscribe('samples'),
      this.subscribe('granulometries'),
      this.subscribe('granulometryHumidities'),
      this.subscribe('fieldDensities'),
      this.subscribe('compactions'),
      this.subscribe('limits'),
      this.subscribe('fieldGranulometries'),
      this.subscribe('trucks'),
      this.subscribe('works'),
      this.subscribe('additives'),
      this.subscribe('aggregates'),
      this.subscribe('settlements'),
      this.subscribe('strengths'),
      this.subscribe('formulas'),
      this.subscribe('humidities'),
      this.subscribe('assays'),
      this.subscribe('cracks'),
      this.subscribe('materials'),
      this.subscribe('presses'),
      this.subscribe('organizations'),
      this.subscribe('images'),
      this.subscribe('files'),
      this.subscribe('deviations'),
      this.subscribe('containers'),
      this.subscribe('settings'),
      this.subscribe('instruments'),
      this.subscribe('maintenances'),
      this.subscribe('providedCracks'),
      this.subscribe('mixtures'),
      this.subscribe('documents'),
      this.subscribe('managementDocuments'),
      language,
      loading
    ]
  }
})
