import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locale } = body;

    // Validate locale
    if (locale !== 'ja' && locale !== 'en') {
      return NextResponse.json(
        { error: 'Invalid locale' },
        { status: 400 }
      );
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set locale' },
      { status: 500 }
    );
  }
}
