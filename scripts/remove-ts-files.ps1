# PowerShell script to remove TypeScript files from the project
# Run from repository root (PowerShell v5.1):
#   .\scripts\remove-ts-files.ps1

Write-Host "Removing .ts, .tsx and .d.ts files (excluding node_modules)..."

$patterns = @('*.ts', '*.tsx', '*.d.ts')

foreach ($pattern in $patterns) {
    Get-ChildItem -Path . -Recurse -Include $pattern -File -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch "\\node_modules\\" } |
        ForEach-Object {
            Write-Host "Deleting: $($_.FullName)"
            Remove-Item -LiteralPath $_.FullName -Force
        }
}

Write-Host "Done. Please run your build/dev commands to verify." 
