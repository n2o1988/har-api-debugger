# electron-boilerplate
An electron boilerplate project using PouchDB as storage engine and Material Design for the UI.

It comes in two flavors:

![](https://github.com/appelgriebsch/electron-boilerplate/blob/master/angularJS.png)
AngularJS using the Angular-Material library

![](https://github.com/appelgriebsch/electron-boilerplate/blob/master/reactJS.png)
ReactJS using the Material-UI library

## Getting started
* install latest node.js from [here](http://www.nodejs.org)
* clone git repository, choose the branch of interest (angularjs/reactjs) (```git clone -b <branch> https://github.com/appelgriebsch/electron-boilerplate.git```)
* open terminal and run ```npm install``` to install dependencies
* start application in debug by executing ```npm start``` in terminal

## Screenshot

![screenshot](https://github.com/appelgriebsch/electron-boilerplate/blob/master/screenshot.png)

## Build Distributable Packages

**PLEASE NOTE: you will need a virtual machine with the actual operating system and development tools installed to build the native packages for it**

* on OS X (10.9+): creates application bundle and distributable disk image (x64 only)

  ```bash
  grunt osx
  ```
* on Windows (7+): creates application .exe and distributable setup.exe (x86 and x64)

  ```bash
  grunt win
  ```
* on Linux (Ubuntu/Fedora): creates application and distributable packages for deb-style and rpm-style distributions (x64 only)

  ```bash
  grunt linux
  ```
