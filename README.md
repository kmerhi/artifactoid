# Artifactoid

<!--[![NPM Version](http://img.shields.io/npm/v/artifactoid.svg)](https://www.npmjs.org/package/artifactoid)-->
[![Build Status](https://travis-ci.org/kmerhi/artifactoid.svg?branch=master)](https://travis-ci.org/kmerhi/artifactoid)
[![Coverage Status](https://coveralls.io/repos/github/kmerhi/artifactoid/badge.svg?branch=master)](https://coveralls.io/github/kmerhi/artifactoid?branch=master)

A command line experimental tool to retrieve the latest SNAPSHOT URI of an artifact given its Artifactory path.


## Install

```sh
npm install -g artifactoid
```

## Usage 

```sh
Usage: artifactoid [options] <uri>

Options:
  -h, --help                 output usage information
  -V, --version              output the version number
  -u, --username <username>  The user to authenticate as
  -p, --password <password>  The user's password
```

## MIT License

Copyright (c) 2017 Khalid Merhi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
