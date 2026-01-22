#!/bin/bash
# Module Federation - Start All Services (Linux/Mac)
# ==============================================

echo "========================================"
echo "  Module Federation - Starting..."
echo "========================================"
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

echo "Project root: $(pwd)"
echo ""

echo "Starting all applications:"
echo "  Host:           http://localhost:3000"
echo "  React Remote:   http://localhost:3001"
echo "  Vue Remote:     http://localhost:3002"
echo "  Angular Remote: http://localhost:3003"
echo ""

# Check if tmux is available
if command -v tmux &> /dev/null; then
    echo "Starting services in tmux session..."
    
    # Create new tmux session
    tmux new-session -d -s mf "cd react-remote && npm start"
    tmux split-window -h -t mf "cd vue-remote && npm start"
    tmux split-window -v -t mf "cd angular-remote && npm start"
    tmux select-pane -t 0
    tmux split-window -v -t mf "cd host && npm start"
    
    echo ""
    echo "Services started in tmux session 'mf'"
    echo "Attach to session: tmux attach -t mf"
    echo "Detach: Ctrl+B then D"
    echo "Stop all: ./scripts/stop.sh"
    echo ""
    
    # Attach to session
    tmux attach -t mf
else
    echo "tmux not found. Starting services in background..."
    echo ""
    
    # Start services in background
    cd react-remote && npm start &
    REACT_PID=$!
    echo "React Remote started (PID: $REACT_PID)"
    
    cd ../vue-remote && npm start &
    VUE_PID=$!
    echo "Vue Remote started (PID: $VUE_PID)"
    
    cd ../angular-remote && npm start &
    ANGULAR_PID=$!
    echo "Angular Remote started (PID: $ANGULAR_PID)"
    
    cd ../host && npm start &
    HOST_PID=$!
    echo "Host started (PID: $HOST_PID)"
    
    echo ""
    echo "All services started!"
    echo "Stop all: ./scripts/stop.sh"
    echo ""
    
    # Save PIDs
    echo "$REACT_PID" > .react.pid
    echo "$VUE_PID" > .vue.pid
    echo "$ANGULAR_PID" > .angular.pid
    echo "$HOST_PID" > .host.pid
    
    # Wait for all processes
    wait
fi
