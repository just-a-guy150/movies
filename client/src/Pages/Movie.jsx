import React from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import { useParams } from "react-router";

export default function Movie() {
    const { id } = useParams();
    return (
        <div style={{ width: "800px", margin: "0 auto" }}>
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
            />
        </div>
    )
}