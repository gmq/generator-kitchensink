# generator-kitchensink

[Yeoman](http://yeoman.io/) generator for scaffolding a web project with everything but the kitchen sink. All optional.

It's based on [generator-webapp](https://github.com/yeoman/generator-webapp) and [generator-bones](https://github.com/matt-bailey/generator-bones) (mostly the later) with added features: [Assemble](http://assemble.io/), [grunt-webfont](https://github.com/sapegin/grunt-webfont/), [autoprefixer](https://github.com/postcss/autoprefixer), [normalize.css](https://github.com/appleboy/normalize.scss), [Susy](http://susy.oddbird.net/), [Breakpoint](http://breakpoint-sass.com/), [Scut](https://github.com/davidtheclark/scut).

## Getting started

- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-kitchensink`
- Run: `yo kitchensink`
- Run: `grunt serve`

## Ruby Caveats
- Susy requires installing the [Susy gem](http://susydocs.oddbird.net/en/latest/install/).
- Breakpoints require installing the [Breakpoints gem](https://github.com/at-import/breakpoint/wiki/Installation). 

The best solution for this problem is to use [Bundler](http://bundler.io) and the generated Gemfile.

- `bundle install` to install all the gem requirements.
- `bundle exec grunt serve` && `bundle exec grunt build` to run the associated grunt tasks.



## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
