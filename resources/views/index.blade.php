<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ガゾタン</title>
    @viteReactRefresh
    @vite([
    'resources/css/app.css',
    'resources/ts/index.tsx',
    ])
</head>
<body>
    <div id="app"></div>
</body>
</html>