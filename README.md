# Student 2 Processor (ULPF) — Setup

Quick steps to create the virtual environment, install dependencies, and run tests on Windows PowerShell.

Create and install dependencies into `.venv`:

```powershell
.\setup_venv.ps1
```

Run the processor example:

```powershell
& .\.venv\Scripts\python.exe -m ulpf.student2_processor
```

Run unit tests:

```powershell
.\run_tests_in_venv.ps1
```
