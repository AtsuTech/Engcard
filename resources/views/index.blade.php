<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Engcard</title>
    @viteReactRefresh
    @vite([
    'resources/css/app.css',
    'resources/ts/index.tsx',
    ])
</head>
<body id="body">
    <div id="app"></div>
</body>
</html>