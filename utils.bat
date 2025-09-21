@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI - UTILITÁRIOS E COMANDOS ÚTEIS
:: =====================================================

title Agno GUI - Utils

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║              AGNO GUI - UTILITÁRIOS                      ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

if "%1" == "" goto :menu

:: Processar argumentos
if "%1" == "start" goto :quick_start
if "%1" == "stop" goto :stop_all
if "%1" == "restart" goto :restart_all
if "%1" == "logs" goto :view_logs
if "%1" == "health" goto :check_health
if "%1" == "clean" goto :clean_all
if "%1" == "setup" goto :setup_env
if "%1" == "update" goto :update_app
if "%1" == "backup" goto :backup_logs
if "%1" == "help" goto :help
goto :menu

:quick_start
echo %BLUE%🚀 INICIANDO AGNO GUI INTERFACE...%RESET%
call INICIAR_AGNO_AGENTS.bat
goto :eof

:stop_all
echo %YELLOW%🛑 PARANDO TODOS OS SERVIÇOS...%RESET%

:: Parar Docker services
docker-compose down >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Docker services parados
) else (
    echo %YELLOW%⚠%RESET% Nenhum Docker service rodando
)

:: Parar processos Node.js
taskkill /f /im "node.exe" >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Processos Node.js terminados
) else (
    echo %YELLOW%⚠%RESET% Nenhum processo Node.js encontrado
)

echo %GREEN%✓%RESET% Todos os serviços foram parados
goto :eof

:restart_all
echo %BLUE%🔄 REINICIANDO TODOS OS SERVIÇOS...%RESET%
call :stop_all
timeout /t 2 /nobreak >nul
call :quick_start
goto :eof

:view_logs
echo %BLUE%📊 VISUALIZANDO LOGS...%RESET%
call view_logs.bat
goto :eof

:check_health
echo %BLUE%💊 VERIFICANDO SAÚDE DO SISTEMA...%RESET%
call check_health.bat
goto :eof

:clean_all
echo %YELLOW%🧹 LIMPANDO SISTEMA...%RESET%

:: Limpar logs
call clear_logs.bat

:: Limpar cache do Next.js
if exist ".next" (
    rmdir /s /q .next
    echo %GREEN%✓%RESET% Cache do Next.js limpo
)

:: Limpar node_modules (perguntar)
set /p "clean_node=Deseja reinstalar node_modules? (s/N): "
if /i "%clean_node%" == "s" (
    if exist "node_modules" (
        rmdir /s /q node_modules
        echo %GREEN%✓%RESET% node_modules removido
    )
    call npm install --legacy-peer-deps
    if %errorLevel% == 0 (
        echo %GREEN%✓%RESET% Dependências reinstaladas
    ) else (
        echo %RED%✗%RESET% Erro na instalação das dependências
    )
)

echo %GREEN%✓%RESET% Limpeza concluída
goto :eof

:setup_env
echo %BLUE%⚙️  CONFIGURANDO AMBIENTE...%RESET%

:: Copiar .env.example se .env.local não existir
if not exist ".env.local" (
    copy .env.example .env.local >nul 2>&1
    if %errorLevel% == 0 (
        echo %GREEN%✓%RESET% .env.local criado
        echo %YELLOW%   Edite o arquivo com suas chaves API%RESET%
    ) else (
        echo %RED%✗%RESET% Erro ao criar .env.local
    )
) else (
    echo %GREEN%✓%RESET% .env.local já existe
)

:: Verificar se há chaves API configuradas
findstr /c:"your_" .env.local >nul 2>&1
if %errorLevel% == 0 (
    echo %YELLOW%⚠%RESET% .env.local ainda tem chaves padrão
    echo %YELLOW%   Configure as seguintes chaves:%RESET%
    findstr /c:"your_" .env.local
)

goto :eof

:update_app
echo %BLUE%⬆️  ATUALIZANDO APLICAÇÃO...%RESET%

:: Fazer backup dos logs importantes
call :backup_logs

:: Parar serviços
call :stop_all

:: Fazer pull das atualizações
git pull origin main 2>nul
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Código atualizado
) else (
    echo %YELLOW%⚠%RESET% Erro ao atualizar código
    echo %YELLOW%   Verifique se é um repositório Git%RESET%
)

:: Reinstalar dependências
call npm install --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências atualizadas
) else (
    echo %RED%✗%RESET% Erro na instalação das dependências
)

:: Reiniciar serviços
call :quick_start

goto :eof

:backup_logs
echo %BLUE%💾 FAZENDO BACKUP DOS LOGS...%RESET%

set "BACKUP_DIR=logs\backup\%date:~-4,4%-%date:~-10,2%-%date:~-7,2%"
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

if exist "logs" (
    xcopy logs\* "%BACKUP_DIR%\" /y >nul 2>&1
    if %errorLevel% == 0 (
        echo %GREEN%✓%RESET% Logs copiados para %BACKUP_DIR%
    ) else (
        echo %RED%✗%RESET% Erro ao copiar logs
    )
) else (
    echo %YELLOW%⚠%RESET% Diretório logs não encontrado
)

goto :eof

:help
echo %CYAN%📚 AJUDA - COMANDOS DISPONÍVEIS%RESET%
echo.
echo %CYAN%INICIAR (start):%RESET% Inicia todos os serviços
echo %CYAN%PARAR (stop):%RESET% Para todos os serviços
echo %CYAN%REINICIAR (restart):%RESET% Reinicia todos os serviços
echo %CYAN%LOGS:%RESET% Visualiza logs em tempo real
echo %CYAN%SAÚDE (health):%RESET% Verifica saúde do sistema
echo %CYAN%LIMPAR (clean):%RESET% Limpa cache e logs
echo %CYAN%SETUP:%RESET% Configura ambiente (.env.local)
echo %CYAN%ATUALIZAR (update):%RESET% Atualiza código e dependências
echo %CYAN%BACKUP:%RESET% Faz backup dos logs
echo %CYAN%AJUDA (help):%RESET% Mostra esta ajuda
echo.
echo %YELLOW%💡 EXEMPLOS DE USO:%RESET%
echo %YELLOW%   utils.bat start%RESET%
echo %YELLOW%   utils.bat health%RESET%
echo %YELLOW%   utils.bat clean%RESET%
echo.
goto :eof

:menu
echo %CYAN%📋 UTILITÁRIOS AGNO GUI%RESET%
echo.
echo %CYAN%Escolha uma opção:%RESET%
echo.
echo %CYAN%1%RESET% - Iniciar Sistema (INICIAR_AGNO_AGENTS.bat)
echo %CYAN%2%RESET% - Parar Todos os Serviços
echo %CYAN%3%RESET% - Reiniciar Sistema
echo %CYAN%4%RESET% - Visualizar Logs
echo %CYAN%5%RESET% - Verificar Saúde do Sistema
echo %CYAN%6%RESET% - Limpar Cache e Logs
echo %CYAN%7%RESET% - Configurar Ambiente
echo %CYAN%8%RESET% - Atualizar Aplicação
echo %CYAN%9%RESET% - Fazer Backup dos Logs
echo %CYAN%0%RESET% - Ajuda
echo.
echo %CYAN%Ou use diretamente: utils.bat [comando]%RESET%
echo.

set /p "choice=Opção (0-9): "

if "%choice%"=="0" goto :help
if "%choice%"=="1" goto :quick_start
if "%choice%"=="2" goto :stop_all
if "%choice%"=="3" goto :restart_all
if "%choice%"=="4" goto :view_logs
if "%choice%"=="5" goto :check_health
if "%choice%"=="6" goto :clean_all
if "%choice%"=="7" goto :setup_env
if "%choice%"=="8" goto :update_app
if "%choice%"=="9" goto :backup_logs

goto :menu