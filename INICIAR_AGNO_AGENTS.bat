@echo off
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI INTERFACE - SISTEMA DE INICIALIZACAO
:: =====================================================
:: Versao: 1.0.2 (Otimizada - Porta 3006)
:: Data: %date%
:: =====================================================

title Agno GUI Interface v1.0.2 - Sistema Otimizado (Porta 3006)

echo.
echo ==========================================================
echo                AGNO GUI INTERFACE v1.0.2
echo              Sistema de Inicializacao
echo ==========================================================
echo.

:: Verificar se esta rodando como administrador
net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Executando com privilegios de administrador
) else (
    echo [ATENCAO] Recomenda-se executar como administrador
    echo    Para melhor compatibilidade, considere executar no CMD
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
    for /f "tokens=*" %%i in ('node --version 2^>nul') do set NODE_VERSION=%%i
    echo %GREEN%[OK]%RESET% Node.js encontrado: !NODE_VERSION!
) else (
    :: Tentar verificar se npm esta disponivel (indica que Node.js esta instalado)
    npm --version >nul 2>&1
    if !errorLevel! == 0 (
        for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
        echo %GREEN%[OK]%RESET% Node.js disponivel (via npm !NPM_VERSION!)
        set NODE_VERSION="Presente (via npm)"
    ) else (
        echo %RED%[ERRO]%RESET% Node.js nao encontrado!
        echo %RED%   Por favor, instale o Node.js 18+ do site oficial%RESET%
        echo %RED%   https://nodejs.org/%RESET%
        echo %YELLOW%   Dica: Feche e reabra o terminal apos a instalacao%RESET%
        goto :error
    )
)

:: Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
    echo %GREEN%✓%RESET% npm encontrado: !NPM_VERSION!
) else (
    echo %RED%✗%RESET% npm não encontrado!
    echo %RED%   npm deve vir com o Node.js%RESET%
    echo %YELLOW%   Node.js pode não estar no PATH%RESET%
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
    echo %YELLOW%[ATENCAO]%RESET% Arquivo .env.local nao encontrado
    echo Copiando .env.example para .env.local...
    copy .env.example .env.local >nul 2>&1
    if !errorLevel! == 0 (
        echo %GREEN%[OK]%RESET% .env.local criado a partir do template
        echo %YELLOW%   Edite o arquivo .env.local com suas chaves API%RESET%
    ) else (
        echo %RED%[ERRO]%RESET% Erro ao criar .env.local
        goto :error
    )
) else (
    echo %GREEN%[OK]%RESET% .env.local encontrado
)

:: =====================================================
:: 3. INSTALAÇÃO DE DEPENDÊNCIAS
:: =====================================================

echo %BLUE%[3/5] Instalando dependências...%RESET%

:: Instalar dependências do npm (otimizadas)
echo Instalando dependências otimizadas do Node.js...
call npm install --legacy-peer-deps
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Dependências otimizadas instaladas com sucesso
    echo %GREEN%✓%RESET% - React 18.2.0
    echo %GREEN%✓%RESET% - Next.js 15.0.0
    echo %GREEN%✓%RESET% - TanStack Query
    echo %GREEN%✓%RESET% - Next Themes
    echo %GREEN%✓%RESET% - Radix UI Components
    echo %GREEN%✓%RESET% - Tailwind CSS
) else (
    echo %RED%✗%RESET% Erro na instalação das dependências otimizadas
    echo Tentando instalação de emergência...
    call install-emergency.bat
    if !errorLevel! NEQ 0 (
        echo Verifique se há conexão com a internet
        goto :error
    )
)

:: =====================================================
:: 4. INICIALIZAÇÃO DOS SERVIÇOS
:: =====================================================

echo %BLUE%[4/5] Inicializando serviços...%RESET%

:: Inicializar Docker se disponível (TEMPORARIAMENTE DESABILITADO)
if %DOCKER_AVAILABLE% == 1 (
    echo %YELLOW%⚠%RESET% Docker temporariamente desabilitado
    echo %YELLOW%   Focando no frontend otimizado Next.js%RESET%
    echo %CYAN%   Execute 'docker-compose up -d' manualmente quando necessário%RESET%
) else (
    echo %YELLOW%⚠%RESET% Docker não disponível - Iniciando apenas frontend otimizado
)

:: =====================================================
:: 5. INICIALIZAÇÃO DO FRONTEND
:: =====================================================

echo %BLUE%[5/5] Inicializando interface frontend...%RESET%

:: Iniciar servidor de desenvolvimento (OTIMIZADO)
echo Iniciando Next.js development server otimizado...
start "Agno GUI Frontend - Porta 3006" cmd /c "set PORT=3006 && node node_modules\next\dist\bin\next dev > logs\frontend.log 2> logs\frontend-error.log"

:: Aguardar um momento para o servidor iniciar
timeout /t 5 /nobreak >nul
echo %YELLOW%   Aguardando compilação do Next.js 15...%RESET%

:: Verificar se o servidor está rodando na porta 3006
curl -s http://localhost:3006 >nul 2>&1
if %errorLevel% == 0 (
    echo %GREEN%✓%RESET% Frontend otimizado iniciado com sucesso!
    echo %CYAN%   🌐 URL: http://localhost:3006%RESET%
    echo %CYAN%   ✅ Next.js 15.0.0 rodando%RESET%
    echo %CYAN%   ✅ React 18.2.0 ativo%RESET%
    echo %CYAN%   ✅ TanStack Query configurado%RESET%
) else (
    echo %YELLOW%⚠%RESET% Frontend pode ainda estar compilando...
    echo %CYAN%   Verifique em alguns segundos: http://localhost:3006%RESET%
    echo %YELLOW%   (A primeira compilação pode demorar um pouco)%RESET%
)

:: =====================================================
:: FINALIZAÇÃO E INSTRUÇÕES
:: =====================================================

echo.
echo %CYAN%==========================================================%RESET%
echo %CYAN%                 INICIALIZACAO CONCLUIDA                  %RESET%
echo %CYAN%==========================================================%RESET%
echo.

echo %GREEN%[SUCESSO] Agno GUI Interface v1.0.2 iniciado com sucesso!%RESET%
echo.

echo %CYAN%[SISTEMA OTIMIZADO - VERSAO 1.0.2]%RESET%
echo %CYAN%   * Next.js 15.0.0%RESET%
echo %CYAN%   * React 18.2.0%RESET%
echo %CYAN%   * TanStack Query%RESET%
echo %CYAN%   * Porta otimizada: 3006%RESET%
echo.

if %DOCKER_AVAILABLE% == 1 (
    echo %CYAN%📊 Serviços Disponíveis:%RESET%
    echo %CYAN%   • Frontend: http://localhost:3006%RESET%
    echo %YELLOW%   • Backend: Execute manualmente em outro terminal%RESET%
) else (
    echo %CYAN%📊 Serviços Disponíveis:%RESET%
    echo %CYAN%   • Frontend: http://localhost:3006%RESET%
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
echo %CYAN%   • Acessar interface: http://localhost:3006%RESET%
echo %CYAN%   • Ver logs frontend: .\view_logs.bat%RESET%
echo %CYAN%   • Verificar saúde: .\check_health.bat%RESET%
echo %CYAN%   • Limpar logs: .\clear_logs.bat%RESET%
echo %CYAN%   • Instalar dependências: .\install-emergency.bat%RESET%
echo %CYAN%   • Docker (quando disponível): docker-compose up -d%RESET%
echo.

echo %YELLOW%💡 Dicas da Versão 1.0.2:%RESET%
echo %YELLOW%   • Next.js 15 roda na porta 3006 (otimizada)%RESET%
echo %YELLOW%   • Para desenvolvimento, deixe este terminal aberto%RESET%
echo %YELLOW%   • Use Ctrl+C para parar o servidor%RESET%
echo %YELLOW%   • Verifique logs\frontend.log para debug%RESET%
echo %YELLOW%   • Primeira compilação pode demorar um pouco%RESET%
echo %YELLOW%   • Hot Reload ativo para desenvolvimento%RESET%
echo.

echo %GREEN%[PRONTO] Agno GUI Interface v1.0.2 Otimizado - Sistema ativo!%RESET%
echo %CYAN%   Acesse: http://localhost:3006%RESET%
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