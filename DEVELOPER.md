## Plantify Developer Notes

Intro



#### File Structure

```
Plantify
	> /.svelte-kit
	> /node_modules
	> /src
	> /static
	.env
	.gitignore
	.npmrc
	DEVELOPER.md
	LICENSE
	package.json
	package-lock.json
	postcss.config.js
	README.md
	svelte.config.js
	tailwind.config.js
	tsconfig.js
	vite.config.js
```

##### `/Plantify/ * files` Description

###### `.env`

> This file contains all the credentials like database passwords, authentication tokens etc. These variables should never be imported into client side. 

###### `.gitignore`

> Contents in this file is ignored by the git.

###### `.npmrc`

> A configuration file used by the npm (Node Package Manager) command-line tool and the npm registry. It allows you to customize and configure various aspects of how npm works.

###### `LICENSE`

> The license of using this application as it is open source

###### `package.json`

> This file contains the packages that is necessary to properly run this application

###### `package-lock`

> This file ensures all the developer has the same package versions. This is auto generated

###### `postcss.config.js`

> This file contains postcss configuration. We are currently not using postcss so this file is not necessary

###### `README.md`

> Brief demo of this application

###### `svelte.config.js`

