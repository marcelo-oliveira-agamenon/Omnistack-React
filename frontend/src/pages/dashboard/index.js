import React, { useEffect, useState } from "react";
import api from "../../services/api";
import socketio from "socket.io-client";
import "../dashboard/styles.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [spot, setSpot] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user");
    const socket = socketio("http://localhost:3333", {
      query: { user_id }
    });
  }, []);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpot(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-List">
        {spot.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/New">
        <button className="btnEntrar">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
