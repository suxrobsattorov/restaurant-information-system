package models

type Product struct {
	Name        string `json:"name"`
	Price       string `json:"price"`
	Description string `json:"description"`
	Date        string `json:"date"`
}
