import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session?.user?.email !== "vineetbt4@gmail.com") {
    redirect("/api/auth/signin");
  }

  const filePath = path.join(process.cwd(), "src", "data", "feedback.json");
  let feedbackList: any[] = [];

  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      feedbackList = fileData ? JSON.parse(fileData) : [];
    }
  } catch (error) {
    console.error("Error reading feedback data:", error);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.email}</p>

      <div style={{ marginTop: "20px" }}>
        <h2>Feedback Statistics</h2>
        <p>Total Feedback Submitted: {feedbackList.length}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Feedback Entries</h2>
        {feedbackList.length === 0 ? (
          <p>No feedback available yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {feedbackList.map((fb: any) => (
              <li key={fb.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
                <strong>{fb.name}</strong> <em>({new Date(fb.createdAt).toLocaleString()})</em>
                <p>{fb.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
