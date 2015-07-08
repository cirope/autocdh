Template.samples.helpers({
  showList: function () {
    return this.samples.count() || this.query
  }
})

Template.samplesList.helpers({
  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
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
    var date = template.$('#date').val()

    var search = {
      name:    template.$('#name').val(),
      date:    date && moment(date, 'L').format('YYYY-MM-DD'),
      plant:   template.$('#plant').val(),
      molding: template.$('#molding').val()
    }

    Router.go('samples', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#date').datetimepicker({ format: 'L' })

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
