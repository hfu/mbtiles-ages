# mbtiles-ages
get ages of mbtiles packages

## to create mtime file
```console
$ node index.js
```

## to create bundle.js for the visualization site
```console
$ node main.js -o /somewhere/bundle.js
```

## config/default.hjson
```
{
  z: 6
  mbtiles: /somewhere/pietra/mbtiles
  dst: /somewhere/pietra/htdocs/age/mtime.json
}
```
