import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src", "data", "feedback.json");
    
    let feedbackList = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      feedbackList = fileData ? JSON.parse(fileData) : [];
    }

    const newFeedback = {
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    feedbackList.push(newFeedback);
    
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(feedbackList, null, 2));

    return NextResponse.json({ success: true, feedback: newFeedback }, { status: 201 });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
