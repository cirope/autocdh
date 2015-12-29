Template.emptyWorkPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})

Template.workSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('work_search_placeholder')
  },

  settings: function () {
    var worksRule = {
      collection:      Works,
      field:           'name',
      matchAll:        true,
      template:        Template.workPill,
      noMatchTemplate: Template.emptyWorkPill
    }

    return {
      limit: 10,
      rules: [worksRule]
    }
  }
})

Template.workSearch.events({
  'autocompleteselect #work-search': function (event, template, doc) {
    template.$('[name="workId"]').val(doc && doc._id).trigger('change')
  },

  'change #work-search': function (event, template) {
    if (! $(event.currentTarget).val().trim())
      template.$('[name="workId"]').val('').trigger('change')
  }
})
