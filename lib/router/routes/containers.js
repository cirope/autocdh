Router.route('/containers',           { name: 'containers' })
Router.route('/containers/new',       { name: 'containerNew' })
Router.route('/containers/:_id',      { name: 'container' })
Router.route('/containers/:_id/edit', { name: 'containerEdit', controller: 'ContainerController' })
