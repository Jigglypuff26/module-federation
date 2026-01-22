# Module Federation Starter Script for PowerShell
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Module Federation Demo Launcher" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory: $scriptPath" -ForegroundColor Yellow
Write-Host ""

Write-Host "Starting all applications..." -ForegroundColor Green
Write-Host "- Host: http://localhost:3000" -ForegroundColor White
Write-Host "- React Remote: http://localhost:3001" -ForegroundColor White
Write-Host "- Vue Remote: http://localhost:3002" -ForegroundColor White
Write-Host "- Angular Remote: http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all applications" -ForegroundColor Yellow
Write-Host ""

# Start all applications
npm run start:all
