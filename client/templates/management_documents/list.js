Template.managementDocuments.helpers({
  types: function () {
    var types = ['protocols', 'instructive', 'manuals', 'controls', 'fissures', 'techniques', 'sustainability', 'others']

    return _.map(types, function (type) {
      return {
        value: type,
        label: TAPi18n.__('document_type_' + type)
      }
    })
  }
})

Template.managementDocumentsList.events({
  'click [data-action="search"]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))

    var search = {
      code:     template.$('#code').val(),
      name:     template.$('#name').val(),
      revision: template.$('#revision').val(),
      type:     template.$('#type').val(),
      category: template.$('#category').val(),
      date:     dateRange && dateRange.join('|')
    }

    Router.go('managementDocuments', {}, { query: search })
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
