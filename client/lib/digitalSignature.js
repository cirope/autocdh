
DigitalSignature = {
    addSignatureAtEnd: function (pdf, type, yPosition, callback) {
        var executeCallback = true;
        if(pdf && type && yPosition){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {

                // page size
                var ph = pdf.options.orientation == 'l' ? 210 : 295
                var page = pdf.options.orientation == 'l' ? 295 : 210

                // image size
                var ih = settings.digitalSignature.signatureImageHeight ? settings.digitalSignature.signatureImageHeight : 20;
                var iw = settings.digitalSignature.signatureImageWidth ? settings.digitalSignature.signatureImageWidth : 20;

                // signature size
                var dsh = ih + 6
                    + (settings.digitalSignature.title1 ? 4 : 0)
                    + (settings.digitalSignature.title2 ? 4 : 0)
                    + (settings.digitalSignature.title3 ? 4 : 0)
                    + (settings.digitalSignature.title4 ? 4 : 0)
                    + (settings.digitalSignature.title5 ? 4 : 0)
                    + (settings.digitalSignature.subtitle1 ? 4 : 0)
                    + (settings.digitalSignature.subtitle2 ? 4 : 0)
                    + (settings.digitalSignature.subtitle3 ? 4 : 0)
                    + (settings.digitalSignature.subtitle4 ? 4 : 0)
                    + (settings.digitalSignature.subtitle5 ? 4 : 0);

                if (yPosition+dsh > ph) {
                    yPosition = 20
                    pdf.addPage()
                }

                var dsPosition = yPosition;
                yPosition += (ih+6);

                var show = function(prop, position, fSize){
                    if(prop) {
                        var wd = pdf.getStringUnitWidth(prop) * fSize * 25.6 / 72;
                        var xx = page - wd;
                        pdf.text(prop, xx/2, position, null, null, "center");

                        position += 4;
                    }
                    return position;
                };

                pdf.setFontSize(11);
                yPosition = show(settings.digitalSignature.title1, yPosition, 11);
                yPosition = show(settings.digitalSignature.title2, yPosition, 11);
                yPosition = show(settings.digitalSignature.title3, yPosition, 11);
                yPosition = show(settings.digitalSignature.title4, yPosition, 11);
                yPosition = show(settings.digitalSignature.title5, yPosition, 11);

                pdf.setFontSize(9);
                yPosition = show(settings.digitalSignature.subtitle1, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle2, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle3, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle4, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle5, yPosition, 9);


                if(settings.digitalSignature.signatureImageId){
                    var image = Images.findOne(settings.digitalSignature.signatureImageId);

                    executeCallback = false;
                    HTTP.get(image.url()+"&store=images", { responseType: 'blob' }, function(error, result){

                        var reader = new FileReader
                        reader.onloadend = function () {
                            pdf.addImage(reader.result, _.last(image.type().split('/')).toUpperCase(), (page-iw)/2, dsPosition, iw, ih)
                            if (typeof callback === 'function') callback()
                        }
                        reader.readAsDataURL(result.content);
                    });

                }
            }
        }

        if (executeCallback && typeof callback === 'function') callback()
        return yPosition
    },
    addSignatureToEachPage: function (pdf, type, yPosition, callback) {
        var executeCallback = true;
        if(pdf && type && yPosition){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {

                // page size
                var ph = pdf.options.orientation == 'l' ? 210 : 295
                var page = pdf.options.orientation == 'l' ? 295 : 210

                // image size
                var ih = settings.digitalSignature.signatureImageHeight ? settings.digitalSignature.signatureImageHeight : 20;
                var iw = settings.digitalSignature.signatureImageWidth ? settings.digitalSignature.signatureImageWidth : 20;

                // signature size
                var dsh = ih + 6
                    + (settings.digitalSignature.title1 ? 4 : 0)
                    + (settings.digitalSignature.title2 ? 4 : 0)
                    + (settings.digitalSignature.title3 ? 4 : 0)
                    + (settings.digitalSignature.title4 ? 4 : 0)
                    + (settings.digitalSignature.title5 ? 4 : 0)
                    + (settings.digitalSignature.subtitle1 ? 4 : 0)
                    + (settings.digitalSignature.subtitle2 ? 4 : 0)
                    + (settings.digitalSignature.subtitle3 ? 4 : 0)
                    + (settings.digitalSignature.subtitle4 ? 4 : 0)
                    + (settings.digitalSignature.subtitle5 ? 4 : 0);

                if (yPosition+dsh > ph) {
                    yPosition = 20
                    pdf.addPage()
                }

                var dsPosition = yPosition;
                yPosition += (ih+6);

                var show = function(prop, position, fSize){
                    if(prop) {
                        var wd = pdf.getStringUnitWidth(prop) * fSize * 25.6 / 72;
                        var xx = page - wd;
                        pdf.text(prop, xx/2, position, null, null, "center");

                        position += 4;
                    }
                    return position;
                };

                pdf.setFontSize(11);
                yPosition = show(settings.digitalSignature.title1, yPosition, 11);
                yPosition = show(settings.digitalSignature.title2, yPosition, 11);
                yPosition = show(settings.digitalSignature.title3, yPosition, 11);
                yPosition = show(settings.digitalSignature.title4, yPosition, 11);
                yPosition = show(settings.digitalSignature.title5, yPosition, 11);

                pdf.setFontSize(9);
                yPosition = show(settings.digitalSignature.subtitle1, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle2, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle3, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle4, yPosition, 9);
                yPosition = show(settings.digitalSignature.subtitle5, yPosition, 9);


                if(settings.digitalSignature.signatureImageId){
                    var image = Images.findOne(settings.digitalSignature.signatureImageId);

                    executeCallback = false;
                    HTTP.get(image.url()+"&store=images", { responseType: 'blob' }, function(error, result){

                        var reader = new FileReader
                        reader.onloadend = function () {
                            pdf.addImage(reader.result, _.last(image.type().split('/')).toUpperCase(), (page-iw)/2, dsPosition, iw, ih)
                            if (typeof callback === 'function') callback()
                        }
                        reader.readAsDataURL(result.content);
                    });

                }
            }
        }

        if (executeCallback && typeof callback === 'function') callback()
        return yPosition
    }
}
