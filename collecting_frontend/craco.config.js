const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FFBB82',
                            '@link-color': '#FFBB82',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
