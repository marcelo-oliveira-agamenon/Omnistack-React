import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import socketio from "socket.io-client";
import "../dashboard/styles.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [spot, setSpot] = useState([]);
  const [request, setRequest] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequest([...request, data]);
    });
  }, [request, socket]);

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

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    setRequest(request.filter(req => req._id !== id));
  }

  async function handleRefuse(id) {
    await api.post(`/bookings/${id}/refuses`);

    setRequest(request.filter(req => req._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {request.map(req => {
          return (
            <li key={req._id}>
              <p>
                <strong>{req.user.email}</strong> está solicitando uma reserva
                em <strong>{req.spot.company}</strong> para a data:
                <strong>{req.date}</strong>
              </p>
              <button className="accept" onClick={() => handleAccept(req._id)}>
                ACEITAR
              </button>
              <button className="refuse" onClick={() => handleRefuse(req._id)}>
                RECUSAR
              </button>
            </li>
          );
        })}
      </ul>
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
