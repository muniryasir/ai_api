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
  
    // console.log(completion.choices[0]);
    let response ={
      query: question,
      answer: completion.choices[0]
    }
    return response;
  }

export default async function  handler(req, res) {
  if (req.method == 'POST') {


    res.status(200).json({ text: 'API is running' });


  } else if(req.method == 'GET') {

  
    let recievedRequest = JSON.parse(req.query.question)
    let code = recievedRequest.code;
    let mode = recievedRequest.mode;
    let test = recievedRequest.test;
    let ai_question = '' 
    if(test=="no") {
      if(mode == 'Python') {

          ai_question = `For give python code ${code} evaluate it, format response in JSON with following structure {valid: 'valid/invalid', Reasoning}`;

      } else if(mode == 'OCR') {

          ai_question = `For the  given code in GCSE OCR ERL Exam Reference Language for Algorithims ${code} evaluate it, if valid return equivalent code in python, format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;

      } else {
          ai_question = `For the  given code in pseudo ${code} evaluate it , if valid return equivalent code in python, format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;
      }
    } else {
      let marks = recievedRequest.marks;
      let topic = recievedRequest.topic
      if(mode == 'Python') {

        ai_question = `For give python code within code tags <code>${code}</code> check it, if correct asign marks from ${marks}, only respond in JSON format with following structure {valid: 'valid/invalid', Reasoning, marks}`;
        let responseAI = await talk_to_AI(ai_question);
        let str = responseAI.answer.message.content
      //   let mySubString = str.substring(
      //     str.indexOf("{") , 
      //     str.lastIndexOf("}")
      // )+'}';
        // console.log(mySubString)
        res.status(200).json(JSON.parse(str));
    
      } else if(mode == 'OCR') {

        // ai_question = `For the  given code in GCSE OCR ERL Exam Reference Language for Algorithims within code tags <code>${code}</code>  check it,  iff correct return equivalent code in python, asign marks from ${marks},  only respond in JSON format with following structure {valid: 'valid/invalid', code:null/code, Reasoning, marks}`;
        ai_question = `For the  given code within code tags <code>${code}</code> check if its a valid GCSE OCR ERL Exam Reference Language for Algorithims,  iff correct return equivalent code in python, asign marks from ${marks},  only return JSON and no explanation  with following structure {valid: 'valid/invalid', code:null/code, Reasoning, marks}`;
        let responseAI = await talk_to_AI(ai_question);
        let str = responseAI.answer.message.content
        let mySubString = str.substring(
          str.indexOf("{") , 
          str.lastIndexOf("}")
      )+'}';
        console.log(mySubString)
        res.status(200).json(JSON.parse(mySubString));

      } else {
        ai_question = `For given steps within the code tage <code>${code}</code> deduce it is relevant to ${topic}, if valid return equivalent code in python, asign marks from ${marks},  format response in JSON with following structure {valid: 'valid/invalid', code, Reasoning}`;
        let responseAI = await talk_to_AI(ai_question);
        let str = responseAI.answer.message.content
        let mySubString = str.substring(
          str.indexOf("{") , 
          str.lastIndexOf("}")
      )+'}';
        console.log(str)
        res.status(200).json(JSON.parse(mySubString));
      }
    }
    // console.log(ai_question)
    // let ques = ''
  
    // res.status(200).json();

  }
    
  }