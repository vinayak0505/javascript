const express = require('express');
const path = require('path')
const port = 8001

const db = require('./config/mongoose');;
const app = express()
const Todo = require('./mongoose/todo')

// it sets up view engine for rendering view
// we are using ejs here
app.set('view engine', 'ejs');
// setting up view
app.set('views', path.join(__dirname, 'views'));
//It parses incoming requests with urlencoded payloads and is based on body-parser.
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// to use js ans css with ejs we jave add static files to express
app.use(express.static(path.join(__dirname, 'assets')));

/**
 * @listens post number at which the server is runner
 * prints error is error occors or
 * prints succes when app start successfull
 */
app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('My Server is running on Port', port);
})


var sort_by = "heading";

app.get('/', async function (req, res) {
    /**
     * @find getting data from the database 
     * {} this helps in fetching complete data
     */
    try {
        const todos = await Todo.find({}).sort(sort_by);
        res.render('home', {
            title: "Todo",
            todo_list: todos,
            sort_by: sort_by
        })
    } catch (error) {
        console.log(error);
        console.log("error in fetching contacts from db");
        return;
    }

})

/**
 * @post create-todo is used add the todo item and
 * then we @redirect back to the home page
 */
app.post('/create-todo', async function (req, res) {
    try {
        const newTodo = await Todo.create({
            heading: req.body.heading,
            date: req.body.date,
            type: req.body.type
        });
        console.log("new todo", newTodo);
    } catch (error) {
        console.log('Error in creating a contact!')
    } finally {
        return res.redirect('back');
    }
})

// check the todo items
app.get('/select-todo/', async function (req, res) {
    console.log(req.query);
    let id = req.query.id

    try {
        const value = await Todo.findByIdAndUpdate(id, { selected: true }, { new: true });
        console.log(value);
    } catch (error) {
        console.log(error);
        console.log("error while updating");
    } finally {
        return res.redirect('back');
    }
})

// uncheck the todo items
app.get('/unselect-todo/', async function (req, res) {
    console.log(req.query);
    let id = req.query.id

    try {
        const value = await Todo.findByIdAndUpdate(id, { selected: false }, { new: true });
        console.log(value);
    } catch (error) {
        console.log(error);
        console.log("error while updating");
    } finally {
        return res.redirect('back');
    }
})

/**
 * @param delete_selected_todo will delete all elements that are selected 
 */
app.get('/delete-selected-todo', async function (req, res) {
    try {
        const deleted_items = await Todo.deleteMany({ selected: true });
        console.log(deleted_items);
    } catch (error) {
        console.log('not able to delete items');
    }
    return res.redirect('back');
});


/**
 * changes the sorting of todo items
 */
app.get('/sort-todo', function (req, res) {
    switch (sort_by) {
        case "heading":
            sort_by = "date"
            break;
        case "date":
            sort_by = "type"
            break;
        case "type":
            sort_by = "selected"
            break;
        default:
            sort_by = "heading";
            break;
    }
    return res.redirect('back');
});