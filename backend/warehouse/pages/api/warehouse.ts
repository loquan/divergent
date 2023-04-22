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
  let valueString=req.method;
  console.log(valueString);
  console.log("status");
  switch (req.method)
  { 
    case 'POST':
        let createData = await prisma.warehouse.create({data:{}});
        warehouses =  await prisma.warehouse.findMany({where: {remove: false
        }});
        return res.status(200).json(warehouses);
    break;  
    case 'GET':
         

        warehouses =  await prisma.warehouse.findMany({where: {remove: false
          }}); 
        
        
       
        let json = Object.assign({}, warehouses);
        return res.status(200).json(json);
        
        //res.status(200);
    break;    
    case 'OPTIONS':
        console.log("delete");
        let idValue:number = parseInt( req.query.id);
        const result2 = await prisma.warehouse.update({
            where:{
                id:idValue
            },
             data:{remove:true}
            }
        )
        

        
        res.status(200).json({ name: 'John Doe' })
       
        //const result = await prisma.$queryRaw`Update remove =false FROM warehouse where id=1`

    break;
  }


  //res.status(200).json({ name: 'data complete' })
}
