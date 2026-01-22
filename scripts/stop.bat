@echo off
REM Module Federation - Stop All Services (Windows)
REM ==============================================

echo ========================================
echo   Stopping All Services...
echo ========================================
echo.

echo Stopping port 3000 (Host)...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000') DO (
    taskkill /PID %%P /F 2>nul
    if not errorlevel 1 echo   - Stopped process %%P
)

echo Stopping port 3001 (React Remote)...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3001') DO (
    taskkill /PID %%P /F 2>nul
    if not errorlevel 1 echo   - Stopped process %%P
)

echo Stopping port 3002 (Vue Remote)...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3002') DO (
    taskkill /PID %%P /F 2>nul
    if not errorlevel 1 echo   - Stopped process %%P
)

echo Stopping port 3003 (Angular Remote)...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3003') DO (
    taskkill /PID %%P /F 2>nul
    if not errorlevel 1 echo   - Stopped process %%P
)

echo.
echo ========================================
echo   All services stopped!
echo ========================================
echo.
pause
