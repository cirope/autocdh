Router.route('/cracks/p/:limit?',       { name: 'cracks' })
Router.route('/cracks/cracked/:limit?', { name: 'cracksCracked' })
Router.route('/cracks/:_id',            { name: 'crack' })
Router.route('/cracks/:_id/edit',       { name: 'crackEdit' })
