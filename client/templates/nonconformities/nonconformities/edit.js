Template.nonconformityEdit.helpers({
	isNotStarted: function () {
		return !!this.status && (this.status !== 'started' || this.status !== 'finished')
	}
})