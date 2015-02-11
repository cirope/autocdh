Schemas.Settlement = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Settlements.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

if (Meteor.isClient) {
  Schemas.Settlement.labels({
    name:      function () { return TAPi18n.__('settlement_name') },
    userId:    function () { return TAPi18n.__('user') },
    createdAt: function () { return TAPi18n.__('created_at') },
    updatedAt: function () { return TAPi18n.__('updated_at') }
  })
}
