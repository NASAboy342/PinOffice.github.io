param(
    [Parameter(Mandatory=$true, HelpMessage="Level of work [full],[base],[main],[game],[promotion]")]
    [string]$WorkLevel
)

$Coloris_Path = "D:\Clones\coloris\Coloris"
$Proxydia_Path = "D:\Clones\proxydia"
$Promodia_Path = "D:\Clones\promodia"
$Yog_Path = "D:\Clones\yog\Yog"
$Hermes_Path = "D:\Clones\hermes\Hermes"
$Monika_Path = "D:\Clones\monika\Monika"
$GitKraken_Path = "C:\Users\sopheaktra.pin\AppData\Local\gitkraken"
$Slack_Path = "C:\Users\sopheaktra.pin\AppData\Local\slack"

if($WorkLevel -eq "full"){
    Write-Output "Exicuting full work level"
    ii $Slack_Path\slack.exe
    ii $GitKraken_Path\gitkraken.exe
    ii $Proxydia_Path\Proxydia.sln
    ii $Promodia_Path\Promodia.sln
    ii $Yog_Path\Yog.sln
    ii $Hermes_Path\Hermes.sln
    ii $Monika_Path\Monika.sln
    ii $Coloris_Path\Coloris.sln
    Write-Output "Full work level done"
}
elseif ($WorkLevel -eq "game") {
    Write-Output "Exicuting game work level"
    ii $Slack_Path\slack.exe
    ii $GitKraken_Path\gitkraken.exe
    ii $Yog_Path\Yog.sln
    ii $Monika_Path\Monika.sln
    ii $Coloris_Path\Coloris.sln
    Write-Output "Game work level done"
}
elseif ($WorkLevel -eq "main") {
    Write-Output "Exicuting main work level"
    ii $Slack_Path\slack.exe
    ii $GitKraken_Path\gitkraken.exe
    ii $Monika_Path\Monika.sln
    ii $Coloris_Path\Coloris.sln
    Write-Output "Main work level done"
}
elseif ($WorkLevel -eq "base") {
    Write-Output "Exicuting base work level"
    ii $Slack_Path\slack.exe
    ii $GitKraken_Path\gitkraken.exe
    Write-Output "Base work level done"
}
elseif ($WorkLevel -eq "promotion") {
    Write-Output "Exicuting promotion work level"
    ii $Slack_Path\slack.exe
    ii $GitKraken_Path\gitkraken.exe
    ii $Monika_Path\Monika.sln
    ii $Coloris_Path\Coloris.sln
    ii $Proxydia_Path\Proxydia.sln
    ii $Promodia_Path\Promodia.sln
    Write-Output "Promotion work level done"
}
else {
    Write-Output "Invalid work level. Expecting [full, game, main, base]"
}