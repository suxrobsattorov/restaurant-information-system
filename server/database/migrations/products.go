package migrations

import (
	"gorm.io/gorm"
	"time"
)

type Products struct {
	ID          uint      `gorm:"primary key; autoIncrement" json:"id"`
	Name        *string   `json:"name"`
	Price       *string   `json:"price"`
	Description *string   `json:"description"`
	Date        time.Time `json:"date"`
}

func MigrateProducts(db *gorm.DB) error {
	return db.AutoMigrate(&Products{})
}
