package repository

import (
	"github.com/gofiber/fiber/v2"
	"github.com/morkid/paginate"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"restaurant-information-system/database/migrations"
	"restaurant-information-system/database/models"
)

func ValidateStructProduct(product models.Product) []*ErrorResponse {

	var errors []*ErrorResponse
	err := validate.Struct(product)

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

func (repo *Repository) CreateProduct(ctx *fiber.Ctx) error {

	product := models.Product{}
	err := ctx.BodyParser(&product)

	if err != nil {
		return ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"Message": "Request failed"})
	}

	errors := ValidateStructProduct(product)

	if errors != nil {
		return ctx.Status(http.StatusBadRequest).JSON(errors)
	}

	if err := repo.DB.Create(&product).Error; err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"status": "error", "message": "Couldn't create product"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Product has been added", "data": product})

}

func (repo *Repository) UpdateProduct(ctx *fiber.Ctx) error {

	product := models.Product{}
	err := ctx.BodyParser(&product)

	if err != nil {
		err = ctx.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Request failed"})
		return err
	}

	errors := ValidateStructProduct(product)

	if errors != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(errors)
	}

	db := repo.DB
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	if db.Model(&product).Where("id = ?", id).Updates(&product).RowsAffected == 0 {
		ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get Product with given id"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Product successfully updated"})

}

func (repo *Repository) DeleteProduct(ctx *fiber.Ctx) error {

	productModel := migrations.Products{}
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusInternalServerError).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	err := repo.DB.Delete(productModel, id)

	if err.Error != nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "could not delete boo"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Product delete successfully"})

}

func (repo *Repository) GetProducts(ctx *fiber.Ctx) error {

	db := repo.DB
	model := db.Model(&migrations.Products{})

	pg := paginate.New(&paginate.Config{
		DefaultSize:        20,
		CustomParamEnabled: true,
	})

	page := pg.With(model).Request(ctx.Request()).Response(&[]migrations.Products{})

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"data": page})

}

func (repo *Repository) GetProductByID(ctx *fiber.Ctx) error {

	productModel := &migrations.Products{}
	id := ctx.Params("id")

	if id == "" {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "ID cannot be empty"})
	}

	err := repo.DB.Where("id = ?", id).First(productModel).Error

	if err != nil {
		return ctx.Status(http.StatusBadRequest).JSON(&fiber.Map{"message": "Could not get the product"})
	}

	return ctx.Status(http.StatusOK).JSON(&fiber.Map{"message": "Product id fetched successfully", "data": productModel})

}
