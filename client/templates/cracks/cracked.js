Template.cracksCracked.helpers({
  strength: function () {
    var concrete = Concretes.findOne({ sampleId: this.sampleId })
    var strength = concrete && Strengths.findOne(concrete.strengthId)

    return strength && strength.name
  }
})

Template.cracksCracked.events({
  'click [data-action="search"]': function (event, template) {
    var moldingIn = template.$('#molding-in').val()
    var crackedIn = template.$('#cracked-in').val()

    var search = {
      designation: template.$('#designation').val(),
      moldingIn:   moldingIn && moment(moldingIn, 'L').format('YYYY-MM-DD'),
      crackedIn:   crackedIn && moment(crackedIn, 'L').format('YYYY-MM-DD'),
      strength:    template.$('#strength').val(),
      stress:      template.$('#stress').val()
    }

    Router.go('cracksCracked', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#molding-in').datetimepicker({ format: 'L' })
    template.$('#cracked-in').datetimepicker({ format: 'L' })

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  }
})
