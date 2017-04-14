Template.compactions.helpers({
  showList: function () {
    return this.compactions.count() || this.hasQuery
  }
})

Template.compactionsList.helpers({
})

Template.compactionsList.events({
  'click [data-action="search"]': function (event, template) {
    var search = {}

    Router.go('compactions', {}, { query: search })
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