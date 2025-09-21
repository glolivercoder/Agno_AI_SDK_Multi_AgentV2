@echo off
echo.
echo ============================================
echo      AGNO GUI INTERFACE v1.0.3
echo      VERSAO MINIMAL
echo ============================================
echo.
echo [INFO] Iniciando Next.js na porta 3006...
echo [INFO] Acesse: http://localhost:3006
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

REM Verificar se .env.local existe
if not exist ".env.local" (
    echo NODE_ENV=development > .env.local
    echo PORT=3006 >> .env.local
)

REM Iniciar servidor
npm run dev