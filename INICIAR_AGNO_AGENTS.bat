@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI INTERFACE - SISTEMA DE INICIALIZAÇÃO
:: =====================================================
:: Versão: 1.0.0
:: Data: %date%
:: =====================================================

title Agno GUI Interface - Sistema de Inicialização

:: Cores para output
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "CYAN=[96m"
set "RESET=[0m"

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║                AGNO GUI INTERFACE v1.0.0                 ║%RESET%
echo %CYAN%║              Sistema de Inicialização                    ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: Verificar se está rodando como administrador
net session >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Executando com privilégios de administrador
) else (
    echo %YELLOW%⚠%RESET% ATENÇÃO: Recomenda-se executar como administrador
    echo.
)

:: =====================================================
:: 1. VERIFICAÇÃO DE DEPENDÊNCIAS
:: =====================================================

echo %BLUE%[1/5] Verificando dependências do sistema...%RESET%

:: Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo %GREEN%✓%RESET% Node.js encontrado: !NODE_VERSION!
) else (
    echo %RED%✗%RESET% Node.js não encontrado!
    echo %RED%   Por favor, instale o Node.js 18+ do site oficial%RESET%
    echo %RED%   https://nodejs.org/%RESET%
    goto :error
)

:: Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo %GREEN%✓%RESET% npm encontrado: !NPM_VERSION!
) else (
    echo %RED%✗%RESET% npm não encontrado!
    echo %RED%   npm deve vir com o Node.js%RESET%
    goto :error
)

:: Verificar Docker (opcional)
echo Verificando Docker...
docker --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
    echo %GREEN%✓%RESET% Docker encontrado: !DOCKER_VERSION!
    set DOCKER_AVAILABLE=1
) else (
    echo %YELLOW%⚠%RESET% Docker não encontrado - Funcionamento limitado
    echo %YELLOW%   Docker é opcional, mas recomendado para banco de dados%RESET%
    set DOCKER_AVAILABLE=0
)

:: Verificar Git
echo Verificando Git...
git --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo %GREEN%✓%RESET% Git encontrado: !GIT_VERSION!
) else (
    echo %YELLOW%⚠%RESET% Git não encontrado - Alguns recursos podem não funcionar
)

echo.

:: =====================================================
:: 2. CONFIGURAÇÃO DO AMBIENTE
:: =====================================================

echo %BLUE%[2/5] Configurando ambiente...%RESET%

:: Criar diretório de logs se não existir
if not exist "logs" (
    mkdir logs
    echo %GREEN%✓%RESET% Diretório de logs criado
)

:: Verificar se .env.local existe
if not exist ".env.local" (
    echo %YELLOW%⚠%RESET% Arquivo .env.local não encontrado
    echo Copiando .env.example para .env.local...
    copy .env.example .env.local >nul 2>&1
    if !errorLevel! == 0 (
        echo %GREEN%✓%RESET% .env.local criado a partir do template
        echo %YELLOW%   Edite o arquivo .env.local com suas chaves API%RESET%
    ) else (
        echo %RED%✗%RESET% Erro ao criar .env.local
        goto :error
    )
) else (
    echo %GREEN%✓%RESET% .env.local encontrado
)

:: =====================================================
:: 3. INSTALAÇÃO DE DEPENDÊNCIAS
:: =====================================================

echo %BLUE%[3/5] Instalando dependências...%RESET%

:: Instalar dependências do npm
echo Instalando dependências do Node.js...
call npm install --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências instaladas com sucesso
) else (
    echo %RED%✗%RESET% Erro na instalação das dependências
    echo Verifique se há conexão com a internet
    goto :error
)

:: =====================================================
:: 4. INICIALIZAÇÃO DOS SERVIÇOS
:: =====================================================

echo %BLUE%[4/5] Inicializando serviços...%RESET%

:: Inicializar Docker se disponível
if %DOCKER_AVAILABLE% == 1 (
    echo Iniciando serviços Docker...
    docker-compose up -d --build > logs\docker_startup.log 2>&1

    if !errorLevel! == 0 (
        echo %GREEN%✓%RESET% Docker services iniciados
        echo %CYAN%   - PostgreSQL: http://localhost:5432%RESET%
        echo %CYAN%   - Redis: localhost:6379%RESET%
        echo %CYAN%   - Backend API: http://localhost:8000%RESET%
    ) else (
        echo %YELLOW%⚠%RESET% Erro ao iniciar Docker services
        echo Verifique o log: logs\docker_startup.log
    )
) else (
    echo %YELLOW%⚠%RESET% Docker não disponível - Iniciando apenas frontend
)

:: =====================================================
:: 5. INICIALIZAÇÃO DO FRONTEND
:: =====================================================

echo %BLUE%[5/5] Inicializando interface frontend...%RESET%

:: Iniciar servidor de desenvolvimento
echo Iniciando Next.js development server...
start "Agno GUI Frontend" cmd /k "npm run dev > logs\frontend.log 2>&1"

:: Aguardar um momento para o servidor iniciar
timeout /t 3 /nobreak >nul

:: Verificar se o servidor está rodando
curl -s http://localhost:3000 >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Frontend iniciado com sucesso!
    echo %CYAN%   URL: http://localhost:3000%RESET%
) else (
    echo %YELLOW%⚠%RESET% Frontend pode ainda estar iniciando...
    echo %CYAN%   Verifique em alguns segundos: http://localhost:3000%RESET%
)

:: =====================================================
:: FINALIZAÇÃO E INSTRUÇÕES
:: =====================================================

echo.
echo %CYAN%╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%║                 INICIALIZAÇÃO CONCLUÍDA                  ║%RESET%
echo %CYAN%╚══════════════════════════════════════════════════════════╝%RESET%
echo.

echo %GREEN%🎉 Agno GUI Interface iniciado com sucesso!%RESET%
echo.

if %DOCKER_AVAILABLE% == 1 (
    echo %CYAN%📊 Serviços Disponíveis:%RESET%
    echo %CYAN%   • Frontend: http://localhost:3000%RESET%
    echo %CYAN%   • Backend API: http://localhost:8000%RESET%
    echo %CYAN%   • Database: localhost:5432%RESET%
    echo %CYAN%   • Redis: localhost:6379%RESET%
) else (
    echo %CYAN%📊 Serviços Disponíveis:%RESET%
    echo %CYAN%   • Frontend: http://localhost:3000%RESET%
    echo %YELLOW%   • Backend: Execute manualmente em outro terminal%RESET%
)

echo.
echo %CYAN%🔐 Contas de Demonstração:%RESET%
echo %CYAN%   • Admin: admin@agnogui.com / password%RESET%
echo %CYAN%   • User: user@agnogui.com / password%RESET%
echo.

echo %CYAN%📝 Logs disponíveis em:%RESET%
echo %CYAN%   • logs\frontend.log%RESET%
echo %CYAN%   • logs\docker_startup.log%RESET%
echo.

echo %CYAN%🛠️  Comandos Úteis:%RESET%
echo %CYAN%   • Parar tudo: docker-compose down%RESET%
echo %CYAN%   • Ver logs: docker-compose logs -f%RESET%
echo %CYAN%   • Reiniciar: docker-compose restart%RESET%
echo.

echo %YELLOW%💡 Dicas:%RESET%
echo %YELLOW%   • Para desenvolvimento, deixe este terminal aberto%RESET%
echo %YELLOW%   • Use Ctrl+C para parar todos os serviços%RESET%
echo %YELLOW%   • Verifique os logs se houver problemas%RESET%
echo.

echo Pressione qualquer tecla para fechar...
pause >nul

goto :eof

:: =====================================================
:: TRATAMENTO DE ERROS
:: =====================================================

:error
echo.
echo %RED%❌ ERRO ENCONTRADO%RESET%
echo.
echo %RED%Verifique os seguintes pontos:%RESET%
echo %RED%• Node.js 18+ instalado%RESET%
echo %RED%• Conexão com internet%RESET%
echo %RED%• Permissões de administrador (recomendado)%RESET%
echo %RED%• Docker instalado (opcional)%RESET%
echo.
echo %YELLOW%Para mais ajuda, consulte o README.md%RESET%
echo.
pause
exit /b 1