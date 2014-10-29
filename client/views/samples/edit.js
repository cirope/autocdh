Template.sampleEdit.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('sample_name_placeholder')
  },

  moldingOptions: function () {
    return [
      { value: 'plant',  label: TAPi18n.__('sample_molding_plant') },
      { value: 'work',   label: TAPi18n.__('sample_molding_work') },
      { value: 'remote', label: TAPi18n.__('sample_molding_remote') }
    ]
  },

  plantOptions: function () {
    return Plants.find().map(function (plant) {
      return { value: plant._id, label: plant.name }
    })
  },

  responsibleOptions: function () {
    return Responsible.find().map(function (responsible) {
      return { value: responsible._id, label: responsible.name }
    })
  }
})
