import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type Data = {
  name: string
}
const prisma = new PrismaClient();





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  let warehouses : any ;  
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // need this be set because the sever and client are running on the same machine
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  switch (req.method)
  { 
    case 'POST':
        let createData = await prisma.warehouse.create({data:{}});
        warehouses =  await prisma.warehouse.findMany({where: {remove: false
        }});
        res.status(200).json(warehouses);
    break;  
    case 'GET':
         
        // const result = await prisma.warehouse.update({
        //     where:{
        //         id:1
        //     },
        //     data:{remove:true}
        //     }
        // )
        warehouses =  await prisma.warehouse.findMany({where: {remove: false
          }}); 
        //console.log("data",werehouses)
        
       
        let json = Object.assign({}, warehouses);
        
        return res.status(200).json(json);
        
        //res.status(200);
    break;    
    case 'DELETE':
        const result2 = await prisma.warehouse.update({
            where:{
                id:1
            },
             data:{remove:true}
            }
        )
        //const result = await prisma.$queryRaw`Update remove =false FROM warehouse where id=1`

    break;
  }


  //res.status(200).json({ name: 'data complete' })
}
