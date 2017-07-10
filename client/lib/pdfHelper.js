
PdfHelper = {
    COL_1: 20,
    COL_2: 100,

    addFilterData: function (filter, doc, yPosition, start, end, fields) {
        doc
          .setFontSize(12)
          .text(TAPi18n.__('graphic_filter'), 20, yPosition += 7)
          .setFontSize(9)

        if(!!start) {
            doc.text(Schemas.Filter.label('start') + ': ' + moment(filter.start).format('L'), 25, yPosition += 5)
        }
        if(!!end) {
            doc.text(Schemas.Filter.label('end') + ': ' + moment(filter.end).format('L'), 25, yPosition += 5)
        }

        _.each(fields, function (name) {
            var label = '';
            var text = '';
            if(typeof name === 'object'){
                if(!!name.label) {
                    label = Schemas.Filter.label(name.label)
                }
                text = '-'
                if(!!name.text) {
                    var obj = $('input[id="' + name.text + '"]')
                    if(!!obj && !!obj[0]) {
                        text = obj[0].value
                    }
                } else if(!!name.checkbox) {
                    var obj = $('input[name="' + name.label + '"]')
                    if(!!obj && !!obj[0]) {
                        text = !!obj[0].checked ? TAPi18n.__('yes') :  TAPi18n.__('no')
                    }
                }
                if(!text || /^\s*$/.test(text)){
                    text = '-'
                }
            } else {
                label = Schemas.Filter.label(name)
                text = $('select[name="' + name + '"] option:selected').text()
            }
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
                if(!!element.empty && !!element.mini) {
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
    miniTable: function (tableName, options) {
        var table   = $('[data-table="' + tableName + '"]')
        options = options || {}
        var ignoreHeader = !!options.ignoreHeader
        var ignoreBody = !!options.ignoreBody
        var ignoreFoot = !!options.ignoreFoot
        var headers = !!options.headers ? options.headers : []
        var data    = !!options.data ? options.data : []
        var widths  = !!options.widths ? options.widths : [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
        var skipBody  = !!options.skipBody ? options.skipBody : 0

        if(!ignoreHeader) {
            table.find('thead th').each(function (i, element) {
                var header = $(element).text()

                headers.push({name: header, prompt: header, width: widths[i]})
            })
        }

        if(!ignoreBody) {
            table.find('tbody tr').each(function (i, element) {
                if(skipBody > 0){
                    skipBody--
                } else {
                    var obj = {}

                    var jj = 0;
                    $(element).find('th').each(function (j, cell) {
                        obj[headers[j].name] = $(cell).text().replace('″', '"')
                        jj = j + 1
                    })
                    $(element).find('td').each(function (j, cell) {
                        obj[headers[jj + j].name] = $(cell).text().replace('″', '"')
                    })

                    data.push(obj)
                }
            })
        }

        if(!ignoreFoot) {
            table.find('tfoot tr').each(function (i, element) {
                var obj = {}

                var jj = 0;
                $(element).find('th').each(function (j, cell) {
                    obj[headers[j].name] = $(cell).text().replace('″', '"')
                    jj = j + 1
                })
                $(element).find('td').each(function (j, cell) {
                    obj[headers[jj + j].name] = $(cell).text().replace('″', '"')
                })

                data.push(obj)
            })
        }

        return { data: data, headers: headers }
    },
    addGraphImage: function (doc, yPosition, container, factor, callback, imgX, imgY, waitsJs) {
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

        factor = factor || 6
        imgX = imgX || 15
        imgY = imgY || 5

        var addImageToPdf = function (result) {
            try{
                var data = canvas.toDataURL('image/png')
                doc.addImage(data, 'PNG', imgX, yPosition += imgY, width / factor, height / factor)

                yPosition += 5 + height / factor
                if(doc.lastCellPos) doc.lastCellPos.y = yPosition

                if (typeof callback === 'function') callback()
            } catch(err){
                console.log(err)
            }
        };

        if(!!waitsJs){
            var options = {
                executeJs: true,
                executeJsTimeout: 200 + (!!waitsJs && waitsJs > 0 ? waitsJs : 0)
            }

            rasterizeHTML.drawHTML(html, canvas, options).then(addImageToPdf, function (err) { console.log('error: '+err) });
        } else {
            rasterizeHTML.drawHTML(html, canvas).then(addImageToPdf, function (err) { console.log('error: '+err) });
        }
    },
    generateGraphPage: function (template, container, title, digitalSignatureType, dataFilterFc, yIni, yFilterIni, yGraphIni) {
        var yPosition            = yIni || 25
        var name                 = TAPi18n.__(title)

        PDF.new({}, function (doc) {
            PdfHelper.addGraphImage(doc, yGraphIni || 58, container, 4.75, function () {
                doc
                  .setFont('helvetica')
                  .setFontSize(14)
                  .text(name, 20, yPosition)
                  .setFontSize(9)

                if(typeof dataFilterFc === 'function') {
                    yPosition = dataFilterFc(template.data.filter, doc, yPosition += yFilterIni || 5)
                }

                // adding digital signature
                yPosition = DigitalSignature.addSignatureToEachPage(doc, digitalSignatureType, function () {
                    doc.putTotalPages('___total_pages___')
                    doc.save(name+'.pdf')
                })
            }, 4)
        })
    }
}
