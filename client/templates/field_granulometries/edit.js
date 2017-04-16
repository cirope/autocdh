

var getField = function (name) {
	return $('[name="' + name + '"]').val()
};

var getFloat = function (name) {
	return parseFloat(getField(name) || 0)
};

var setField = function (name, value) {
	$('[name="'+name+'"]').val(value)
};

var calculateFields = function () {
	var hp = 0;
	var he = getFloat('humidity_empty_mass');
	var hw = getFloat('humidity_wet');
	var hd = getFloat('humidity_dry');
	if(hw > hd && hd > he){
		hp = (hw-hd)/(hd-he)*100
	}
	setField('humidity_percentage', hp ? hp.toFixed(1) : '')

	var tp = 0;
	var te = getFloat('thin_empty_mass');
	var tb = getFloat('thin_before');
	var ta = getFloat('thin_after');
	if(tb > ta && tb > te){
		tp = (tb-ta)/(tb-te)*100
	}
	setField('thin_percentage', tp ? tp.toFixed(1) : '')

	/*
	var he = getFloat('sieve_weight_76');
	var hw = getFloat('retained_sieve_76');
	var hd = getFloat('retained_partial_76');
	*/
};

Template.fieldGranulometryEdit.onRendered(function () {
});

Template.fieldGranulometryEdit.helpers({
})

Template.fieldGranulometryEdit.events({

	'change [name="humidity_empty_mass"], change [name="humidity_wet"], change [name="humidity_dry"]': function (event) {
		calculateFields()
	},
	'change [name="thin_empty_mass"], change [name="thin_before"], change [name="thin_after"]': function (event) {
		calculateFields()
	},
})
