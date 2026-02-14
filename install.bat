@echo off
echo ========================================
echo Mosque Management System - Installation
echo ========================================
echo.

echo [1/4] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install root dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Installing frontend dependencies...
cd Frontend\client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..\..
echo.

echo [3/4] Installing backend dependencies...
cd Backend\server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..\..
echo.

echo [4/4] Setup complete!
echo.
echo ========================================
echo Installation Successful!
echo ========================================
echo.
echo Next steps:
echo 1. Start MongoDB: mongod
echo 2. Start the app: npm run dev
echo 3. Open browser: http://localhost:5173
echo 4. Admin login: http://localhost:5173/admin-login
echo.
echo Admin Credentials:
echo   Email: admin@mosque.com
echo   Password: Admin@123
echo.
echo For more info, see QUICK-START.md
echo ========================================
pause
