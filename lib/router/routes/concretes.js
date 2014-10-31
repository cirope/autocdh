Router.route('/samples/:sample_id/concretes/new', { name: 'concreteNew' })
Router.route('/concretes/:_id',                   { name: 'concrete' })
Router.route('/concretes/:_id/edit',              { name: 'concreteEdit', controller: 'ConcreteController' })
