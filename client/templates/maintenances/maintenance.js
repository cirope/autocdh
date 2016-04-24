var deactivating = new ReactiveVar
var table        = function () {
  var table   = $('[data-table="checklist"]')
  var headers = []
  var data    = []
  var widths  = table.find('thead th').length === 6 ?
    [35, 30, 80, 50, 80, 70] :
    [35, 25, 70, 70, 40, 60, 45]

  table.find('thead th').each(function (i, element) {
    var header = $(element).text()

    headers.push({ name: header, prompt: header, width: widths[i] })
  })

  table.find('tbody tr').each(function (i, element) {
    var obj = {}

    $(element).find('td').each(function (j, cell) {
      obj[headers[j].name] = $(cell).text() && $(cell).text() || "\n\n\n\n"
    })

    data.push(obj)
  })

  return { data: data, headers: headers }
}

Template.maintenance.helpers({
  instrument: function () {
    return Instruments.findOne(this.instrumentId).name
  },

  file: function () {
    return Files.findOne(this.fileId)
  },

  type: function () {
    return TAPi18n.__('maintenance_' + this.type)
  },

  isCalibratable: function () {
    return this.type === 'calibratable'
  },

  preventiveTemplate: function () {
    var instrument = Instruments.findOne(this.instrumentId)

    return 'maintenanceChecklist' + instrument.checklist
  },

  deactivating: function () {
    return deactivating.get()
  }
})

Template.maintenance.onDestroyed(function () {
  deactivating.set()
})

Template.maintenance.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition = 30
    var tableData = table()
    var title     = $('[data-table="checklist"]').closest('.panel').find('.panel-title').text()

    PDF.new({ orientation: 'l' }, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(title, 20, yPosition)
        .setFontSize(9)

      doc
        .text(TAPi18n.__('maintenance_checklist_date') + ':', 20, yPosition += 10)
        .text(TAPi18n.__('maintenance_checklist_made_by') + ':', 20, yPosition += 5)

      doc
        .setFontSize(7)
        .table(20, yPosition += 5, tableData.data, tableData.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })

      doc.save(TAPi18n.__('maintenance_checklist') + '.pdf')
    })
  },

  'click [data-deactivate]': function (event, template) {
    deactivating.set(true)
  },

  'click [data-cancel="deactivating"]': function (event, template) {
    event.preventDefault()
    deactivating.set()
  }
})

AutoForm.addHooks('deactivateMaintenanceForm', {
  before: {
    'method-update': function (doc, b) {
      if (confirm(TAPi18n.__('confirm_delete'))) {
        delete doc.$unset

        return {
          $set: _.extend(doc.$set, { active: false })
        }
      } else {
        return false
      }
    }
  }
})
