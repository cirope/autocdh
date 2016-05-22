Router.route('/provided_cracks',           { name: 'providedCracks' })
Router.route('/provided_cracks/new',       { name: 'providedCrackNew' })
Router.route('/provided_cracks/:_id',      { name: 'providedCrack' })
Router.route('/provided_cracks/:_id/edit', { name: 'providedCrackEdit', controller: 'ProvidedCrackController' })
