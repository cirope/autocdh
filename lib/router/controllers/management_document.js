var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.code) selector.code = new RegExp('.*' + query.code + '.*', 'gi')
  if (query.name) selector.name = new RegExp('.*' + query.name + '.*', 'gi')
  if (query.date) selector.date = dateRange(query.date)

  var regexp, options, values;
  if (query.revision) {
    regexp    = new RegExp('.*' + query.revision + '.*', 'gi')

    options = ['in_rev', 'rev_1', 'rev_2', 'rev_3', 'rev_4', 'rev_5']
    values = _.filter(options, function (o) {
      return regexp.test(TAPi18n.__('management_document_revision_'+o))
    })
    selector.revision = { $in: values }
  }
  if (query.type) {
    regexp    = new RegExp('.*' + query.type + '.*', 'gi')

    options = ['procedure', 'instructive', 'register', 'other']
    values = _.filter(options, function (o) {
      return regexp.test(TAPi18n.__('management_document_type_'+o))
    })
    selector.type = { $in: values }
  }
  if (query.category) {
    regexp    = new RegExp('.*' + query.category + '.*', 'gi')

    options = ['quality', 'production', 'procedure', 'purchase', 'sale', 'administrative', 'maintenance', 'human_resources', 'other']
    values = _.filter(options, function (o) {
      return regexp.test(TAPi18n.__('management_document_category_'+o))
    })
    selector.category = { $in: values }
  }

  return selector
}

ManagementDocumentsController = RouteController.extend({

  findOptions: function () {
    return { sort: { date: -1 } }
  },

  data: function () {
    var query = this.params.query;
    return {
      documents: ManagementDocuments.find(_.isEmpty(query) ? {} : castQuery(query), this.findOptions())
    }
  }
})

ManagementDocumentNewController = RouteController.extend({
  data: function () {
    return {}
  }
})

ManagementDocumentController = RouteController.extend({
  data: function () {
    return ManagementDocuments.findOne(this.params._id)
  }
})
