Template.samples.helpers({
  showList: function () {
    return this.samples.count() || this.query
  }
})

Template.samplesList.helpers({
  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  strength: function () {
    var concrete = Concretes.findOne({ sampleId: this._id })

    return concrete && Strengths.findOne(concrete.strengthId).name
  },

  customer: function () {
    var receipt = Receipts.findOne({ sampleId: this._id })

    return receipt && Customers.findOne(receipt.customerId).name
  },

  moldingText: function () {
    return TAPi18n.__('sample_molding_' + this.molding)
  },

  moldingOptions: function () {
    return [
      { value: 'plant',  label: TAPi18n.__('sample_molding_plant') },
      { value: 'work',   label: TAPi18n.__('sample_molding_work') },
      { value: 'remote', label: TAPi18n.__('sample_molding_remote') }
    ]
  }
})

Template.samplesList.events({
  'click [data-action="search"]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))

    var search = {
      name:     template.$('#name').val(),
      strength: template.$('#strength').val(),
      date:     dateRange && dateRange.join('|'),
      plant:    template.$('#plant').val(),
      customer: template.$('#customer').val(),
      molding:  template.$('#molding').val()
    }

    Router.go('samples', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#date').
      daterangepicker(DateRangeHelper.filterOptions()).
      daterangepickerFilterEvents()

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
