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
    return res.status(200).json( {answer: 'testing works'});
    // return res.status(405).send('Method not allowed.');


  } else if(req.method == 'OPTIONS') {

    console.log('we are here')
    return res.status('OK')

  } else if(req.method == 'GET') {

    // let x = encodeURIComponent(`x=int(input('enter a number:')) y = x*x print("square of "+str(x)+" is "+str(y))`)
    // let code = `x=int(input('enter a number:')) y = x*x print("square of "+str(x)+" is "+str(y))`
    
    // const question = req.query.question;
    // 
    // res.status(200).json({AI_Answer: responseAI.answer.message.content});
    // res.status(200).json();
//     let code = `
    
//     function validate_user()
// 	const pw = "pass"
// 	pwguess = ""
// 	attempts = 1
// 	do
// 		print("Attempt number " + attempts)
// 		pwguess = input("Password: ")
// 		attempts += 1
// 	until pwguess == pw OR attempts > 3

// 	return pwguess == pw
// endfunction

// if validate_user() then
// 	print("yay")
// else
// 	print("no")
// endif

//     `
    let code = JSON.parse(req.query.question)
    let question = `For the  code written in GCSE OCR ERL Exam Reference Language for Algorithims, within the code tags evaluate and provide a two liner feedback <code>${code.code}</code>`;
    let responseAI = await evaluateCode(question);
    console.log('called')
    res.status(200).json({AI_Answer: responseAI.answer.message.content});  }
    
  }