Router.route('/plants',           { name: 'plants' })
Router.route('/plants/new',       { name: 'plantNew' })
Router.route('/plants/:_id',      { name: 'plant' })
Router.route('/plants/:_id/edit', { name: 'plantEdit', controller: 'PlantController' })

Router.route('/samples/new/plants/new', { name: 'samplePlantNew', template: 'plantNew' })
