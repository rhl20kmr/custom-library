# AngularCustomLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


What a library should be to qualify to be an Angular library?
platform independent, first of all
bundled and distributed
AOT compilation ready
built in typescript
Now for a library to be standard and be easily consumed by everyone, there must be a standard or a recommended way to how you should distribute your package.

Angular package format is that recommended way to distribute our Angular packages. This focuses on the following:

Module definitions
Typing files
Entry point
AOT ready metadata file
Read the APF here.

Creating a library
the important steps involved in creating a library majorly are inlining all the templates, compiling it with ngc, and producing its build formats. However, this is a lot of manual tasks and ng-packagr has got us covered to do just that.

I have written about using ng-packagr to create libraries here.

ng-packagr created by David Herges, allows libraries to be build and packaged using a single command. However, after Angular 6, this is integrated within the CLI and we can use ng generate command to create an angular library with ng-packagr working under the hood.

What all does ng-packagr take care of for us?

creates libraries in the angular package format
creates all the bundles (es52015, esm5, umd)
creates type definitions (.d.ts)
create aot metadata files
inlines all the styles and templates!
Let us create a workspace for our library!

ng new <application-name> --create-application=false


This would create a workspace for you with no src folder as you haven’y created the application and just a workspace and under which we can create our library using the command:

ng generate library <library-name>

This creates a projects folder with your lib folder inside it. Here you can start writing the feature you want for your library!


done creating your library?

Time to build our library!
Add a build library script in your root package.json as:

"build-library": "ng build my-first-library”


Running this would create a dist folder for your library.


Here is when your project becomes a bit difficult to understand. why? because if you notice now your whole project contains 3 package.json files in all. The root package.json where you wrote your build library script, the library package.json which provides the information for your library such as name, version. This is used when publishing your library to npm. I will talk about it when packaging the library.
the third package.json is in the distribution folder of the library that you just created which is the final code to be exported.

Packaging the library
To pack our library, we go to the library distribution directory and run the npm pack command.

Avoid the confusion here of packing the library directory. We need to pack the built distribution folder of the library. We can add a script also in place of doing this manually.

"pack-lib": "cd dist/my-first-library && npm pack"

This would create a .tgz package for the library which is to be exported into other applications we will be using.


With our package ready, we can use it inside another application to consume it and test.

Create a new angular application and install your library inside this using:

npm install <path-to-tgz-file>

Check your package.json to see if it has installed and is reflecting isnide the dependencies.

You will notice it being added as a file just like this:


Next step, import the module of your library, and use the component.

import { NishuLibraryModule} from 'my-first-library';

This should give our project the access to the components declared inside thsi module. We can now use the component directly on the template and see how it works!


On the template,

<section class="body-section">
    <lib-my-first-library></lib-my-first-library>
</section>
And there you go!


Finally, let us publish our library
To publish your library, follow the naming conventions for an npm package and to keep it unique since there are so many libraries on npm, an easy way is to name your library as @<your-username>/<library-name .

Next step, specify the name and version of the library inside the package.json

{
  "name": "my-first-library",
  "version": "1.0.0",
  "peerDependencies": {
        "@angular/common": "~9.0.0",
        "@angular/core": "~9.0.0",
  }
}
peerDependencies basically are a way to tell the consuming project that the library is well compatible with this version of the package. Use semantic versioning to version your library following the major, minor, patch version specifics. Read about SemVer here.

There is a lot more information that you can add to your package.json about the library like author, license etc.

Build your library and find the updated package.json in the dist folder. Pack the new bundle as we did before using the pack-lib script.

All set? Let us login to npm.We can do this both from the command line or the GUI.

npmjs.com

Log in to npm using npm login and verify using npm whoami

Publish your library using the npm publish command with the path to your tgz bundle.

npm publish dist/my-first-library/my-first-library-0.0.1.tgz --access public

Head over to npmjs.com and you can have a look at your published library.


Well, now anybody can use this publicly available library in their Angular projects using:

npm i my-first-library

Thank you for reading!
Please reach out to me on Twitter/LinkedIn for feedback/queries.
