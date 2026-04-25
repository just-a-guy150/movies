const express = require('express')
const db = require('./db')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

function getMovie(req, res) {
    const videoPath = path.resolve(__dirname, 'movies', req.filename)
    const stat = fs.statSync(videoPath)
    const fileSize = stat.size
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        if (start >= fileSize) {
            res.status(416).send('Range is not satisfiable')
            return
        }

        const chunkSize = end - start + 1
        const file = fs.createReadStream(videoPath, { start, end })
        const head = {
            'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }

        res.writeHead(200, head)
        fs.createReadStream(videoPath).pipe(res)
    }
}

app.get(
    "/movies/:id",
    (req, res, next) => {
        const id = req.params.id
        db.query("SELECT * FROM movies WHERE id = ?", [id], (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error")
            } else {
                if (result.length === 0) {
                    res.status(404).send("movie is not found")
                } else {
                    req.filename = result[0].filename
                    next()
                }
            }
        })
    },
    getMovie
)

app.get("/movies", (req, res) => {
	let query = "SELECT * FROM movies"
	let queryParams = []

	if (req.query.sort) {
		if (
			["id", "title", "raiting"].includes(req.query.sort)
		) {
			query += " ORDER BY " + req.query.sort
		} else {
			return res.status(400).send("Invalid sort field")
		}
	}

	if (req.query.sortType) {
		const sortType = req.query.sortType.toUpperCase()

		if (
			["ASC", "DESC"].includes(sortType)
		) {
			query += " " + sortType
		} else {
			return res.status(400).send("Invalid sort type")
		}
	}

	if (req.query.limit) {
		const limit = parseInt(req.query.limit, 10)

		if (
			!isNaN(limit) && limit > 0
		) {
			query += " LIMIT ?"
			queryParams.push(limit)
		} else {
			return res.status(400).send("Invalid limit")
		}
	}

	if (req.query.offset) {
		const offset = parseInt(req.query.offset, 10)

		if (
			!isNaN(offset) && offset > 0
		) {
			query += " OFFSET ?"
			queryParams.push(offset)
		} else {
			return res.status(400).send("Invalid limit")
		}
	}

	db.query(query, queryParams, (err, results) => {
		if(err) {
			console.error("SQL Error", err)
			res.status(500).send("Intenal Server Error")
		} else {
			res.json(results)
		}
	})

})

app.get("/search", (req, res) => {
    if (!req.query.title) {
        return res.status(400).send("Title parameter is required")
    }

    const title = `%${req.query.title}%`
    const query = "SELECT * FROM movies WHERE title LIKE ? LIMIT 10"

    db.query(query, [title], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send("Internal Server Error")
        } else {

            res.json(result)
        }
    })  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})