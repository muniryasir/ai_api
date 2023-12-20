import OpenAI from "openai";
const ai_key = process.env.ai_key
const openai = new OpenAI({ apiKey: ai_key });

async function talk_to_AI() {
    let question = 'Hello';
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
    var body = '';

    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', async function () {
        var post = qs.parse(body);
        // use post['blah'], etc.

        // let response = await talk_to_AI();
        res.status(200).json({ post });
    });
  } else if(req.method == 'GET') {
    res.status(200).json({ text: 'API is running' });
  }
    
  }