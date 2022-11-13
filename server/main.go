package main

import (
	"github.com/gofiber/fiber/v2"
	"restaurant-information-system/bootstrap"
)

func main() {

	app := fiber.New()
	bootstrap.InitializeApp(app)

}
