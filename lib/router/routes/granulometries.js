Router.route('/granulometries/p/:limit?', { name: 'granulometries' })
Router.route('/granulometries/new',       { name: 'granulometryNew' })
Router.route('/granulometries/:_id',      { name: 'granulometry' })
Router.route('/granulometries/:_id/edit', { name: 'granulometryEdit', controller: 'GranulometryController' })
