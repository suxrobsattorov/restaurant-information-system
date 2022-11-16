package repository

import "gopkg.in/go-playground/validator.v9"

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()
