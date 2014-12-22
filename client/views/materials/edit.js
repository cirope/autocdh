Template.materialEdit.helpers({
  absorptionClass: function () {
    var noAbsorption = AutoForm.getFieldValue('editMaterialForm', 'noAbsorption')

    if (noAbsorption) return 'hidden'
  }
})

Template.materialEdit.events({
  'click [name="noAbsorption"]': function (event, template) {
    if ($(event.currentTarget).is(':checked'))
      $('[name="absorption"]').val('')
  }
})
