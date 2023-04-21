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
  
  let shevles : any ;  
  let newName: string="test2";
  let result =  await prisma.shelve.findMany({where: {shelveName:"test",remove: false
  }})
  let lengthResult= result.length;
  await prisma.shelve.create({data:{shelveName:newName,zoneId:1}});
  let createData = await prisma.shelve.create({data:{shelveName:"test",zoneId:1}});
  switch (req.method)
  { 
    case 'POST':
        //let createData = await prisma.shelve.create({data:{}});
    break;  
    case 'GET':
         
        
        shevles =  await prisma.shelve.findMany({where: {remove: false
          }}); 
        //console.log("data",werehouses)
        res.status(200).json(shevles);
    break;    
    case 'DELETE':
        const result2 = await prisma.shelve.update({
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
