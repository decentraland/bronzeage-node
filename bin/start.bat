@ECHO OFF

setlocal
for %%P in (%PATHEXT%) do (
    if exist "%%~$PATH:node.exe" (
      start "server" %%~$PATH:node.exe ./browser/server.js --apikey %RPC_API_KEY% --serverport %SERVER_PORT% --daemon
      GOTO next
    )
  )
)

:next

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
