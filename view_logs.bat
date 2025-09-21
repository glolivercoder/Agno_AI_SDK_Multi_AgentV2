@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI - VISUALIZADOR DE LOGS EM TEMPO REAL
:: =====================================================

title Agno GUI - Log Viewer

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║              AGNO GUI - LOG VIEWER                       ║%RESET%
echo %CYAN%║                Visualização em Tempo Real                ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: Verificar se o diretório de logs existe
if not exist "logs" (
    echo %RED%✗%RESET% Diretório logs não encontrado!
    echo %YELLOW%   Execute INICIAR_AGNO_AGENTS.bat primeiro%RESET%
    echo.
    pause
    exit /b 1
)

:: Menu de seleção
echo %CYAN%📋 LOGS DISPONÍVEIS:%RESET%
echo.
echo %CYAN%1%RESET% - Frontend (Next.js)
echo %CYAN%2%RESET% - Backend (FastAPI)
echo %CYAN%3%RESET% - Docker Startup
echo %CYAN%4%RESET% - Database (PostgreSQL)
echo %CYAN%5%RESET% - System Health
echo %CYAN%6%RESET% - Errors (Consolidado)
echo %CYAN%7%RESET% - Startup Verification
echo %CYAN%8%RESET% - Performance
echo %CYAN%9%RESET% - Todos os logs (Multi-tail)
echo.
echo %CYAN%0%RESET% - Sair
echo.

set /p "choice=Selecione o log para visualizar (0-9): "

if "%choice%"=="0" goto :eof
if "%choice%"=="1" goto :frontend
if "%choice%"=="2" goto :backend
if "%choice%"=="3" goto :docker
if "%choice%"=="4" goto :database
if "%choice%"=="5" goto :health
if "%choice%"=="6" goto :errors
if "%choice%"=="7" goto :startup
if "%choice%"=="8" goto :performance
if "%choice%"=="9" goto :all
goto :menu

:frontend
set LOG_FILE=logs\frontend.log
set LOG_NAME=Frontend (Next.js)
goto :view

:backend
set LOG_FILE=logs\backend.log
set LOG_NAME=Backend (FastAPI)
goto :view

:docker
set LOG_FILE=logs\docker_startup.log
set LOG_NAME=Docker Startup
goto :view

:database
set LOG_FILE=logs\database.log
set LOG_NAME=Database (PostgreSQL)
goto :view

:health
set LOG_FILE=logs\system_health.log
set LOG_NAME=System Health
goto :view

:errors
set LOG_FILE=logs\error.log
set LOG_NAME=Errors (Consolidado)
goto :view

:startup
set LOG_FILE=logs\startup_verification.log
set LOG_NAME=Startup Verification
goto :view

:performance
set LOG_FILE=logs\performance.log
set LOG_NAME=Performance
goto :view

:all
echo.
echo %CYAN%📊 VISUALIZANDO TODOS OS LOGS EM TEMPO REAL%RESET%
echo %YELLOW%   Pressione Ctrl+C para parar%RESET%
echo.

:: Tenta usar PowerShell para multi-tail se disponível
powershell -Command "Get-Content logs\*.log -Wait -Tail 10" 2>nul
if %errorLevel% == 0 (
    goto :eof
) else (
    echo %YELLOW%⚠%RESET% PowerShell não disponível. Mostrando logs individuais...
    echo.
    echo Frontend:
    type logs\frontend.log 2>nul | findstr /r /c:"INFO\|WARNING\|ERROR" | tail -10
    echo.
    echo Backend:
    type logs\backend.log 2>nul | findstr /r /c:"INFO\|WARNING\|ERROR" | tail -10
    echo.
    echo System Health:
    type logs\system_health.log 2>nul | findstr /r /c:"INFO\|WARNING\|ERROR" | tail -10
    echo.
    pause
    goto :eof
)

:view
echo.
echo %CYAN%📊 VISUALIZANDO: %LOG_NAME%%RESET%
echo %YELLOW%   Pressione Ctrl+C para parar%RESET%
echo %YELLOW%   Arquivo: %LOG_FILE%%RESET%
echo.

:: Verificar se o arquivo existe
if not exist "%LOG_FILE%" (
    echo %RED%✗%RESET% Arquivo %LOG_FILE% não encontrado!
    echo %YELLOW%   Pode ainda não ter sido criado. Execute a aplicação primeiro.%RESET%
    echo.
    pause
    goto :menu
)

:: Tenta usar PowerShell para tail se disponível
powershell -Command "Get-Content '%LOG_FILE%' -Wait -Tail 10" 2>nul
if %errorLevel% == 0 (
    goto :eof
) else (
    echo %YELLOW%⚠%RESET% PowerShell não disponível. Mostrando últimas linhas...
    echo.

    :: Mostra as últimas 20 linhas do log
    if exist "%LOG_FILE%" (
        for /f "tokens=*" %%i in ('find /v /c "" "%LOG_FILE%" 2^>nul') do set LINES=%%i
        if !LINES! GTR 0 (
            echo %CYAN%=== ÚLTIMAS 20 LINHAS DE %LOG_NAME% ===%RESET%
            more +%LINES% "%LOG_FILE%" 2>nul | tail -20
        ) else (
            echo %YELLOW%   Log vazio ou não encontrado.%RESET%
        )
    ) else (
        echo %RED%   Arquivo %LOG_FILE% não encontrado.%RESET%
    )

    echo.
    pause
    goto :menu
)

:menu
goto :eof