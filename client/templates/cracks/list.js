Template.cracks.helpers({
  showList: function () {
    return this.cracks.count() || this.query
  }
})

Template.cracksList.helpers({
  crackClass: function () {
    var crackIn = moment(this.crackIn)

    if (crackIn.isSame())
      return 'success'
    else
      return crackIn.isAfter() ? 'text-muted' : 'danger'
  },

  timeAfterMolding: function () {
    var days = moment().endOf('day').diff(this.moldingIn, 'days')

    return moment.localeData().relativeTime(days, false, days === 1 ? 'd' : 'dd')
  }
})

Template.cracksList.events({
  'click [data-action="search"]': function (event, template) {
    var moldingIn = template.$('#molding-in').val()
    var crackIn   = template.$('#crack-in').val()

    var search = {
      designation: template.$('#designation').val(),
      moldingTime: template.$('#molding-time').val(),
      moldingIn:   moldingIn && moment(moldingIn, 'L').format('YYYY-MM-DD'),
      crackIn:     crackIn   && moment(crackIn, 'L').format('YYYY-MM-DD')
    }

    Router.go('cracks', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#molding-in').datetimepicker({ format: 'L' })
    template.$('#crack-in').datetimepicker({ format: 'L' })

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
