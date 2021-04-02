package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

// (ex) searh "gc" constraint "{tag:true}"
func main() {
	// logger
	log.SetPrefix("server.go: ")
	log.SetFlags(4)
	fmt.Printf("%d\n", log.LstdFlags)
	// plus, minus, plusname, err := mod.Plusminus(100, 200, "")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// HTTP : get search string & constraints
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Run()

	// logic : make query string

	// logic : where to query?

	// spawn goroutine : send query

	// HTTP : response

}

// full-text index table
// index(ngram) : uuid
