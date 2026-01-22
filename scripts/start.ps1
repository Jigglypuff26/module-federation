# Module Federation - Start All Services (PowerShell)
# ==============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Module Federation - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project root
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Project root: $projectRoot" -ForegroundColor Yellow
Write-Host ""

# Check if concurrently is installed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing root dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "Starting all applications:" -ForegroundColor Green
Write-Host "  Host:           http://localhost:3000" -ForegroundColor White
Write-Host "  React Remote:   http://localhost:3001" -ForegroundColor White
Write-Host "  Vue Remote:     http://localhost:3002" -ForegroundColor White
Write-Host "  Angular Remote: http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all applications" -ForegroundColor Yellow
Write-Host ""

# Start all services
Start-Job -ScriptBlock { Set-Location "$using:projectRoot\react-remote"; npm start } -Name "ReactRemote"
Start-Sleep -Seconds 2
Start-Job -ScriptBlock { Set-Location "$using:projectRoot\vue-remote"; npm start } -Name "VueRemote"
Start-Sleep -Seconds 2
Start-Job -ScriptBlock { Set-Location "$using:projectRoot\angular-remote"; npm start } -Name "AngularRemote"
Start-Sleep -Seconds 2
Start-Job -ScriptBlock { Set-Location "$using:projectRoot\host"; npm start } -Name "Host"

Write-Host "All services started!" -ForegroundColor Green
Write-Host "Waiting for services to initialize..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Check job status with: Get-Job" -ForegroundColor Cyan
Write-Host "Stop all with: ./scripts/stop.ps1" -ForegroundColor Cyan
Write-Host ""

# Keep script running
Get-Job | Wait-Job
