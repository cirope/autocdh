Router.route('/cracks',           { name: 'cracks' })
Router.route('/cracks/:_id',      { name: 'crack' })
Router.route('/cracks/:_id/edit', { name: 'crackEdit', controller: 'CrackController' })
