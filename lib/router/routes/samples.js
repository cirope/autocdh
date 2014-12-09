Router.route('/samples/p/:limit?', { name: 'samples' })
Router.route('/samples/new',       { name: 'sampleNew' })
Router.route('/samples/:_id',      { name: 'sample' })
Router.route('/samples/:_id/edit', { name: 'sampleEdit', controller: 'SampleController' })
