@echo off
echo Stopping all Module Federation servers...
echo.

FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000') DO taskkill /PID %%P /F 2>nul
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3001') DO taskkill /PID %%P /F 2>nul
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3002') DO taskkill /PID %%P /F 2>nul
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3003') DO taskkill /PID %%P /F 2>nul

echo.
echo All servers stopped!
pause
