Template.downloadNew.helpers({
  namePlaceholder: function () {
    return TAPi18n.__('download_name_placeholder')
  },

  sampleId: function () {
    return Router.current() && Router.current().params.sample_id
  }
})

AutoForm.addHooks('newDownloadForm', {
  before: {
    createDownload: function (doc, template) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})