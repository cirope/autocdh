Template.plantNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('plant_name_placeholder')
  }
})

AutoForm.addHooks('newPlantForm', {
  before: {
    createPlant: function (doc, template) {
      doc._id = Random.id()

      return doc
    }
  }
})
