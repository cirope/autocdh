Template.granulometrySearch.onDestroyed(function () {
  Session.set('mixtures.granulometry_aggregate_' + this.data.index)
})

Template.granulometrySearch.helpers({
  placeholder: function () {
    return TAPi18n.__('granulometry_search_placeholder')
  },

  settings: function () {
    var aggregateId        = Session.get('mixtures.granulometry_aggregate_' + this.index)
    var granulometriesRule = {
      collection:      Granulometries,
      field:           'name',
      matchAll:        true,
      filter:          aggregateId ? { materialId: aggregateId } : {},
      template:        Template.granulometryPill,
      noMatchTemplate: Template.emptyGranulometryPill
    }

    return {
      limit: 10,
      rules: [granulometriesRule]
    }
  }
})

Template.granulometrySearch.events({
  'autocompleteselect .granulometry-search': function (event, template, doc) {
    template.$('[name="' + template.data.name + '"]').val(doc && doc._id).trigger('change')
  },

  'change .granulometry-search': function (event, template) {
    if (! $(event.currentTarget).val().trim())
      template.$('[name="' + template.data.name +  '"]').val('').trigger('change')
  }
})
