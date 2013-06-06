![Staddle Logo](http://mattbegent.co.uk/images/staddle-logo.png)

# Staddle v3.0.0

Staddle is a brilliant front-end HTML5 and LESS framework for building small and large scale websites.

It ships with basic styles and mixins to help get your project started quickly, [Grunt](http://gruntjs.com/) tasks for optimisations and [Assemble](https://github.com/assemble/assemble) for generating static websites.

## Features

* **Responsive grid** - including breakpoints for tablet and mobile.
* **Flexibility** - all of the base LESS and JavaScript modules are independent, so you can turn off modules that you don't use.
* **LESS** - including base styles, CSS3 mixins and debugging.
* **HTML Templates** - example templates are included to help get you started quickly.
* **Static Site Generator** - a static minified version of your site which you can be hosted anywhere.
* **Grunt** - used to do all of the legwork, including compiling LESS, JSHint, minifying RequireJS, optimising images, LiveReload and starting a development server.
* **IE7+ support** - IE7 support will be dropped when clients stop demanding it.

## Quick Start

Get the latest version of Staddle:

	git clone git@github.com:mattbegent/staddle.git

or

	bower install staddle

Install node packages:

	cd brilliantwebsitedirectory
	npm install	

Run Grunt tasks:
	
	grunt

View your website by going to [http://localhost:8080/](http://localhost:8080/)	

## More Detailed Start

1. Get the latest version of Staddle either by cloning it `git clone git@github.com:mattbegent/staddle.git`, downloading a zip of the [latest release](https://github.com/mattbegent/staddle/archive/master.zip) or if you use [bower](https://github.com/twitter/bower) `bower install staddle`.
2. Set your site variables in assets/less/variables.less.
3. Add your custom modules to the assets/less/modules folder and import them in main.less.
4. Tell your LESS compiler to compile assets/less/main.less to css/main.css. Or if you use [Grunt](http://gruntjs.com/) (which you definitely should do) install the Grunt dependencies `npm install` then use `grunt watch` and your LESS files will be compiled on save.
5. Use index.html as a template for your html. If you use Grunt you can generate a static site using Assemble - see the content folder. The handlebars files in this folder are compiled along with any assets to _site.
6. Build a cool site:-)! 

## Folder Structure

The basic structure and main files are outlined below: 

	_site                   - Compiled static version of the website ready to go live
	assets                  - The assets
	|- img                  - The images
	|- js                   - JavaScript files
		|- libs 			- All JavaScript libs are kept in here
		|- modules 			- Amd modules here
		|- main.js          - Load your modules in here
	|- less     			- The LESS
		|- base             - Staddle base - try not to touch this!
		|- base_modules     - Default modules - these can be turned off in variables.less
		|- modules          - Add new less modules in here
		|- main.less        - Load your modules in here
		|- variables.less   - All LESS module variables are set in here
	content                 - Layouts for static website generation
		|- includes         - Partials for static website generation
		|- layouts          - Layouts for static website generation
		|- pages            - Pages for static website generation
			|- examples     - Example modules and pages

# LESS

## Customising

Although Staddle does come with some in built modules and styles, it is all about customisation.

All of the main setup (e.g. base font size) and module variables are set in assets/less/variables.less.

	// TYPOGRAPHY
	// ----------------------------------------------------

	@TYPE-FontSize: 				16;
	@TYPE-LineHeight: 				24;

Any custom modules (for example a special box) should be placed in the modules folder (assets/less/modules) and imported in main.less (assets/less/main.less). 

	// MODULES
	// ----------------------------------------------------

	@import "modules/special-box.less";

As all of the built in modules are independent (assets/less/base_modules) you can safely turn them off in assets/less/variables.less.
	
	// BASE MODULES
	// Change to false if not using
	// =========================================================================//

	@MODULE-Alert:                  true;
	@MODULE-Box:                    true;
	@MODULE-Breadcrumbs:            true;
	@MODULE-Button:                 true;
	@MODULE-Form:                   true;
	@MODULE-Image:                  false;
	@MODULE-Map:                    true;
	@MODULE-Media:                  true;
	@MODULE-Navigation:             true;
	@MODULE-Pagination:             false;
	@MODULE-Print:                  true;
	@MODULE-Typography:             true;
	@MODULE-Well:                   true;

## Debugging

Staddle has CSS debugging built in to outline any problems with images, links, empty elements and deprecated elements.

To enable debugging simply set the variable @DEBUG to true in less/variables.less.

	// DEBUG
	// ----------------------------------------------------

	@DEBUG:							true;

## Grid

Staddle has a standard grid system. For example if you wanted content to span three quarters of the page, you would write:

	<div class="grid">
		<div class="col-3-4">
			<!-- CONTENT HERE -->
		</div>
	</div>

If you wanted to change the column widths for tablet, you might write:

	<div class="grid">
        <div class="col-1-4 col-tablet-1-2"><p>1/4</p></div>
        <div class="col-1-4 col-tablet-1-2 col-tablet-last"><p>1/4</p></div>
        <div class="col-1-4 col-tablet-1-2"><p>1/4</p></div>
        <div class="col-1-4 col-tablet-1-2 col-tablet-last"><p>1/4</p></div>
    </div>	

See _site/examples/grid.html for more examples.    

## Mixins

Staddle has a lot of handy less mixins to help speed up development. 

### Base Mixins:

	.font-size (@FONT-SIZE-IN-PIXELS) // Sets font size in rems with px fallback for older browsers

	.margin (@MARGIN-IN-PIXELS); // Sets margin in rems with px fallback for older browsers

	.padding (@PADDING-IN-PIXELS); // Sets padding in rems with px fallback for older browsers

	.percentage (@FIRST-NUMBER, @SECOND-NUMBER); // Sets width as a percentage

	.size (@WIDTH, @HEIGHT); // Sets width and height

### Css3 Mixins:

This includes animations, border radius, transitions and many more. See assets/less/base/css3.less for full list.

# More

## Updating JavaScript Libraries

If you use [bower](https://github.com/twitter/bower) you can easily update all the JavaScript libraries used by Staddle by using `bower update`.

## Requirements

LESS 1.3.3 and Grunt 0.4.1 or above.

## Staddle Definition

stad•dle (ˈstæd l) 

1. the lower part of a stack of hay or the like.
2. a platform or supporting frame for a stack.
3. any supporting framework or base.

## Logo

Thanks to [@dave_ja](https://twitter.com/dave_ja) for creating Staddle's brilliant logo.