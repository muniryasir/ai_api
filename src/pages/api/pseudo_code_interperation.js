import OpenAI from "openai";
import {useRouter} from "next/router";

const ai_key = process.env.AI_KEY_PB
const openai = new OpenAI({ apiKey: ai_key });

async function talk_to_AI(query) {

    let question = query;
    let role = "system";
    const completion = await openai.chat.completions.create({
      messages: [{ role: role, content: question }],
      model: "gpt-4",
    });
  
    console.log(completion.choices[0]);
    let response ={
      query: question,
      answer: completion.choices[0]
    }
    return response;
  }

export default async function  handler(req, res) {
  if (req.method == 'POST') {
    // console.log(req.body)
    // const question = req.body.question;
    // let responseAI = await talk_to_AI(question);
    // res.status(200).json({AI_Answer: responseAI.answer.message.content});

    res.status(200).json({ text: 'API is running' });


  } else if(req.method == 'GET') {

    let code = `
      
    Take two arguments from user
    Take the sum of two arguments
    Return the sum


    `
    
    
    const question = req.query.question;
    // let ques = `consider the following code ${code} GCSE OCR ERL Exam Reference Language for Algorithims, is it syntically correct and what is its purpose also please provide eqvalent python code within code tags`
    let ques = `consider the following pseudocode ${question}, if its valid provide equvalent python code within code tags else return invalid with reasons`
    // let ques = 'what year it is?'
     let responseAI = await talk_to_AI(ques);
    let pythoncode = responseAI.answer.message.content
    let mySubString = pythoncode.substring(
      pythoncode.indexOf("```python") + 1, 
      pythoncode.lastIndexOf("```")
  );
  let response = mySubString.split('``python').pop();
  console.log(response);
  if (response == ""){
    response = 'invalid';
  } else {
    
  }
   
    res.status(200).json({AI_Answer: response});
    // res.status(200).json();

  }
    
  }