package controllers

import (
	"net/http"
)

type Files struct{}

func (f *Files) ServeMinesweeper() http.Handler {
	return http.StripPrefix("/minesweeper", http.FileServer(http.Dir("./minesweeperJS/dist")))
}
