AutoForm.addHooks('newCompactionForm', {
  before: {
    method: function (doc) {
      return _.extend(doc, { _id: Random.id() })
    }
  }
})

var checkType = function (type) {
  var layers = -1;
  var hits = -1;

  if(type) {
    if (type === 't99') {
      layers = 3;
      hits = 25;
    } else if (type === 't180') {
      layers = 5;
      hits = 56;
    }
  }

  if(layers > 0){
    $('[name="layers"]').val(layers).prop('readonly', true)
  } else {
    $('[name="layers"]').prop('readonly', false)
  }
  if(hits > 0){
    $('[name="hits"]').val(hits).prop('readonly', true)
  } else {
    $('[name="hits"]').prop('readonly', false)
  }
};

var copyValues = function (name, from, to) {
  var value = getField(name+from);
  if(value){
    for(var i = from+1; i <= to; i++){
      if(!getField(name+i)){
        setField(name+i, value)
      } else {
        copyValues(name, i, to)
        break
      }
    }
  } else {
    if(from < to){
      copyValues(name, from+1, to)
    }
  }
};

var getField = function (name) {
  return $('[name="' + name + '"]').val()
};

var getFloat = function (name) {
  return parseFloat(getField(name) || 0)
};

var setField = function (name, value) {
  $('[name="'+name+'"]').val(value)
};

var calculateColumns = function () {
  var rp = getFloat('retained_percentage')/100;
  var rd = getFloat('real_density');

  for(var pos = 1; pos <= 5; pos++) {
    var r = 0;
    var v = getFloat('volume_p' + pos);
    if (0 < v && getField('mold_mass_p' + pos) && getField('empty_mold_mass_p' + pos)) {
      r = (getFloat('mold_mass_p' + pos) - getFloat('empty_mold_mass_p' + pos)) / v;
    }
    setField('field_density_p' + pos, r ? r.toFixed(2) : '')

    var hp = 0;
    var e = getFloat('empty_container_mass_p' + pos);
    var d = getFloat('dry_container_mass_p' + pos);
    if (0 < d-e) {
      var w = getFloat('wet_container_mass_p' + pos);
      hp = (w-d)/(d-e)*100;
    }
    setField('container_humidity_p' + pos, hp ? hp.toFixed(1) : '')

    var dd = r * (1-hp/100)
    setField('dry_density_p' + pos, dd.toFixed(2))

    var de = 0;
    if(rp) {
      de = dd * (1-rp) + rp * rd
    }
    setField('density_p' + pos, de ? de.toFixed(2) : '')
  }
};

var calculateFields = function () {
  checkType(getField('type'));

  var t2 = getFloat('retained')
  if(t2){
    var t1 = getFloat('through')
    if(!t1){
      t1 = 0;
    }

    var rp = t2*100/(t2+t1);
    rp = r.toFixed(0)
    setField('retained_percentage', rp)
  } else {
    setField('retained_percentage', 0)
  }

  // copy values to next point
  copyValues('mold_code_p', 1, 5)
  copyValues('volume_p', 1, 5)
  copyValues('water_p', 1, 5)
  copyValues('empty_mold_mass_p', 1, 5)

  // perform calculates
  calculateColumns();
};

Template.compactionNew.onRendered(function () {
  checkType(getField('type'));
});

Template.compactionNew.helpers({
})

Template.compactionNew.events({
  'change [name="type"]': function (event) {
    checkType($(event.currentTarget).val())
  },
  'change [name="real_density"], change [name="through"], change [name="retained"]': function (event) {
    calculateFields()
  },
  'change [name="mold_code_p1"], change [name="mold_code_p2"], change [name="mold_code_p3"], change [name="mold_code_p4"], change [name="mold_code_p5"]': function (event) {
    calculateFields()
  },
  'change [name="volume_p1"], change [name="volume_p2"], change [name="volume_p3"], change [name="volume_p4"], change [name="volume_p5"]': function (event) {
    calculateFields()
  },
  'change [name="water_p1"], change [name="water_p2"], change [name="water_p3"], change [name="water_p4"], change [name="water_p5"]': function (event) {
    calculateFields()
  },
  'change [name="empty_mold_mass_p1"], change [name="empty_mold_mass_p2"], change [name="empty_mold_mass_p3"], change [name="empty_mold_mass_p4"], change [name="empty_mold_mass_p5"]': function (event) {
    calculateFields()
  },
  'change [name="mold_mass_p1"], change [name="mold_mass_p2"], change [name="mold_mass_p3"], change [name="mold_mass_p4"], change [name="mold_mass_p5"]': function (event) {
    calculateFields()
  },
  'change [name="container_code_p1"], change [name="container_code_p2"], change [name="container_code_p3"], change [name="container_code_p4"], change [name="container_code_p5"]': function (event) {
    calculateFields()
  },
  'change [name="empty_container_mass_p1"], change [name="empty_container_mass_p2"], change [name="empty_container_mass_p3"], change [name="empty_container_mass_p4"], change [name="empty_container_mass_p5"], ': function (event) {
    calculateFields()
  },
  'change [name="wet_container_mass_p1"], change [name="wet_container_mass_p2"], change [name="wet_container_mass_p3"], change [name="wet_container_mass_p4"], change [name="wet_container_mass_p5"]': function (event) {
    calculateFields()
  },
  'change [name="dry_container_mass_p1"], change [name="dry_container_mass_p2"], change [name="dry_container_mass_p3"], change [name="dry_container_mass_p4"], change [name="dry_container_mass_p5"]': function (event) {
    calculateFields()
  }
})
