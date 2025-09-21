@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI - VERIFICAÇÃO DE STARTUP
:: =====================================================
:: Este script é executado automaticamente pelo INICIAR_AGNO_AGENTS.bat
:: =====================================================

set "LOG_FILE=logs\startup_verification.log"

:: Registrar início da verificação
echo [%date% %time%] INFO: Iniciando verificação de startup >> %LOG_FILE%

:: =====================================================
:: 1. AGUARDAR INICIALIZAÇÃO DOS SERVIÇOS
:: =====================================================

echo Aguardando inicialização dos serviços...
echo [%date% %time%] INFO: Aguardando inicialização dos serviços >> %LOG_FILE%

:: Aguardar frontend (até 60 segundos)
set "WAIT_COUNT=0"
:wait_frontend
curl -s http://localhost:3000 >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Frontend iniciado com sucesso
    echo [%date% %time%] INFO: Frontend - Status: ONLINE >> %LOG_FILE%
) else (
    set /a WAIT_COUNT+=1
    if !WAIT_COUNT! LSS 60 (
        timeout /t 1 /nobreak >nul
        goto :wait_frontend
    ) else (
        echo ⚠ Frontend ainda não respondeu
        echo [%date% %time%] WARNING: Frontend - Status: TIMEOUT >> %LOG_FILE%
    )
)

:: =====================================================
:: 2. VERIFICAR ARQUIVO .env.local
:: =====================================================

if exist ".env.local" (
    echo ✓ .env.local encontrado
    echo [%date% %time%] INFO: .env.local - Status: OK >> %LOG_FILE%
) else (
    echo ✗ .env.local não encontrado
    echo [%date% %time%] ERROR: .env.local - Status: MISSING >> %LOG_FILE%
)

:: =====================================================
:: 3. VERIFICAR DEPENDÊNCIAS INSTALADAS
:: =====================================================

if exist "node_modules" (
    echo ✓ node_modules encontrado
    echo [%date% %time%] INFO: node_modules - Status: OK >> %LOG_FILE%
) else (
    echo ✗ node_modules não encontrado
    echo [%date% %time%] WARNING: node_modules - Status: MISSING >> %LOG_FILE%
)

:: =====================================================
:: 4. VERIFICAR PORTAS DISPONÍVEIS
:: =====================================================

netstat -an | findstr "LISTENING" | findstr ":3000" >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Porta 3000 (Frontend) disponível
    echo [%date% %time%] INFO: Port 3000 - Status: AVAILABLE >> %LOG_FILE%
) else (
    echo ⚠ Porta 3000 (Frontend) ocupada
    echo [%date% %time%] WARNING: Port 3000 - Status: OCCUPIED >> %LOG_FILE%
)

netstat -an | findstr "LISTENING" | findstr ":8000" >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Porta 8000 (Backend) disponível
    echo [%date% %time%] INFO: Port 8000 - Status: AVAILABLE >> %LOG_FILE%
) else (
    echo ⚠ Porta 8000 (Backend) ocupada
    echo [%date% %time%] WARNING: Port 8000 - Status: OCCUPIED >> %LOG_FILE%
)

:: =====================================================
:: 5. VERIFICAR DOCKER (se aplicável)
:: =====================================================

docker --version >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Docker disponível
    echo [%date% %time%] INFO: Docker - Status: AVAILABLE >> %LOG_FILE%

    :: Verificar se containers estão rodando
    docker ps | findstr agno-gui >nul 2>&1
    if %errorLevel% == 0 (
        echo ✓ Containers Agno GUI rodando
        echo [%date% %time%] INFO: Docker containers - Status: RUNNING >> %LOG_FILE%
    ) else (
        echo ℹ Nenhum container Agno GUI encontrado
        echo [%date% %time%] INFO: Docker containers - Status: NONE >> %LOG_FILE%
    )
) else (
    echo ℹ Docker não disponível
    echo [%date% %time%] INFO: Docker - Status: NOT_AVAILABLE >> %LOG_FILE%
)

:: =====================================================
:: 6. VERIFICAR VARIÁVEIS DE AMBIENTE ESSENCIAIS
:: =====================================================

if defined NEXTAUTH_SECRET (
    echo ✓ NEXTAUTH_SECRET configurado
    echo [%date% %time%] INFO: NEXTAUTH_SECRET - Status: SET >> %LOG_FILE%
) else (
    echo ⚠ NEXTAUTH_SECRET não configurado
    echo [%date% %time%] WARNING: NEXTAUTH_SECRET - Status: NOT_SET >> %LOG_FILE%
)

if defined OPENROUTER_API_KEY (
    echo ✓ OPENROUTER_API_KEY configurado
    echo [%date% %time%] INFO: OPENROUTER_API_KEY - Status: SET >> %LOG_FILE%
) else (
    echo ℹ OPENROUTER_API_KEY não configurado
    echo [%date% %time%] INFO: OPENROUTER_API_KEY - Status: NOT_SET >> %LOG_FILE%
)

:: =====================================================
:: 7. TESTE BÁSICO DA APLICAÇÃO
:: =====================================================

echo Testando aplicação...
curl -s http://localhost:3000 | findstr -i "html" >nul 2>&1
if %errorLevel% == 0 (
    echo ✓ Aplicação respondendo corretamente
    echo [%date% %time%] INFO: Application test - Status: SUCCESS >> %LOG_FILE%
) else (
    echo ⚠ Aplicação não respondeu como esperado
    echo [%date% %time%] WARNING: Application test - Status: UNEXPECTED_RESPONSE >> %LOG_FILE%
)

:: =====================================================
:: 8. GERAR RELATÓRIO FINAL
:: =====================================================

echo.
echo ════════════════════════════════════════════════════════════
echo                  RELATÓRIO DE STARTUP
echo ════════════════════════════════════════════════════════════
echo.

echo Startup verificado em: %date% %time%
echo Log salvo em: %LOG_FILE%
echo.

:: Contar problemas
set "PROBLEMS=0"
findstr /c:"ERROR:" /c:"MISSING" /c:"OCCUPIED" /c:"TIMEOUT" "%LOG_FILE%" >nul 2>&1
if %errorLevel% == 0 (
    set /a PROBLEMS+=1
)

findstr /c:"WARNING:" "%LOG_FILE%" >nul 2>&1
if %errorLevel% == 0 (
    set /a PROBLEMS+=1
)

if %PROBLEMS% == 0 (
    echo 🎉 TODOS OS TESTES PASSARAM!
    echo Sistema pronto para uso.
) else (
    echo ⚠️ FORAM ENCONTRADOS %PROBLEMS% PROBLEMA(S)
    echo Verifique o arquivo de log para detalhes.
)

echo.
echo ════════════════════════════════════════════════════════════
echo.

:: Registrar fim da verificação
echo [%date% %time%] INFO: Verificação de startup concluída >> %LOG_FILE%

goto :eof