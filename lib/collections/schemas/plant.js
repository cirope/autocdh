Schemas.Plant = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      // TODO: https://github.com/aldeed/meteor-simple-schema/issues/146
      var other = Plants.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.field('_id').value }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Plant.labels({
    name:      function () { return TAPi18n.__('plant_name') },
    userId:    function () { return TAPi18n.__('user') },
    createdAt: function () { return TAPi18n.__('created_at') },
    updatedAt: function () { return TAPi18n.__('updated_at') }
  })
}
