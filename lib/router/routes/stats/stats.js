Router.route('/stats',                          { name: 'stats' })
Router.route('/stats/deviation',                { name: 'statsDeviation' })
Router.route('/stats/samples',                  { name: 'statsForSamples' })

Router.route('/stats/indicators/configuration', { name: 'statsIndicatorsConfiguration' })
Router.route('/stats/indicators/dashboard',     { name: 'statsIndicatorsDashboard' })

Router.route('/stats/production_indicators/configuration', { name: 'statsProductionIndicatorsConfiguration' })
Router.route('/stats/production_indicators/dashboard',     { name: 'statsProductionIndicatorsDashboard' })
