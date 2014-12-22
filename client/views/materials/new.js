Template.materialNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('material_name_placeholder')
  },

  absorptionClass: function () {
    var noAbsorption = AutoForm.getFieldValue('newMaterialForm', 'noAbsorption')

    if (noAbsorption) return 'hidden'
  }
})

Template.materialNew.events({
  'click [name="noAbsorption"]': function (event, template) {
    if ($(event.currentTarget).is(':checked'))
      $('[name="absorption"]').val('')
  }
})

AutoForm.addHooks('newMaterialForm', {
  before: {
    createMaterial: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
