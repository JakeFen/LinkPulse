package database

import (
	"context"

	"github.com/jackc/pgx/v5"
)

func GetOrCreateUser(db *pgx.Conn, providerID string) (int, error) {
	var userID int

	// find existing user
	// if not found, create user
	// return local database ID
	queryErr := db.QueryRow(context.Background(),
		`SELECT id FROM users WHERE provider_id = $1`, providerID).Scan(&userID)

	if queryErr == nil {
		return userID, nil
	}

	if queryErr != pgx.ErrNoRows {
		return 0, queryErr
	}

	insertErr := db.QueryRow(
		context.Background(), `INSERT INTO users (provider_id) VALUES ($1) RETURNING id`,
		providerID,
	).Scan(&userID)

	if insertErr != nil {
		return 0, insertErr
	}

	return userID, nil
}
