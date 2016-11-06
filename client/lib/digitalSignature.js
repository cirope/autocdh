
DigitalSignature = {
    addSignatureToPdf: function (pdf, type, yPosition, callback) {
        console.log("-------------------------------------- INI ["+type+"] "+yPosition)
        var executeCallback = true;
        if(pdf && type && yPosition){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {
                console.log("--------------------------------------["+type+"] enabled")

                if (yPosition > 270 || (yPosition > 180 && pdf.options.orientation == 'l')) {
                    console.log("--------------------------------------["+type+"] new page!!!")
                    yPosition = 20
                    pdf.addPage()
                }

                console.log("--------------------------------------["+type+"] y="+yPosition)

                var page = pdf.options.orientation == 'l' ? 295 : 210

                var dsPosition = yPosition;
                yPosition += 40;

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

                    console.log("--------------------------------------[image] "+JSON.stringify(image._getInfo()))

                    executeCallback = false;
                    HTTP.get(image.url()+"&store=images", { responseType: 'blob' }, function(error, result){

                        var reader = new FileReader
                        reader.onloadend = function () {
                            console.log("--------------------------------------[image] dsPosition "+dsPosition)

                            pdf.addImage(reader.result, _.last(image.type().split('/')).toUpperCase(), 85, dsPosition, 40, 40)
                            if (typeof callback === 'function') callback()
                        }
                        reader.readAsDataURL(result.content);
                    });

                }
            }
        }
        console.log("-------------------------------------- END ["+type+"] "+yPosition)

        if (executeCallback && typeof callback === 'function') callback()
        return yPosition
    }
}
