package handlers

import (
	"encoding/json"
	"net/http"
)

type HealthResponse struct {
	Status string // Capitalized = exposed, lowercase = not exposed
}

func Health(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status: "ok",
	}

	json.NewEncoder(w).Encode(response)
}
