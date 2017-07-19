Nonconformities = new Mongo.Collection('nonconformities')

Nonconformities.attachSchema(Schemas.Nonconformity)

Nonconformities.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (object) {
    return object
}

var extraModifierAttributes = function (object) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createNonconformity: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        Nonconformities.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('nonconformity', doc)
            }, 100)
    },

    updateNonconformity: function (modifier, documentId) {
        Nonconformities.update(documentId, modifier, function (error) {
            var object = Nonconformities.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(object)

                Nonconformities.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('nonconformity', {_id: documentId})
            }, 100)
        }
    },

    removeNonconformity: function (documentId) {
        Nonconformities.remove(documentId)
    }
})
