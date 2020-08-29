# Felipe's Miscellaneous Go server

To run the server simply use `go run main.go`. This will run it on `localhost:8080`

## Routes
At this time the server only has two endpoints `/minesweeper` and `/cache`

### Minesweeper
Going to `localhost:8080/minesweeper` will take you to the distribution version the minesweeperJS project contained on this repo. This endpoint is the generated static files served by Go.

To play just click the "Start new game" button.

You unveil cells by clicking on them, be careful with the mines! With right click you can flag or put a question mark over a cell.

At this time there's no end-state for the game when you discover all the tiles or when you click on a mine, just click "Start new game" again to keep play.


### Cache
This is a simple implementation of a HTTP cache, using memory. In here you can store and retrieve keys. No expiration at this time.
This resource has two endpoints:

`POST: localhost:8080/cache` stores a key from the cache passing an object of the following shape:
```json
{
    "Key": "test",
    "Value": "A value"
}
```

`GET: localhost:8080/cache` retrieves a key from the cache passing a `key` query parameter.
For example: `localhost:8080/cache?key=test`