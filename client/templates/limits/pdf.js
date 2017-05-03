
Template.limit.events({
  'click [data-download-pdf]': function (event, template) {
    var data = template.data
    var yPosition    = 20

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('limit_title'), 20, yPosition)
        .setFontSize(10)
        .text(TAPi18n.__('limit_subtitle'), 20, yPosition += 5)
        .setFontSize(9)
        .setFontStyle('normal')

      var values, table;

      yPosition += 7
      var sResp = Responsible.findOne(data.sampleResponsibleId)
      values = [
        {
          name: 'limit_responsible',
          value: sResp && sResp.name ? sResp.name : '-'
        },
        {
          name: 'limit_date',
          value: data.fieldDate ? moment(data.fieldDate).format('L') : '-'
        },
        {
          name: 'limit_name',
          value: data.sampleName
        },
        {
          name: 'limit_origin',
          value: data.origin
        },
      ]

      yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

      table = PdfHelper.miniTable("liquid", {
        widths: [80, 20, 30, 30, 30]
      })
      table.headers[0].prompt = TAPi18n.__('limit_liquid_title')

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

      table = PdfHelper.miniTable("plastic",  {
        widths: [80, 20, 30, 30]
      })
      table.headers[0].prompt = TAPi18n.__('limit_plastic_title')
      doc
        .setFontSize(7)
        .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
          printHeaders: true,
          autoSize: false,
          margins: { right: 0, left: 0, top: 0, bottom: 0 },
          fontSize: 7
        })
      yPosition += 53

      doc
        .setFont('helvetica')
        .setFontSize(9)
        .setFontStyle('normal')

      values = [
        {
          name: 'limit_observations',
          value: data.observations,
          multiline: true
        }
      ]
      yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

      yPosition -= 5

      // add image
      PdfHelper.addGraphImage(doc, yPosition, 'data-graph-container', 7, function () {
        // adding digital signature
        DigitalSignature.addSignatureToEachPage(doc, 'pdfGranulometries', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(data.origin+'-'+data.sampleName+'.pdf')
        })
      })

    })
  }
})
