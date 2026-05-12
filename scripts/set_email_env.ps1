# set_email_env.ps1
# Prompts for SendGrid or SMTP credentials, writes .env in project folder, and can start the server.

Write-Host "Choose email method: 1) SendGrid (recommended)  2) SMTP (Gmail/App Password)"
$choice = Read-Host "Enter 1 or 2"

function Read-SecureStringToPlain([string]$prompt) {
  $sec = Read-Host $prompt -AsSecureString
  $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
  try { $unsecure = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) } finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
  return $unsecure
}

$envLines = @()
if ($choice -eq '1') {
  $key = Read-SecureStringToPlain "Enter SENDGRID_API_KEY (input hidden)"
  $envLines += "SENDGRID_API_KEY=$key"
} else {
  $email = Read-Host "Enter EMAIL_USER (e.g. you@gmail.com)"
  $pwd = Read-SecureStringToPlain "Enter EMAIL_PASSWORD (App Password, input hidden)"
  $admin = Read-Host "Enter ADMIN_EMAIL (receives admin copies)"
  $envLines += "EMAIL_USER=$email"
  $envLines += "EMAIL_PASSWORD=$pwd"
  $envLines += "ADMIN_EMAIL=$admin"
}

# Backup existing .env if present
if (Test-Path .env) {
  $bak = ".env.bak.$((Get-Date).ToString('yyyyMMddHHmmss'))"
  Copy-Item .env $bak
  Write-Host "Existing .env backed up to $bak"
}

$envContent = $envLines -join "`n" + "`n"
Set-Content -Path .env -Value $envContent -Encoding UTF8
Write-Host ".env created/updated in project folder:`n$(Get-Location)\env"

$start = Read-Host "Start server now? (y/n)"
if ($start -eq 'y') {
  Write-Host "Starting server (node server.js)..."
  node server.js
} else {
  Write-Host "Run `node server.js` to start the server when ready."
  Write-Host "You can test sending using: node post_test.js (edit test_payload.json first)"
}
