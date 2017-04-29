
Template.fieldDensity.events({
  'click [data-download-pdf]': function (event, template) {
    var data = template.data
    var yPosition    = 20

    PDF.new({}, function (doc) {
      doc
        .setFont('helvetica')
        .setFontSize(14)
        .text(TAPi18n.__('field_density_title'), 20, yPosition)
        .setFontSize(10)
        .text(TAPi18n.__('field_density_subtitle'), 20, yPosition += 5)
        .setFontSize(9)
        .setFontStyle('normal')

      var values;

      yPosition += 5
      var sResp = Responsible.findOne(data.sampleResponsibleId)
      values = [
        {
          name: 'field_density_sample_title',
          title: true,
          bold: true
        },
        {
          name: 'field_density_sample_responsible',
          value: sResp && sResp.name ? sResp.name : '-'
        },
        {
          name: 'field_density_field_date',
          value: data.fieldDate ? moment(data.fieldDate).format('L') : '-'
        },
        {
          name: 'field_density_sample_name',
          value: data.sampleName
        },
        {
          name: 'field_density_work',
          value: data.work
        },
        {
          name: 'field_density_zone',
          value: data.zone
        },
        {
          name: 'field_density_coordinate',
          value: data.coordinate
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_sand_cone_code',
          value: data.sandConeCode
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_moist_mass_material',
          value: (data.moistMassMaterial ? data.moistMassMaterial : '-')+' g'
        },
        {
          name: 'field_density_mass_total',
          value: (data.massTotal ? data.massTotal : '-')+' g'
        },
        {
          name: 'field_density_mass_over',
          value: (data.massOver ? data.massOver : '-')+' g'
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_sample_observations',
          value: data.sampleObservations
        }
      ]

      yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

      yPosition += 10
      var aResp = Responsible.findOne(data.assayResponsibleId)
      values = [
        {
          name: 'field_density_assay_title',
          title: true,
          bold: true
        },
        {
          name: 'field_density_assay_responsible',
          value: aResp && aResp.name ? aResp.name : '-'
        },
        {
          name: 'field_density_lab_date',
          value: data.labDate ? moment(data.labDate).format('L') : '-'
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_mass_used',
          value: (data.massUsed ? data.massUsed : '-')+' g'
        },
        {
          name: 'field_density_mass_below',
          value: (data.massBelow ? data.massBelow : '-')+' g'
        },
        {
          name: 'field_density_mass_sand_hole',
          value: (data.massSandHole ? data.massSandHole : '-')+' g'
        },
        {
          name: 'field_density_bulk_density',
          value: (data.bulkDensity ? data.bulkDensity : '-')+' g/cm³'
        },
        {
          name: 'field_density_volume_test_hole',
          value: (data.volumeTestHole ? data.volumeTestHole : '-')+' cm³'
        },
        {
          name: 'field_density_wet_density',
          value: (data.wetDensity ? data.wetDensity : '-')+' g/cm³'
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_drying_container_code',
          value: data.dryingContainerCode
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_mass_container',
          value: (data.massContainer ? data.massContainer : '-')+' g'
        },
        {
          name: 'field_density_mass_container_wet',
          value: (data.massContainerWet ? data.massContainerWet : '-')+' g'
        },
        {
          name: 'field_density_mass_container_dry',
          value: (data.massContainerDry ? data.massContainerDry : '-')+' g'
        },
        {
          name: 'field_density_water_mass',
          value: (data.waterMass ? data.waterMass : '-')+' g'
        },
        {
          name: 'field_density_mass_wet',
          value: (data.massWet ? data.massWet : '-')+' g'
        },
        {
          name: 'field_density_humidity',
          value: (data.humidity ? data.humidity : '-')+' %'
        },
        {
          name: 'field_density_dry_density',
          value: (data.dryDensity ? data.dryDensity : '-')+' g/cm³'
        },
        {
          name: 'field_density_max_dry_density',
          value: (data.maxDryDensity ? data.maxDryDensity : '-')+' g/cm³'
        },
        {
          name: 'field_density_percentage',
          value: (data.percentage ? data.percentage : '-')+' %'
        },
        {
          empty: true,
          mini: true
        },
        {
          name: 'field_density_assay_observations',
          value: data.assayObservations
        }
      ]

      yPosition = PdfHelper.addColumnData(doc, yPosition, PdfHelper.COL_1, values)

      // adding digital signature
      DigitalSignature.addSignatureToEachPage(doc, 'pdfGranulometries', function () {
        doc.putTotalPages('___total_pages___')
        doc.save(data.work+'-'+data.sampleName+'.pdf')
      })
    })
  }
})
