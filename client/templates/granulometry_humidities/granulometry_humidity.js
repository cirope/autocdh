Template.granulometryHumidity.helpers({
  material: function () {
    var materialId    = this.materialId
    var materialList  = Materials.first()
    var materials     = materialList && materialList[this.type + 's']
    var material      = _.findWhere(materials, { _id: materialId })

    return material && material.name
  },

  type: function () {
    return TAPi18n.__('granulometry_type_' + this.type)
  },

  responsible: function () {
    return this.responsibleId && Responsible.findOne(this.responsibleId).name
  },

  provider: function () {
    return this.providerId && Providers.findOne(this.providerId).name
  },

  plant: function () {
    return this.plantId && Plants.findOne(this.plantId).name
  },

  dried: function () {
    return TAPi18n.__(this.dried ? 'yes' : 'no')
  },

  washed: function () {
    return TAPi18n.__(this.washed ? 'yes' : 'no')
  }
})

Template.granulometryHumidity.events({
  'click [data-delete]': function (event, template) {
    if (confirm(TAPi18n.__('confirm_delete')))
      Meteor.call('removeGranulometryHumidity', template.data._id, function (error) {
        if (! error) Router.go('granulometryHumidities')
      })
  }
})
