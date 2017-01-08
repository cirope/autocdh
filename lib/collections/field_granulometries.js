FieldGranulometries = new Ground.Collection(new Mongo.Collection('fieldGranulometries'), { version: 1.0 })

FieldGranulometries.attachSchema(Schemas.FieldGranulometry)

FieldGranulometries.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (fieldGranulometry) {
    return fieldGranulometry
}

var extraModifierAttributes = function (fieldGranulometry) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createFieldGranulometry: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        FieldGranulometries.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('fieldGranulometry', doc)
            }, 100)
    },

    updateFieldGranulometry: function (modifier, documentId) {
        FieldGranulometries.update(documentId, modifier, function (error) {
            var fieldGranulometry = FieldGranulometries.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(fieldGranulometry)

                FieldGranulometries.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('fieldGranulometry', {_id: documentId})
            }, 100)
        }
    },

    removeFieldGranulometry: function (documentId) {
        FieldGranulometries.remove(documentId)
    }
})
