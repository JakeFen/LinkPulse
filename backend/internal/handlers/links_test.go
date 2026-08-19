package handlers

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGenerateRandomCode(t *testing.T) {
	code, err := GenerateRandomCode(6)

	if err != nil {
		t.Fatal(err)
	}

	if len(code) != 6 {
		t.Errorf("Expected code length 6 but got %d", len(code))
	}
}

func TestGenerateRandomCodeCharacters(t *testing.T) {
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

	code, err := GenerateRandomCode(20)

	if err != nil {
		t.Fatal(err)
	}

	for _, char := range code {
		if !strings.ContainsRune(characters, char) {
			t.Errorf("generated invalid character: %c", char)
		}
	}
}

// Tests a table of inputs
func TestValidateUrl(t *testing.T) {
	tests := []struct {
		name string
		url  string
		want bool
	}{
		{
			name: "valid https URL",
			url:  "https://google.com",
			want: true,
		},
		{
			name: "valid http URL",
			url:  "http://google.com",
			want: true,
		},
		{
			name: "invalid URL",
			url:  "hello",
			want: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := ValidateURL(tt.url)

			if (err == nil) != tt.want {
				t.Errorf("ValidateURL() error = %v, want valid = %v", err, tt.want)
			}
		})
	}

	fmt.Println(tests)
}

func TestCreateLinks(t *testing.T) {
	body := strings.NewReader(`{"url":"https://google.com"}`)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/links",
		body,
	)

	rec := httptest.NewRecorder()

	handler := Handler{}

	handler.CreateLinks(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", rec.Code)
	}
}

func TestCreateLinksMissingURL(t *testing.T) {
	body := strings.NewReader(`{"url":""}`)

	req := httptest.NewRequest(
		http.MethodPost,
		"/api/links",
		body,
	)

	rec := httptest.NewRecorder()

	handler := Handler{}

	handler.CreateLinks(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", rec.Code)
	}
}

// TODO: Add integration tests for database-dependent handlers:
// - CreateLinks successful creation
// - RedirectLinks successful redirect
// - RedirectLinks 404 for missing short code
