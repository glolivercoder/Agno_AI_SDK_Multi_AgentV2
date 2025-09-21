@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI - VERIFICAÇÃO DE SAÚDE DO SISTEMA
:: =====================================================

title Agno GUI - Health Check

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

set "LOG_FILE=logs\system_health.log"
set "START_TIME=%date% %time%"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║              AGNO GUI - HEALTH CHECK                     ║%RESET%
echo %CYAN%║                  %START_TIME%                  ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: Criar log entry
echo [%date% %time%] INFO: Iniciando verificação de saúde do sistema >> %LOG_FILE%

set "ALL_SERVICES_OK=1"

:: =====================================================
:: 1. VERIFICAÇÃO DO FRONTEND (Next.js)
:: =====================================================

echo %BLUE%[1/6] Verificando Frontend (Next.js)...%RESET%

curl -s --max-time 10 http://localhost:3000 >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Frontend (Next.js) - ONLINE
    echo [%date% %time%] INFO: Frontend Next.js - Status: ONLINE >> %LOG_FILE%
) else (
    echo %RED%✗%RESET% Frontend (Next.js) - OFFLINE
    echo [%date% %time%] ERROR: Frontend Next.js - Status: OFFLINE >> %LOG_FILE%
    set "ALL_SERVICES_OK=0"
)

:: =====================================================
:: 2. VERIFICAÇÃO DO BACKEND (FastAPI)
:: =====================================================

echo %BLUE%[2/6] Verificando Backend (FastAPI)...%RESET%

curl -s --max-time 10 http://localhost:8000/health >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Backend (FastAPI) - ONLINE
    echo [%date% %time%] INFO: Backend FastAPI - Status: ONLINE >> %LOG_FILE%
) else (
    echo %RED%✗%RESET% Backend (FastAPI) - OFFLINE
    echo [%date% %time%] ERROR: Backend FastAPI - Status: OFFLINE >> %LOG_FILE%
    set "ALL_SERVICES_OK=0"
)

:: =====================================================
:: 3. VERIFICAÇÃO DO BANCO DE DADOS (PostgreSQL)
:: =====================================================

echo %BLUE%[3/6] Verificando Banco de Dados (PostgreSQL)...%RESET%

:: Tenta conectar ao PostgreSQL
psql -h localhost -U agno_user -d agno_gui -c "SELECT 1;" >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% PostgreSQL - ONLINE
    echo [%date% %time%] INFO: PostgreSQL - Status: ONLINE >> %LOG_FILE%
) else (
    echo %YELLOW%⚠%RESET% PostgreSQL - OFFLINE (pode estar no Docker)
    echo [%date% %time%] WARNING: PostgreSQL - Status: OFFLINE >> %LOG_FILE%

    :: Verificar se está rodando no Docker
    docker ps | findstr postgres >nul 2>&1
    if %errorLevel% == 0 (
        echo %GREEN%✓%RESET% PostgreSQL - ONLINE (Docker)
        echo [%date% %time%] INFO: PostgreSQL Docker - Status: ONLINE >> %LOG_FILE%
    ) else (
        echo %RED%✗%RESET% PostgreSQL - OFFLINE
        set "ALL_SERVICES_OK=0"
    )
)

:: =====================================================
:: 4. VERIFICAÇÃO DO REDIS
:: =====================================================

echo %BLUE%[4/6] Verificando Redis...%RESET%

redis-cli ping >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Redis - ONLINE
    echo [%date% %time%] INFO: Redis - Status: ONLINE >> %LOG_FILE%
) else (
    echo %YELLOW%⚠%RESET% Redis - OFFLINE (pode estar no Docker)
    echo [%date% %time%] WARNING: Redis - Status: OFFLINE >> %LOG_FILE%

    :: Verificar se está rodando no Docker
    docker ps | findstr redis >nul 2>&1
    if %errorLevel% == 0 (
        echo %GREEN%✓%RESET% Redis - ONLINE (Docker)
        echo [%date% %time%] INFO: Redis Docker - Status: ONLINE >> %LOG_FILE%
    ) else (
        echo %RED%✗%RESET% Redis - OFFLINE
        set "ALL_SERVICES_OK=0"
    )
)

:: =====================================================
:: 5. VERIFICAÇÃO DO DOCKER
:: =====================================================

echo %BLUE%[5/6] Verificando Docker Services...%RESET%

docker ps >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Docker - ONLINE
    echo [%date% %time%] INFO: Docker - Status: ONLINE >> %LOG_FILE%

    :: Contar containers rodando
    for /f "tokens=*" %%i in ('docker ps --format "table {{.Names}}" ^| findstr /v "NAMES" ^| findstr /c:"agno-gui"') do (
        set /a DOCKER_COUNT+=1
    )

    if !DOCKER_COUNT! GTR 0 (
        echo %GREEN%✓%RESET% !DOCKER_COUNT! Agno containers rodando
    ) else (
        echo %YELLOW%⚠%RESET% Nenhum container Agno encontrado
    )
) else (
    echo %YELLOW%⚠%RESET% Docker - OFFLINE
    echo [%date% %time%] WARNING: Docker - Status: OFFLINE >> %LOG_FILE%
)

:: =====================================================
:: 6. VERIFICAÇÃO DE RECURSOS DO SISTEMA
:: =====================================================

echo %BLUE%[6/6] Verificando Recursos do Sistema...%RESET%

:: Verificar uso de memória
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo csv ^| findstr /c:"node.exe"') do (
    set NODE_PID=%%i
)

if defined NODE_PID (
    for /f "tokens=5" %%i in ('tasklist /fi "PID eq !NODE_PID!" /fo list ^| findstr /c:"Mem Usage"') do (
        set MEM_USAGE=%%i
        echo %GREEN%✓%RESET% Node.js Memory: !MEM_USAGE!
        echo [%date% %time%] INFO: Node.js Memory Usage: !MEM_USAGE! >> %LOG_FILE%
    )
) else (
    echo %YELLOW%⚠%RESET% Node.js não encontrado rodando
)

:: Verificar uso de disco
for /f "tokens=3" %%i in ('dir /-c logs 2^>nul ^| findstr "bytes"') do (
    set LOG_SIZE=%%i
    echo %GREEN%✓%RESET% Logs Size: !LOG_SIZE!
)

:: =====================================================
:: RESULTADO FINAL
:: =====================================================

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║                    RESULTADO FINAL                       ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

if %ALL_SERVICES_OK% == 1 (
    echo %GREEN%🎉 TODOS OS SERVIÇOS ESTÃO FUNCIONANDO CORRETAMENTE!%RESET%
    echo [%date% %time%] INFO: All services healthy - Status: OK >> %LOG_FILE%
) else (
    echo %RED%⚠️  ALGUNS SERVIÇOS ESTÃO COM PROBLEMAS%RESET%
    echo [%date% %time%] ERROR: Some services unhealthy - Status: DEGRADED >> %LOG_FILE%
)

echo.
echo %CYAN%📊 RESUMO DOS SERVIÇOS:%RESET%
echo %CYAN%   • Frontend: http://localhost:3000%RESET%
echo %CYAN%   • Backend: http://localhost:8000%RESET%
echo %CYAN%   • Database: localhost:5432%RESET%
echo %CYAN%   • Redis: localhost:6379%RESET%
echo.

echo %CYAN%📝 LOGS SALVOS EM: %LOG_FILE%%RESET%
echo.

if %ALL_SERVICES_OK% == 0 (
    echo %YELLOW%💡 SUGESTÕES:%RESET%
    echo %YELLOW%   • Execute INICIAR_AGNO_AGENTS.bat%RESET%
    echo %YELLOW%   • Verifique os logs individuais em logs\%RESET%
    echo %YELLOW%   • Verifique se o Docker está rodando%RESET%
    echo.
)

echo %CYAN%🔄 Para verificar novamente, execute este script novamente.%RESET%
echo.

echo Pressione qualquer tecla para sair...
pause >nul

goto :eof