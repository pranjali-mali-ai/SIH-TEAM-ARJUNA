#!/usr/bin/env pwsh
# Run pytest using the venv python
if (-Not (Test-Path -Path ".\.venv\Scripts\python.exe")) {
    Write-Error "Virtual environment not found. Run .\setup_venv.ps1 first."
    exit 1
}

& .\.venv\Scripts\python.exe -m pytest -q
