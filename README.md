![](https://raw.githubusercontent.com/decentraland/web/gh-pages/img/banner.png)

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

Blockchain technology is used to claim and transfer land, keeping a permanent record of ownership.

## Stack
* [bcoin](https://github.com/bcoin-org/bcoin): a bitcoin's full-node implementation in JS.
* [Webtorrent](https://github.com/feross/webtorrent): torrent protocol client, used to distribute world’s land content.

## How Does It Work?
Decentraland runs on top of its own blockchain: a modified Bitcoin blockchain to represent a non fungible asset (land). Transactions in the Decentraland chain can transfer land ownership or change land content.

Ownership of a given land tile is handled exactly like Bitcoin: a tile is transferable by a given private key, and only the owner has access to it.

The land content can be any type of file and the blockchain will only store its hash. The actual file is distributed via the torrent network.

Finally, the network is secured by Bitcoin’s proof-of-work algorithm. Rewarding its miners not with coins, but with *land*.

Below is a summary of the main differences with Bitcoin’s blockchain:

### Transaction:
* Removed the outputs *value* field.
* Added the *x*, *y* and *content* fields to outputs.
* Each output must have the same *x* and *y* values as the corresponding input.
* A *landbase* transaction must claim land adjacent to a prevoiusly mined land tile.

### RPC:
* *gettile*: call to fetch the hash of a tile's content.
* *settile*: call to create a transaction that updates the content of a tile.

### Network:
* Time between blocks: 10 minutes (for testnet).
* Seed land’s file descriptors through torrent network.


## How to run a node?
```
docker run decentraland
```

## How can I edit the land I own?
Once you mine some land, you can use Unity to edit its content. Check out [this repo](https://github.com/decentraland/bronzeage-editor) for more information.


# Development

## Run node
```bash
docker-compose build
docker-compose up
```

## Set tile
```bash
docker-compose run app ./bin/cli --apikey="38Dpwnjsj2zn3QETJ6GKv8YkHomA" --url=app:8301 rpc settile 0 1 /data/hola.png
```
