# Decentraland - How to mine

Welcome! My Name is [KurzGedanke](https://kurzgedanke.de) and today I'm gonna to show you how to set up your first node and miner for the Decentraland project!

But at first:

### What is Decentraland? 

Decentraland is a blockchain based virtual reality, which means the land you own, you really own. No third party, no server shut down, no government. If you never heard of it, I would suggest you to visit [decentraland.org](https://decentraland.org).

### Lets start:

The first thing we need is NodeJS.
Visit [nodejs.org](https://nodejs.org), click on `Other Download`, scroll down to `Previous Releases` and search for `Node.js v7.0.0`. Go to the download page and search for the [`node-v7.0.0.pkg` (Direct Download Link)](https://nodejs.org/download/release/v7.0.0/node-v7.0.0.pkg). Download it and install it.

Visiting now the Decentraland Github Account under [github.com/decentraland](https://github.com/decentreland) and navigate to the [bronzeage-node repository](https://github.com/decentraland/bronzeage-node). 

Now press `Command + Space`, type in `Terminal` and open up your Terminal. 

Copy the github repository url from the bronzeage-node and type in your terminal:

```bash
git clone https://github.com/decentraland/bronzeage-node.git
```

Now we use the `cd` (Change Directory) to get into the copied `bronzeage-node` folder.

```bash
cd bronzage-node
```

With the `ls` (List Directory) command we can get list of the content of the folder.

```bash
ls
```

Your terminal should show something like this:

```
Dockerfile         browser            index.js          start.sh
LICENSE            data               jsdoc.json         test
Makefile           db                 lib                vendor
README.md          docker-compose.yml migrate
bench              download.js        package.json
bin                etc                scripts
```

The next step is to open up the folder in your `Finder`. For this we use the open command. Type in your terminal:

```bash
open .
```

The dot is important! 

Open up the `lib` folder, than the `blockchain` folder and with a text editor of your choice the `contentdb.js`

You should find at the beginning of the file something like this:

```javascript
/*!
 * chaindb.js - content data management for decentraland
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * Copyright (c) 2016-2017, Esteban Ordano (MIT License).
 * Copyright (c) 2016-2017, Yemel Jardi (MIT License).
 * Copyright (c) 2016-2017, The Decentraland Development Team (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var WebTorrent = require('webtorrent-hybrid');
var EventEmitter = require('events').EventEmitter;
var pass = require('stream').PassThrough;
var fs = require('fs');
var createTorrent = require('create-torrent');
var parseTorrent = require('parse-torrent');

var constants = require('../protocol/constants');
var util = require('../utils/util');
var co = require('../utils/co');
```

Remove from the

```javascript
var WebTorrent = require('webtorrent-hybrid');
```

Line the `-hybrid` like this:

```javascript
var WebTorrent = require('webtorrent');
```

Save and close the file. 

Now we need to set an `ApiKey`. This step is very important, otherwise you will mine for nothing. 

Use your Finder and navigate to the `bin` folder and open up the `start` file with an text editor of your choice. You might have to do a `right-click` and say `Open with...` and then `Other...`. There you can choose for example `TextEdit`. 

You should see something like this:

```bash
./bin/decentraland-node \
  --fast \
  --loglevel=info \
  --port=2301 \
  --httpport=8301 \
  --contentport=9301 \
  --prefix="data" \
  --n=testnet \
  --apikey=$RPC_API_KEY \
  --startminer=$START_MINER
```

at the end of the file. There you have to replace the:

```bash
--apikey=$RPC_API_KEY
```

With your own `ApiKey` like this:

```bash
--apikey="yourSuperSaveApiKey"
```

The `""` are very important! 

Now we have to install all the dependencies packages, but this is easy as one command. Go back to your terminal and type in:

```bash
npm install  
```

And wait till it is finished and looks something like this:

```bash
│   │   ├── sax@1.2.4
│   │   └── xmlbuilder@4.2.1
│   ├── clivas@0.2.0
│   ├─┬ dlnacasts@0.1.0
│   │ ├─┬ simple-get@2.6.0
│   │ │ └── unzip-response@2.0.1
│   │ ├── thunky@0.1.0
│   │ └─┬ upnp-mediarenderer-client@1.2.4
│   │   ├─┬ elementtree@0.1.7
│   │   │ └── sax@1.1.4
│   │   └── upnp-device-client@1.0.2
│   ├─┬ ecstatic@2.2.1
│   │ ├── he@1.1.1
│   │ └── url-join@2.0.2
│   ├─┬ executable@4.1.0
│   │ └── pify@2.3.0
│   ├── moment@2.18.1
│   ├── network-address@1.1.2
│   ├── nodebmc@0.0.7
│   ├── prettier-bytes@1.0.4
│   ├── vlc-command@1.1.1
│   └── winreg@1.2.4
└── whatwg-fetch@2.0.3

➜  bronzeage-node git:(master)
```

The last command you have to is:

```bash
./bin/start
```

And your node and miner is up and running! 

If you want to end your node and miner just hit `ctrl + c` on your keyboard while your Terminal is selected. 

If you want to restart your miner, just open up a `Terminal again`, type `cd bronzeage-node` and use the `./bin/start` command. 

### How much do I have mined?

Lets find out!

Start up your node and miner. Open another terminal beside it and `cd` into the `bronzeage-node` folder.

Use the 

```bash
./bin/cli --apikey=$RPC_API_KEY rpc dumpblockchain true | node scripts/list.js
```

Command but replace the `--apikey=` with your own one, but without the `""` 

```bash
./bin/cli --apikey=yourSuperSaveApiKey rpc dumpblockchain true | node scripts/list.js
```

If this command throws a low of errors try this one:

First command: (Wait till its finished)

```bash
./bin/cli --apikey=yourSuperSaveApiKey rpc dumpblockchain true > tiles.json
```

Second command: 

```bash
cat tiles.json | node scripts/list.js
```


### Transfer Tiles

If you want to transfer a tile, you first need to get your account address, or the address of the receiver.

This can be achieved through:

```bash
./bin/cli --apikey=$RPC_API_KEY rpc getaccountaddress 0
```

Again, replace the `--apikey=` with your own `ApiKey`.

To send tiles use the `transfertile` command:

```bash
./bin/cli --apikey=$RPC_API_KEY rpc transfertile 0 -1 TeaZxyQATonFFFLCXZMydUfGGUWwBsg9Je
```

Replace the `--apikey=` with your own `ApiKey` and enter the coordinates from the to transfer tile. Here for example it is `0 -1`. Then paste the address of the receiving person behind the coordinates. 
