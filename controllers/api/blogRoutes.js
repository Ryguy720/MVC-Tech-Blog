const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log("Create new vlog",req.body)
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newBlog)
    res.status(200).json(newBlog);
  } catch (err) {
    console.log("Err in creating new blog",err)
    res.status(400).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  console.log("get route",req.session)
  let userId = req.session.user_id
  console.log("user",userId)
  try {
    const BlogData = await Blog.findAll({where:{user_id:userId}})
    //   , {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });
  //  console.log("Blogdata",BlogData)
    const Blogget = BlogData.get({ plain: true });
    console.log(Blogget,"GET")
    res.render('profile', {
      ...Blogget,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err,"Err on GET")
    res.status(500).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if ( blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
