Granulometries = new Ground.Collection(new Mongo.Collection('granulometries'), { version: 1.0 })

Granulometries.attachSchema(Schemas.Granulometry)

Granulometries.allow({
  remove: ownsDocument
})

Granulometries.setType = function (type) {
  var schema   = Schemas.Granulometry.schema()
  var settings = {
    sand: {
      count: 8,
      label: TAPi18n.__('granulometry_test_net_weight'),
      omit:  false
    },

    gravel: {
      count: 11,
      label: TAPi18n.__('granulometry_test_retained'),
      omit:  true
    }
  }[type]

  schema['test.$.netWeight'].label            = settings.label
  schema['test.$.grossWeight'].autoform.omit  = settings.omit
  schema.test.minCount = schema.test.maxCount = settings.count
}

Meteor.methods({
  createGranulometry: function (doc) {
    doc.organizationId = organizationIdFor(this.userId)

    Granulometries.insert(doc)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', doc)
      }, 100)
  },

  updateGranulometry: function (modifier, documentId) {
    Granulometries.update(documentId, modifier)

    if (this.isSimulation)
      setTimeout(function () {
        Router.go('granulometry', { _id: documentId })
      }, 100)
  }
})
