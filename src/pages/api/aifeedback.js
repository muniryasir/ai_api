import OpenAI from "openai";
const ai_key = process.env.AI_KEY
const openai = new OpenAI({ apiKey: ai_key });

async function talk_to_AI(query) {

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
  if (req.method == 'POST') {
    // console.log(req.body)
    const question = req.body.question;
    let responseAI = await talk_to_AI(question);
    res.status(200).json({AI_Answer: responseAI.answer.message.content});

  } else if(req.method == 'GET') {
    console.log("key "+ai_key)

    res.status(200).json({ text: 'API is running' });

  }
    
  }