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
    
    function validate_user()
	const pw = "pass"
	pwguess = ""
	attempts = 1
	do
		print("Attempt number " + attempts)
		pwguess = input("Password: ")
		attempts += 1
	until pwguess == pw OR attempts > 3

	return pwguess == pw
endfunction

if validate_user() then
	print("yay")
else
	print("no")
endif

    `
    
    
    const question = req.query.question;
    // let ques = `consider the following code ${code} GCSE OCR ERL Exam Reference Language for Algorithims, is it syntically correct and evaulate it qualitativly, also provide eqvalent python code. Return answer as a JSON object with keys code, feedback and python`
    let ques = `consider the following code ${question} written in GCSE OCR ERL Exam Reference Language for Algorithims, if valid return equvlent python code otherwise return invalid with reasons`
    let responseAI = await talk_to_AI(ques);
    let pythoncode = responseAI.answer.message.content
    let mySubString = pythoncode.substring(
      pythoncode.indexOf("```python") + 1, 
      pythoncode.lastIndexOf("```")
  );
  let response = mySubString.split('``python').pop();
  if (response == ""){
    response = 'invalid';
  } else {
    
  }
  console.log(mySubString)
    res.status(200).json({AI_Answer: response});
    // res.status(200).json();

  }
    
  }