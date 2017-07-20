Router.route('/additives/new',       { name: 'parameterAdditiveNew', template: 'additiveNew' })
Router.route('/additives/:_id',      { name: 'additive' })
Router.route('/additives/:_id/edit', { name: 'additiveEdit', controller: 'AdditiveController' })

Router.route('/samples/:sample_id/additives/new', { name: 'additiveNew' })
