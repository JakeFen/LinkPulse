package handlers

import (
	"crypto/rand"
	"encoding/json"
	"net/http"
)

type LinksRequest struct {
	URL string `json:"url"`
}

type LinksResponse struct {
	ShortCode string `json:"shortCode"`
	ShortLink string `json:"shortLink"`
}

func CreateLinks(w http.ResponseWriter, r *http.Request) {
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

	shortCode, shortCodeErr := GenerateRandomCode(6)

	if shortCodeErr != nil {
		http.Error(w, "Failed to generate short code", http.StatusInternalServerError)
		return
	}

	response := LinksResponse{
		ShortCode: shortCode,
		ShortLink: "http://localhost:8080/" + shortCode,
	}

	json.NewEncoder(w).Encode(response)
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
