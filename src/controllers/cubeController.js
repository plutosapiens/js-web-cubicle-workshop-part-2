const router = require("express").Router();
const cubeService = require("../services/cubeService")
const accessoryService = require('../services/accessoryService');

router.get("/create", (req, res) => {
    res.render("cube/create");
});

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    
    await cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });
    res.redirect('/')
})

router.get('/:cubeId/details', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await cubeService.getSingleCube(cubeId).lean(); //mongodb връща document object, той има различни функционалности. За това му слагаме lean()

    if(!cube) {
        res.redirect('/404');
        return
    }

    const hasAccessories = cube.accessories?.length > 0;
    res.render('cube/details', { ...cube, hasAccessories });
});

//accessory attachment related
router.get('/:cubeId/attach-accessory', async (req, res) => {
    const { cubeId } = req.params;
    const cube = await cubeService.getSingleCube(cubeId).lean();
    const accessoryIds = cube.accessories
    ?cube.accessories.map((a) => a._id)
    :[];
    
    const accessories = await accessoryService
    .getWithoutOwned(accessoryIds)
    .lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories: hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { cubeId } = req.params;
    const { accessory: accessoryId } = req.body;

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
})


module.exports = router;