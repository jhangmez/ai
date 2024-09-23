import { NextResponse } from 'next/server'
import { calculateSimilarity } from '@utils/similarity'

export async function POST(request: Request) {
  const { abstract, objectives } = await request.json()

  try {
    const similarity = await calculateSimilarity(abstract, objectives)
    return NextResponse.json(similarity)
  } catch (error) {
    console.error('Error calculating similarity:', error)
    return NextResponse.json(
      { error: 'Error calculating similarity' },
      { status: 500 }
    )
  }
}
