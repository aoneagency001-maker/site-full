import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 * 
 * On-demand revalidation для Next.js ISR
 * Вызывается из админки после изменений контента
 */
export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidate-secret');
    const type = request.headers.get('x-revalidate-type') || 'page';

    // Проверка секрета
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid secret' 
        }, 
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paths } = body;

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Paths must be a non-empty array'
        },
        { status: 400 }
      );
    }

    const revalidatedPaths: string[] = [];

    // Revalidate каждый путь
    for (const path of paths) {
      try {
        revalidatePath(path, type);
        revalidatedPaths.push(path);
      } catch (error) {
        console.error(`Failed to revalidate ${path}:`, error);
      }
    }

    return NextResponse.json({ 
      success: true,
      revalidated: revalidatedPaths,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

