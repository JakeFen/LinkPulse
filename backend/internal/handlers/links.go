package handlers

// TODO: short_code protection in the DB?
// Make sure LinksResponse has appropriate JSON tags.
// Return an explicit status code from CreateLinks.
// Set Content-Type: application/json.
// Make sure http.ListenAndServe errors are handled.

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"

	"github.com/JakeFen/LinkPulse/backend/internal/database"
	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/jackc/pgx/v5"
)

type LinksRequest struct {
	URL string `json:"url"`
}

type LinksResponse struct {
	ShortCode string `json:"shortCode"`
	ShortLink string `json:"shortLink"`
}

func (h Handler) CreateLinks(w http.ResponseWriter, r *http.Request) {
	var request LinksRequest
	err := json.NewDecoder(r.Body).Decode(&request)

	// Check for error
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	// Check for url in request
	if request.URL == "" {
		http.Error(w, "ERROR: Missing URL", http.StatusBadRequest)
		return
	}

	if err := ValidateURL(request.URL); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	claims, ok := clerk.SessionClaimsFromContext(r.Context())

	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	clerkID := claims.Subject
	userID, err := database.GetOrCreateUser(h.DB, clerkID)

	shortCode, shortCodeErr := GenerateRandomCode(6)

	if shortCodeErr != nil {
		http.Error(w, "Failed to generate short code", http.StatusInternalServerError)
		return
	}

	_, dbErr := h.DB.Exec(context.Background(), "INSERT INTO links (short_code, original_url, user_id) VALUES ($1, $2, $3)",
		shortCode,
		request.URL,
		userID,
	)

	if dbErr != nil {
		http.Error(w, "Failed to save link", http.StatusInternalServerError)
		return
	}

	response := LinksResponse{
		ShortCode: shortCode,
		ShortLink: "http://localhost:8080/" + shortCode,
	}

	json.NewEncoder(w).Encode(response)
}

func (h Handler) RedirectLinks(w http.ResponseWriter, r *http.Request) {
	shortCode := r.PathValue("shortCode")

	var originalURL string

	dbErr := h.DB.QueryRow(
		context.Background(),
		`SELECT original_url FROM links WHERE short_code = $1`,
		shortCode,
	).Scan(&originalURL)

	if errors.Is(dbErr, pgx.ErrNoRows) {
		http.Error(w, "Short link not found", http.StatusNotFound)
		return
	}

	if dbErr != nil {
		http.Error(w, "Failed to find original URL", http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, originalURL, http.StatusFound)
}

func GenerateRandomCode(codeLength int) (string, error) {
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

	code := make([]byte, codeLength)
	_, err := rand.Read(code)
	result := make([]byte, codeLength)

	if err != nil {
		return "", err
	}

	for i := 0; i < codeLength; i++ {
		// mod by length of characters
		randomChar := code[i] % byte(len(characters))

		// Set exact place in result to byte value of the generated char
		result[i] = characters[randomChar]
	}

	return string(result), nil
}

func ValidateURL(uncheckedURL string) error {
	parseURL, urlErr := url.Parse(uncheckedURL)

	if urlErr != nil || parseURL.Host == "" {
		return fmt.Errorf("invalid URL")
	}

	if parseURL.Scheme != "http" && parseURL.Scheme != "https" {
		return fmt.Errorf("URL must contain http or https")
	}

	return nil
}
