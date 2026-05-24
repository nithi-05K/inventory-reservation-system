export default function Home() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#111", fontSize: "40px" }}>
        Inventory Reservation System
      </h1>

      <p style={{ marginTop: "20px", fontSize: "18px" }}>
        Backend APIs are successfully deployed on Vercel.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <h2>Available APIs</h2>

        <ul>
          <li>POST /api/reservations</li>
          <li>POST /api/reservations/:id/confirm</li>
        </ul>
      </div>
    </main>
  );
}