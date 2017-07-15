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

Template.maintenanceFile.onDestroyed(function () {
  uploading.set()
})

Template.maintenanceFile.helpers({
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

Template.maintenanceFile.events({
  'change #maintenance-file': function (event, template) {
    var self = this

    uploading.set(true)

    FS.Utility.eachFile(event, function (_file) {
      var file = new FS.File(_file)

      _.extend(file, {
        organizationId: Meteor.user().profile.organizationId
      })

      Files.insert(file, function (error, result) {
        if (error) {
          console.log(error)
        } else {
          trackUpload(result._id)

          Meteor.call('updateMaintenanceFile', result._id, self._id, function (error, result) {
            if (error)
              console.log(error)
          })
        }
      });
    });
  }
})
