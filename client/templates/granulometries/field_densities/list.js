Template.fieldDensities.helpers({
  showList: function () {
    return this.fieldDensities.count() || this.hasQuery
  }
})

Template.fieldDensitiesList.helpers({
})

Template.fieldDensitiesList.events({
  'click [data-action="search"]': function (event, template) {
    var fieldDateRange = DateRangeHelper.getRange(template.$('#fieldDate'))
    var labDateRange = DateRangeHelper.getRange(template.$('#labDate'))

    var search = {
      sampleName: template.$('#sampleName').val(),
      work:       template.$('#work').val(),
      fieldDate:  fieldDateRange && fieldDateRange.join('|'),
      labDate:    labDateRange && labDateRange.join('|')
    }

    Router.go('fieldDensities', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#fieldDate').
    daterangepicker(DateRangeHelper.filterOptions()).
    daterangepickerFilterEvents()

    template.$('#labDate').
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
