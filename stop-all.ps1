# Stop All Module Federation Servers
Write-Host "Stopping all Module Federation servers..." -ForegroundColor Yellow

$ports = @(3000, 3001, 3002, 3003)

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "Stopping process on port $port (PID: $($process.Id))..." -ForegroundColor Cyan
            Stop-Process -Id $process.Id -Force
            Write-Host "Stopped port $port" -ForegroundColor Green
        }
    } else {
        Write-Host "Port $port is already free" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "All servers stopped!" -ForegroundColor Green
