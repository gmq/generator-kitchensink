'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var GruntfileEditor = require('gruntfile-editor');


var KitchenSinkGenerator = module.exports = function KitchenSinkGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  // setup the test-framework property, Gruntfile template will need this
  //this.testFramework = 'mocha';
  // resolved to mocha by default
  //this.hookFor('mocha', { as: 'app' });

  // this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KitchenSinkGenerator, yeoman.generators.Base);

KitchenSinkGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('Yeoman generator for scaffolding a web project with everything but the kitchen sink. All optional.');

  var prompts = [{
    name: 'projectName',
    message: 'Give your project a name:'
  },
  {
    type: 'checkbox',
    name: 'features',
    message: 'What features would you like?',
    choices: [{
      name: 'Autoprefixer',
      value: 'includeAutoprefixer',
      checked: true
    },{
      name: 'grunt-webfonts',
      value: 'includeWebfonts',
      checked: true
    },{
      name: 'Normalize.css',
      value: 'includeNormalize',
      checked: true
    },{
      name: 'Scut',
      value: 'includeScut',
      checked: true
    },{
      name: 'Susy',
      value: 'includeSusy',
      checked: true
    },{
      name: 'Breakpoint',
      value: 'includeBreakpoint',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var features = props.features;

    function hasFeature(feat) {
      return features && features.indexOf(feat) !== -1;
    }
    this.projectName = props.projectName;
    this.includeAutoprefixer = hasFeature('includeAutoprefixer');
    this.includeGrunticon = hasFeature('includeGrunticon');
    this.includeScut = hasFeature('includeScut');
    this.includeSusy = hasFeature('includeSusy');
    this.includeBreakpoint = hasFeature('includeBreakpoint');
    this.includeNormalize = hasFeature('includeNormalize');
    this.includeWebfonts = hasFeature('includeWebfonts');
    cb();
  }.bind(this));
};


KitchenSinkGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

KitchenSinkGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

KitchenSinkGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

KitchenSinkGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

KitchenSinkGenerator.prototype.generateGruntfile = function generateGruntfile() {
  this.template('_Gruntfile.js', 'Gruntfile.js');
};

KitchenSinkGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

// KitchenSinkGenerator.prototype.writeIndex = function writeIndex() {};

KitchenSinkGenerator.prototype.scaffolding = function scaffolding() {
  this.mkdir('src');
  this.mkdir('src/images');
  if(this.includeWebfonts) {
    this.mkdir('src/css/images/ico-src');
  }
  this.mkdir('src/js');
  this.mkdir('src/css');
  this.mkdir('src/css/modules');
  this.mkdir('src/css/partials');
  this.mkdir('src/templates');
  this.mkdir('src/templates/layouts');
  this.mkdir('src/templates/pages');
  this.mkdir('src/templates/partials');

  this.template('_gemfile', 'gemfile');
  this.copy('_!-edit-template-files-not-html', 'src/_!-edit-template-files-not-html');

  this.copy('default.hbs', 'src/templates/layouts/default.hbs');
  this.copy('header.hbs', 'src/templates/partials/header.hbs');
  this.copy('index.hbs', 'src/templates/pages/index.hbs');
  this.copy('patterns.hbs', 'src/templates/pages/patterns.hbs');

  this.template('_styles.scss', 'src/css/styles.scss');
  this.template('_init.scss', 'src/css/modules/_init.scss');

  this.copy('main.js', 'src/js/main.js');
  this.copy('plugins.js', 'src/js/plugins.js');
  this.copy('favicon.ico', 'src/favicon.ico');

  // this.write('src/index.html', this.indexFile);
};
