var _realDensity = new ReactiveVar(false)

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

var checkSieve = function (sieve) {
  _realDensity.set(sieve == '4');
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

var setField = function (name, value) {
  $('[name="'+name+'"]').val(value)
};

var calculateFieldDensity = function (pos) {
  var r = 0;

  var v = getField('volume_p'+pos);
  if(0 < v && getField('mold_mass_p'+pos) && getField('empty_mold_mass_p'+pos)){
    r = (getField('mold_mass_p'+pos) - getField('empty_mold_mass_p'+pos)) / v;
    r = r.toFixed(0)
  }
  setField('field_density_p'+pos, r)
};

var calculateFields = function () {
  checkType(getField('type'));
  checkSieve(getField('sieve'));

  var t2 = +getField('retained')
  if(t2){
    var t1 = +getField('through')
    if(!t1){
      t1 = 0;
    }

    var r = t2*100/(t2+t1);
    r = r.toFixed(0)
    setField('retained_percentage', r)
  } else {
    getField('retained_percentage', 0)
  }

  // copy values to next point
  copyValues('mold_code_p', 1, 5)
  copyValues('volume_p', 1, 5)
  copyValues('water_p', 1, 5)
  copyValues('empty_mold_mass_p', 1, 5)

  // calculate masses
  calculateFieldDensity(1);
  calculateFieldDensity(2);
  calculateFieldDensity(3);
  calculateFieldDensity(4);
  calculateFieldDensity(5);

};

Template.compactionEdit.helpers({
  showRealDensity: function () {
    return _realDensity.get()
  }
})

Template.compactionEdit.events({
  'change [name="type"]': function (event) {
    checkType($(event.currentTarget).val())
  },
  'change [name="sieve"]': function (event) {
    checkSieve($(event.currentTarget).val())
  },
  'change [name="through"], change [name="retained"]': function (event) {
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
  }/*,
  'change [name=""], ': function (event) {
    calculateFields()
  },
  'change [name=""], ': function (event) {
    calculateFields()
  },
  'change [name=""], ': function (event) {
    calculateFields()
  },
  'change [name=""], ': function (event) {
    calculateFields()
  },
  'change [name=""], ': function (event) {
    calculateFields()
  }*/
})