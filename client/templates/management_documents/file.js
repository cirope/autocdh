var success     = new ReactiveVar
var uploading   = new ReactiveVar
var trackUpload = function (fileId) {
  Tracker.autorun(function (computation) {
    var file = Files.findOne(fileId)

    if (file && file.isUploaded()) {
      uploading.set()
      computation.stop()
      success.set(true)

      setTimeout(function () {
        success.set()
      }, 10000)
    }
  })
}

Template.managementDocumentFile.onDestroyed(function () {
  uploading.set()
})

Template.managementDocumentFile.helpers({
  uploading: function () {
    return uploading.get()
  },

  success: function () {
    return success.get()
  },

  spinnerOptions: function () {
    return { width: 2, length: 5, radius: 7, lines: 12 }
  }
})

Template.managementDocumentFile.events({
  'change #document-file': function (event, template) {
    var self = this

    uploading.set(true)

    FS.Utility.eachFile(event, function (_file) {
      var file = new FS.File(_file)

      _.extend(file, { organizationId: self.organizationId })

      Files.insert(file, function (error, result) {
        if (error) {
          console.log(error)
        } else {
          trackUpload(result._id)

          Meteor.call('updateManagementDocumentFile', result._id, self._id, function (error, result) {
            if (error)
              console.log(error)
          })
        }
      });
    });
  }
})
