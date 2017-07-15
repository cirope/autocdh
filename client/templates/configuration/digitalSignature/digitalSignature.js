Template.digitalSignature.helpers({
    signatureImage: function () {
        return Images.findOne(this.digitalSignature.signatureImageId)
    }
})