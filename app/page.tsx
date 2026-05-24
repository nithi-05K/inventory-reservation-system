export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        Inventory Reservation System
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Backend API assignment built using Next.js, Prisma, PostgreSQL, and
        Vercel.
      </p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Create Reservation API</h2>

        <p>
          <strong>POST</strong> /api/reservations
        </p>

        <pre
          style={{
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
{`{
  "productId": "cmpjk3ulg00006vvxmtlxfbhg",
  "warehouseId": "cmpjk3uut00026vvx0juq0lvg",
  "quantity": 2
}`}
        </pre>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Confirm Reservation API</h2>

        <p>
          <strong>POST</strong> /api/reservations/:id/confirm
        </p>
      </div>

      <p style={{ marginTop: "40px", color: "gray" }}>
        Deployment successful on Vercel.
      </p>
    </main>
  );
}