#!/bin/bash
# Module Federation - Stop All Services (Linux/Mac)
# ==============================================

echo "========================================"
echo "  Stopping All Services..."
echo "========================================"
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# Function to kill process on port
kill_port() {
    local port=$1
    local name=$2
    
    echo "Stopping port $port ($name)..."
    
    if command -v lsof &> /dev/null; then
        # Using lsof (Mac/Linux)
        local pid=$(lsof -ti:$port)
        if [ ! -z "$pid" ]; then
            kill -9 $pid 2>/dev/null
            echo "  ✓ Port $port freed"
        else
            echo "  ✓ Port $port already free"
        fi
    else
        # Using fuser (Linux)
        fuser -k $port/tcp 2>/dev/null
        echo "  ✓ Port $port freed"
    fi
}

# Stop tmux session if exists
if command -v tmux &> /dev/null; then
    if tmux has-session -t mf 2>/dev/null; then
        echo "Stopping tmux session 'mf'..."
        tmux kill-session -t mf
        echo "  ✓ Tmux session stopped"
        echo ""
    fi
fi

# Kill processes on ports
kill_port 3000 "Host"
kill_port 3001 "React Remote"
kill_port 3002 "Vue Remote"
kill_port 3003 "Angular Remote"

# Clean up PID files
rm -f .react.pid .vue.pid .angular.pid .host.pid 2>/dev/null

echo ""
echo "========================================"
echo "  All services stopped!"
echo "========================================"
echo ""
