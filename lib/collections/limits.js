Limits = new Ground.Collection(new Mongo.Collection('limits'), { version: 1.0 })

Limits.attachSchema(Schemas.Limit)

Limits.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (limit) {
    return limit
}

var extraModifierAttributes = function (limit) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createLimit: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        Limits.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('limit', doc)
            }, 100)
    },

    updateLimit: function (modifier, documentId) {
        Limits.update(documentId, modifier, function (error) {
            var limit = Limits.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(limit)

                Limits.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('limit', {_id: documentId})
            }, 100)
        }
    },

    removeLimit: function (documentId) {
        Limits.remove(documentId)
    }
})
