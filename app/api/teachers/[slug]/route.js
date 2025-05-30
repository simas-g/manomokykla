
import Teacher from "@/lib/modals/teacher";
import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const PUT = async (request, { params }) => {
  const slug = (await params).slug;
  try {
    await connect();

    const teacher = await Teacher.findOne({ url: slug });

    if (!teacher) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(teacher, {
      status: 200,
    });
  } catch (error) {
    console.log('ERROR:', error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
};