const express= require('express');
const app= express();

const twit= require('twit')

const T= new twit({
  consumer_key: '0XG5299e6oSESyHvLGIMGmwW3',
  consumer_secret: 'kh08Sydpo5hYYr0DCY8i7oJRAbxNkI1NKNpdStVi08ICIwBUOW',
  access_token: '3097151617-91Ayf0gu7O81oe6ae3quLPX5cxYkf7pZlkNZ09h',
  access_token_secret: 'TPnK7IgPW0TB0m9NemXiyKAlZC6rBRpqi56w7sDhVxEgl'
})

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/searchtweet', (req, res) =>{
  if(req.query.search){
    const search= req. query.search
    const limit= req.query.limit || 10
    T.get('search/tweets', {q: search, count: limit}, function(err, data, response){
      if(!err){
        const statuses= data.statuses;
        const result= statuses.map(({id,text}) =>{
          return ({id, text})
        })
        res.status(200).json(result)
      }
    });
  }
      else{
        res.status(400).json({message: 'search text required'})
      }
  });
app.listen(3001, () => { console.log("Server is listening port 3001") })