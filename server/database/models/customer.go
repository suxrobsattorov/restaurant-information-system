package models

type Customer struct {
	Name        string `json:"name"`
	Grade       string `json:"grade"`
	Description string `json:"description"`
	Date        string `json:"date"`
}
