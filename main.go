package main

import (
	"fmt"
	"misc_go_server/controllers"
	"net/http"
)

func main() {
	healthController := &controllers.Health{}
	filesController := &controllers.Files{}
	cacheController := controllers.NewCache()

	http.HandleFunc("/", healthController.Health)
	http.Handle("/minesweeper", filesController.ServeMinesweeper())
	http.HandleFunc("/cache", cacheController.HandleCache)

	fmt.Println("Listening on port 8080...")
	http.ListenAndServe(":8080", nil)
}
