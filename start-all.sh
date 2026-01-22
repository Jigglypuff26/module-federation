#!/bin/bash

echo "========================================"
echo "  Module Federation Demo Launcher"
echo "========================================"
echo ""

echo "Checking if node_modules exist..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

echo ""
echo "Starting all applications..."
echo "- Host: http://localhost:3000"
echo "- React Remote: http://localhost:3001"
echo "- Vue Remote: http://localhost:3002"
echo "- Angular Remote: http://localhost:3003"
echo ""
echo "Press Ctrl+C to stop all applications"
echo ""

npm run start:all
