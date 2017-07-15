
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

var filterText = function (query) {
  var text = ''

  var first = true;
  if (query.code){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_code_list')+': *'+query.code+'*'
    first=false
  }
  if (query.name){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_name')+': *'+query.name+'*'
    first=false
  }
  if (query.revision){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_revision')+': '+TAPi18n.__('management_document_revision_'+query.revision)+''
    first=false
  }
  if (query.dateFilter){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_date')+': '+query.dateFilter+''
    first=false
  }
  if (query.type){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_type')+': '+TAPi18n.__('management_document_type_'+query.type)+''
    first=false
  }
  if (query.category){
    if(!first) text+=', '
    text+=TAPi18n.__('management_document_category')+': '+TAPi18n.__('management_document_category_'+query.category)+''
    first=false
  }
  return text
}

var table = function (query) {
  var headers = [
    { name: 'code',       prompt: TAPi18n.__('management_document_code_list'), width: 28 },
    { name: 'name',       prompt: TAPi18n.__('management_document_name'),      width: 62 },
    { name: 'revision',   prompt: TAPi18n.__('management_document_revision'),  width: 19 },
    { name: 'date',       prompt: TAPi18n.__('management_document_date'),      width: 22 },
    { name: 'type',       prompt: TAPi18n.__('management_document_type'),      width: 25 },
    { name: 'category',   prompt: TAPi18n.__('management_document_category'),  width: 25 },
    { name: 'file',       prompt: TAPi18n.__('management_document_file'),      width: 60 }
  ]

  var data = ManagementDocuments.find(castQuery(query), { sort: { code: 1 } }).map(function (mDoc) {
    mDoc = mDoc || {}
    mDoc.code       = mDoc.code || ''
    mDoc.name       = mDoc.name || ''
    mDoc.revision   = mDoc.revision ? TAPi18n.__('management_document_revision_' + mDoc.revision) : ''
    mDoc.date       = moment(mDoc.date).format('DD/MM/YYYY') || ''
    mDoc.type       = mDoc.type ? TAPi18n.__('management_document_type_' + mDoc.type) : ''
    mDoc.category   = mDoc.category ? TAPi18n.__('management_document_category_' + mDoc.category) : ''

    var file = Files.findOne(mDoc.fileId);
    if (file && file.original && file.original.name) mDoc.file = file.original.name;
    mDoc.file       = mDoc.file || '-';

    if(!mDoc.active) mDoc.date = TAPi18n.__('management_document_not_active');

    return mDoc
  })

  return { data: data, headers: headers }
}

var searchTitle = function (template) {

  var dateRange = DateRangeHelper.getRange(template.$('#date'))
  var query = {
    code:     template.$('#code').val(),
    name:     template.$('#name').val(),
    revision: template.$('#revision').val(),
    type:     template.$('#type').val(),
    category: template.$('#category').val(),
    date:     dateRange && dateRange.join('|')
  }

  return { data: data, headers: headers }
}

Template.managementDocuments.helpers({
  types: function () {
    var types = ['protocols', 'instructive', 'manuals', 'controls', 'fissures', 'techniques', 'sustainability', 'others']

    return _.map(types, function (type) {
      return {
        value: type,
        label: TAPi18n.__('document_type_' + type)
      }
    })
  }
})

Template.managementDocumentsList.helpers({
  revisionOptions: function () {
    var options = ['in_rev','rev_1','rev_2','rev_3','rev_4','rev_5']

    return _.map(options, function (value) {
      return {
        value: value,
        label: TAPi18n.__('management_document_revision_' + value)
      }
    })
  },

  typeOptions: function () {
    var options = ['procedure', 'instructive', 'register', 'other']

    return _.map(options, function (value) {
      return {
        value: value,
        label: TAPi18n.__('management_document_type_' + value)
      }
    })
  },

  categoryOptions: function () {
    var options = ['quality', 'production', 'procedure', 'purchase', 'sale', 'administrative', 'maintenance', 'human_resources', 'technical', 'operative', 'other']

    return _.map(options, function (value) {
      return {
        value: value,
        label: TAPi18n.__('management_document_category_' + value)
      }
    })
  }
})

Template.managementDocumentsList.events({
  'click [data-action="search"]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))
    var search = {
      code:     template.$('#code').val(),
      name:     template.$('#name').val(),
      revision: template.$('#revision').val(),
      type:     template.$('#type').val(),
      category: template.$('#category').val(),
      date:     dateRange && dateRange.join('|')
    }

    Router.go('managementDocuments', {}, { query: search })
  },

  'click [data-search-clean]': function (event, template) {
    template.$('#search-filter').collapse('hide')
  },

  'shown.bs.collapse': function (event, template) {
    template.$('input:first').focus()

    template.$('#date').
    daterangepicker(DateRangeHelper.filterOptions()).
    daterangepickerFilterEvents()

    template.$('[data-search-clean]').removeClass('hidden')
    template.$('[data-search]').addClass('hidden')
  },

  'hidden.bs.collapse': function (event, template) {
    template.$('[data-search-clean]').addClass('hidden')
    template.$('[data-search]').removeClass('hidden')
    template.$('input').val('')
  },

  'click [data-download-pdf]': function (event, template) {
    var dateRange = DateRangeHelper.getRange(template.$('#date'))
    var dateRangeFilter = DateRangeHelper.getRange(template.$('#date'), 'DD/MM/YYYY')
    var search = {
      code:     template.$('#code').val(),
      name:     template.$('#name').val(),
      revision: template.$('#revision').val(),
      type:     template.$('#type').val(),
      category: template.$('#category').val(),
      date:     dateRange && dateRange.join('|'),
      dateFilter:     dateRangeFilter && dateRangeFilter.join(' - ')
    }

    var yPosition = 26
    var tableData = table(search)
    var textFilter = filterText(search)

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('management_documents'), 20, yPosition)
        .setFontSize(9)

      if(textFilter){
          doc
            .setFontSize(7)
            .text(textFilter, 20, yPosition+=3)
      }

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 32, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfManagementDocuments') },
          fontSize: 7
        })

      // adding digital signature
      yPosition = DigitalSignature.addCenteredSignatureToEachPage(doc, 'pdfManagementDocuments', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(TAPi18n.__('management_documents') + '.pdf')
      })
    })
  }
})
