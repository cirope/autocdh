
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

var calculateFields = function () {
  checkType($('[name="type"]').val());

  var t2 = +$('[name="retained"]').val()
  if(t2){
    var t1 = +$('[name="through"]').val()
    if(!t1){
      t1 = 0;
    }

    var r = t2*100/(t2+t1);
    r = r.toFixed(0)
    $('[name="retained_percentage"]').val(r)
  } else {
    $('[name="retained_percentage"]').val(0)
  }



};

Template.compactionEdit.events({
  'change [name="type"]': function (event) {
    checkType($(event.currentTarget).val())
  },
  'change [name="through"], change [name="retained"]': function (event) {
    calculateFields()
  }
})
