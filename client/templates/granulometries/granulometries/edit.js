Template.granulometryEdit.onCreated(function () {
  Granulometries.setType(this.data.type)
})

Template.granulometryEdit.helpers({
  provider: function () {
    return this.providerId && Providers.findOne(this.providerId).name
  }
})
