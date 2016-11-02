
DigitalSignature = {
    addSignatureToPdf: function (pdf, type, yPosition) {
        console.log("-------------------------------------- INI ["+type+"] "+yPosition)
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

                if(settings.digitalSignature.signatureImageId){
                    //pdf.setDrawColor(255, 0, 0);
                    //pdf.rect(20, yPosition, 100, 25, 'S');
                    yPosition += 30;
                } else {
                    //pdf.setDrawColor(0, 0, 255);
                    //pdf.rect(20, yPosition, 100, 25, 'S');
                    yPosition += 30;
                }

                var show = function(prop, position, margin){
                    if(prop) {
                        pdf.text(prop, 20, position, null, "center");
                        //pdf.rect(10, position, 120, 10, 'S');

                        position += margin;
                    }
                    return position;
                };

                pdf.setFontSize(11);
                yPosition = show(settings.digitalSignature.title1, yPosition, 4);
                yPosition = show(settings.digitalSignature.title2, yPosition, 4);
                yPosition = show(settings.digitalSignature.title3, yPosition, 4);
                yPosition = show(settings.digitalSignature.title4, yPosition, 4);
                yPosition = show(settings.digitalSignature.title5, yPosition, 4);

                pdf.setFontSize(9);
                yPosition = show(settings.digitalSignature.subtitle1, yPosition, 4);
                yPosition = show(settings.digitalSignature.subtitle2, yPosition, 4);
                yPosition = show(settings.digitalSignature.subtitle3, yPosition, 4);
                yPosition = show(settings.digitalSignature.subtitle4, yPosition, 4);
                yPosition = show(settings.digitalSignature.subtitle5, yPosition, 4);

            } else {
                console.log("--------------------------------------["+type+"] disabled !!!!!!!!!!!!!!!!!")
            }
        }
        console.log("-------------------------------------- END ["+type+"] "+yPosition)
        return yPosition
    }
}
