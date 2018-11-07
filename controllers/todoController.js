
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// COnnect to the DB
mongoose.connect('mongodb://dima:dimapov19@ds155663.mlab.com:55663/todo', () => {
  console.log('Connected to the DB')
})
const todoSchema = new mongoose.Schema({
  item: String
})

const Todo = mongoose.model('Todo', todoSchema);

var data = [{ item: "get milk" }, { item: "walk dog" }, { item: "eat" }]
const urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = app => {

  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
    })
    res.render('todo', { todos: data });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    const newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.findOne({item: req.params.item.replace(/\-/g, " ")}).remove((err,data) => {
      if (err) throw err;
      res.json(data)
    })
    data = data.filter(todo => {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  })

}