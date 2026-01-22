# Module Federation - Development Mode (PowerShell)
# Opens 4 separate terminals for each service
# ==============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Module Federation - Dev Mode" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project root
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Opening separate terminals for each service..." -ForegroundColor Yellow
Write-Host ""

# Start React Remote
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\react-remote'; Write-Host 'React Remote (Port 3001)' -ForegroundColor Green; npm start"

Start-Sleep -Seconds 1

# Start Vue Remote
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\vue-remote'; Write-Host 'Vue Remote (Port 3002)' -ForegroundColor Green; npm start"

Start-Sleep -Seconds 1

# Start Angular Remote
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\angular-remote'; Write-Host 'Angular Remote (Port 3003)' -ForegroundColor Red; npm start"

Start-Sleep -Seconds 1

# Start Host
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\host'; Write-Host 'Host Application (Port 3000)' -ForegroundColor Cyan; npm start"

Write-Host ""
Write-Host "✓ 4 terminal windows opened" -ForegroundColor Green
Write-Host ""
Write-Host "Services:" -ForegroundColor Yellow
Write-Host "  Host:           http://localhost:3000" -ForegroundColor White
Write-Host "  React Remote:   http://localhost:3001" -ForegroundColor White
Write-Host "  Vue Remote:     http://localhost:3002" -ForegroundColor White
Write-Host "  Angular Remote: http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "To stop all services, run: ./scripts/stop.ps1" -ForegroundColor Cyan
Write-Host ""
