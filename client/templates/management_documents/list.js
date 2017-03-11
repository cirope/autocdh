
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

var table = function (template) {
  var data    = null
  var headers = [
    { name: 'code',       prompt: TAPi18n.__('management_document_code_list'), width: 28 },
    { name: 'name',       prompt: TAPi18n.__('management_document_name'),      width: 62 },
    { name: 'revision',   prompt: TAPi18n.__('management_document_revision'),  width: 19 },
    { name: 'date',       prompt: TAPi18n.__('management_document_date'),      width: 22 },
    { name: 'type',       prompt: TAPi18n.__('management_document_type'),      width: 24 },
    { name: 'category',   prompt: TAPi18n.__('management_document_category'),  width: 37 },
    { name: 'file',       prompt: TAPi18n.__('management_document_file'),      width: 48 }
  ]

  var dateRange = DateRangeHelper.getRange(template.$('#date'))
  var query = {
    code:     template.$('#code').val(),
    name:     template.$('#name').val(),
    revision: template.$('#revision').val(),
    type:     template.$('#type').val(),
    category: template.$('#category').val(),
    date:     dateRange && dateRange.join('|')
  }

  data = ManagementDocuments.find(castQuery(query), { sort: { date: -1 } }).map(function (mDoc) {
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
    var yPosition = 25
    var tableData = table(template)

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('management_documents'), 20, yPosition)
        .setFontSize(9)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: DigitalSignature.getSignatureHeight(doc, 'pdfManagementDocuments') },
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
