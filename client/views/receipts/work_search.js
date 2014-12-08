Template.workSearch.helpers({
  placeholder: function () {
    return TAPi18n.__('work_search_placeholder')
  },

  settings: function () {
    var worksRule = {
      collection: Works,
      field: 'name',
      matchAll: true,
      template: Template.workPill,
      noMatchTemplate: Template.emptyWorkPill,
      callback: function (work) {
        $('[name="workId"]').val(work._id).blur()
      }
    }

    return {
      limit: 10,
      rules: [worksRule]
    }
  }
})
