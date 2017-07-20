Router.route('/samples/:sample_id/assays/new', { name: 'assayNew' })
Router.route('/assays/:_id',                   { name: 'assay' })
Router.route('/assays/:_id/edit',              { name: 'assayEdit', controller: 'AssayController' })
