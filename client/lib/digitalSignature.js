
DigitalSignature = {
    addSignatureToEachPage: function (pdf, type, callback) {
        this._addSignatureToEachPage('right', pdf, type, callback)
    },
    addCenteredSignatureToEachPage: function (pdf, type, callback) {
        this._addSignatureToEachPage('centered', pdf, type, callback)
    },
    _addSignatureToEachPage: function (signatureType, pdf, type, callback) {
        var executeCallback = true;
        if(pdf && type){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {
                signatureType = signatureType ? signatureType : 'centered'

                // clarification settings
                var fontTitle = settings.digitalSignature.fontTitle ? settings.digitalSignature.fontTitle : 11
                var fontSubtitle = settings.digitalSignature.fontSubtitle ? settings.digitalSignature.fontSubtitle : 9
                var lineHeight = settings.digitalSignature.spaceBetweenTitles ? settings.digitalSignature.spaceBetweenTitles : 4

                var processText = function(tList, prop, position, fSize){
                    if(prop) {
                        var response = {}
                        response['t'] = prop // text
                        response['f'] = fSize // font
                        response['w'] = pdf.getStringUnitWidth(prop) * fSize * 25.6 / 72 // width
                        response['p'] = position // vertical position
                        tList.push(response)

                        position += lineHeight
                    }
                    return position;
                };

                // page size
                var ph = pdf.options.orientation == 'l' ? 210 : 295
                var pw = pdf.options.orientation == 'l' ? 295 : 210

                // margins
                var pm = signatureType == 'centered' ? 2 : (pdf.options.orientation == 'l' ? 15 : 10) // margins from page border
                var im = settings.digitalSignature.signatureImageMargin ? settings.digitalSignature.signatureImageMargin : 6 // margin between image and clarification titles

                // image size
                var ih = settings.digitalSignature.signatureImageHeight ? settings.digitalSignature.signatureImageHeight : 20
                var iw = settings.digitalSignature.signatureImageWidth ? settings.digitalSignature.signatureImageWidth : 20

                // signature size
                var dsh = ih + pm
                    + (settings.digitalSignature.title1 ? lineHeight : 0)
                    + (settings.digitalSignature.title2 ? lineHeight : 0)
                    + (settings.digitalSignature.title3 ? lineHeight : 0)
                    + (settings.digitalSignature.title4 ? lineHeight : 0)
                    + (settings.digitalSignature.title5 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle1 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle2 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle3 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle4 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle5 ? lineHeight : 0);

                var dsPosition = ph-dsh-im; // initial position of image
                var yPosition = dsPosition+ih+im; // initial position of text

                var textList = []
                yPosition = processText(textList, settings.digitalSignature.title1, yPosition, fontTitle)
                yPosition = processText(textList, settings.digitalSignature.title2, yPosition, fontTitle)
                yPosition = processText(textList, settings.digitalSignature.title3, yPosition, fontTitle)
                yPosition = processText(textList, settings.digitalSignature.title4, yPosition, fontTitle)
                yPosition = processText(textList, settings.digitalSignature.title5, yPosition, fontTitle)
                yPosition = processText(textList, settings.digitalSignature.subtitle1, yPosition, fontSubtitle)
                yPosition = processText(textList, settings.digitalSignature.subtitle2, yPosition, fontSubtitle)
                yPosition = processText(textList, settings.digitalSignature.subtitle3, yPosition, fontSubtitle)
                yPosition = processText(textList, settings.digitalSignature.subtitle4, yPosition, fontSubtitle)
                yPosition = processText(textList, settings.digitalSignature.subtitle5, yPosition, fontSubtitle)

                // max width to draw (image or texts)
                var maxWidth = iw
                for(var txt in textList){
                    if(maxWidth < textList[txt]['w']){
                        maxWidth = textList[txt]['w']
                    }
                }

                // horizontal position of text
                for(txt in textList){
                    if(signatureType == 'centered') {
                        textList[txt]['h'] = (pw - textList[txt]['w']) / 2; // centered
                    } else {
                        textList[txt]['h'] = pw - pm - textList[txt]['w'] - (maxWidth - textList[txt]['w']) / 2; // right of page
                    }
                }

                // show text in each page
                for (var np = 1; np <= pdf.internal.getNumberOfPages(); np++) {
                    pdf.setPage(np)
                    for(txt in textList){
                        pdf.setFontSize(textList[txt]['f']);
                        pdf.text(textList[txt]['t'], textList[txt]['h'], textList[txt]['p'], null, null, "center");
                    }
                }

                if(settings.digitalSignature.signatureImageId){
                    var image = Images.findOne(settings.digitalSignature.signatureImageId);
                    if(image && image.url()) {
                        executeCallback = false // callback will be called after to load images

                        HTTP.get(image.url() + "&store=images", {responseType: 'blob'}, function (error, result) {

                            var reader = new FileReader
                            reader.onloadend = function () {
                                var ip; // image position
                                if(signatureType == 'centered') {
                                    ip = (pw - iw) / 2; // centered
                                } else {
                                    ip = pw - pm - iw - (maxWidth - iw) / 2; // right of page
                                }
                                var iType = _.last(image.type().split('/')).toUpperCase() // image type

                                // show image in each page
                                for (var np = 1; np <= pdf.internal.getNumberOfPages(); np++) {
                                    pdf.setPage(np)
                                    pdf.addImage(reader.result, iType, ip, dsPosition, iw, ih)
                                }

                                if (typeof callback === 'function') callback()
                            }
                            reader.readAsDataURL(result.content);
                        });
                    }
                }
            }
        }

        if (executeCallback && typeof callback === 'function'){
            callback()
        }
    },
    getSignatureHeight: function (pdf, type) {
        if(pdf && type){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {

                // clarification settings
                var lineHeight = settings.digitalSignature.spaceBetweenTitles ? settings.digitalSignature.spaceBetweenTitles : 4

                // margins
                var pm = 2 // margins from page border
                var im = settings.digitalSignature.signatureImageMargin ? settings.digitalSignature.signatureImageMargin : 6 // margin between image and clarification titles

                // image size
                var ih = settings.digitalSignature.signatureImageHeight ? settings.digitalSignature.signatureImageHeight : 20

                // signature size
                var dsh = ih + pm
                    + (settings.digitalSignature.title1 ? lineHeight : 0)
                    + (settings.digitalSignature.title2 ? lineHeight : 0)
                    + (settings.digitalSignature.title3 ? lineHeight : 0)
                    + (settings.digitalSignature.title4 ? lineHeight : 0)
                    + (settings.digitalSignature.title5 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle1 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle2 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle3 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle4 ? lineHeight : 0)
                    + (settings.digitalSignature.subtitle5 ? lineHeight : 0);

                return dsh+im-7; // initial position of image
            }
        }
        return 0
    }
}
