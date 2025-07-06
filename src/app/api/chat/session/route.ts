import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config';

export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL;

    console.log("backendUrl", backendUrl);
    
    const response = await fetch(`${config.backendUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': request.ip || request.headers.get('x-forwarded-for') || 'unknown',
        'User-Agent': request.headers.get('user-agent') || 'unknown',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
} 