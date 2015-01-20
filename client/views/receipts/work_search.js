Template.emptyWorkPill.helpers({
  showNewOnEmpty: function () {
    var routeName = Router.current() && Router.current().route.getName()

    return routeName === 'receiptNew'
  }
})

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
        $('[name="workId"]').val(work && work._id).trigger('change')
      }
    }

    return {
      limit: 10,
      rules: [worksRule]
    }
  }
})
