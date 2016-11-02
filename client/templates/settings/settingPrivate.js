Template.settingPrivate.helpers({
    signatureImage: function () {
        return Images.findOne(this.digitalSignature.signatureImageId)
    }
})