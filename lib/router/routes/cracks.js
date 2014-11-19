Router.route('/cracks',           { name: 'cracks' })
Router.route('/cracks/new',       { name: 'crackNew' })
Router.route('/cracks/:_id',      { name: 'crack' })
Router.route('/cracks/:_id/edit', { name: 'crackEdit', controller: 'CrackController' })
