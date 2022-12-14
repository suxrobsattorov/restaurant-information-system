package repository

import (
	"github.com/gofiber/fiber/v2"
)

func (repo *Repository) SetupRoutes(app *fiber.App) {

	app.Static("/", "./client/public")

	api := app.Group("/api")

	api.Get("/products", repo.GetProducts)
	api.Post("/products", repo.CreateProduct)
	api.Patch("/products/:id", repo.UpdateProduct)
	api.Delete("/products/:id", repo.DeleteProduct)
	api.Get("/products/:id", repo.GetProductByID)

	api.Get("/customers", repo.GetCustomers)
	api.Post("/customers", repo.CreateCustomer)
	api.Patch("/customers/:id", repo.UpdateCustomer)
	api.Delete("/customers/:id", repo.DeleteCustomer)
	api.Get("/customers/:id", repo.GetCustomerByID)

}
