
var fillPdf = function(doc, data){
  return function(){
    var yPosition    = 10

    doc
      .setFont('helvetica')
      .setFontSize(14)
      .text(TAPi18n.__('compaction_title'), 20, yPosition)
      .setFontSize(10)
      .text(TAPi18n.__('compaction_subtitle'), 20, yPosition += 5)
      .setFontSize(9)
      .setFontStyle('normal')

    var values, values2, table;

    yPosition += 7
    var sResp = Responsible.findOne(data.sampleResponsibleId)
    values = [
      {
        name: 'compaction_responsible',
        value: sResp && sResp.name ? sResp.name : '-'
      },
      {
        name: 'compaction_date',
        value: data.fieldDate ? moment(data.fieldDate).format('L') : '-'
      },
      {
        name: 'compaction_name',
        value: data.sampleName
      },
      {
        name: 'compaction_origin',
        value: data.origin
      },
      {
        name: 'compaction_type',
        value: TAPi18n.__('compaction_type_' + data.type)
      },
      {
        name: 'compaction_layers',
        value: data.layers
      },
      {
        name: 'compaction_hits',
        value: data.hits
      }
    ]

    values2 = [
      {
        name: 'compaction_sieve',
        value: TAPi18n.__('compaction_sieve_' + data.sieve)
      },
      {
        name: 'compaction_real_density',
        value: data.real_density
      },
      {
        name: 'compaction_total_weight',
        value: (data.total_weight ? data.total_weight : '-')+' Kg'
      },
      {
        empty: true,
        mini: true
      },
      {
        name: 'compaction_separation_title',
        title: true
      },
      {
        name: 'compaction_through',
        value: (data.through ? data.through : '-')+' g',
        sub: true
      },
      {
        name: 'compaction_retained',
        value: (data.retained ? data.retained : '-')+' g',
        sub: true
      },
      {
        name: 'compaction_retained_percentage',
        value: (data.retained_percentage ? data.retained_percentage : '-')+' %',
        sub: true
      }
    ]

    yPosition = PdfHelper.addTwoColumnData(doc, yPosition, values, values2)

    table = PdfHelper.miniTable("field_density", {
      widths: [70, 20, 25, 25, 25, 25, 25]
    })
    table.headers[0].prompt = TAPi18n.__('compaction_field_density_title')
    table.data[5][TAPi18n.__('compaction_steps')] = TAPi18n.__('compaction_field_density_ns')

    yPosition -= 2
    doc
      .setFontSize(7)
      .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
        printHeaders: true,
        autoSize: false,
        margins: { right: 0, left: 0, top: 0, bottom: 0 },
        fontSize: 7
      })
    yPosition += 57

    table = PdfHelper.miniTable("humidity",  {
      widths: [70, 20, 25, 25, 25, 25, 25]
    })
    table.headers[0].prompt = TAPi18n.__('compaction_humidity_title')
    doc
      .setFontSize(7)
      .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
        printHeaders: true,
        autoSize: false,
        margins: { right: 0, left: 0, top: 0, bottom: 0 },
        fontSize: 7
      })
    yPosition += 49

    table = PdfHelper.miniTable("dry_field_density",  {
      widths: [70, 20, 25, 25, 25, 25, 25]
    })
    table.headers[0].prompt = TAPi18n.__('compaction_dry_field_density_title')
    doc
      .setFontSize(7)
      .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
        printHeaders: true,
        autoSize: false,
        margins: { right: 0, left: 0, top: 0, bottom: 0 },
        fontSize: 7
      })
    yPosition += 28

    doc
      .setFont('helvetica')
      .setFontSize(9)
      .setFontStyle('normal')

    values = [
      {
        name: 'compaction_observations',
        value: data.observations,
        multiline: true
      }
    ]
    yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

    yPosition -= 5

    DigitalSignature.addSignatureToEachPage(doc, 'pdfGranulometries', function () {
      doc.putTotalPages('___total_pages___')
      doc.save(data.origin+'-'+data.sampleName+'.pdf')
    })
  };
};

Template.compactionAssay.events({
  'click [data-download-pdf]': function (event, template) {
    PDF.new({}, function (doc) {
      // add image
      PdfHelper.addGraphImage(doc, 186, 'data-graph-container', 6.25, fillPdf(doc, template.data.compaction) , -4, 2)
    })
  }
})
