
# Parameters Description
$projectDirectory = "D:\Clones\PinOffice.github.io"
$websiteDirectory = "D:\WebSite\SpinPort"
$distDirectory = $projectDirectory + "\V2VuePinPort\V2PinPort\dist"
$V2PinPortProjectDirectory = $projectDirectory + "\V2VuePinPort\V2PinPort"

# Procedure
Write-Output "Going into project directory ["+$projectDirectory+"]"
cd $projectDirectory

write-output "Start pulling project from project repository"
git pull origin
write-output "Pulling done"

write-output "Going into V2PinPort project directory ["+$V2PinPortProjectDirectory+"]"
cd $V2PinPortProjectDirectory

write-output "Start building project"
npm run build
Write-Output "Build done"

Write-Output "Going into V2PinPort dist directory ["+$distDirectory+"]"
write-output "start Copying dists file into website directory ["+ $websiteDirectory +"]"
Get-ChildItem -Recurse $distDirectory | ForEach-Object {
    $relativePath = $_.FullName.Substring($distDirectory.Length)
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
