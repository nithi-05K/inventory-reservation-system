"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  totalUnits: number;
  reservedUnits: number;

  product: {
    id: string;
    name: string;
    description: string;
  };

  warehouse: {
    id: string;
    name: string;
    location: string;
  };
};

export default function Home() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [message, setMessage] =
    useState("");

  const [reservationId, setReservationId] =
    useState("");

  async function fetchProducts() {

    const response = await fetch(
      "/api/products"
    );

    const data = await response.json();

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserveProduct(
    productId: string,
    warehouseId: string
  ) {

    const response = await fetch(
      "/api/reservations",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId,
          warehouseId,
          quantity: 1,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {

      setReservationId(
        data.reservation.id
      );

      setMessage(
        "Reservation created successfully"
      );

      fetchProducts();

    } else {

      setMessage(
        data.error || "Reservation failed"
      );
    }
  }

  async function confirmReservation() {

    if (!reservationId) return;

    const response = await fetch(
      `/api/reservations/${reservationId}/confirm`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) {

      setMessage(
        "Reservation confirmed successfully"
      );

      fetchProducts();

    } else {

      setMessage(
        data.error || "Confirmation failed"
      );
    }
  }

  async function releaseReservation() {

    if (!reservationId) return;

    const response = await fetch(
      `/api/reservations/${reservationId}/release`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) {

      setMessage(
        "Reservation released successfully"
      );

      fetchProducts();

    } else {

      setMessage(
        data.error || "Release failed"
      );
    }
  }

  return (

    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "10px",
        }}
      >
        Inventory Reservation System
      </h1>

      <p
        style={{
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Reserve and manage inventory items.
      </p>

      {message && (

        <div
          style={{
            backgroundColor: "#d1fae5",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >

        {products.map((item) => (

          <div
            key={item.id}

            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >

            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              {item.product.name}
            </h2>

            <p>
              {item.product.description}
            </p>

            <p>
              <strong>Warehouse:</strong>
              {" "}
              {item.warehouse.name}
            </p>

            <p>
              <strong>Location:</strong>
              {" "}
              {item.warehouse.location}
            </p>

            <p>
              <strong>Available Stock:</strong>
              {" "}
              {item.totalUnits - item.reservedUnits}
            </p>

            <button
              onClick={() =>
                reserveProduct(
                  item.product.id,
                  item.warehouse.id
                )
              }

              style={{
                padding: "12px 24px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "15px",
                fontSize: "16px",
              }}
            >
              Reserve
            </button>

          </div>
        ))}
      </div>

      {reservationId && (

        <div
          style={{
            marginTop: "40px",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >

          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            Reservation Actions
          </h2>

          <p
            style={{
              marginBottom: "20px",
            }}
          >
            <strong>Reservation ID:</strong>
            {" "}
            {reservationId}
          </p>

          <button
            onClick={confirmReservation}

            style={{
              padding: "12px 24px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "16px",
            }}
          >
            Confirm Purchase
          </button>

          <button
            onClick={releaseReservation}

            style={{
              padding: "12px 24px",
              backgroundColor: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Cancel Reservation
          </button>

        </div>
      )}

    </main>
  );
}
