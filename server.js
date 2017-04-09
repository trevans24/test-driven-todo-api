// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
   res.json({todos: todos});

});

app.post('/api/todos', function create(req, res) {
  var newId;
  if(todos.length === 0){
    newId = 1;
  } else {
    newId = todos[todos.length-1]._id+1;
  }
  var newTask = req.body.task;
  var newDes = req.body.description;
  var newTodo = todos.push({'_id': newId, 'task': newTask, 'description': newDes});
  res.send(todos[todos.length-1]);
});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id-1;
  res.json(todos[id]);
});

app.put('/api/todos/:id', function update(req, res) {
  var id = req.params.id;
  todos.forEach(function(el, index){
    if (el._id == id){
      console.log(el._id);
      console.log(id);
      console.log(todos[index]._id);
      // console.log(req.body._id);
      // console.log(todos[index].id);
      todos[index].task = req.body.task;
      todos[index].description = req.body.description;
      console.log(req.body.task);
      console.log(req.body.description);
      res.json(req.body);
    }
  });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
  var id = req.params.id-1;
  res.json(todos.splice([id],1));
  res.end();
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
