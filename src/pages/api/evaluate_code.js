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

  async function convertToJSON(str) {
    let jsonresponse;
      try {
        jsonresponse = JSON.parse(str);
        return jsonresponse
    } catch (e) {
      jsonresponse = str.substring(
        str.indexOf("{") , 
        str.lastIndexOf("}")
    )+'}';
    return jsonresponse
  }
}

export default async function  handler(req, res) {
  if (req.method == 'POST') {


    res.status(200).json({ text: 'API is running' });


  } else if(req.method == 'GET') {

    let query = req.query.question
    // let x = `{"code":"2+3"}`
    // let y = JSON.parse(x)    
console.log(query)
    let recievedRequest = JSON.parse(query)
    let code = recievedRequest.code.replace('plus_plus', "+");
    let mode = recievedRequest.mode;
    let test = recievedRequest.test;
    console.log("code "+code)
    let ai_question = '' 
    if(test=="no") {
      if(mode == 'Python') {

          // ai_question = `For give python code ${code} evaluate it, format response in JSON with following structure {valid: 'valid/invalid', Reasoning}`;
          ai_question = `I wish to have a JSON object with following structure
          {
            valid: valid/invalid,
            Reasoning: Why is code valid or invalid. If valid how can it be improved

          }
          I am providing python code within code tags <code>${code}</code>
          `
         


      } else if(mode == 'OCR') {

          // ai_question = `For the  given code in GCSE OCR ERL Exam Reference Language for Algorithims ${code} evaluate it, if valid return equivalent code in python, format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;
          ai_question = `I wish to have a JSON object with following structure
          {
            valid: valid/invalid,
            Reasoning: Why is code valid or invalid. If valid how can it be improved,
            code: equivalent python code if valid otherwise null

          }
          I am providing GCSE OCR ERL Exam Reference Language for Algorithims within code tags <code>${code}</code>
          `
          

      } else {
          // ai_question = `For the  given code in pseudo ${code} evaluate it , if valid return equivalent code in python, format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;
          ai_question = `I wish to have a JSON object with following structure
          {
            valid: valid/invalid,
            Reasoning: Why is code valid or invalid. If valid how can it be improved,
            code: equivalent python code if valid otherwise null

          }
          I am providing coding steps within code tags <code>${code}</code>
          `
        }
        console.log(ai_question)
      let responseAI = await talk_to_AI(ai_question);

      let str = responseAI.answer.message.content;
      let jsonresponse = await convertToJSON(str)
      console.log(jsonresponse)
   
      res.status(200).json(jsonresponse);
    } else {
      let marks = recievedRequest.marks;
      let topic = recievedRequest.topic
      if(mode == 'Python') {

        // ai_question = `For give python code within code tags <code>${code}</code> check it, if correct asign marks from ${marks}, only respond in JSON format with following structure {valid: 'valid/invalid', Reasoning, marks}`;
        ai_question = `I wish to have a JSON object with following structure
        {
          valid: valid/invalid,
          Reasoning: Why is code valid or invalid. If valid how can it be improved,
          code: equivalent python code if valid otherwise null
          marks: marks out of ${marks}

        }
        I am providing python code within code tags <code>${code}</code>
        `

    
      } else if(mode == 'OCR') {

        // ai_question = `For the  given code in GCSE OCR ERL Exam Reference Language for Algorithims within code tags <code>${code}</code>  check it,  iff correct return equivalent code in python, asign marks from ${marks},  only respond in JSON format with following structure {valid: 'valid/invalid', code:null/code, Reasoning, marks}`;
        // ai_question = `For the  given code within code tags <code>${code}</code> check if its a valid GCSE OCR ERL Exam Reference Language for Algorithims,  iff correct return equivalent code in python, asign marks from ${marks},  only return JSON and no explanation  with following structure {valid: 'valid/invalid', code:null/code, Reasoning, marks}`;
        ai_question = `I wish to have a JSON object with following structure
        {
          valid: valid/invalid,
          Reasoning: Why is code valid or invalid. If valid how can it be improved,
          code: equivalent python code if valid otherwise null
          marks: marks out of ${marks}

        }
        I am providing GCSE OCR ERL Exam Reference Language for Algorithims within code tags <code>${code}</code>
        `

      } else {
        // ai_question = `For given steps within the code tage <code>${code}</code> deduce it is relevant to ${topic}, if valid return equivalent code in python, asign marks from ${marks},  format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;
        ai_question = `I wish to have a JSON object with following structure
        {
          valid: valid/invalid,
          Reasoning: Why is code valid or invalid. If valid how can it be improved,
          code: equivalent python code if valid otherwise null
          marks: marks out of ${marks}

        }
        I am providing coding steps within code tags <code>${code}</code>
        `
      }

      console.log(ai_question)
      let responseAI = await talk_to_AI(ai_question);

      let str = responseAI.answer.message.content;
      let jsonresponse = await convertToJSON(str)
      console.log(jsonresponse)
      res.status(200).json(jsonresponse);
    }
    // console.log(ai_question)
    // let ques = ''
  
    // res.status(200).json();

  }
    
  }