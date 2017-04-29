
PdfHelper = {
	COL_1: 20,
	COL_2: 100,
	addFilterData: function (filter, doc, yPosition, start, end, fields) {
		doc
			.setFontSize(12)
			.text(TAPi18n.__('graphic_filter'), 20, yPosition += 7)
			.setFontSize(9)

		doc.text(Schemas.Filter.label('start') + ': ' + moment(filter.start).format('L'), 25, yPosition += 5)
		doc.text(Schemas.Filter.label('end')   + ': ' + moment(filter.end).format('L'),   25, yPosition += 5)

		_.each(fields, function (name) {
			var label = Schemas.Filter.label(name)
			var text  = $('select[name="' + name + '"] option:selected').text()

			doc.text(label + ': ' + text, 25, yPosition += 5)
		})

		return yPosition
	},
	addTwoColumnData: function (doc, yPosition, values1, values2) {
		var y1 = yPosition
		var y2 = yPosition

		y1 = PdfHelper.addColumnData(doc, y1, PdfHelper.COL_1, values1)
		y2 = PdfHelper.addColumnData(doc, y2, PdfHelper.COL_2, values2)

		return Math.max(y1, y2)
	},
	addColumnData: function (doc, yPosition, column, values) {
		values = values || []
		var element;
		for(var i = 0; i < values.length; i++) {
			element = values[i];
			yPosition = PdfHelper.addElementData(doc, yPosition, column, element)
		}
		return yPosition
	},
	addElementData: function (doc, yPosition, column, element) {
		if(element) {
			if(!!element.empty){
				if(!!element.empty && !!element.empty) {
					yPosition += 2
				} else {
					yPosition += 5
				}
			} else {
				if (!!element.bold) {
					doc.setFontStyle('bold')
				}
				var txt = (!!element.sub ? '\t' : '')+TAPi18n.__(element.name) + (!!element.title ? '' : ': ' + (element.value || ''))
				if (txt) {
					if(!!element.multiline){
						txt = PDF.splitInLines(txt)
					}
					doc.text(txt, column, yPosition)
					yPosition += 5
					if(!!element.multiline){
						yPosition += 3 * (txt.length-1)
					}
				}
				if (!!element.bold) {
					doc.setFontStyle('normal')
				}
			}
		}
		return yPosition
	},
	miniTable: function (tableName, columnWidths) {
		var table   = $('[data-table="' + tableName + '"]')
		var headers = []
		var data    = []
		var widths  = !!columnWidths ? columnWidths : [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]

		table.find('thead th').each(function (i, element) {
			var header = $(element).text()

			headers.push({ name: header, prompt: header, width: widths[i] })
		})

		table.find('tbody tr').each(function (i, element) {
			var obj = {}

			var jj = 0;
			$(element).find('th').each(function (j, cell) {
				obj[headers[j].name] = $(cell).text().replace('″', '"')
				jj = j+1
			})
			$(element).find('td').each(function (j, cell) {
				obj[headers[jj+j].name] = $(cell).text().replace('″', '"')
			})

			data.push(obj)
		})

		table.find('tfoot tr').each(function (i, element) {
			var obj = {}

			var jj = 0;
			$(element).find('th').each(function (j, cell) {
				obj[headers[j].name] = $(cell).text().replace('″', '"')
				jj = j+1
			})
			$(element).find('td').each(function (j, cell) {
				obj[headers[jj+j].name] = $(cell).text().replace('″', '"')
			})

			data.push(obj)
		})

		return { data: data, headers: headers }
	},
	addGraphImage: function (doc, yPosition, container, callback) {
		$('body').addClass('pdf-export')

		container = container || 'data-graph-container'

		var canvas = document.createElement('canvas')
		var html = _.first($('html')).innerHTML
		var width = $('['+container+']').outerWidth() * 1.2
		var height = $('['+container+']').outerHeight() * 1.2
		var ctx = canvas.getContext('2d')

		canvas.width = width
		canvas.height = height

		ctx.fillStyle = '#ffffff'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		$('body').removeClass('pdf-export')

		rasterizeHTML.drawHTML(html, canvas).then(function (result) {
			try{
				var data = canvas.toDataURL('image/png')
				var factor = 6.75

				doc.addImage(data, 'PNG', 15, yPosition += 5, width / factor, height / factor)

				yPosition += 5 + height / factor
				if(doc.lastCellPos) doc.lastCellPos.y = yPosition

				if (typeof callback === 'function') callback()
			} catch(err){
				console.log(err)
			}
		}, function () {
			console.log('error')
		});
	}
}

/*

 doc
 .setDrawColor('0', '255', '0')
 .line(column < PdfHelper.COL_2 ? 0 : 150, yPosition, column, yPosition)

 */