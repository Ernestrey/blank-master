/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/define-lazy-prop/index.js":
/*!*************************************************!*\
  !*** ../node_modules/define-lazy-prop/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\nmodule.exports = (object, propertyName, fn) => {\n\tconst define = value => Object.defineProperty(object, propertyName, {value, enumerable: true, writable: true});\n\n\tObject.defineProperty(object, propertyName, {\n\t\tconfigurable: true,\n\t\tenumerable: true,\n\t\tget() {\n\t\t\tconst result = fn();\n\t\t\tdefine(result);\n\t\t\treturn result;\n\t\t},\n\t\tset(value) {\n\t\t\tdefine(value);\n\t\t}\n\t});\n\n\treturn object;\n};\n\n\n//# sourceURL=webpack:///../node_modules/define-lazy-prop/index.js?");

/***/ }),

/***/ "../node_modules/is-docker/index.js":
/*!******************************************!*\
  !*** ../node_modules/is-docker/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nlet isDocker;\n\nfunction hasDockerEnv() {\n\ttry {\n\t\tfs.statSync('/.dockerenv');\n\t\treturn true;\n\t} catch (_) {\n\t\treturn false;\n\t}\n}\n\nfunction hasDockerCGroup() {\n\ttry {\n\t\treturn fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');\n\t} catch (_) {\n\t\treturn false;\n\t}\n}\n\nmodule.exports = () => {\n\tif (isDocker === undefined) {\n\t\tisDocker = hasDockerEnv() || hasDockerCGroup();\n\t}\n\n\treturn isDocker;\n};\n\n\n//# sourceURL=webpack:///../node_modules/is-docker/index.js?");

/***/ }),

/***/ "../node_modules/is-wsl/index.js":
/*!***************************************!*\
  !*** ../node_modules/is-wsl/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst os = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'os'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst fs = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst isDocker = __webpack_require__(/*! is-docker */ \"../node_modules/is-docker/index.js\");\n\nconst isWsl = () => {\n\tif (process.platform !== 'linux') {\n\t\treturn false;\n\t}\n\n\tif (os.release().toLowerCase().includes('microsoft')) {\n\t\tif (isDocker()) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t}\n\n\ttry {\n\t\treturn fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft') ?\n\t\t\t!isDocker() : false;\n\t} catch (_) {\n\t\treturn false;\n\t}\n};\n\nif (process.env.__IS_WSL_TEST__) {\n\tmodule.exports = isWsl;\n} else {\n\tmodule.exports = isWsl();\n}\n\n\n//# sourceURL=webpack:///../node_modules/is-wsl/index.js?");

/***/ }),

/***/ "../node_modules/open/index.js":
/*!*************************************!*\
  !*** ../node_modules/open/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var __dirname = \"/\";\nconst path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'path'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst childProcess = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'child_process'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst {promises: fs, constants: fsConstants} = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst isWsl = __webpack_require__(/*! is-wsl */ \"../node_modules/is-wsl/index.js\");\nconst isDocker = __webpack_require__(/*! is-docker */ \"../node_modules/is-docker/index.js\");\nconst defineLazyProperty = __webpack_require__(/*! define-lazy-prop */ \"../node_modules/define-lazy-prop/index.js\");\n\n// Path to included `xdg-open`.\nconst localXdgOpenPath = path.join(__dirname, 'xdg-open');\n\nconst {platform, arch} = process;\n\n/**\nGet the mount point for fixed drives in WSL.\n\n@inner\n@returns {string} The mount point.\n*/\nconst getWslDrivesMountPoint = (() => {\n\t// Default value for \"root\" param\n\t// according to https://docs.microsoft.com/en-us/windows/wsl/wsl-config\n\tconst defaultMountPoint = '/mnt/';\n\n\tlet mountPoint;\n\n\treturn async function () {\n\t\tif (mountPoint) {\n\t\t\t// Return memoized mount point value\n\t\t\treturn mountPoint;\n\t\t}\n\n\t\tconst configFilePath = '/etc/wsl.conf';\n\n\t\tlet isConfigFileExists = false;\n\t\ttry {\n\t\t\tawait fs.access(configFilePath, fsConstants.F_OK);\n\t\t\tisConfigFileExists = true;\n\t\t} catch {}\n\n\t\tif (!isConfigFileExists) {\n\t\t\treturn defaultMountPoint;\n\t\t}\n\n\t\tconst configContent = await fs.readFile(configFilePath, {encoding: 'utf8'});\n\t\tconst configMountPoint = /(?<!#.*)root\\s*=\\s*(?<mountPoint>.*)/g.exec(configContent);\n\n\t\tif (!configMountPoint) {\n\t\t\treturn defaultMountPoint;\n\t\t}\n\n\t\tmountPoint = configMountPoint.groups.mountPoint.trim();\n\t\tmountPoint = mountPoint.endsWith('/') ? mountPoint : `${mountPoint}/`;\n\n\t\treturn mountPoint;\n\t};\n})();\n\nconst pTryEach = async (array, mapper) => {\n\tlet latestError;\n\n\tfor (const item of array) {\n\t\ttry {\n\t\t\treturn await mapper(item); // eslint-disable-line no-await-in-loop\n\t\t} catch (error) {\n\t\t\tlatestError = error;\n\t\t}\n\t}\n\n\tthrow latestError;\n};\n\nconst baseOpen = async options => {\n\toptions = {\n\t\twait: false,\n\t\tbackground: false,\n\t\tnewInstance: false,\n\t\tallowNonzeroExitCode: false,\n\t\t...options\n\t};\n\n\tif (Array.isArray(options.app)) {\n\t\treturn pTryEach(options.app, singleApp => baseOpen({\n\t\t\t...options,\n\t\t\tapp: singleApp\n\t\t}));\n\t}\n\n\tlet {name: app, arguments: appArguments = []} = options.app || {};\n\tappArguments = [...appArguments];\n\n\tif (Array.isArray(app)) {\n\t\treturn pTryEach(app, appName => baseOpen({\n\t\t\t...options,\n\t\t\tapp: {\n\t\t\t\tname: appName,\n\t\t\t\targuments: appArguments\n\t\t\t}\n\t\t}));\n\t}\n\n\tlet command;\n\tconst cliArguments = [];\n\tconst childProcessOptions = {};\n\n\tif (platform === 'darwin') {\n\t\tcommand = 'open';\n\n\t\tif (options.wait) {\n\t\t\tcliArguments.push('--wait-apps');\n\t\t}\n\n\t\tif (options.background) {\n\t\t\tcliArguments.push('--background');\n\t\t}\n\n\t\tif (options.newInstance) {\n\t\t\tcliArguments.push('--new');\n\t\t}\n\n\t\tif (app) {\n\t\t\tcliArguments.push('-a', app);\n\t\t}\n\t} else if (platform === 'win32' || (isWsl && !isDocker())) {\n\t\tconst mountPoint = await getWslDrivesMountPoint();\n\n\t\tcommand = isWsl ?\n\t\t\t`${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` :\n\t\t\t`${process.env.SYSTEMROOT}\\\\System32\\\\WindowsPowerShell\\\\v1.0\\\\powershell`;\n\n\t\tcliArguments.push(\n\t\t\t'-NoProfile',\n\t\t\t'-NonInteractive',\n\t\t\t'–ExecutionPolicy',\n\t\t\t'Bypass',\n\t\t\t'-EncodedCommand'\n\t\t);\n\n\t\tif (!isWsl) {\n\t\t\tchildProcessOptions.windowsVerbatimArguments = true;\n\t\t}\n\n\t\tconst encodedArguments = ['Start'];\n\n\t\tif (options.wait) {\n\t\t\tencodedArguments.push('-Wait');\n\t\t}\n\n\t\tif (app) {\n\t\t\t// Double quote with double quotes to ensure the inner quotes are passed through.\n\t\t\t// Inner quotes are delimited for PowerShell interpretation with backticks.\n\t\t\tencodedArguments.push(`\"\\`\"${app}\\`\"\"`, '-ArgumentList');\n\t\t\tif (options.target) {\n\t\t\t\tappArguments.unshift(options.target);\n\t\t\t}\n\t\t} else if (options.target) {\n\t\t\tencodedArguments.push(`\"${options.target}\"`);\n\t\t}\n\n\t\tif (appArguments.length > 0) {\n\t\t\tappArguments = appArguments.map(arg => `\"\\`\"${arg}\\`\"\"`);\n\t\t\tencodedArguments.push(appArguments.join(','));\n\t\t}\n\n\t\t// Using Base64-encoded command, accepted by PowerShell, to allow special characters.\n\t\toptions.target = Buffer.from(encodedArguments.join(' '), 'utf16le').toString('base64');\n\t} else {\n\t\tif (app) {\n\t\t\tcommand = app;\n\t\t} else {\n\t\t\t// When bundled by Webpack, there's no actual package file path and no local `xdg-open`.\n\t\t\tconst isBundled =  false || __dirname === '/';\n\n\t\t\t// Check if local `xdg-open` exists and is executable.\n\t\t\tlet exeLocalXdgOpen = false;\n\t\t\ttry {\n\t\t\t\tawait fs.access(localXdgOpenPath, fsConstants.X_OK);\n\t\t\t\texeLocalXdgOpen = true;\n\t\t\t} catch {}\n\n\t\t\tconst useSystemXdgOpen = process.versions.electron ||\n\t\t\t\tplatform === 'android' || isBundled || !exeLocalXdgOpen;\n\t\t\tcommand = useSystemXdgOpen ? 'xdg-open' : localXdgOpenPath;\n\t\t}\n\n\t\tif (appArguments.length > 0) {\n\t\t\tcliArguments.push(...appArguments);\n\t\t}\n\n\t\tif (!options.wait) {\n\t\t\t// `xdg-open` will block the process unless stdio is ignored\n\t\t\t// and it's detached from the parent even if it's unref'd.\n\t\t\tchildProcessOptions.stdio = 'ignore';\n\t\t\tchildProcessOptions.detached = true;\n\t\t}\n\t}\n\n\tif (options.target) {\n\t\tcliArguments.push(options.target);\n\t}\n\n\tif (platform === 'darwin' && appArguments.length > 0) {\n\t\tcliArguments.push('--args', ...appArguments);\n\t}\n\n\tconst subprocess = childProcess.spawn(command, cliArguments, childProcessOptions);\n\n\tif (options.wait) {\n\t\treturn new Promise((resolve, reject) => {\n\t\t\tsubprocess.once('error', reject);\n\n\t\t\tsubprocess.once('close', exitCode => {\n\t\t\t\tif (options.allowNonzeroExitCode && exitCode > 0) {\n\t\t\t\t\treject(new Error(`Exited with code ${exitCode}`));\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tresolve(subprocess);\n\t\t\t});\n\t\t});\n\t}\n\n\tsubprocess.unref();\n\n\treturn subprocess;\n};\n\nconst open = (target, options) => {\n\tif (typeof target !== 'string') {\n\t\tthrow new TypeError('Expected a `target`');\n\t}\n\n\treturn baseOpen({\n\t\t...options,\n\t\ttarget\n\t});\n};\n\nconst openApp = (name, options) => {\n\tif (typeof name !== 'string') {\n\t\tthrow new TypeError('Expected a `name`');\n\t}\n\n\tconst {arguments: appArguments = []} = options || {};\n\tif (appArguments !== undefined && appArguments !== null && !Array.isArray(appArguments)) {\n\t\tthrow new TypeError('Expected `appArguments` as Array type');\n\t}\n\n\treturn baseOpen({\n\t\t...options,\n\t\tapp: {\n\t\t\tname,\n\t\t\targuments: appArguments\n\t\t}\n\t});\n};\n\nfunction detectArchBinary(binary) {\n\tif (typeof binary === 'string' || Array.isArray(binary)) {\n\t\treturn binary;\n\t}\n\n\tconst {[arch]: archBinary} = binary;\n\n\tif (!archBinary) {\n\t\tthrow new Error(`${arch} is not supported`);\n\t}\n\n\treturn archBinary;\n}\n\nfunction detectPlatformBinary({[platform]: platformBinary}, {wsl}) {\n\tif (wsl && isWsl) {\n\t\treturn detectArchBinary(wsl);\n\t}\n\n\tif (!platformBinary) {\n\t\tthrow new Error(`${platform} is not supported`);\n\t}\n\n\treturn detectArchBinary(platformBinary);\n}\n\nconst apps = {};\n\ndefineLazyProperty(apps, 'chrome', () => detectPlatformBinary({\n\tdarwin: 'google chrome',\n\twin32: 'chrome',\n\tlinux: ['google-chrome', 'google-chrome-stable', 'chromium']\n}, {\n\twsl: {\n\t\tia32: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',\n\t\tx64: ['/mnt/c/Program Files/Google/Chrome/Application/chrome.exe', '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe']\n\t}\n}));\n\ndefineLazyProperty(apps, 'firefox', () => detectPlatformBinary({\n\tdarwin: 'firefox',\n\twin32: 'C:\\\\Program Files\\\\Mozilla Firefox\\\\firefox.exe',\n\tlinux: 'firefox'\n}, {\n\twsl: '/mnt/c/Program Files/Mozilla Firefox/firefox.exe'\n}));\n\ndefineLazyProperty(apps, 'edge', () => detectPlatformBinary({\n\tdarwin: 'microsoft edge',\n\twin32: 'msedge',\n\tlinux: ['microsoft-edge', 'microsoft-edge-dev']\n}, {\n\twsl: '/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'\n}));\n\nopen.apps = apps;\nopen.openApp = openApp;\n\nmodule.exports = open;\n\n\n//# sourceURL=webpack:///../node_modules/open/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("../node_modules/open/index.js");
/******/ 	
/******/ })()
;