package migrations

import (
	"gorm.io/gorm"
	"time"
)

type Customers struct {
	ID          uint      `gorm:"primary key; autoIncrement" json:"id"`
	Name        *string   `json:"name"`
	Grade       *string   `json:"grade"`
	Description *string   `json:"description"`
	Date        time.Time `json:"date"`
}

func MigrateCustomers(db *gorm.DB) error {
	return db.AutoMigrate(&Customers{})
}
