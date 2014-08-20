var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Candidate = mongoose.model('Candidates', {
    name: 'string',
    email: 'string'
});

router.get('/candidates', function(req, res){
    Candidate.find({}, function(err, data){
        //console.log(req.params.id);
        res.json(data);
    });
});
router.get('/candidates/:id', function(req, res){
    Candidate.find({'_id':req.params.id}, function(err, data){
        console.log(req.params.id);
        res.json(data);
    });
});
router.get('/findcandidates', function(req, res){
    var obj={};
    if (req.query.name!=''){
        obj.name=req.query.name;
    }
    if (req.query.email!=''){
        obj.email=req.query.email;
    }
    Candidate.find(obj, function(err, data){
        console.log(req.params.id);
        res.json(data);
    });
    /*console.log(req.query.name);
    console.log(obj);*/

});
router.post('/candidates', function (req, res) {
    console.log(req.body);

    (new Candidate({
        name: req.body.name,
        email: req.body.email
    })).save(function (err,data) {
            console.log(err);
            console.log(data);
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });
});
router.put('/candidates/:id', function (req, res) {
    console.log(req.body);

    Candidate.findById(req.params.id, function (err, Candidate) {

        if (err)
            res.send(err);

        Candidate.name = req.body.name; 	// update the bears info
        Candidate.email = req.body.email;

        Candidate.save(function (err) {
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, { message: 'Succesfully updated data ... ' });
            }
        });

    });
});
router.delete('/candidates/:id', function (req, res) {
    console.log(req.body);

    Candidate.remove({
        _id: req.params.id
    }, function(err, data) {
        if (err) {
            res.json(500, { message: 'Could not connect to the database.'});
        } else {
            res.json(200, { message: 'Succesfully deleted data ... ' });
        }
    });

});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
