# seed node
./bin/decentraland-node --fast --port=2001 --prefix="/home/maraoz/.d1" --httpport=8001 --n=regtest --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA


# peer 2
./bin/decentraland-node --fast --port=2002 --seed=localhost:2001 --prefix="/home/maraoz/.d2" --httpport=8002 --n=regtest --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA

# peer 3
./bin/decentraland-node --fast --port=2003 --seed=localhost:2001 --prefix="/home/maraoz/.d3" --httpport=8003 --n=regtest --apikey=38Dpwnjsj2zn3QETJ6GKv8YkHomA

