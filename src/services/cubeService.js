const uniqid = require('uniqid');
const fs = require('fs');

const data = fs.readFileSync('src/config/database.json', 'utf8');
const cubes = JSON.parse(data);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData
    };

    cubes.push(newCube);

    fs.writeFile('src/config/database.json',
    JSON.stringify(cubes), (err) => {
      if(err) {
        console.error('Error while writing in the database.json file.', err);
      }
    })
    return newCube;
}

exports.getAll = (search, from, to) => {
  const data = fs.readFileSync('src/config/database.json', 'utf-8');
  let filterCubes = JSON.parse(data);
  if(search) {
    filterCubes = filterCubes.filter((cube) => cube.name.toLowerCase().includes(search));
  }
  if(from) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel >= Number(from)
    );
  }
  if(to) {
    filterCubes = filterCubes.filter(
      (cube) => cube.difficultyLevel <= Number(to)
    );
  }
    return filterCubes;
};

exports.getSingleCube = (id) => {
  return cubes.find((cube) => cube.id ===id);
};