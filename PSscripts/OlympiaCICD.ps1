
# Parameters Description
$websiteDirectory = "D:\WebSite\Olimpia"
$OlimpiaProjectDirectory = "D:\Clones\olympia"
$publishDirectory = $OlimpiaProjectDirectory + "\.output"

# Procedure

write-output "Going into Olimpia project directory ["+$OlimpiaProjectDirectory+"]"
cd $OlimpiaProjectDirectory

write-output "Start building project"
npm run build
Write-Output "Build done"

Write-Output "Going into Olimpia publish directory ["+$publishDirectory+"]"
cd $publishDirectory

write-output "start Copying publish file into website directory ["+ $websiteDirectory +"]"
Get-ChildItem -Recurse $publishDirectory | ForEach-Object {
    $relativePath = $_.FullName.Substring($publishDirectory.Length)
    $destinationPath = Join-Path -Path $websiteDirectory -ChildPath $relativePath
    if (Test-Path $_.FullName -PathType Container) {
        New-Item $destinationPath -ItemType Directory -Force | Out-Null
    } else {
        Copy-Item -Force $_.FullName -Destination $destinationPath
    }
}

Write-Output "=========================="
Write-Output "      Copying done"
Write-Output "=========================="
