$Files = Get-ChildItem '.\AHX\' -Recurse *.ahx
$Total = $Files.count

$Text = 'var FILEZ=['
for ($i = 0; $i -lt $Total; $i++) {
    $Path = (Resolve-Path -Relative -LiteralPath $Files[$i].FullName).replace('.\AHX\','').replace('.ahx','').replace('\','/')
    Write-Host ($i+1) - $Path ($Total)
    $Text += "`"$Path`""
    if($i -ne $Total - 1) {$Text += ','} else {$Text += '];'}
}

$sw = New-Object System.IO.StreamWriter('dir.js')
$sw.Write($Text)
$sw.Close()

Write-Host -NoNewLine 'Execution ended. Press any key to quit...'
$void = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')