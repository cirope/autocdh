Schemas.Plant = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    custom: function () {
      var other = Plants.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

Schemas.Plant.labels({
  name:      function () { return TAPi18n.__('plant_name') },
  userId:    function () { return TAPi18n.__('user') },
  createdAt: function () { return TAPi18n.__('created_at') },
  updatedAt: function () { return TAPi18n.__('updated_at') }
})
