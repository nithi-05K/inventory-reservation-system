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
        "Reservation confirmed"
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
        "Reservation released"
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
      }}
    >

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        Inventory Reservation System
      </h1>

      {message && (

        <p
          style={{
            padding: "10px",
            background: "#eee",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
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
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
            }}
          >

            <h2>
              {item.product.name}
            </h2>

            <p>
              {item.product.description}
            </p>

            <p>
              Warehouse:
              {" "}
              {item.warehouse.name}
            </p>

            <p>
              Location:
              {" "}
              {item.warehouse.location}
            </p>

            <p>
              Available Stock:
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
                padding: "10px 20px",
                marginTop: "10px",
                cursor: "pointer",
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
          }}
        >

          <h2>
            Reservation Actions
          </h2>

          <p>
            Reservation ID:
            {" "}
            {reservationId}
          </p>

          <button
            onClick={confirmReservation}

            style={{
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            Confirm Purchase
          </button>

          <button
            onClick={releaseReservation}

            style={{
              padding: "10px 20px",
            }}
          >
            Cancel Reservation
          </button>

        </div>
      )}

    </main>
  );
}