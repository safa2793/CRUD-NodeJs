const router = require ('express').Router();
const _ = require('lodash');
const  Comic = require('../models/comic');
const {comic_valid, comic_valid_update} = require('../models/comic');


router.get('', async(req,res)=>{
    let Comics = await Comic.find(); 
    res.send(Comics)
})

router.post('', async(req,res)=>{
    let valid_res = comic_valid(req.body);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let comic =  new Comic(_.pick(req.body,['auteur','title','image']));
    try{
        comic = await comic.save();        
    }catch(err){
            return res.status(400).send('Error : ' + err.message)
        }
    res.status(201).send(comic)
})


router.get('/id/:id',async (req,res)=>{
    let comic = await Comic.findById(req.params.id);
    if(!comic)
        return res.status(404).send('Comic Film with this id is not found')
    res.send(comic)
});

router.get('/title/:title',async (req,res)=>{
    let comics = await Comic.find({title:req.params.title});
    if(comics.length == 0)
        return res.status(404).send('No Comics movies were found')
    res.send(comics)
});

router.delete('/id/:id',async (req,res)=>{
    let comic = await Comic.findByIdAndDelete(req.params.id);
    if(!comic)
        return res.status(404).send('comic movie with this is is not found');
    res.send(comic)
});

router.put('/id/:id',async (req,res)=>{
    let valid_res = comic_valid_update(req.body);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let comic = await Comic.findById(req.params.id);
    if(!comic)
        return res.status(404).send('Comic movie with this is is not found');
    comic = _.merge(comic,req.body);
    try{
        comic = await comic.save();
        }catch(err){
            return res.status(400).send('Error : ' + err.message)
        }
    res.send(comic)
});


module.exports= router