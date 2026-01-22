@echo off
REM Module Federation - Start All Services (Windows)
REM ==============================================

echo ========================================
echo   Module Federation - Starting...
echo ========================================
echo.

cd /d "%~dp0\.."

echo Project root: %CD%
echo.

echo Starting all applications:
echo   Host:           http://localhost:3000
echo   React Remote:   http://localhost:3001
echo   Vue Remote:     http://localhost:3002
echo   Angular Remote: http://localhost:3003
echo.

REM Start each service in a new window
start "React Remote (3001)" cmd /k "cd react-remote && npm start"
timeout /t 2 /nobreak >nul

start "Vue Remote (3002)" cmd /k "cd vue-remote && npm start"
timeout /t 2 /nobreak >nul

start "Angular Remote (3003)" cmd /k "cd angular-remote && npm start"
timeout /t 2 /nobreak >nul

start "Host (3000)" cmd /k "cd host && npm start"

echo.
echo All services started in separate windows!
echo.
echo To stop all services, run: scripts\stop.bat
echo.
pause
