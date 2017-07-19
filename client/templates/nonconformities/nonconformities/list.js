Template.nonconformities.helpers({
  showList: function () {
    return this.objects.count() || this.hasQuery
  }
})

Template.nonconformitiesList.helpers({
})

Template.nonconformitiesList.events({
  'click [data-action="search"]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))

    var search = {
      //sampleName: template.$('#sampleName').val(),
      date:  dateRange && dateRange.join('|')
    }

    Router.go('nonconformities', {}, { query: search })
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
