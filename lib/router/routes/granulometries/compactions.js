Router.route('/compactions/p/:limit?', { name: 'compactions' })
Router.route('/compactions/new',       { name: 'compactionNew' })
Router.route('/compactions/:_id',      { name: 'compactionAssay' })
Router.route('/compactions/:_id/edit', { name: 'compactionEdit' })
