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
  
  let zone : any ;  
  //let createData = await prisma.warehouse.create({data:{}});
  let createData = await prisma.zone.create({data:{warehouseId:2}})
  switch (req.method)
  { 
    case 'POST':
        let createData = await prisma.zone.create({data:{warehouseId:2}})
    break;  
    case 'GET':
         
        /*const result = await prisma.zone.update({
            where:{
                id:1,
                warehouseId:2,
            },
                data:{remove:true}
            }
        )*/
        zone =  await prisma.zone.findMany({where: {remove: false
          }}); 
        //console.log("data",werehouses)
        res.status(200).json(zone);
    break;    
    case 'DELETE':
        const result2 = await prisma.zone.update({
            where:{
                id:1,
                
            },
             data:{remove:true}
            }
        )
        //const result = await prisma.$queryRaw`Update remove =false FROM warehouse where id=1`

    break;
  }


  //res.status(200).json({ name: 'data complete' })
}
