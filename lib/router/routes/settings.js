Router.route('/settings/new',       { name: 'settingNew' })
Router.route('/settings/:_id',      { name: 'setting' })
Router.route('/settings/:_id/edit', { name: 'settingEdit', controller: 'SettingController' })
