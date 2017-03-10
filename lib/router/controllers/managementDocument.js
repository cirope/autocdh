
/*
var dateRange = function (date) {
  var range = date.split('|')

  return {
    $gte: moment(_.first(range)).startOf('day').toDate(),
    $lte: moment(_.last(range)).endOf('day').toDate()
  }
}

var castQuery = function (query) {
  var selector = {}

  if (query.name) selector.name = new RegExp('.*' + query.name + '.*', 'gi')
  if (query.date) selector.date = dateRange(query.date)

  if (query.type) {
    var regexp    = new RegExp('.*' + query.type + '.*', 'gi')
    var material  = Materials.findOne()
    var materials = _.union(material.sands, material.gravels)
    var types = _.filter(materials, function (m) {
      return regexp.test(m.name)
    })

    selector.type = { $in: _.pluck(materials, '_id') }
  }


  return selector
}

var subs        = new SubsManager
*/

ManagementDocumentsController = RouteController.extend({
  data: function () {
    return {
      documents: ManagementDocuments.find({})
    }
  }
})

ManagementDocumentNewController = RouteController.extend({
  data: function () {
    return {
    }
  }
})

ManagementDocumentController = RouteController.extend({
  data: function () {
    return ManagementDocuments.findOne(this.params._id)
  }
})
