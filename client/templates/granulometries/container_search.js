Template.containerSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('container_search_placeholder')
  },

  settings: function () {
    console.log(this);
    var containersRule = {
      collection:      Containers,
      field:           'name',
      matchAll:        true,
      template:        Template.containerPill,
      noMatchTemplate: Template.emptyContainerPill
    }

    return {
      limit: 10,
      rules: [containersRule]
    }
  }
})

Template.containerSearch.events({
  'autocompleteselect [data-search]': function (event, template, doc) {
    var $labelInput = $('[name="' + template.data.name + '"]')
    var $massInput  = $('[name="' + template.data.update + '"]')

    $labelInput.val(doc && doc.name).trigger('change')
    $massInput.val(doc && doc.mass).trigger('change')
  }
})
