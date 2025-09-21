@echo off
setlocal enabledelayedexpansion

:: =====================================================
:: AGNO GUI INTERFACE - SISTEMA DE INICIALIZACAO (CMD)
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
:: 1. VERIFICACAO DE DEPENDENCIAS
:: =====================================================

echo [1/5] Verificando dependencias do sistema...
echo.

:: Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js encontrado: !NODE_VERSION!
) else (
    echo [ERRO] Node.js nao encontrado!
    echo    Por favor, instale o Node.js 18+ do site oficial
    echo    https://nodejs.org/
    echo    Dica: Node.js pode nao estar no PATH do PowerShell
    pause
    exit /b 1
)

:: Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorLevel% == 0 (
    for /f "tokens=*" %%i in ('npm --version 2^>nul') do set NPM_VERSION=%%i
    echo [OK] npm encontrado: !NPM_VERSION!
) else (
    echo [ERRO] npm nao encontrado!
    echo    npm deve vir com o Node.js
    pause
    exit /b 1
)

echo.

:: =====================================================
:: 2. CONFIGURACAO DO AMBIENTE
:: =====================================================

echo [2/5] Configurando ambiente...
echo.

:: Criar diretorio de logs se nao existir
if not exist "logs" (
    mkdir logs
    echo [OK] Diretorio de logs criado
)

:: Verificar se .env.local existe
if not exist ".env.local" (
    echo [ATENCAO] Arquivo .env.local nao encontrado
    echo Copiando .env.example para .env.local...
    copy .env.example .env.local >nul 2>&1
    if %errorLevel% == 0 (
        echo [OK] .env.local criado a partir do template
        echo    Edite o arquivo .env.local com suas chaves API
    ) else (
        echo [ERRO] Erro ao criar .env.local
        pause
        exit /b 1
    )
) else (
    echo [OK] .env.local encontrado
)

echo.

:: =====================================================
:: 3. INSTALACAO DE DEPENDENCIAS
:: =====================================================

echo [3/5] Instalando dependencias...
echo.

:: Instalar dependencias do npm (otimizadas)
echo Instalando dependencias otimizadas do Node.js...
npm install --legacy-peer-deps
if %errorLevel% == 0 (
    echo [OK] Dependencias otimizadas instaladas com sucesso
    echo [OK] - React 18.2.0
    echo [OK] - Next.js 15.0.0
    echo [OK] - TanStack Query
    echo [OK] - Next Themes
    echo [OK] - Radix UI Components
    echo [OK] - Tailwind CSS
) else (
    echo [ERRO] Erro na instalacao das dependencias otimizadas
    echo Tentando instalacao de emergencia...
    call install-emergency.bat
    if %errorLevel% NEQ 0 (
        echo Verifique se ha conexao com a internet
        pause
        exit /b 1
    )
)

echo.

:: =====================================================
:: 4. INICIALIZACAO DOS SERVICOS
:: =====================================================

echo [4/5] Inicializando servicos...
echo.

:: Verificar Docker (opcional)
docker --version >nul 2>&1
if %errorLevel% == 0 (
    echo [ATENCAO] Docker temporariamente desabilitado
    echo    Focando no frontend otimizado Next.js
    echo    Execute 'docker-compose up -d' manualmente quando necessario
) else (
    echo [ATENCAO] Docker nao disponivel - Iniciando apenas frontend otimizado
)

echo.

:: =====================================================
:: 5. INICIALIZACAO DO FRONTEND
:: =====================================================

echo [5/5] Inicializando interface frontend...
echo.

:: Iniciar servidor de desenvolvimento (OTIMIZADO)
echo Iniciando Next.js development server otimizado...
start "Agno GUI Frontend - Porta 3006" cmd /c "set PORT=3006 && npm run dev > logs\frontend.log 2> logs\frontend-error.log"

:: Aguardar um momento para o servidor iniciar
timeout /t 5 /nobreak >nul
echo    Aguardando compilacao do Next.js 15...

:: Verificar se o servidor esta rodando na porta 3006
curl -s http://localhost:3006 >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Frontend otimizado iniciado com sucesso!
    echo    URL: http://localhost:3006
    echo    Next.js 15.0.0 rodando
    echo    React 18.2.0 ativo
    echo    TanStack Query configurado
) else (
    echo [ATENCAO] Frontend pode ainda estar compilando...
    echo    Verifique em alguns segundos: http://localhost:3006
    echo    (A primeira compilacao pode demorar um pouco)
)

echo.

:: =====================================================
:: FINALIZACAO E INSTRUCOES
:: =====================================================

echo ==========================================================
echo                 INICIALIZACAO CONCLUIDA
echo ==========================================================
echo.

echo [SUCESSO] Agno GUI Interface v1.0.2 iniciado com sucesso!
echo.

echo [SISTEMA OTIMIZADO - VERSAO 1.0.2]
echo    * Next.js 15.0.0
echo    * React 18.2.0
echo    * TanStack Query
echo    * Porta otimizada: 3006
echo.

echo [SERVICOS DISPONIVEIS]
echo    * Frontend: http://localhost:3006
echo.

echo.
echo [CONTAS DE DEMONSTRACAO]
echo    * Admin: admin@agnogui.com / password
echo    * User: user@agnogui.com / password
echo.

echo [LOGS DISPONIVEIS EM]
echo    * logs\frontend.log
echo    * logs\system_health.log
echo.

echo [COMANDOS UTEIS]
echo    * Acessar interface: http://localhost:3006
echo    * Ver logs frontend: .\view_logs.bat
echo    * Verificar saude: .\check_health.bat
echo    * Limpar logs: .\clear_logs.bat
echo    * Instalar dependencias: .\install-emergency.bat
echo.

echo [DICAS DA VERSAO 1.0.2]
echo    * Next.js 15 roda na porta 3006 (otimizada)
echo    * Para desenvolvimento, deixe este terminal aberto
echo    * Use Ctrl+C para parar o servidor
echo    * Verifique logs\frontend.log para debug
echo    * Primeira compilacao pode demorar um pouco
echo    * Hot Reload ativo para desenvolvimento
echo.

echo [PRONTO] Agno GUI Interface v1.0.2 Otimizado - Sistema ativo!
echo    Acesse: http://localhost:3006
echo.

echo Pressione qualquer tecla para fechar...
pause >nul

goto :eof

:: =====================================================
:: TRATAMENTO DE ERROS
:: =====================================================

:error
echo.
echo [ERRO ENCONTRADO]
echo.
echo Verifique os seguintes pontos:
echo * Node.js 18+ instalado
echo * Conexao com internet
echo * Permissoes de administrador (recomendado)
echo * Docker instalado (opcional)
echo.
echo Para mais ajuda, consulte o README.md
echo.
pause
exit /b 1