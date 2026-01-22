# Скрипты запуска Module Federation

Набор скриптов для удобного запуска и остановки всех микросервисов.

## 🚀 Запуск приложений

### Windows (PowerShell) - Рекомендуется

**Режим разработки (отдельные окна):**
```powershell
.\scripts\start-dev.ps1
```
Открывает 4 отдельных окна PowerShell для каждого сервиса.

**Фоновый режим:**
```powershell
.\scripts\start.ps1
```
Запускает все сервисы как фоновые задачи PowerShell.

### Windows (Command Prompt)

```cmd
scripts\start.bat
```
Открывает 4 отдельных окна CMD для каждого сервиса.

### Linux/Mac (Bash)

```bash
./scripts/start.sh
```

**С tmux (рекомендуется):**
- Автоматически создаст tmux сессию `mf` с 4 панелями
- Отключиться: `Ctrl+B` затем `D`
- Подключиться обратно: `tmux attach -t mf`

**Без tmux:**
- Запустит сервисы в фоновом режиме

## 🛑 Остановка приложений

### Windows (PowerShell)

```powershell
.\scripts\stop.ps1
```

### Windows (Command Prompt)

```cmd
scripts\stop.bat
```

### Linux/Mac (Bash)

```bash
./scripts/stop.sh
```

## 📝 Описание скриптов

| Скрипт | Платформа | Описание |
|--------|-----------|----------|
| `start-dev.ps1` | Windows (PowerShell) | Открывает отдельное окно для каждого сервиса |
| `start.ps1` | Windows (PowerShell) | Запускает сервисы как фоновые задачи |
| `start.bat` | Windows (CMD) | Открывает отдельное окно CMD для каждого сервиса |
| `start.sh` | Linux/Mac | Запускает в tmux или фоновом режиме |
| `stop.ps1` | Windows (PowerShell) | Останавливает все сервисы по портам |
| `stop.bat` | Windows (CMD) | Останавливает все сервисы по портам |
| `stop.sh` | Linux/Mac | Останавливает tmux сессию или процессы по портам |

## 🎯 Порты

- **3000** - Host Application (React)
- **3001** - React Remote
- **3002** - Vue Remote
- **3003** - Angular Remote

## 💡 Советы

### PowerShell Execution Policy

Если скрипты PowerShell не запускаются:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### tmux (Linux/Mac)

Установка tmux:

```bash
# Ubuntu/Debian
sudo apt-get install tmux

# Mac (Homebrew)
brew install tmux

# CentOS/RHEL
sudo yum install tmux
```

### Проверка портов

**Windows (PowerShell):**
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3002,3003 | Select-Object LocalPort,State,OwningProcess
```

**Windows (CMD):**
```cmd
netstat -ano | findstr "3000 3001 3002 3003"
```

**Linux/Mac:**
```bash
lsof -i :3000,3001,3002,3003
```
