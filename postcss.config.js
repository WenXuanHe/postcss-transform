module.exports = {
    plugins: [
        require('postcss-import'),
        require('precss'),
        require('postcss-cssnext'),
        require('postcss-nested'),
        require('postcss-mixins'),
        require('postcss-modules')({
            getJSON: function(cssFileName, json) {
                var path = require('path');
                var fs = require('fs');
                var cssName = path.basename(cssFileName, '.css');
                var jsonFileName = path.resolve('./dist/translate/' + cssName + '.json');
                fs.writeFileSync(jsonFileName, JSON.stringify(json));
            }
        }),
        require('postcss-utilities'),
        require('cssgrace'),


    ]
}
