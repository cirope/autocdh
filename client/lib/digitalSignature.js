
DigitalSignature = {
    addSignatureToPdf: function (pdf, type, yPosition) {
        console.log("-------------------------------------- INI ["+type+"] "+yPosition)
        if(pdf && type && yPosition){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {
                console.log("--------------------------------------["+type+"] enabled")

                pdf.text("PDFs rocks!!!!!!!!!!!!!!!", 20, yPosition += 10)
            }
        }
        console.log("-------------------------------------- END ["+type+"] "+yPosition)
        return yPosition
    }
}
