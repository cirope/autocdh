Template.plantNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('plant_name_placeholder')
  }
})

AutoForm.addHooks('newPlantForm', {
  before: {
    createPlant: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})
