# seed node
./bin/decentraland-node --fast --port=2301 --prefix="~/.d1" --httpport=8301 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9301


# peer 2
./bin/decentraland-node --fast --port=2302 --seed=localhost:2301 --prefix="~/.d2" --httpport=8302 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9302

# peer 3
./bin/decentraland-node --fast --port=2303 --seed=localhost:2301 --prefix="`/.d3" --httpport=8303 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9303

