AutoForm.addHooks('newFieldDensityForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

var calculateFields = function () {
  var m1 = +$('[name="massTotal"]').val()
  var m2 = +$('[name="massOver"]').val()

  var md = m1-m2
  $('[name="massUsed"]').val(md)

  var pph = 0
  var mc = +$('[name="massBelow"]').val()
  if(mc){
    var m = md - mc
    $('[name="massSandHole"]').val(m)

    var pa = +$('[name="bulkDensity"]').val()
    if(pa > 0) {
      var vh = m / pa

      if(vh) {
        var mh = +$('[name="moistMassMaterial"]').val()
        if (mh) {
          pph = mh / vh

          var ph = pph.toFixed(2)
          $('[name="wetDensity"]').val(ph)
        } else {
          $('[name="wetDensity"]').val('')
        }
      } else {
        $('[name="wetDensity"]').val('')
      }

      vh = vh.toFixed(1)
      $('[name="volumeTestHole"]').val(vh)
    } else {
      $('[name="volumeTestHole"]').val('')
      $('[name="wetDensity"]').val('')
    }
  } else {
    $('[name="massSandHole"]').val('')
    $('[name="volumeTestHole"]').val('')
    $('[name="wetDensity"]').val('')
  }

  var mr = +$('[name="massContainer"]').val()
  if(mr){
    mr = mr.toFixed(2)
    $('[name="massContainer"]').val(mr)
  }

  var m3 = +$('[name="massContainerWet"]').val()
  if(m3){
    m3 = m3.toFixed(2)
    $('[name="massContainerWet"]').val(m3)
  }

  var m4 = +$('[name="massContainerDry"]').val()
  if(m4){
    m4 = m4.toFixed(2)
    $('[name="massContainerDry"]').val(m4)
  }

  var ma = m3 - m4
  var ms = m4 - mr

  if(ma && ms) {
    var hd = ma / ms * 100

    if(pph) {
      var ps = pph * (1-hd/100)

      var mdd = +$('[name="maxDryDensity"]').val()
      if(mdd){
        var pc = ps / mdd * 100

        pc = pc.toFixed(1)
        $('[name="percentage"]').val(pc)
      } else {
        $('[name="percentage"]').val('')
      }

      ps = ps.toFixed(2)
      $('[name="dryDensity"]').val(ps)
    } else {
      $('[name="dryDensity"]').val('')
      $('[name="percentage"]').val('')
    }

    hd = hd.toFixed(1)
    $('[name="humidity"]').val(hd)
  } else {
    $('[name="humidity"]').val('')
    $('[name="dryDensity"]').val('')
    $('[name="percentage"]').val('')
  }

  if(ma) {
    ma = ma.toFixed(2)
    $('[name="waterMass"]').val(ma)
  } else {
    $('[name="waterMass"]').val('')
  }

  if(ms) {
    ms = ms.toFixed(2)
    $('[name="massWet"]').val(ms)
  } else {
    $('[name="massWet"]').val('')
  }
}


Template.fieldDensityNew.helpers({
  lastBulkDensity: function(){
    var last = FieldDensities.findOne({}, {sort: {createdAt:-1}})

    return last && last.bulkDensity
  },
  lastMaxDryDensity: function(){
    var last = FieldDensities.findOne({}, {sort: {createdAt:-1}})

    return last && last.maxDryDensity
  }

})

Template.fieldDensityNew.events({
  'change [name="moistMassMaterial"], change [name="massTotal"], change [name="massOver"]': function (event) {
    calculateFields()
  },
  'change [name="massBelow"], change [name="bulkDensity"], change [name="maxDryDensity"]': function (event) {
    calculateFields()
  },
  'change [name="massContainer"], change [name="massContainerWet"], change [name="massContainerDry"]': function (event) {
    calculateFields()
  }

})

