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
  if (query.revision) selector.revision = query.revision
  if (query.type) selector.type = query.type
  if (query.category) selector.category = query.category

  return selector
}

ManagementDocumentsController = RouteController.extend({

  findOptions: function () {
    return { sort: { code: 1 } }
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
