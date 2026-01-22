# Скрипт для безопасного обновления зависимостей
# Выполняет только безопасные обновления (минорные и патч-версии)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Безопасное обновление зависимостей" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Проверка версии Node.js
$nodeVersion = node --version
Write-Host "Версия Node.js: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Этап 1: Обновление корневого package.json
Write-Host "Этап 1: Обновление корневого package.json..." -ForegroundColor Yellow
Set-Location $PSScriptRoot\..
npm install --save-dev concurrently@^9.2.1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении корневого package.json" -ForegroundColor Red
    exit 1
}
Write-Host "✓ concurrently обновлен до 9.2.1" -ForegroundColor Green
Write-Host ""

# Этап 2: Обновление TypeScript в модулях
Write-Host "Этап 2: Обновление TypeScript..." -ForegroundColor Yellow

# Angular-remote
Write-Host "  Обновление TypeScript в angular-remote..." -ForegroundColor Gray
Set-Location angular-remote
npm install --save-dev typescript@^5.9.3
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении TypeScript в angular-remote" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ TypeScript обновлен в angular-remote" -ForegroundColor Green
Set-Location ..

# Host
Write-Host "  Обновление TypeScript в host..." -ForegroundColor Gray
Set-Location host
npm install --save-dev typescript@^5.9.3
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении TypeScript в host" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ TypeScript обновлен в host" -ForegroundColor Green
Set-Location ..

# React-remote
Write-Host "  Обновление TypeScript в react-remote..." -ForegroundColor Gray
Set-Location react-remote
npm install --save-dev typescript@^5.9.3
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении TypeScript в react-remote" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ TypeScript обновлен в react-remote" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Этап 3: Обновление zone.js
Write-Host "Этап 3: Обновление zone.js..." -ForegroundColor Yellow

# Host
Write-Host "  Обновление zone.js в host..." -ForegroundColor Gray
Set-Location host
npm install zone.js@^0.16.0
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении zone.js в host" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ zone.js обновлен в host" -ForegroundColor Green
Set-Location ..

# React-remote
Write-Host "  Обновление zone.js в react-remote..." -ForegroundColor Gray
Set-Location react-remote
npm install zone.js@^0.16.0
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении zone.js в react-remote" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ zone.js обновлен в react-remote" -ForegroundColor Green
Set-Location ..

# Angular-remote
Write-Host "  Обновление zone.js в angular-remote..." -ForegroundColor Gray
Set-Location angular-remote
npm install zone.js@^0.16.0
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при обновлении zone.js в angular-remote" -ForegroundColor Red
    exit 1
}
Write-Host "  ✓ zone.js обновлен в angular-remote" -ForegroundColor Green
Set-Location ..
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Безопасные обновления завершены!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Следующие шаги:" -ForegroundColor Yellow
Write-Host "1. Запустите тесты: npm run build:all" -ForegroundColor White
Write-Host "2. Проверьте работу приложения: npm run start:all" -ForegroundColor White
Write-Host "3. Для дальнейших обновлений см. UPDATE_PLAN.md" -ForegroundColor White
Write-Host ""
