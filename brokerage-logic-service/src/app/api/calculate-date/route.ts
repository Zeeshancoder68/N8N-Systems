import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { acceptance_date, days_to_add } = body;

    if (!acceptance_date || typeof days_to_add !== 'number') {
      return NextResponse.json(
        { error: "Missing 'acceptance_date' or 'days_to_add' in payload." }, 
        { status: 400 }
      );
    }

    // Perform the date math
    const startDate = new Date(acceptance_date);
    startDate.setDate(startDate.getDate() + days_to_add);

    // Format output as YYYY-MM-DD
    const calculatedDeadline = startDate.toISOString().split('T')[0];

    return NextResponse.json({
      success: true,
      original_date: acceptance_date,
      days_added: days_to_add,
      computed_deadline: calculatedDeadline
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload." }, 
      { status: 500 }
    );
  }
}