Template.formulas.helpers({
  showList: function () {
    return this.formulas.count() || this.hasQuery
  }
})

Template.formulasList.helpers({
  strength: function (strengthId) {
    return Strengths.findOne(strengthId).name
  },

  settlement: function (settlementId) {
    return Settlements.findOne(settlementId).name
  },

  aggregate: function (aggregateId) {
    return Aggregates.findOne(aggregateId).name
  },

  downloadName: function (download) {
    return TAPi18n.__('download_' + download)
  },

  downloadOptions: function () {
    var settings = Settings.findOne()
    var options  = [
      { value: 'canal', label: TAPi18n.__('download_canal') },
      { value: 'pump',  label: TAPi18n.__('download_pump') },
      { value: 'canal_2', label: TAPi18n.__('download_canal_2') },
      { value: 'pump_2',  label: TAPi18n.__('download_pump_2') }
    ]

    if (settings && settings.customOptions && settings.customOptions.showPavement)
      options.push({ value: 'pavement', label: TAPi18n.__('download_pavement') })

    if (settings && settings.customOptions && settings.customOptions.showDump)
      options.push({ value: 'dump', label: TAPi18n.__('download_dump') })

    return options
  }
})

Template.formulasList.events({
  'click [data-action="search"]': function (event, template) {
    var search = {
      coding:     template.$('#coding').val(),
      strength:   template.$('#strength').val(),
      download:   template.$('#download').val(),
      aggregate:  template.$('#aggregate').val(),
      settlement: template.$('#settlement').val()
    }

    Router.go('formulas', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
