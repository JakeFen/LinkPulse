package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/JakeFen/linkpulse/backend/internal/auth"
	"github.com/JakeFen/linkpulse/backend/internal/database"
	"github.com/JakeFen/linkpulse/backend/internal/handlers"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))

	// Create the HTTP router that will receive incoming requests
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://linkpulse-5gpc44zwo-jake-fen.vercel.app"},
		AllowedMethods:   []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

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

	r.With(auth.Middleware).Post("/api/links", handler.CreateLinks)
	r.With(auth.Middleware).Get("/api/links", handler.GetLinksByProviderID)
	r.With(auth.Middleware).Delete("/api/links/{id}", handler.DeleteLink)

	r.Get("/{shortCode}", handler.RedirectLinks)

	// Start the HTTP server and give it our router.
	// ListenAndServe blocks here while the server is running.
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	log.Printf("linkpulse server running on port %s", port)

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}
