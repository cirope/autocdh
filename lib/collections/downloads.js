Downloads = new Ground.Collection(new Mongo.Collection('downloads'), { version: 1.0 })

Downloads.attachSchema(Schemas.Download)

Downloads.allow({
  insert: function (userId) { return !!userId },
  update: ownsDocument,
  remove: ownsDocument
})

Meteor.methods({
  createDownload: function (doc) {
    doc.userId = this.userId

    Downloads.insert(doc)

    if (this.isSimulation) {
      setTimeout(function () {
        var params = Router.current() && Router.current().params

        Router.go('concreteNew', { sample_id: params && params.sample_id })
      }, 100)

      setTimeout(function () {
        $('[name="downloadId"]').val(doc._id)
      }, 200)
    }
  }
})
