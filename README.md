[![Decentraland][logo]](https://decentraland.org/)

## About

Decentraland is an open-source initiative to build a shared virtual reality
world. In Decentraland, the content of each piece of land is determined by its
owner. You can become a land owner either by having someone transfer you some
of their parcels, or by mining new land. A new parcel of land is mined every 10
minutes.

[Explore Decentraland](https://decentraland.org/app/)

## Components

* **Node**: An open and trustless land ownership record and scene content distribution network.
* **Editor**: An easy to use 3D scene editor, that lets you publish scenes directly to any of your parcels.
* **Browser**: A browser for navigating the virtual world of Decentraland.

# Node

A Bitcoin-like blockchain is used to maintain a universal record of land
ownership, and a consensus of the virtual world description.

In the Decentraland blockchain, transactions can transfer the ownership of a
given land parcel, as well as announce the hash of the scene content of the
parcel. At any given time, the UTXO set has the description of the entire
virtual world. The actual content of land parcels is distributed in a P2P
manner, via the torrent network.

New blocks are mined with the same proof of work as Bitcoin, but instead of
having a coinbase transaction creating fungible coins, there's a landbase
transaction creating a single non-fungible asset: a land parcel at a unique,
non-modifiable position.

## Design

The Decentraland node is a fork of [bcoin](https://github.com/bcoin-org/bcoin),
a Bitcoin full-node implementation in JavaScript. In what follows we describe
all the places where we depart from Bitcoin.

### Consensus rules

Instead of having the coin value, Decentraland transaction outputs have the
parcel x and y coordinates, and the info hash of the torrent with the 3D
scene content for the parcel.

All transactions (except for landbase transactions) have exactly one output for
each input. Each output MUST have the same x and y coordinates as the spent
output of its corresponding input. Outputs MAY change the info hash field.

The single output of a landbase transaction MUST claim a non-allocated land
parcel, adjacent (with 4-connectivity) to a previously mined parcel.

### RPC API

There's two new JSON RPC endpoints that facilitate creation and querying of land
content:

* **gettile(x, y)**: fetches the torrent info hash of a tile's content.

* **settile(x, y, base64-content)**: publishes the content to the torrent
network using [WebTorrent](https://github.com/feross/webtorrent) and creates a
transaction updating the torrent info hash of one of your tiles.

### Land content server

After each valid new block in the main chain, the node downloads from the
torrent network the updated land content for each transaction in the block,
effectively maintaining a parcel to scene index.

By default, the node serves a static web server at port 9301 with the latest
scene content files for each mined parcel of land. The land content file for
the parcel at `(x, y)` is served at `GET /tile/x.y.lnd`

## Run a node

Make sure you have Docker
[installed](https://docs.docker.com/engine/installation/), and run:

```
docker-compose up
```

Mining will start by default. To disable this, edit the file `bin/start` and
remove the `--startminer` argument.

## How can I edit the land I own?

Once you mine some land, you can use Unity to edit its content. Check out the
[editor](https://github.com/decentraland/bronzeage-editor) for more
information.

## Community

Join us on [Slack](https://rauchg-slackin-ueglzmcnsv.now.sh/)!

We're on [Twitter](https://twitter.com/decentraland) too.

[logo]: https://raw.githubusercontent.com/decentraland/web/gh-pages/img/banner.png
