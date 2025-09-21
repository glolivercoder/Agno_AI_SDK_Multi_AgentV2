@echo off

:: =====================================================
:: AGNO GUI INTERFACE - VERSAO SIMPLIFICADA
:: =====================================================
:: Versao: 1.0.2 (Simples - Porta 3006)
:: =====================================================

title Agno GUI Interface - Inicializacao Simples

echo.
echo ==========================================================
echo                AGNO GUI INTERFACE v1.0.2
echo                VERSAO SIMPLIFICADA
echo ==========================================================
echo.

:: Verificar se Node.js esta instalado
echo [1/3] Verificando Node.js...
node --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js encontrado: %NODE_VERSION%
) else (
    :: Tentar verificar se npm esta disponivel (indica que Node.js esta instalado)
    npm --version >nul 2>&1
    if %errorLevel% == 0 (
        for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
        echo [OK] Node.js disponivel via npm %NPM_VERSION%
        set NODE_VERSION="Presente (via npm)"
    ) else (
        echo [ERRO] Node.js nao encontrado!
        echo.
        echo [SOLUCAO] Node.js pode nao estar no PATH do PowerShell
        echo.
        echo [OPC 1] Reinicie o PowerShell como Administrador
        echo [OPC 2] Execute: .\install-emergency.bat
        echo [OPC 3] Instale Node.js de https://nodejs.org/
        echo.
        echo [INFO] O problema e de ambiente, nao dos arquivos
        pause
        exit /b 1
    )
)

:: Verificar se npm esta instalado
echo [2/3] Verificando npm...
npm --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [OK] npm encontrado: !NPM_VERSION!
) else (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
)

echo.

:: Verificar se dependencias estao instaladas
echo [3/3] Verificando dependencias...
if not exist "node_modules\next" (
    echo Instalando dependencias...
    npm install --legacy-peer-deps
    if %errorLevel% NEQ 0 (
        echo [ERRO] Falha na instalacao das dependencias
        echo Execute .\install-emergency.bat para tentar novamente
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencias ja instaladas
)

echo.

:: Iniciar o servidor Next.js
echo [INICIANDO] Servidor Next.js na porta 3006...
echo.
echo ==========================================================
echo                SISTEMA INICIANDO...
echo ==========================================================
echo.
echo [INFO] Next.js 15.0.0 iniciando na porta 3006
echo [INFO] Acesse: http://localhost:3006
echo [INFO] Logs: logs\frontend.log
echo.
echo ==========================================================
echo.

start "Agno GUI Frontend" cmd /c "set PORT=3006 && npm run dev > logs\frontend.log 2> logs\frontend-error.log"

:: Aguardar um pouco
timeout /t 3 /nobreak >nul

:: Verificar se o servidor iniciou
curl -s http://localhost:3006 >nul 2>&1
if %errorLevel% == 0 (
    echo [SUCESSO] Sistema iniciado com sucesso!
    echo.
    echo ==========================================================
    echo                 SISTEMA FUNCIONAL
    echo ==========================================================
    echo.
    echo URL: http://localhost:3006
    echo Porta: 3006
    echo Status: RODANDO
    echo.
    echo ==========================================================
    echo.
    echo [INFO] Mantenha este terminal aberto
    echo [INFO] Use Ctrl+C para parar o servidor
    echo [INFO] Verifique logs\frontend.log para debug
) else (
    echo [ATENCAO] Sistema pode estar iniciando...
    echo Verifique http://localhost:3006 em alguns segundos
    echo Logs disponiveis em: logs\frontend.log
)

echo.
echo Pressione qualquer tecla para fechar...
pause >nul

exit /b 0