Router.route('/materials',           { name: 'materials' })
Router.route('/materials/new',       { name: 'materialNew' })
Router.route('/materials/:_id',      { name: 'material' })
Router.route('/materials/:_id/edit', { name: 'materialEdit', controller: 'MaterialController' })
