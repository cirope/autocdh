var helpers = {
  additive: function () {
    var additiveId = AutoForm.getFieldValue('additiveId')
    var additive   = additiveId && Additives.findOne(additiveId)

    return additive
  }
}

Template._concreteNew.helpers(helpers)
Template._concreteEdit.helpers(helpers)
