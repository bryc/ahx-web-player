# This file is to update the file list for the app.
$Files  = Get-ChildItem ".\AHX\" -Recurse *.ahx
$Total = $Files.count
$Counter = 0
$Text = ""
foreach ($File in $Files) {
	$Text += Resolve-Path -Relative -LiteralPath $File.FullName
	$Counter += 1
	if($Counter -ne $Total) {$Text += "`r`n"}
}

$sw = New-Object System.IO.StreamWriter("dir.txt")
$sw.Write($Text)
$sw.Close()

Write-Host -NoNewLine "Execution ended. Press any key to quit..."
$void = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")