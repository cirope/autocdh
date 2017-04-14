Compactions = new Ground.Collection(new Mongo.Collection('compactions'), { version: 1.0 })

Compactions.attachSchema(Schemas.Compaction)

Compactions.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (compaction) {
    return compaction
}

var extraModifierAttributes = function (compaction) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createCompaction: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        Compactions.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('compaction', doc)
            }, 100)
    },

    updateCompaction: function (modifier, documentId) {
        Compactions.update(documentId, modifier, function (error) {
            var compaction = Compactions.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(compaction)

                Compactions.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('compaction', {_id: documentId})
            }, 100)
        }
    },

    removeCompaction: function (documentId) {
        Compactions.remove(documentId)
    }
})
