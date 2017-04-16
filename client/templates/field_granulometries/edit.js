

var getField = function (name) {
	return $('[name="' + name + '"]').val()
};

var setField = function (name, value) {
	$('[name="'+name+'"]').val(value)
};

var calculateFields = function () {
};

Template.fieldGranulometryEdit.onRendered(function () {
});

Template.fieldGranulometryEdit.helpers({
})

Template.fieldGranulometryEdit.events({

	/*'change [name="liquid_empty_mass_p1"], change [name="liquid_empty_mass_p2"], change [name="liquid_empty_mass_p3"]': function (event) {
		calculateFields()
	},*/
})
