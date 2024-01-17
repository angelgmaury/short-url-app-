import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const id = params.id;
  /* 
  return NextResponse.json({
    data: {
      id,
    },
  }); */
  try {
    const dataDB = await prisma.linkShort.findUnique({
      where: {
        shortUrl: id as string,
      },
    });

    if (dataDB) {
      console.log("URL corta encontrada:", dataDB.url);
      return NextResponse.json({ url: dataDB.url });
    } else {
      console.log("URL corta no encontrada");
      return NextResponse.json(
        { error: "URL corta no encontrada" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error al buscar la URL corta:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
