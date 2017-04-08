
PdfHelper = {
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
    table: function (tableName) {
        var table   = $('[data-table="' + tableName + '"]')
        var headers = []
        var data    = []
        var widths  = [120, 125]

        table.find('thead th').each(function (i, element) {
            var header = $(element).text()

            headers.push({ name: header, prompt: header, width: widths[i] })
        })

        table.find('tbody tr').each(function (i, element) {
            var obj = {}

            $(element).find('td').each(function (j, cell) {
                obj[headers[j].name] = $(cell).text().replace('″', '"')
            })

            data.push(obj)
        })

        return { data: data, headers: headers }
    },
    addGraphImage: function (doc, yPosition, callback) {
        $('body').addClass('pdf-export')

        var canvas = document.createElement('canvas')
        var html = _.first($('html')).innerHTML
        var width = $('[data-container]').outerWidth() * 1.2
        var height = $('[data-container]').outerHeight() * 1.2
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
