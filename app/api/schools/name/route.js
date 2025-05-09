import connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import School from "@/lib/modals/school";

export const GET = async (request) => {
  const {searchParams} = new URL(request.url)
  const number = searchParams.get('n');
  try {
    
    
    const aNumber = parseInt(number)
    await connect();

    const school = await School.findOne({ n: aNumber });

    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({schoolName: school.name}, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3000, stale-while-revalidate", // Cache for 50 minutes, serve stale content while revalidating
        "x-next-cache-tags": "schools"
      },
    });
  } catch (error) {
    console.log('ERROR:', error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
};
