import React from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useParams } from "react-router";
import { styled } from "styled-components";
import { Box } from "@mui/material";

export default function Movie() {
    const { id } = useParams();
    return (
        <Wrapper>
            <Plyr
                source={{
                    type: "video",
                    sources: [
                        {
                            src: "http://localhost:3000/movies/" + id
                        }
                    ],
                    poster: "http://localhost:3000/posters.jpg",
                }}
                options={{
                    controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen", "settings"],
                }}
                style={{ height: "100%" }}
            />
        </Wrapper>
    )
}

let Wrapper = styled(Box)`
    display: grid;
    grid-template-columns: 1fr;
    margin: 2 rem 0;
    border: 20px solid white;
    height: 80vh;
`