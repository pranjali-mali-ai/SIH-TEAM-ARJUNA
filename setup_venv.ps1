# Creates a virtual environment in .venv and installs requirements
python -m venv .venv
Write-Host "Created virtual environment at .venv"

# Use the venv's python to upgrade pip and install requirements (script-friendly)
& .\.venv\Scripts\python.exe -m pip install --upgrade pip
& .\.venv\Scripts\python.exe -m pip install -r requirements.txt

Write-Host "Installed requirements into .venv"
