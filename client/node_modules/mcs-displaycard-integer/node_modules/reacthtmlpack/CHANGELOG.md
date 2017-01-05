<a name="1.2.0"></a>
# [1.2.0](https://github.com/tomchentw/reacthtmlpack/compare/v1.1.0...v1.2.0) (2015-10-12)


### Bug Fixes

* **cli:** entryListFileStream should be share-replayed stream ([b368a53](https://github.com/tomchentw/reacthtmlpack/commit/b368a53))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/tomchentw/reacthtmlpack/compare/v1.0.0...v1.1.0) (2015-10-11)


### Bug Fixes

* **cli:** cold -> hot Observable for publishedWebpackConfigArrayStream ([20ce5f3](https://github.com/tomchentw/reacthtmlpack/commit/20ce5f3)), closes [#17](https://github.com/tomchentw/reacthtmlpack/issues/17)
* **cli:** throw error when it comes ([080fefe](https://github.com/tomchentw/reacthtmlpack/commit/080fefe))
* **webpack:** using id to identify an unique entry ([f74a746](https://github.com/tomchentw/reacthtmlpack/commit/f74a746))

### Features

* **entry:** add invariant in render functions ([519c23d](https://github.com/tomchentw/reacthtmlpack/commit/519c23d))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/tomchentw/reacthtmlpack/compare/v0.4.0...v1.0.0) (2015-10-08)


### Features

* **ReactRenderToStringEntry:** switch to react-dom/server ([5f764c0](https://github.com/tomchentw/reacthtmlpack/commit/5f764c0))
* **core:** switch to ReactDOM ([bfcd554](https://github.com/tomchentw/reacthtmlpack/commit/bfcd554))
* **package.json:** put react/webpack/webpack-dev-server to peerDep ([b1b7880](https://github.com/tomchentw/reacthtmlpack/commit/b1b7880))


### BREAKING CHANGES

* __React@^0.14__: upgrade React and put them to peerDep
	* If you want to use React@0.13, please use [v0.4.0](https://github.com/tomchentw/reacthtmlpack/releases/tag/v0.4.0)
	* Please install react/webpack/webpack-dev-server as peerDependencies when you're using npm@^3



<a name="0.4.0"></a>
# [0.4.0](https://github.com/tomchentw/reacthtmlpack/compare/v0.3.3...v0.4.0) (2015-10-08)


### Bug Fixes

* **core:** correct Rx.js style of using streams ([6bff5a1](https://github.com/tomchentw/reacthtmlpack/commit/6bff5a1)), closes [#17](https://github.com/tomchentw/reacthtmlpack/issues/17)
* **core:** remove transducers-js ([4d3ca5f](https://github.com/tomchentw/reacthtmlpack/commit/4d3ca5f))


### BREAKING CHANGES

* __chunkFilepath__: now uses relatvie path to the current `.html.js` file

  - Affected Components:
    * WebpackScriptEntry
    * WebpackStyleEntry
    * WebpackNullEntry
    * ReactRenderToStringEntry

  - Before:
    ```
    // index.html.js
    <ReactRenderToStringEntry
      id="react-container"
      tagName="div"
      chunkName="server"
      chunkFilepath="./scripts/ReactRoot.js" // Base path is process.cwd(), the folder you invoked `reacthtmlpack` CLI
      configFilepath="../Server.webpackConfig.js"
    />
    ```

  - After:
    ```
    // index.html.js
    <ReactRenderToStringEntry
      id="react-container"
      tagName="div"
      chunkName="server"
      chunkFilepath="../scripts/ReactRoot.js" // Base path is NOW index.html.js
      configFilepath="../Server.webpackConfig.js"
    />
    ```



<a name"0.3.3"></a>
### 0.3.3 (2015-09-04)


#### Features

* **cli:** add mkdirp before writing files ([3d11faca](https://github.com/tomchentw/reacthtmlpack/commit/3d11faca), closes [#9](https://github.com/tomchentw/reacthtmlpack/issues/9))


<a name"0.3.2"></a>
### 0.3.2 (2015-09-04)


#### Bug Fixes

* **WebpackNullEntry:** return <noscript> ([dcefbe3d](https://github.com/tomchentw/reacthtmlpack/commit/dcefbe3d))


<a name"0.3.1"></a>
### 0.3.1 (2015-09-01)


#### Features

* **WebpackNullEntry:** add null entry for parse cloud code? ([6a950235](https://github.com/tomchentw/reacthtmlpack/commit/6a950235))


<a name"0.3.0"></a>
## 0.3.0 (2015-09-01)


#### Features

* **core:** compile webpackConfig using babel ([1a1865f4](https://github.com/tomchentw/reacthtmlpack/commit/1a1865f4), closes [#6](https://github.com/tomchentw/reacthtmlpack/issues/6))


<a name"0.2.3"></a>
### 0.2.3 (2015-08-31)


#### Features

* **core:** change from Error to warning ([70203b09](https://github.com/tomchentw/reacthtmlpack/commit/70203b09))


<a name"0.2.2"></a>
### 0.2.2 (2015-08-31)


#### Features

* **core:** support reacthtmlpackExtraEntry in your webpackConfig ([c434aebe](https://github.com/tomchentw/reacthtmlpack/commit/c434aebe), closes [#2](https://github.com/tomchentw/reacthtmlpack/issues/2))


<a name"0.2.1"></a>
### 0.2.1 (2015-08-30)


#### Bug Fixes

* **.travis.yml:** coverage location ([a8e39e74](https://github.com/tomchentw/reacthtmlpack/commit/a8e39e74))
* **package.json:** include bin/ in files ([780c1949](https://github.com/tomchentw/reacthtmlpack/commit/780c1949))


<a name"0.2.0"></a>
## 0.2.0 (2015-08-26)


#### Bug Fixes

* **cli:**
  * watch fixes ([b0ea98c2](https://github.com/tomchentw/reacthtmlpack/commit/b0ea98c2))
  * devServer ([f4ab237b](https://github.com/tomchentw/reacthtmlpack/commit/f4ab237b))
* **core:**
  * for devServer ([a2fc730f](https://github.com/tomchentw/reacthtmlpack/commit/a2fc730f))
  * add default doctypeHTML for HTML5 ([4a746ff2](https://github.com/tomchentw/reacthtmlpack/commit/4a746ff2))
* **package.json:** remove stage from args ([591f3f2b](https://github.com/tomchentw/reacthtmlpack/commit/591f3f2b))
* **runFiles:** should use combineLatest ([9ef74549](https://github.com/tomchentw/reacthtmlpack/commit/9ef74549))
* **src:** make devServer work with multiple config ([d15be0fb](https://github.com/tomchentw/reacthtmlpack/commit/d15be0fb))


#### Features

* **ReactRenderToStringEntry:** add server render feature ([3eadb3bd](https://github.com/tomchentw/reacthtmlpack/commit/3eadb3bd), closes [#4](https://github.com/tomchentw/reacthtmlpack/issues/4))
* **WebpackStyleEntry:** add for style tag ([65b8eb1f](https://github.com/tomchentw/reacthtmlpack/commit/65b8eb1f))
* **bin:**
  * add devServer command ([97196c1e](https://github.com/tomchentw/reacthtmlpack/commit/97196c1e))
  * add watchAndBuildToDir command ([fae2bb1a](https://github.com/tomchentw/reacthtmlpack/commit/fae2bb1a))
* **cli:**
  * add watchAndBuildToDir func ([4d7cb7d4](https://github.com/tomchentw/reacthtmlpack/commit/4d7cb7d4))
  * add cli using commander ([596b4291](https://github.com/tomchentw/reacthtmlpack/commit/596b4291))
* **entryPropTypeKeyList:** check propTypes would be sufficient ([9d573227](https://github.com/tomchentw/reacthtmlpack/commit/9d573227))
* **package.json:** add bin and dependencies ([2e98d20f](https://github.com/tomchentw/reacthtmlpack/commit/2e98d20f))
* **src:** add test for examples ([d112caaf](https://github.com/tomchentw/reacthtmlpack/commit/d112caaf))


<a name"0.1.0"></a>
## 0.1.0 (2015-08-26)

