import { Result } from '../typings/Result';

export async function getClientInfo(ctx: Context, next: () => Promise<any>) {
  const {
      clients: { masterDataClient },
      vtex: {
        route: { params },
      },
    } = ctx

    const result= new Result();
    const { email } = params;

    if(isEmailAddress(email)){
      console.log("entro if");
      try{
        const { data , status} = await masterDataClient.getData(`email=${email}`, 'CL');

        if(status==200 && data.length > 0){
          result.status=200;
          const dataResult = {
            "activity": data[0].activity == null ? "" : data[0].activity,
            "role": data[0].role == null ? "" : data[0].role,
            "corporateName": data[0].corporateName == null ? "" : data[0].corporateName,
          }
          result.data=dataResult;
        }else{
          result.status=404;
          result.data={};
        }

      }catch(error){
        result.status=500;
        result.data={};
      }
    }
    else{
      console.log("entro else");
      result.status = 400;
      result.data = "Revise el formato de su email"
      console.log(ctx.status, ctx.body);
    }
    ctx.status = result.status
    ctx.body = result.data;
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    await next()
}

function isEmailAddress(emailE:string|string[]){
  let email: string;

  if (typeof emailE === 'string') {
    email = emailE; // Si es un string, asignar directamente
  } else if (Array.isArray(emailE)) {
    email = emailE.join(' '); // Si es un array, unir los elementos con un espacio
  } else {
    throw new Error('Entrada no válida');
  }
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Probamos si el correo coincide con el patrón
  return patronEmail.test(email);
}
