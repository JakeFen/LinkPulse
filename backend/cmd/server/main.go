package main

import (
	"log"
	"net/http"

	"github.com/JakeFen/LinkPulse/backend/internal/handlers"
	"github.com/go-chi/chi/v5"
)

func main() {
	// Create router
	// Register routes
	// Start server

	r := chi.NewRouter()

	handlers.GenerateRandomCode(6)

	r.Get("/", handlers.Home)
	r.Get("/health", handlers.Health)
	r.Post("/api/links", handlers.CreateLinks)

	log.Println("LinkPulse server running on http://localhost:8080")

	http.ListenAndServe(":8080", r)

	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal(err)
	}
}
