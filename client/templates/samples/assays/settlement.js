var events = {
  'change [name="settlement"], change [name="extended"]': function (event, template) {
    var extended = template.$('[name="extended"]').is(':checked')
    var formId   = template.$('form').attr('id')

    Schemas.Assay.schema().settlement.min = extended ? 45 : 1
    Schemas.Assay.schema().settlement.max = extended ? 80 : 25

    template.$('[name="settlement"]').trigger('keyup')

    AutoForm.validateField(formId, 'settlement')
  }
}

Template.assayNew.events(events)
Template.assayEdit.events(events)
