Template.providedCrack.helpers({
  work: function () {
    return Works.findOne(this.workId).name
  },

  customer: function () {
    return Customers.findOne(this.customerId).name
  },

  press: function () {
    return Presses.findOne(this.pressId).name
  },

  responsible: function () {
    return Responsible.findOne(this.responsibleId).name
  },

  headerType: function () {
    return TAPi18n.__('provided_crack_header_type_' + this.headerType)
  },

  tubeType: function () {
    return this.tubeType === 'other' ? TAPi18n.__('provided_crack_tube_type_other') : this.tubeType
  },

  age: function () {
    return this.age && TAPi18n.__('provided_crack_tubes_age_with_unit', { count: this.age })
  }
})

Template.providedCrack.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeProvidedCrack', template.data._id, function (error) {
        if (! error) Router.go('providedCracks')
      })
  }
})
