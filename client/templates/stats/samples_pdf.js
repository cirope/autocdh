
Template.statsForSamples.events({
  'click [data-download-pdf]': function (event, template) {
    var yPosition            = 40
    var name                 = TAPi18n.__('stats_for_samples')

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(name, 20, yPosition)
        .setFontSize(9)

      doc.setFontSize(9)

      doc.text(Schemas.Filter.label('start')+': '+moment(template.data.filter.start).format('L'), 25, yPosition += 5)
      doc.text(Schemas.Filter.label('end')  +': '+moment(template.data.filter.end).format('L'),   25, yPosition += 5)
      doc.text(Schemas.Filter.label('strengthId')+': '+$('select[name="strengthId"] option:selected').text(), 25, yPosition += 5)
      doc.text(TAPi18n.__('stats_samples_count')+': '+template.data.samples.count(), 25, yPosition += 5)

      // adding digital signature
      yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfFreshConcrete', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(name+'.pdf')
      })

    })
  }
})
