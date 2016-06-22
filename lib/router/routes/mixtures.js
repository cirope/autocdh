Router.route('/mixtures',           { name: 'mixtures' })
Router.route('/mixtures/new',       { name: 'mixtureNew' })
Router.route('/mixtures/:_id',      { name: 'mixture' })
Router.route('/mixtures/:_id/edit', { name: 'mixtureEdit', controller: 'MixtureController' })
