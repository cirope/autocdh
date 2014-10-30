Router.route('/works',           { name: 'works' })
Router.route('/works/new',       { name: 'workNew' })
Router.route('/works/:_id',      { name: 'work' })
Router.route('/works/:_id/edit', { name: 'workEdit', controller: 'WorkController' })
