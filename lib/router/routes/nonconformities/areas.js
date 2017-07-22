Router.route('/areas/new',       { name: 'areaNew' })
Router.route('/areas/:_id',      { name: 'area', controller: 'AreaController' })
Router.route('/areas/:_id/edit', { name: 'areaEdit', controller: 'AreaController' })
