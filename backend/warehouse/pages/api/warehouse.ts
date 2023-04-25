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
      if(req.body.command=="DELETE")
        {
          console.log("delete");
        let idValue:number = parseInt( req.body.id);
        const result2 = await prisma.warehouse.update({
            where:{
                id:idValue
            },
             data:{remove:true}
            }
        )
        
        let zones =  await prisma.zone.findMany({where: {warehouseId:idValue
        }});
        for(let z of zones)
        {
           let zId=z.id;

           await prisma.zone.update({
            where:{
                id:zId
            },
             data:{remove:true}
            });
           
            // await prisma.shelve.update({
            //   where:{
            //     zoneId:zId
            //   },
            //    data:{remove:true}
            // });
            let findShelve=await prisma.shelve.findMany({
              where:{
                zoneId:zId
              }});
             
             for(let s of findShelve)
             {
                await prisma.shelve.update({
                where:{
                  id:s.id
                },
                  data:{remove:true}
                });

             }


        }

        try{
        return res.status(200).json({ name: 'John Doe' })
        }
        catch(error){
            console.error("error message:"+error);
        }
        }
        else
        {
          let createData = await prisma.warehouse.create({data:{}});
          warehouses =  await prisma.warehouse.findMany({where: {remove: false
          }});
          return res.status(200).json(warehouses);
        }
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
        

        try{
        return res.status(200).json({ name: 'John Doe' })
        }
        catch(error){
            console.error("error message:"+error);
        }
        //const result = await prisma.$queryRaw`Update remove =false FROM warehouse where id=1`

    break;
  }


  //res.status(200).json({ name: 'data complete' })
}
