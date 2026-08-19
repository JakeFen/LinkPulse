package database

import (
	"context"

	"github.com/jackc/pgx/v5"
)

func Connect() (*pgx.Conn, error) {
	conn, err := pgx.Connect(
		context.Background(),
		"postgres://linkpulse:linkpulse@localhost:5432/linkpulse",
	)

	if err != nil {
		return nil, err
	}

	return conn, nil
}
