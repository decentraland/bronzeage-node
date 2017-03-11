# seed node
./bin/decentraland-node --fast --port=2001 --prefix="~/.d1" --httpport=8001 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9301


# peer 2
./bin/decentraland-node --fast --port=2002 --seed=localhost:2001 --prefix="~/.d2" --httpport=8002 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9302

# peer 3
./bin/decentraland-node --fast --port=2003 --seed=localhost:2001 --prefix="`/.d3" --httpport=8003 --n=testnet --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA --contentPort=9303

