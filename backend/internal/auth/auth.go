package auth

import (
	"net/http"

	clerkhttp "github.com/clerk/clerk-sdk-go/v2/http"
)

func Middleware(next http.Handler) http.Handler {
	return clerkhttp.RequireHeaderAuthorization()(next)
}
