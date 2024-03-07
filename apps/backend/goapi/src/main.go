package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type StatusResponse struct {
	App       string    `json:"app"`
	Version   string    `json:"version"`
	Timestamp time.Time `json:"timestamp"`
}

func status(c *gin.Context) {
	c.JSON(http.StatusOK, StatusResponse{
		App:       "goapi",
		Version:   "1.0.0",
		Timestamp: time.Now().UTC(),
	})
}

type Book struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
}

type BooksResponse struct {
	Books []Book `json:"books"`
}

func books(c *gin.Context) {
	c.JSON(http.StatusOK, BooksResponse{
		Books: []Book{
			{Id: 1, Title: "The Catcher in the Rye", Author: "J.D. Salinger"},
			{Id: 2, Title: "To Kill a Mockingbird", Author: "Harper Lee"},
			{Id: 3, Title: "1984", Author: "George Orwell"},
		},
	})
}

type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func not_found(c *gin.Context) {
	c.JSON(http.StatusNotFound, Response{
		Code:    http.StatusNotFound,
		Message: "Not found",
	})
}

func main() {
	router := gin.Default()
	router.Any("/", not_found)
	router.Any("/:any", not_found)
	router.GET("/books", books)
	router.GET("/status", status)

	router.Run("localhost:8001")
}
