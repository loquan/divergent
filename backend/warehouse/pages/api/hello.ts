// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type Data = {
  name: string
}
const prisma = new PrismaClient();
export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // need this be set because the sever and client are running on the same machine
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
 

  const  result = await prisma.shelve.findMany({where: { shelveName:'aaa',id:{not:1}
  }});

  {
    exclude:{
      password: true
    }
  }

  let json = Object.assign({}, result);

  res.status(200).json( json )
}
