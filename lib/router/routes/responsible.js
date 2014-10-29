Router.route('/responsible',           { name: 'responsibleIndex' })
Router.route('/responsible/new',       { name: 'responsibleNew' })
Router.route('/responsible/:_id',      { name: 'responsible' })
Router.route('/responsible/:_id/edit', { name: 'responsibleEdit', controller: 'ResponsibleController' })
