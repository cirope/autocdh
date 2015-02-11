Router.route('/aggregates/new',       { name: 'formulaAggregateNew', template: 'aggregateNew' })
Router.route('/aggregates/:_id',      { name: 'aggregate' })
Router.route('/aggregates/:_id/edit', { name: 'aggregateEdit', controller: 'AggregateController' })

Router.route('/samples/:sample_id/aggregates/new', { name: 'aggregateNew' })
