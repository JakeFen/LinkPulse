package main

import (
	"context"
	"log"
	"net/http"

	"github.com/JakeFen/LinkPulse/backend/internal/database"
	"github.com/JakeFen/LinkPulse/backend/internal/handlers"
	"github.com/go-chi/chi/v5"
)

func main() {
	// Create the HTTP router that will receive incoming requests
	r := chi.NewRouter()

	// Establish a connection to our PostgreSQL database.
	conn, err := database.Connect()

	// If the database connection fails, stop the application.
	if err != nil {
		log.Fatal(err)
	}

	// Create our handler and give it the database connection.
	// This allows handlers that need the database to access it
	// through h.DB instead of creating a new connection themselves.
	handler := handlers.Handler{
		DB: conn,
	}

	// Close the database connection when main() exits.
	// Prevents connection from being left open.
	defer conn.Close(context.Background())

	log.Println("Database connected!")

	// Register our application routes.
	// Each route maps an HTTP method + URL to a handler function.
	r.Get("/", handlers.Home)
	r.Get("/health", handlers.Health)
	r.Post("/api/links", handler.CreateLinks)
	r.Get("/{shortCode}", handler.RedirectLinks)

	// Start the HTTP server and give it our router.
	// ListenAndServe blocks here while the server is running.
	log.Println("LinkPulse server running on http://localhost:8080")

	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal(err)
	}
}
