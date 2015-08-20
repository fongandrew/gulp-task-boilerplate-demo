Gulp Tasks Boilerplate Demo
===========================
I've recently started working on a group of projects with similar, but independent, build pipelines, and found myself re-writing the same Gulpfile code multiple times. This repo demonstrates how I refactored that code into a re-usable NPM module with factory functions to programatically create Gulp tasks.

There are two NPM packages in this repo. The first is represented by the [package.json](package.json) at the root of this repo. This package is the one that contains our actual deliverable, project. In this demo, it's just a handful of LESS files that need to be compiled. The second NPM package is represented by the [package.json](boilerplate/package.json) in the [boilerplate directory](boilerplate). This contains our refactored Gulp tasks.

There are a handful of interesting things going on here.

First, by placing the refactored code in its own NPM package, we can have the refactored code package manage its own dependencies. Compare the [package.json in our main project](package.json) with the [package.json in the boilerplate package](boilerplate/package.json). The former is a lot cleaner.

Second, because the refactored build code is in its own NPM package, we use `npm link` to symlink the refactored build code package into the node_modules directory for the main project. This allows us to tweak our Gulp code without having to constantly reinstall the package. There's a [link.sh](boilerplate/link.sh) helper to do this for each project we want to link the refactored build code to, and we can call this helper from our main project with a [postinstall hook](package.json#L6).

Note that the refactored build package doesn't have to live in the same directory as the main project. We're just writing it this for the purposes of this demo. You'll have to download/clone the refactored build package in addition to your main project (NPM can't fetch it for you automatically if it's just linked) and set up the symlink properly for each project that uses it. Or you could just periodically publish the refactored build package on the NPM directory or as a tarball and install it like any other NPM package.

Third, and most importantly, we take the Gulp module imported in our main project's Gulpfile and [pass it the refactored boilerplate package](gulpfile.js#L4). The refactored build package should use the Gulp that's passed to it, rather than requiring and using its own copy of Gulp. If the refactored build package requires its own copy of Gulp rather than the one passed to it, then calling `gulp [task]` from the main project won't work (because the tasks would be listed to the boilerplate package, rather than the main project).

Finally, note that we're using Gulp 4.0 in this demo (which, as of the date of this README, hasn't officially been released yet) because it's much more awesome than Gulp 3.x. You can use Gulp v4 pretty easily by [telling NPM to grab it directly from Git](package.json#L16).
