import OpenAI from "openai";
import {useRouter} from "next/router";

const ai_key = process.env.AI_KEY
const openai = new OpenAI({ apiKey: ai_key });

async function evaluateCode(query) {

    let question = query;
    let role = "system";
    const completion = await openai.chat.completions.create({
      messages: [{ role: role, content: question }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
    let response ={
      query: question,
      answer: completion.choices[0]
    }
    return response;
  }

export default async function  handler(req, res) {
  if (req.method == 'PUT') {
    console.log(req.body)
    // const question = req.body.question;
    // let responseAI = await talk_to_AI(question);
    // res.status(200).json({AI_Answer: responseAI.answer.message.content});
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Cache-Control', 'max-age=180000');
    // res.end(JSON.stringify(req.body));
    return res.status(200).json( req.body);
    // return res.status(405).send('Method not allowed.');


  } else if(req.method == 'GET') {

    let x = encodeURIComponent(`x=int(input('enter a number:')) y = x*x print("square of "+str(x)+" is "+str(y))`)
    let code = `x=int(input('enter a number:')) y = x*x print("square of "+str(x)+" is "+str(y))`
    let question = `For the python code given with the code tags evaluate and provide a two liner feedback <code>${decodeURIComponent(x)}</code>`;
    // const question = req.query.question;
    // let responseAI = await evaluateCode(question);
    // res.status(200).json({AI_Answer: responseAI.answer.message.content});
    // res.status(200).json();
    console.log('called')
    return res.status(200).json({AI_Answer: question});
  }
    
  }