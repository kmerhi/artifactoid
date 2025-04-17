# Artifactoid

[![NPM Version](http://img.shields.io/npm/v/artifactoid.svg)](https://www.npmjs.org/package/artifactoid)
[![Build Status](https://travis-ci.org/kmerhi/artifactoid.svg?branch=master)](https://travis-ci.org/kmerhi/artifactoid)
[![Coverage Status](https://coveralls.io/repos/github/kmerhi/artifactoid/badge.svg?branch=master)](https://coveralls.io/github/kmerhi/artifactoid?branch=master)
[![Unicorn Approved](https://img.shields.io/badge/unicorn-approved-ff69b4.svg)](https://www.youtube.com/watch?v=9auOCbH5Ns4)

A command line experimental tool to retrieve the latest SNAPSHOT URI of an artifact given its Artifactory path.


## Install

```console
npm install -g artifactoid
```

## Usage 

```console
Usage: artifactoid <command> [options]

Commands:
  get <uri>  Get latest download URI for given path       [default] [aliases: g]
  docs       Go to the documentation at github.com/kmerhi/artifactoid

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
  -u, --user  User to connect to Artifactory repo                       [string]
  -p, --pass  Password (or API key) for basic auth                      [string]
  -s, --snip  Return relative path                                     [boolean]

For more information, go to https://github.com/kmerhi/artifactoid
```

## Examples
Assuming you have an artifact called `productX` in artifactory where you are tracking snapshots of the artifact.  Let's say you don't know the latest version and snapshot information - you can use artifactoid to get it the path for you.

Let's say the path to the artifact is `http://host:port/artifactory/builds-snapshot/com/company/productX`

```sh
$ artifactoid -u some_user:some_password http://host:port/artifactory/builds-snapshot/com/shinydocs/productX

# returns the full path
> http://host:port/artifactory/builds-snapshot-local/com/company/productX/1.2.13-SNAPSHOT/productX-1.2.13-20170504.204849-14.war

# returns the snipped if the -s flag is passed
> builds-snapshot-local/com/company/productX/1.2.13-SNAPSHOT/productX-1.2.13-20170504.204849-14.war
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
