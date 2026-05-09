import { Route, Routes } from "react-router"
import Movie from "./Pages/Movie"
import SearchAppBar from "./components/header"
import Footer from "./components/Footer"
import Main from "./Pages/Main"
import { Container } from "@mui/material"

function App() {
    return (
        <div
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }
            }
        >
            <SearchAppBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/movie/:id" element={<Movie />}></Route>
                    <Route path="/*" element={<h1>Not Found</h1>}></Route>
                </Routes>
            </Container>
            <Footer />
        </div>
    )
}

export default App
