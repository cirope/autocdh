Template.granulometryEdit.helpers({
  provider: function () {
    return this.providerId && Providers.findOne(this.providerId).name
  }
})
