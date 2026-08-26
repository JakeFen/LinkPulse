package database

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5"
)

func Connect() (*pgx.Conn, error) {
	databaseURL := os.Getenv("DATABASE_URL")

	conn, err := pgx.Connect(
		context.Background(),
		databaseURL,
	)

	if err != nil {
		return nil, err
	}

	return conn, nil
}
