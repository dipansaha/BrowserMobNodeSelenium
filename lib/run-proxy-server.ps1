Write-Host "Importing ssl cert to Trusted Root Certification Authorities..."

$certPath = "browsermob-proxy/ssl-support"
$fileExtension = ".cer"

if(Test-Path $certPath) {
   $certFiles = Get-ChildItem $certPath | where {$_.Extension -match $fileExtension}

   foreach($certFile in $certFiles){
       $filepath = $certPath + "/" +  $certFile
       $certFullPath = Resolve-Path $filepath

       $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
       $cert.Import($certFullPath)
       $certStore = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root","LocalMachine")
       $certStore.Open("MaxAllowed") 
       $certStore.Add($cert) 
       $certStore.Close()
       Write-Host "Certificate" $certfile "- imported successfully!"

   }
} else {
    Write-Host 'certificate does not exist.'
}

$proxyPath = Resolve-Path "browsermob-proxy/bin/browsermob-proxy.bat"

Write-Host "Starting Browsermob Proxy server..."

& $proxyPath



