@echo off
chcp 65001 >nul

:: =====================================================
:: AGNO GUI - LIMPEZA DE LOGS
:: =====================================================

title Agno GUI - Clear Logs

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║              AGNO GUI - CLEAR LOGS                       ║%RESET%
echo %CYAN%║                 %date% %time%                 ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: Verificar se o diretório de logs existe
if not exist "logs" (
    echo %YELLOW%⚠%RESET% Diretório logs não encontrado!
    echo %YELLOW%   Execute INICIAR_AGNO_AGENTS.bat primeiro%RESET%
    echo.
    pause
    exit /b 1
)

echo %YELLOW%⚠%RESET% ATENÇÃO: Esta operação irá apagar todos os arquivos de log!
echo.
echo %CYAN%📋 Arquivos que serão apagados:%RESET%
echo %CYAN%   • logs\frontend.log%RESET%
echo %CYAN%   • logs\backend.log%RESET%
echo %CYAN%   • logs\docker_startup.log%RESET%
echo %CYAN%   • logs\database.log%RESET%
echo %CYAN%   • logs\system_health.log%RESET%
echo %CYAN%   • logs\error.log%RESET%
echo %CYAN%   • logs\startup_verification.log%RESET%
echo %CYAN%   • logs\performance.log%RESET%
echo.

set /p "confirm=Tem certeza que deseja apagar todos os logs? (s/N): "

if /i "%confirm%"=="s" (
    if /i "%confirm%"=="sim" (
        goto :clear
    )
    if /i "%confirm%"=="yes" (
        goto :clear
    )
) else (
    echo %GREEN%✓%RESET% Operação cancelada. Logs preservados.
    echo.
    pause
    exit /b 0
)

:clear
echo.
echo %BLUE%🗑️  Apagando logs...%RESET%

:: Apagar arquivos de log
del logs\*.log >nul 2>&1

if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Todos os logs foram apagados com sucesso!

    :: Recriar arquivos vazios
    echo. > logs\frontend.log
    echo. > logs\backend.log
    echo. > logs\docker_startup.log
    echo. > logs\database.log
    echo. > logs\system_health.log
    echo. > logs\error.log
    echo. > logs\startup_verification.log
    echo. > logs\performance.log

    echo %GREEN%✓%RESET% Arquivos de log vazios recriados
    echo %CYAN%📝 Logs estão prontos para nova sessão%RESET%
) else (
    echo %RED%✗%RESET% Erro ao apagar logs
    echo %YELLOW%   Alguns arquivos podem estar em uso%RESET%
)

echo.
echo %CYAN%💡 DICA: Os logs são importantes para debugging.%RESET%
echo %CYAN%   Só apague se tiver certeza que não precisa deles.%RESET%
echo.

pause
goto :eof