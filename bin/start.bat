@ECHO OFF

node ./browser/server.js --apikey %RPC_API_KEY% --serverport %SERVER_PORT% --daemon &

./bin/decentraland-node \
  --fast \
  --loglevel=info \
  --port=2301 \
  --httpport=8301 \
  --contentport=9301 \
  --prefix="data" \
  --n=testnet \
  --apikey=%RPC_API_KEY% \
  --startminer=%START_MINER%
