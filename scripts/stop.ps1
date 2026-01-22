# Module Federation - Stop All Services (PowerShell)
# ==============================================

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  Stopping All Services..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$ports = @(3000, 3001, 3002, 3003)
$portNames = @{
    3000 = "Host"
    3001 = "React Remote"
    3002 = "Vue Remote"
    3003 = "Angular Remote"
}

foreach ($port in $ports) {
    Write-Host "Checking port $port ($($portNames[$port]))..." -ForegroundColor Cyan
    
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($connections) {
        foreach ($connection in $connections) {
            $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "  Stopping $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Yellow
                Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
                Write-Host "  ✓ Port $port freed" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "  ✓ Port $port already free" -ForegroundColor Green
    }
}

# Stop any running jobs
$jobs = Get-Job -ErrorAction SilentlyContinue
if ($jobs) {
    Write-Host ""
    Write-Host "Stopping background jobs..." -ForegroundColor Cyan
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "✓ Background jobs stopped" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All services stopped!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
