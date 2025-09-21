@echo off
echo =====================================================
echo AGNO GUI INTERFACE - EMERGENCY INSTALLATION
echo =====================================================
echo This will install only essential dependencies to get Next.js running
echo.

echo Installing minimal Next.js dependencies...
echo.

REM Limpar cache primeiro
echo Clearing npm cache...
call npm cache clean --force >nul 2>&1

REM Instalar apenas Next.js e dependências essenciais
echo Installing Next.js 15.0.0...
call npm install next@15.0.0 --no-save

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install Next.js
    echo Trying even more minimal approach...
    call npm install next@14.0.0 --no-save

    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Critical failure - cannot install Next.js
        echo Please check your Node.js installation and internet connection
        echo Press any key to exit...
        pause >nul
        exit /b 1
    )
)

echo ✅ Next.js installed successfully!
echo.

REM Tentar instalar React
echo Installing React...
call npm install react@^18.2.0 react-dom@^18.2.0 --no-save

if %ERRORLEVEL% EQU 0 (
    echo ✅ React installed successfully!
) else (
    echo ⚠️ React installation failed - Next.js may still work
)

echo.
echo =====================================================
echo EMERGENCY INSTALLATION COMPLETED
echo =====================================================
echo You can now try running the application with:
echo .\start-agno-gui.ps1
echo.
echo Press any key to exit...
pause >nul