import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type Data = {
  name: string
}
const prisma = new PrismaClient();


function parseArrayJson(stacks:any){

  let arrayData:any[]=[];
  for( let data in stacks){
    arrayData.push(stacks[data])
  }
  return arrayData;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // need this be set because the sever and client are running on the same machine
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  let zones : any ;  
  //let createData = await prisma.warehouse.create({data:{}});
  //let createData = await prisma.zone.create({data:{warehouseId:2}})


  let WerehouseId:number;
  
  if(req.body.warehouseId!=null)
    WerehouseId=  parseInt( req.body.warehouseId);
  else 
    WerehouseId=  parseInt( req.query.warehouseId);

  switch (req.method)
  { 
    case 'POST':        
        let createData = await prisma.zone.create({data:{warehouseId:WerehouseId}})
        
        zones =  await prisma.zone.findMany({where: {warehouseId:WerehouseId,remove: false
        }});
        return res.status(200).json(zones);
    break;  
    
    case 'GET':
       
        zones =  await prisma.zone.findMany({where: {warehouseId:WerehouseId,remove: false
        }})  
        let json = Object.assign({}, zones);
        //let json=parseArrayJson(zones);
        return res.status(200).json(json);
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
