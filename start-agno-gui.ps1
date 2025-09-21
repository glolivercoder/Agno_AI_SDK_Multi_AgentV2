# AGNO GUI Interface - PowerShell Startup Script
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "      AGNO GUI INTERFACE v1.0.4" -ForegroundColor Cyan
Write-Host "      VERSAO POWERSHELL" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "[1/2] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "[SOLUTION] Node.js may not be in PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "[OPTION 1] Restart PowerShell as Administrator" -ForegroundColor White
    Write-Host "[OPTION 2] Run: .\install-emergency.bat" -ForegroundColor White
    Write-Host "[OPTION 3] Install Node.js from https://nodejs.org/" -ForegroundColor White
    Write-Host ""
    Write-Host "[INFO] This is an environment issue, not a file issue" -ForegroundColor Gray
    Read-Host "Press any key to continue"
    exit 1
}

# Check if npm is available
Write-Host "[2/2] Starting server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "[INFO] Starting Next.js on port 3006..." -ForegroundColor Green
Write-Host "[INFO] Access: http://localhost:3006" -ForegroundColor Green
Write-Host "[INFO] Press Ctrl+C to stop the server" -ForegroundColor Green
Write-Host ""

# Create .env.local if it doesn't exist
if (-not (Test-Path ".env.local")) {
    Write-Host "[INFO] Creating .env.local..." -ForegroundColor Yellow
    "NODE_ENV=development" | Out-File -FilePath ".env.local" -Encoding UTF8
    "PORT=3006" | Out-File -FilePath ".env.local" -Append -Encoding UTF8
}

# Start the Next.js server
$env:PORT = "3006"
./node_modules/.bin/next dev