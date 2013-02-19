function CopyFolder($source, $destination, $excludes)
{
    $items = get-childitem $source -recurse -exclude $excludes
    foreach ($item in $items)
    {
        if (-not($item.PSIsContainer))
        {
            copy-item -path $item.FullName -destination $destination
        }
    }
}
$excludes = "*.min.js", "*.ts","*.d.js", "*.js.map"

CopyFolder "..\..\CycleR.Game.Client\Client\" ".\Resources" $excludes