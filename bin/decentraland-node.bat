@ECHO OFF
SETLOCAL EnableDelayedExpansion

REM Variables
SET daemon=0
SET cmd=node

REM Get fully qualified path
SET dir=%~dp0

REM Relay cli
IF "%1%"=="cli" (
  ECHO Please use `node bin/cli` to call the CLI.
  EXIT /B 0
)

REM Relay wallet
IF "%1%"=="wallet" (
  node "%dir%\cli" %*
  IF ERRORLEVEL 1 (
    EXIT /B 1
  ) ELSE (
    EXIT /B 0
  )
)

REM Relay rpc
IF "%1%"=="rpc" (
  node "%dir%\cli" %*
  IF ERRORLEVEL 1 (
    EXIT /B 1
  ) ELSE (
    EXIT /B 0
  )
)

REM Process options
FOR %%a in (%*) do (
  IF "%%a"=="--daemon" (
    SET daemon=1
  ) ELSE IF "%%a"=="--spv" (
    SET cmd=spvnode
  )
)

REM Execute
IF %daemon%==1 (
  ECHO Running as a daemon is not supported on Windows.
  EXIT /B 1
) ELSE (
  node "%dir%\%cmd%" %*
  IF ERRORLEVEL 1 (
    EXIT /B 1
  ) ELSE (
    EXIT /B 0
  )
)