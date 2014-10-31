Schemas.Download = new SimpleSchema([Schemas.Base, {
  name: {
    type: String,
    max: 255,
    custom: function () {
      var other = Downloads.findOne({
        name: this.value,
        userId: this.userId,
        _id: { $ne: this.docId }
      })

      if (this.isSet && other) return 'notUnique'
    }
  }
}])

Schemas.Download.labels({
  name:      function () { return TAPi18n.__('download_name') },
  userId:    function () { return TAPi18n.__('user') },
  createdAt: function () { return TAPi18n.__('created_at') },
  updatedAt: function () { return TAPi18n.__('updated_at') }
})
