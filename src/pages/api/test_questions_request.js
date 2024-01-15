import nextConnect from 'next-connect';
import middleware from '../../middleware/database';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    // let signup_data = req.query.signup_data;
    // let temp = JSON.parse(signup_data)
    let testLength = 2
    let collectionName = 'QUESTIONS';
    let questions = []
    // let random_id = []
    let totalQuestions = await req.db.collection(collectionName).find({}).toArray()
    // for(y = 0; y<testLength; y++) {
    //     let rn = Math.floor(Math.random() * totalQuestions);
    //     if(random_id.indexOf(rn)==-1)
    //      {
    //         random_id.push(rn)
    //         let doc = await req.db.collection(collectionName).find({ID: random_id}).toArray()
    //         questions.push(doc)
    //      }
    // }
   
    
    
    // console.log(doc);


    res.json({message:totalQuestions});
});
export default handler;