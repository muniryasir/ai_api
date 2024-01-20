import nextConnect from 'next-connect';
import middleware from '../../middleware/database';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

   
    let collectionName = 'PRACTICE_QUESTIONS';
    
    let totalQuestions = await req.db.collection(collectionName).find({}).sort({"order":1}).toArray()
   
    res.json({message:totalQuestions});
});
export default handler;