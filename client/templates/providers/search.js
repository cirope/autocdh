Template.emptyProviderPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})

Template.providerSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('provider_search_placeholder')
  },

  settings: function () {
    var providersRule = {
      collection:      Providers,
      field:           'name',
      matchAll:        true,
      template:        Template.providerPill,
      noMatchTemplate: Template.emptyProviderPill
    }

    return {
      limit: 10,
      rules: [providersRule]
    }
  }
})

Template.providerSearch.events({
  'autocompleteselect #provider-search': function (event, template, doc) {
    template.$('[name="providerId"]').val(doc && doc._id).trigger('change')
  },

  'change #provider-search': function (event, template) {
    if (! $(event.currentTarget).val().trim())
      template.$('[name="providerId"]').val('').trigger('change')
  }
})
