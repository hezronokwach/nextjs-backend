import Task from "@/app/lib/models/models";
import connectMongoDB from "@/app/lib/mongodbConnection";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();
        await connectMongoDB();
        await Task.create({ title, description });
        return NextResponse.json({ message: "Task Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const tasks = await Task.find();
        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return NextResponse.json({ error: "Failed to retrieve tasks" }, { status: 500 });
    }
}
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await Task.findByIdAndDelete(id);
        return NextResponse.json({ message: "Task deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}

