module github.com/JakeFen/LinkPulse/backend

go 1.26.6

// Used to simplify http router and organize api requests
require github.com/go-chi/chi/v5 v5.3.1 // direct

require github.com/jackc/pgx/v5 v5.10.0

require (
	github.com/clerk/clerk-sdk-go/v2 v2.7.0 // indirect
	github.com/go-jose/go-jose/v3 v3.0.4 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/joho/godotenv v1.5.1 // indirect
	golang.org/x/crypto v0.43.0 // indirect
	golang.org/x/text v0.30.0 // indirect
)
