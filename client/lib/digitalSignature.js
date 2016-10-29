
DigitalSignature = {
    addSignatureToPdf: function (pdf, type, yPosition) {
        console.log("-------------------------------------- INI ["+type+"] "+yPosition)
        if(pdf && type && yPosition){
            var settings = Settings.findOne()
            if(settings && settings.digitalSignature && settings.digitalSignature.enabled && settings.digitalSignature[type]) {
                console.log("--------------------------------------["+type+"] enabled")

                if (yPosition > 270) {
                    console.log("--------------------------------------["+type+"] new page!!!")
                    yPosition = 20
                    pdf.addPage()
                }

                console.log("--------------------------------------["+type+"] y="+yPosition)
                pdf.text("PDFs rocks!!!!!!!!!!!!!!!", 20, yPosition += 10)
            } else {
                console.log("--------------------------------------["+type+"] disabled !!!!!!!!!!!!!!!!!")
            }
        }
        console.log("-------------------------------------- END ["+type+"] "+yPosition)
        return yPosition
    }
}
