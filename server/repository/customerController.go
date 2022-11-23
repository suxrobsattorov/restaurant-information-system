package repository

import (
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"restaurant-information-system/database/migrations"
	"restaurant-information-system/database/models"
)

func ValidateStructCustomer(customer models.Customer) []*ErrorResponse {

	var errors []*ErrorResponse
	err := validate.Struct(customer)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}

	return errors

}

func (repo *Repository) CreateCustomer(ctx *fiber.Ctx) error {

	customer := models.Customer{}
	err := ctx.BodyParser(&customer)

	if err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"Message": "Request failed"})
	}

	errors := ValidateStructCustomer(customer)

	if errors != nil {
		return ctx.Status(http.StatusBadRequest).JSON(errors)
	}

	if err := repo.DB.Create(&customer).Error; err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"status": "error", "message": "Couldn't create customer"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Customer has been added", "data": customer})

}

func (repo *Repository) UpdateCustomer(ctx *fiber.Ctx) error {

	customer := models.Customer{}
	err := ctx.BodyParser(&customer)

	if err != nil {
		err = ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Request failed"})
		return err
	}

	errors := ValidateStructCustomer(customer)

	if errors != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := repo.DB
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	if db.Model(&customer).Where("id = ?", id).Updates(&customer).RowsAffected == 0 {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get Customer with given id"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Customer successfully updated"})

}

func (repo *Repository) DeleteCustomer(ctx *fiber.Ctx) error {

	customerModel := migrations.Customers{}
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	err := repo.DB.Delete(customerModel, id)

	if err.Error != nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "could not delete boo"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Customer delete successfully"})

}

func (repo *Repository) GetCustomers(ctx *fiber.Ctx) error {

	db := repo.DB
	model := db.Model(&migrations.Customers{})

	pg := paginate.New(&paginate.Config{
		DefaultSize:        20,
		CustomParamEnabled: true,
	})

	page := pg.With(model).Request(ctx.Request()).Response(&[]migrations.Customers{})

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"data": page})

}

func (repo *Repository) GetCustomerByID(ctx *fiber.Ctx) error {

	customerModel := &migrations.Customers{}
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	err := repo.DB.Where("id = ?", id).First(customerModel).Error

	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get the customer"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Customer id fetched successfully", "data": customerModel})

}
