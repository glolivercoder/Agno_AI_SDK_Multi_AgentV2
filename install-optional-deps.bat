@echo off
chcp 65001 >nul

:: =====================================================
:: AGNO GUI - INSTALAÇÃO DE DEPENDÊNCIAS OPCIONAIS
:: =====================================================
:: Este script instala dependências opcionais que podem
:: causar conflitos na instalação inicial
:: =====================================================

title Agno GUI - Install Optional Dependencies

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║        AGNO GUI - DEPENDÊNCIAS OPCIONAIS                 ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %BLUE%📦 Instalando dependências opcionais avançadas...%RESET%
echo.

:: Verificar se node_modules existe
if not exist "node_modules" (
    echo %RED%✗%RESET% node_modules não encontrado!
    echo %YELLOW%   Execute primeiro: npm install%RESET%
    echo.
    pause
    exit /b 1
)

echo %YELLOW%Instalando dependências de desenvolvimento (Jest, Testing Library)...%RESET%
call npm install --save-dev @types/jest jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências de teste instaladas
) else (
    echo %YELLOW%⚠%RESET% Algumas dependências de teste falharam
)

echo.
echo %YELLOW%Instalando dependências de autenticação e API...%RESET%
call npm install --save next-auth @types/bcryptjs @types/jsonwebtoken bcryptjs jsonwebtoken jose --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências de autenticação instaladas
) else (
    echo %YELLOW%⚠%RESET% Algumas dependências de autenticação falharam
)

echo.
echo %YELLOW%Instalando dependências de gráficos e editores...%RESET%
call npm install --save recharts monaco-editor @monaco-editor/react socket.io-client react-dropzone date-fns --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências de gráficos instaladas
) else (
    echo %YELLOW%⚠%RESET% Algumas dependências de gráficos falharam
)

echo.
echo %YELLOW%Instalando dependências de banco de dados (SQLite)...%RESET%
call npm install --save-dev @types/better-sqlite3 better-sqlite3 --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências de banco instaladas
) else (
    echo %YELLOW%⚠%RESET% Dependências de banco falharam (PostgreSQL será usado)
)

echo.
echo %YELLOW%Instalando dependências de IA (Vercel AI SDK)...%RESET%
call npm install --save ai --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências de IA instaladas
) else (
    echo %YELLOW%⚠%RESET% Dependências de IA falharam
)

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║              INSTALAÇÃO CONCLUÍDA                        ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %GREEN%✅ Dependências opcionais instaladas com sucesso!%RESET%
echo.
echo %CYAN%📋 Resumo das funcionalidades agora disponíveis:%RESET%
echo %CYAN%   • Testes automatizados (Jest + Testing Library)%RESET%
echo %CYAN%   • Autenticação (NextAuth + bcrypt + JWT)%RESET%
echo %CYAN%   • Gráficos (Recharts)%RESET%
echo %CYAN%   • Editor de código (Monaco Editor)%RESET%
echo %CYAN%   • WebSockets (Socket.io)%RESET%
echo %CYAN%   • Upload de arquivos (React Dropzone)%RESET%
echo %CYAN%   • IA Integration (Vercel AI SDK)%RESET%
echo %CYAN%   • Banco SQLite (Better SQLite3)%RESET%
echo.

echo %YELLOW%💡 Para iniciar a aplicação completa:%RESET%
echo %YELLOW%   .\start-agno-gui.ps1%RESET%
echo.

echo Pressione qualquer tecla para sair...
pause >nul