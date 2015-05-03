Router.route('/organizations',           { name: 'organizations' })
Router.route('/organizations/new',       { name: 'organizationNew' })
Router.route('/organizations/:_id',      { name: 'organization' })
Router.route('/organizations/:_id/edit', { name: 'organizationEdit', controller: 'OrganizationController' })
