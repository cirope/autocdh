FieldDensities = new Mongo.Collection('fieldDensities')

FieldDensities.attachSchema(Schemas.FieldDensity)

FieldDensities.allow({
    update: ownsDocument,
    remove: ownsDocument
})

var addExtraAttributes = function (fieldDensity) {
    return fieldDensity
}

var extraModifierAttributes = function (fieldDensity) {
    var modifier = {}
    return { $set: modifier }
}

Meteor.methods({
    createFieldDensity: function (doc) {
        doc.organizationId = organizationIdFor(this.userId)

        FieldDensities.insert(addExtraAttributes(doc))

        if (this.isSimulation)
            setTimeout(function () {
                Router.go('fieldDensity', doc)
            }, 100)
    },

    updateFieldDensity: function (modifier, documentId) {
        FieldDensities.update(documentId, modifier, function (error) {
            var fieldDensity = FieldDensities.findOne(documentId)

            if (! error) {
                var extraModifier = extraModifierAttributes(fieldDensity)

                FieldDensities.update(documentId, extraModifier)
            }
        })

        if (this.isSimulation) {
            setTimeout(function () {
                Router.go('fieldDensity', {_id: documentId})
            }, 100)
        }
    },

    removeFieldDensity: function (documentId) {
        FieldDensities.remove(documentId)
    }
})
