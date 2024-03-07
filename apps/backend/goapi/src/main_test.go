package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestStatus(t *testing.T) {
	router := gin.Default()
	router.GET("/status", status)

	req, err := http.NewRequest("GET", "/status", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusOK)
	assert.Contains(t, rr.Body.String(), "goapi")
	assert.Contains(t, rr.Body.String(), "1.0.0")
	assert.Contains(t, rr.Body.String(), "timestamp")
}

func TestBooks(t *testing.T) {
	router := gin.Default()
	router.GET("/books", books)

	req, err := http.NewRequest("GET", "/books", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	assert.Equal(t, rr.Code, http.StatusOK)
	assert.Equal(t, rr.Body.String(), "{\"books\":[{\"id\":1,\"title\":\"The Catcher in the Rye\",\"author\":\"J.D. Salinger\"},{\"id\":2,\"title\":\"To Kill a Mockingbird\",\"author\":\"Harper Lee\"},{\"id\":3,\"title\":\"1984\",\"author\":\"George Orwell\"}]}")
	assert.Contains(t, rr.Body.String(), "The Catcher in the Rye")
	assert.Contains(t, rr.Body.String(), "To Kill a Mockingbird")
	assert.Contains(t, rr.Body.String(), "1984")
}

func TestNotFound(t *testing.T) {
	router := gin.Default()
	router.Any("/", not_found)
	router.Any("/:any", not_found)

	req, err := http.NewRequest("GET", "/not-found", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusNotFound, rr.Code)
	assert.Equal(t, "{\"code\":404,\"message\":\"Not found\"}", rr.Body.String())
}
