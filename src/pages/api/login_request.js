import nextConnect from 'next-connect';
import middleware from '../../middleware/database';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {

    let login_data = req.query.login_data;
    let temp = JSON.parse(login_data)
    let doc = await req.db.collection('Users').countDocuments(temp, { limit: 1 })
    
    console.log(doc);

    
    let message = '';
    if(doc==0) {
        message = "No Account Found";
    } else {
        message = "Access Granted";
    }
    res.json({message:message});
});
export default handler;