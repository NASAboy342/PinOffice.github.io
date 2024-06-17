$uri = 'http://localhost:457/api/CicdController/update-website-ip'

$response = Invoke-RestMethod -Uri $uri -Method Get

$response