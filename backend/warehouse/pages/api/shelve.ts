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



  let ZoneId:number=0;
  
  if(req.body.zoneId!=null)//sent via post
    ZoneId=  parseInt( req.body.zoneId);
  else if(req.query.zoneId!=null) //sent via get
    ZoneId=  parseInt( req.query.zoneId);

  switch (req.method)
  { 
    case 'POST':        
        //using post to Delete
        if(req.body.command=="DELETE")
        {
          let shelveIds =  JSON.parse( req.body.shelveIds);
          let  result2:any;
          for(let i=0;i<shelveIds.length;i++)
          {
            result2 = await prisma.shelve.update({
              where:{
                  id:shelveIds[i],                
              },
               data:{remove:true}
              }
          )
          }
          
         
         
          let json = Object.assign({},result2);        
          return res.status(200).json(result2);
        }
        else if(req.body.command=="NEW") {
          //create new item
          ZoneId= parseInt( req.body.zoneId);
          let names:string[]=JSON.parse(req.body.shelveName);

          let nameString:string="";
          for(let i=0;i<names.length;i++)
          {
            nameString=names[i];            
            await prisma.shelve.create({data:{zoneId:ZoneId,shelveName:nameString}})
          }
          
          
          zones =  await prisma.shelve.findMany({where: {zoneId:ZoneId,remove: false
          }});
          return res.status(200).json(zones);
        }else if(req.body.command=="UPDATE"){
          
            ZoneId= parseInt( req.body.zoneId);
            let names:string[]=JSON.parse(req.body.shelveName);
            let ids:number[]=[]
            let idString= JSON.parse(req.body.ids);
            for(let i=0;i<idString.length;i++)
            {
                ids[i]=parseInt(idString[i]);

            }

            let nameString:string="";
            for(let i=0;i<names.length;i++)
            {
              nameString=names[i];            
              await prisma.shelve.update({
                where:{
                    id:ids[i],                
                },
                 data:{shelveName:names[i]}
                })
              
            }
            
            
            zones =  await prisma.shelve.findMany({where: {zoneId:ZoneId,remove: false
            }});
            return res.status(200).json(zones);
        

        }
        
    break;  
    
    case 'GET':
        if(req.query.command=='exist')
        {

          let names:string[]=JSON.parse(req.query.shelveName);
          let stacks:any[]=[]
          for(let i=0;i<names.length;i++)
          {
            
               //this search the database to see if the name exist on new items
               let results= await prisma.shelve.findMany({where: {shelveName:names[i],remove: false}})  ;
               if(results.length>0)
               {
                  for(let q=0;q<results.length;q++)
                  {
                  let zId=results[q].zoneId;
                  let zone = await prisma.zone.findMany({where: {id:results[q].zoneId,remove: false}})  ;
                  let warehouseId=zone[0].warehouseId;
                  let findStartZone=await prisma.zone.findMany({where: {warehouseId:warehouseId,remove: false}})  ;
                  let start=findStartZone[0].id;
                  let ZoneNumber=zId-start;
                  //results[q].shelveName=results[q].shelveName+" located warehouseId:"+warehouseId+" Zone Number:"+ZoneNumber;
                  results[q].zoneId=ZoneNumber;
                  results[q].warehouse=warehouseId;

                  }
                stacks.push(results);
               }
          }     
          let json = Object.assign({}, stacks);        
          return res.status(200).json(json);
        }
        else if(req.query.command=='updateExist'){
          let names:string[]=JSON.parse(req.query.shelveNames);
          let ids:string[]=JSON.parse(req.query.ids);
          let flag=false;
          let stackData:any[]=[];
          for(let index in names){
              let name=names[index];
              let id=parseInt(ids[index]);

               //find if any name exist
               zones =  await prisma.shelve.findMany({where:{shelveName:name,remove: false,id:{not:id}}}) ; 
               let errorStack:any[]=[];

               //exclude current id
               for(let i=0;i<zones.length;i++){
                      flag=true;
                      
                      let zone = await prisma.zone.findMany({where: {id:zones[i].zoneId,remove: false}})  ;
                      let warehouseId=zone[0].warehouseId;
                      let findStartZone=await prisma.zone.findMany({where: {warehouseId:warehouseId,remove: false}})  ;
                      let start=findStartZone[0].id;
                      let ZoneNumber=zones[i].zoneId-start;
                      errorStack[i] ={};
                      errorStack[i].warehouse=parseInt(warehouseId);
                      errorStack[i].shelveName=zones[i].shelveName;
                      errorStack[i].id=zones[i].id;
                      errorStack[i].zoneId=ZoneNumber;
                      stackData.push(errorStack);
               
               }
              }

              if(flag==true)
              {
                  //variable exist
                  let json2 = Object.assign({}, stackData);        
                  return res.status(200).json(json2);
              }

            //pass    
            let json = Object.assign({}, {});        
            return res.status(200).json(null);  
          

        }
        else{  
          zones =  await prisma.shelve.findMany({where: {zoneId:ZoneId,remove: false
          }})  
          let json = Object.assign({}, zones);        
          return res.status(200).json(json);
        }
    break;    
    
    //delete
    case 'OPTIONS':
        let shelveId:number =  parseInt( req.query.shelveId);;
        const result2 = await prisma.shelve.update({
            where:{
                id:shelveId,                
            },
             data:{remove:true}
            }
        )
       
       

        res.send({ title: 'GeeksforGeeks' });
 
    break;
  }



}
