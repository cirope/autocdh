Router.route('/graphics/fresh_concrete/consistency',             { name: 'graphicFreshConcreteConsistency' })
Router.route('/graphics/fresh_concrete/temperature',             { name: 'graphicFreshConcreteTemperature' })
Router.route('/graphics/fresh_concrete/temperature_comparison',  { name: 'graphicFreshConcreteTemperatureComparison' })
Router.route('/graphics/fresh_concrete/volumetric_weight',       { name: 'graphicFreshConcreteVolumetricWeight' })
Router.route('/graphics/fresh_concrete/settlement',              { name: 'graphicFreshConcreteSettlement' })
Router.route('/graphics/fresh_concrete/air',                     { name: 'graphicFreshConcreteAir' })

Router.route('/graphics/hardened_concrete/resistance',           { name: 'graphicHardenedConcreteResistance' })
Router.route('/graphics/hardened_concrete/cusum',                { name: 'graphicHardenedConcreteCusum' })
Router.route('/graphics/hardened_concrete/7_days_resistance',    { name: 'graphicHardenedConcrete7DaysResistance' })
Router.route('/graphics/hardened_concrete/3_days_resistance',    { name: 'graphicHardenedConcrete3DaysResistance' })
Router.route('/graphics/hardened_concrete/resistances_category', { name: 'graphicHardenedConcreteResistanceByCategory' })
Router.route('/graphics/hardened_concrete/resistance_evolution', { name: 'graphicHardenedConcreteResistanceEvolution' })

Router.route('/graphics/deviations/efficiency',                  { name: 'graphicConcreteEfficiency' })

Router.route('/graphics/aggregates/fineness',                    { name: 'graphicAggregateFineness' })
Router.route('/graphics/aggregates/thin',                        { name: 'graphicAggregateThin' })
Router.route('/graphics/aggregates/humidity',                    { name: 'graphicAggregateHumidity' })
