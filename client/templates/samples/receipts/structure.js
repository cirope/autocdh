var helpers = {
  showStructure: function () {
    var settings = Settings.findOne()

    return settings && settings.customOptions && settings.customOptions.showStructure
  }
}

Template.receipt.helpers(helpers)
Template._receiptNew.helpers(helpers)
Template._receiptEdit.helpers(helpers)
