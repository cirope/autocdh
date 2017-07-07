
Template.fieldGranulometry.events({
  'click [data-download-pdf]': function (event, template) {
    var data = template.data

    PDF.new({}, function (doc) {

      // add image
      PdfHelper.addGraphImage(doc, 186, 'data-graph-container', 6, function () {
        var yPosition    = 10

        doc
          .setFont('helvetica')
          .setFontSize(13)
          .text(TAPi18n.__('field_granulometry_title'), 20, yPosition)
          .setFontSize(9)
          .text(TAPi18n.__('field_granulometry_subtitle'), 20, yPosition += 5)
          .setFontSize(8)
          .setFontStyle('normal')

        var values, values2, table;

        yPosition += 6
        var sResp = Responsible.findOne(data.sampleResponsibleId)
        values = [
          {
            name: 'field_granulometry_responsible',
            value: sResp && sResp.name ? sResp.name : '-'
          },
          {
            name: 'field_granulometry_name',
            value: data.sampleName
          },
          {
            name: 'field_granulometry_sampling_title',
            title: true,
            bold: true
          },
          {
            name: 'field_granulometry_sampling',
            value: (data.sampling ? data.sampling : '-')+' g'
          },
          {
            name: 'field_granulometry_humidity_title',
            title: true,
            bold: true
          },
          {
            name: 'field_granulometry_humidity_code',
            value: data.humidity_code
          },
          {
            name: 'field_granulometry_humidity_empty_mass',
            value: (data.humidity_empty_mass ? data.humidity_empty_mass : '-')+' g'
          },
          {
            name: 'field_granulometry_humidity_mass',
            title: true
          },
          {
            name: 'field_granulometry_humidity_wet',
            value: (data.humidity_wet ? data.humidity_wet : '-')+' g',
            sub: true
          },
          {
            name: 'field_granulometry_humidity_dry',
            value: (data.humidity_dry ? data.humidity_dry : '-')+' g',
            sub: true
          },
          {
            name: 'field_granulometry_humidity_percentage',
            value: (data.humidity_percentage ? data.humidity_percentage : '-')+' %'
          },
          {
            name: 'field_granulometry_analysis_title',
            title: true,
            bold: true
          },
          {
            name: 'field_granulometry_weight',
            value: (data.weight ? data.weight : '-')+' g'
          },
          {
            name: 'field_granulometry_separation_sieve',
            value: (data.separation_sieve ? data.separation_sieve : '-')+' g'
          },
          {
            name: 'field_granulometry_separation_thin',
            value: (data.separation_thin ? data.separation_thin : '-')+' g'
          }
        ]

        values2 = [
          {
            name: 'field_granulometry_date',
            value: data.fieldDate ? moment(data.fieldDate).format('L') : '-'
          },
          {
            name: 'field_granulometry_origin',
            value: data.origin
          },
          {
            name: 'field_granulometry_thin_title',
            title: true,
            bold: true
          },
          {
            name: 'field_granulometry_thin_code',
            value: data.thin_code
          },
          {
            name: 'field_granulometry_thin_empty_mass',
            value: (data.thin_empty_mass ? data.thin_empty_mass : '-')+' g'
          },
          {
            name: 'field_granulometry_thin_mass',
            title: true
          },
          {
            name: 'field_granulometry_thin_before',
            value: (data.thin_before ? data.thin_before : '-')+' g',
            sub: true
          },
          {
            name: 'field_granulometry_thin_after',
            value: (data.thin_after ? data.thin_after : '-')+' g',
            sub: true
          },
          {
            name: 'field_granulometry_thin_percentage',
            value: (data.thin_percentage ? data.thin_percentage : '-')+' %'
          },
          {
            empty: true
          },
          {
            name: 'field_granulometry_thin_ver_ret',
            value: (data.thin_ver_ret ? data.thin_ver_ret : '-')+'% '+(data.thin_ver_ret_label ? ' - '+data.thin_ver_ret_label : '')
          },
          {
            name: 'field_granulometry_thin_ver_pass',
            value: (data.thin_ver_pass ? data.thin_ver_pass : '-')+'% '+(data.thin_ver_pass_label ? ' - '+data.thin_ver_pass_label : '')
          },
          {
            name: 'field_granulometry_thin_pass_title',
            title: true,
            bold: true
          },
          {
            name: 'field_granulometry_thin_pass_200',
            value: (data.thin_pass_200 && data.thin_pass_200 === 'yes' ? TAPi18n.__('yes') : TAPi18n.__('no'))
          }
        ]

        yPosition = PdfHelper.addTwoColumnData(doc, yPosition, values, values2)

        table = PdfHelper.miniTable("analysis", {
          headers: [
            {name: 'sieve_mm', prompt: TAPi18n.__('field_granulometry_table_sieve_mm'), width: 25},
            {name: 'sieve_inches', prompt: TAPi18n.__('field_granulometry_table_sieve_inches'), width: 25},
            {name: 'sieve_weight', prompt: TAPi18n.__('field_granulometry_table_sieve_weight'), width: 30},
            {name: 'retained_sieve', prompt: TAPi18n.__('field_granulometry_table_retained_sieve'), width: 30},
            {name: 'retained_partial', prompt: TAPi18n.__('field_granulometry_table_retained_partial'), width: 30},
            {name: 'retained_total', prompt: TAPi18n.__('field_granulometry_table_retained_total'), width: 30},
            {name: 'passed', prompt: TAPi18n.__('field_granulometry_passed'), width: 25},
            {name: 'passed_percentage', prompt: TAPi18n.__('field_granulometry_passed_percentage'), width: 25}
          ],
          skipBody: 2,
          ignoreHeaders: true
        })
        // remove last data row
        table.data.pop()

        yPosition -= 3
        doc
          .setFontSize(6)
          .table(PdfHelper.COL_1, yPosition, table.data, table.headers, {
            printHeaders: true,
            autoSize: false,
            margins: { right: 0, left: 0, top: 0, bottom: 0 },
            fontSize: 6
          })
        yPosition += 101

        doc
          .setFont('helvetica')
          .setFontSize(8)
          .setFontStyle('normal')

        values = [
          {
            name: 'field_granulometry_total_complete',
            value: (data.total ? data.total : '-')+' g'
          },
          {
            name: 'field_granulometry_observations',
            value: data.observations,
            multiline: true
          }
        ]
        yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

        yPosition -= 10

        // adding digital signature
        DigitalSignature.addSignatureToEachPage(doc, 'pdfGranulometries', function () {
          doc.putTotalPages('___total_pages___')
          doc.save(data.origin+'-'+data.sampleName+'.pdf')
        })
      }, -1, 2)

    })
  }
})
