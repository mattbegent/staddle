#Boilerplate v1.8.6

A brilliant front-end HTML5 and LESS boilerplate for small and large scale websites.

##Features

* Flexibility - all of the base modules are independent, so you can turn off modules that you don't use.
* Responsive grid.
* Supports ie7 + (ie7 support will be dropped when clients stop demanding it).
* Easy user configuration.
* CSS3 mixins.
* Css debugging.
* Uses [RequireJS](http://requirejs.org/).
* Follows a [SMACSS](http://smacss.com/) style.
* Uses [Grunt](http://gruntjs.com/) to compile LESS, JSHint JavaScript and optimise RequireJS.

#Documentation

##Getting Started

1. Get the latest version of Boilerplate either by cloning it `git clone git@github.com:mattbegent/boilerplate.git`, downloading a zip of the [latest release](https://github.com/mattbegent/boilerplate/archive/master.zip) or if you use [bower](https://github.com/twitter/bower) `bower install boilerplate`.
2. Set your site variables in less/variables.less.
3. Add your custom modules to the less/modules folder and import them in main.less.
4. Tell your LESS compiler to compile less/main.less to css/main.css. Or if you use [Grunt](http://gruntjs.com/) install the Grunt dependencies `npm install` then use `grunt watch` and your LESS files will be compiled on save.
5. Use index.html as a template for your html, using the examples in examples.html.
6. Build a cool site:-)!

##Customising

Although Boilerplate does come with some in built modules and styles, it is all about customisation.

All of the main setup (e.g. base font size) and module variables are set in less/variables.less.

	// TYPOGRAPHY
	// ----------------------------------------------------

	@TYPE-FontSize: 				16;
	@TYPE-LineHeight: 				24;

Any custom modules (for example a special box) should be placed in the modules folder (less/modules) and imported in main.less (less/main.less) in the modules section. 

	// MODULES
	// ----------------------------------------------------

	@import "modules/special-box.less";

As all of the built in modules are independent (less/base_modules) you can safely uncomment them in the boilerplate import (less/base/boilerplate.less) if you don't use them or you want to write your own module.

##Debugging

Boilerplate has css debugging built in to outline any problems with images, links, empty elements and deprecated elements.

To enable debugging simply set the variable @DEBUG to true in less/variables.less.

	// DEBUG
	// ----------------------------------------------------

	@DEBUG:							true;

##Grid

Boilerplate has a very standard grid system. For example if you wanted content to span three quarters of the page, you would write:

	<div class="grid">
		<div class="col-3-4">
			<!-- CONTENT HERE -->
		</div>
	</div>

##Mixins

Boilerplate has a lot of handy less mixins to help speed up development. 

Base Mixins:

	.font-size (@FONT-SIZE-IN-PIXELS) // Sets font size in rems with px fallback for older browsers

	.margin (@MARGIN-IN-PIXELS); // Sets margin in rems with px fallback for older browsers

	.padding (@PADDING-IN-PIXELS); // Sets padding in rems with px fallback for older browsers

	.percentage (@FIRST-NUMBER, @SECOND-NUMBER); // Sets width as a percentage

	.size (@WIDTH, @HEIGHT); // Sets width and height

Css3 Mixins:

This includes animations, border radius, transitions and many more. See less/base/css3.less for full list.

##Updating JavaScript Libraries

If you use [bower](https://github.com/twitter/bower) you can easily update all the JavaScript libraries used by Boilerplate by using `bower update`.