# This file is to update the file list for the app.
$Files  = Get-ChildItem ".\AHX\" -Recurse *.ahx
$Total = $Files.count
$Counter = 0
$Text = "var JSLIST = ["
foreach ($File in $Files) {
    $Text += "`""
	$Text += Resolve-Path -Relative -LiteralPath $File.FullName
    $Text += "`""
	$Counter += 1
	if($Counter -ne $Total) {$Text += ",`r`n"}
}
$Text += "];"
$Text = $Text -replace '\\','\\'
$sw = New-Object System.IO.StreamWriter("dir.js")
$sw.Write($Text)
$sw.Close()

Write-Host -NoNewLine "Execution ended. Press any key to quit..."
$void = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")