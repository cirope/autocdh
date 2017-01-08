Router.route('/limits/p/:limit?', { name: 'limits' })
Router.route('/limits/new',       { name: 'limitNew' })
Router.route('/limits/:_id',      { name: 'limit' })
Router.route('/limits/:_id/edit', { name: 'limitEdit' })
