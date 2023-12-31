import axios from 'axios';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateCode = searchParams.get('stateCode');
    const parkCode = searchParams.get('parkCode');
    const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
      headers: {
        Accept: 'application/json',
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_NP_API_KEY,
        stateCode,
        parkCode,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
  }
}
