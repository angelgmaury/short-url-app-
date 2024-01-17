import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const url = requestData.url;

    const shortUrl = Math.random().toString(36).substring(2, 7);

    const dataDB = await prisma.linkShort.create({
      data: { url, shortUrl },
    });

    return NextResponse.json(dataDB);
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
