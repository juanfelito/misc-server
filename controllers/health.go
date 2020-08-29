package controllers

import "net/http"

type Health struct{}

func (h *Health) Health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Server running..."))
}
