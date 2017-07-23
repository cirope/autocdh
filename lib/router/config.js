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
      // configurations
      this.subscribe('additives'),
      this.subscribe('aggregates'),
      this.subscribe('containers'),
      this.subscribe('customers'),
      this.subscribe('formulas'),
      this.subscribe('instruments'),
      this.subscribe('materials'),
      this.subscribe('organizations'),
      this.subscribe('plants'),
      this.subscribe('presses'),
      this.subscribe('providers'),
      this.subscribe('responsible'),
      this.subscribe('settings'),
      this.subscribe('settlements'),
      this.subscribe('strengths'),
      this.subscribe('trucks'),
      this.subscribe('works'),
      // cracks
      this.subscribe('cracks'),
      this.subscribe('providedCracks'),
      // granulometries
      this.subscribe('granulometries'),
      this.subscribe('granulometryHumidities'),
      this.subscribe('mixtures'),
      this.subscribe('fieldDensities'),
      this.subscribe('compactions'),
      this.subscribe('limits'),
      this.subscribe('fieldGranulometries'),
      // maintenances
      this.subscribe('maintenances'),
      // samples
      this.subscribe('samples'),
      this.subscribe('assays'),
      this.subscribe('concretes'),
      this.subscribe('humidities'),
      this.subscribe('receipts'),
      // non-conformities
      this.subscribe('areas'),
      this.subscribe('nonconformities'),
      this.subscribe('complaints'),
      // documentations
      this.subscribe('documents'),
      this.subscribe('managementDocuments'),
      // stats
      this.subscribe('deviations'),
      // application
      this.subscribe('images'),
      this.subscribe('files'),
      language,
      loading
    ]
  }
})
