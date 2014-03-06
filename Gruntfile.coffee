module.exports = (grunt) ->
    @loadNpmTasks('grunt-bump')
    @loadNpmTasks('grunt-contrib-clean')
    @loadNpmTasks('grunt-contrib-concat')
    @loadNpmTasks('grunt-contrib-jshint')
    @loadNpmTasks('grunt-contrib-uglify')
    @loadNpmTasks('grunt-contrib-watch')
    @loadNpmTasks('grunt-karma')
    @loadNpmTasks('grunt-ngmin')

    @initConfig
        config:
            name: 'angular-debounce'
            e2ePort: 9000

        jshint:
            lib:
                options:
                    jshintrc: '.jshintrc'
                files:
                    src: ['src/**.js']
            test:
                options:
                    jshintrc: '.jshintrc-test'
                files:
                    src: ['test/*{,/*}.js']

        concat:
            dist:
                files:
                    'dist/<%= config.name %>.js': ['src/*.js']

        uglify:
            dist:
                files:
                    'dist/<%= config.name %>.min.js': 'dist/<%= config.name %>.js'

        clean:
            all: ['dist']

        watch:
            all:
                files: ['src/**.js', 'test/*{,/*}']
                tasks: ['build', 'karma:unit:run']

        ngmin:
            dist:
                files:
                    'dist/<%= config.name %>.js': 'dist/<%= config.name %>.js'

        bump:
            options:
                files: ['package.json', 'bower.json']
                commitFiles: ['-a']
                pushTo: 'origin'

        karma:
            unit:
                configFile: 'test/configs/unit.conf.js'
                browsers: ['Chrome']
                background: true

            unitci_firefox:
                configFile: 'test/configs/unit.conf.js'
                browsers: ['Firefox', 'PhantomJS']
                singleRun: true

    @registerTask 'default', ['test']
    @registerTask 'build', ['clean', 'jshint', 'concat', 'ngmin', 'uglify']
    @registerTask 'test', ['build', 'karma:unit', 'watch:all']
    @registerTask 'ci', ['build', 'karma:unitci_firefox']
