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
    code = `
    # Python program for simple calculator

    # Function to add two numbers
    def add(num1, num2):
            return num1 + num2
    
    # Function to subtract two numbers
    def subtract(num1, num2):
            return num1 - num2
    
    # Function to multiply two numbers
    def multiply(num1, num2):
            return num1 * num2
    
    # Function to divide two numbers
    def divide(num1, num2):
            return num1 / num2
    
    print("Please select operation -\n" \
                    "1. Add\n" \
                    "2. Subtract\n" \
                    "3. Multiply\n" \
                    "4. Divide\n")
    
    
    # Take input from the user
    select = int(input("Select operations form 1, 2, 3, 4 :"))
    
    number_1 = int(input("Enter first number: "))
    number_2 = int(input("Enter second number: "))
    
    if select == 1:
            print(number_1, "+", number_2, "=",
                                            add(number_1, number_2))
    
    elif select == 2:
            print(number_1, "-", number_2, "=",
                                            subtract(number_1, number_2))
    
    elif select == 3:
            print(number_1, "*", number_2, "=",
                                            multiply(number_1, number_2))
    
    elif select == 4:
            print(number_1, "/", number_2, "=",
                                            divide(number_1, number_2))
    else:
            print("Invalid input")
    
`
let criteria = `
Marks: 6


• input and stores/uses value with message 

• attempt at repeating… 

•…correctly repeats number of times given as input 

• …correctly take number as input within loop and calculates total of these numbers 

• …correctly calculate an average (total/num) 

• Output both total and average 
`
    let q1 = `For Given python code ${code} run 10 tests and evaluate results based on following criteria ${criteria}`
    
    let q2 = `For Given python code ${code} evaluate results based on following criteria ${criteria} and assign marks out of total marks in Criteria`;
    let q3 = `For Given python code ${code} evaluate results based on following criteria ${criteria} leniently and assign marks out of total marks in Criteria`
    const question = req.query.question;
    // let ques = `consider the following code ${code} GCSE OCR ERL Exam Reference Language for Algorithims, is it syntically correct and what is its purpose also please provide eqvalent python code within code tags`
    let ques = `consider the following pseudocode ${code} provide equvalent python code`
    
    // let ques = 'what year it is?'
    let responseAI = await talk_to_AI(q3);
    res.status(200).json({AI_Answer: responseAI.answer.message.content});
    // res.status(200).json();

  }
    
  }