import {Router} from 'express'
import {getAll} from '../controller/servers.js'

const router = Router()

router.get('/api/server', getAll)

//404 test page
router.get('/home/foo', (req, res) => { 
    res.sendStatus(404);
});

//info page
router.get("/info/", (req, res) => {
    res.send("Info Page!");
  });

//home page
router.get("/home/", (req, res) => {
  res.send("Home Page!");
});

//main page
router.get("/", (req, res) => {
  res.render('features', {title: 'Features Page'})
});

//main page 2
router.get('/m', (req, res) => {
  res.render('index2', {title: 'Main Page'})
})

//features page
router.get('/features', (req, res) => {
  res.render('features', {title: 'Features Page'})
})

export default router