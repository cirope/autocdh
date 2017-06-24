
Template.statsIndicatorsDashboard.events({
	'click [download-pdf]': function (event, template) {
		var yPosition            = 40
		var name                 = TAPi18n.__('stats_indicators_dashboard')

		PDF.new({orientation:'l'}, function (doc) {
			doc
				.setFont('helvetica')
				.setFontSize(14)
				.text(name, 20, yPosition)
				.setFontSize(9)

			PdfHelper.addGraphImage(doc, yPosition, 'data-container', 5, function () {
				// adding digital signature
				yPosition = DigitalSignature.addSignatureToEachPage(doc, 'pdfStatsIndicators', function () {
					doc.putTotalPages('___total_pages___')
					doc.save(name+'.pdf')
				})
			})
		})
	}
})
