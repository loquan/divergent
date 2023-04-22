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
  //let createData = await prisma.zone.create({data:{warehouseId:2}})
  let WerehouseId:number =  parseInt( req.body.warehouseId);;
  switch (req.method)
  { 
    case 'POST':        
        let createData = await prisma.zone.create({data:{warehouseId:WerehouseId}})
        zone =  await prisma.zone.findMany({where: {warehouseId:WerehouseId,remove: false
        }});
        res.status(200).json(zone);
    break;  
    
    case 'GET':
                 
        zone =  await prisma.zone.findMany({where: {warehouseId:1,remove: false
        }})  
        let json = Object.assign({}, zone);
        

        res.status(200).json(zone);
    break;    
    
    //delete
    case 'OPTIONS':
        let zoneId:number =  parseInt( req.query.zoneId);;
        const result2 = await prisma.zone.update({
            where:{
                id:zoneId,                
            },
             data:{remove:true}
            }
        )
        //const result = await prisma.$queryRaw`Update remove =false FROM warehouse where id=1`

    break;
  }


  //res.status(200).json({ name: 'data complete' })
}
