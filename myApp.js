require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favoriteFoods: {
    type: [String],
  },
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "Eddie",
    age: 32,
    favoriteFoods: ["Sausage, Egg and Cheddar Cheese on a Croissant"],
  });

  newPerson.save((err, newPerson) => {
    if (err) {
      console.log("Error");
    } else {
      console.log(
        newPerson.name +
          " " +
          newPerson.age +
          " " +
          newPerson.favoriteFoods +
          " " +
          "has been saved"
      );
    }
  }, done("null", newPerson));
};

const createManyPeople = (arrayOfPeople, done) => {
  // let morePeople = new Person(
  //   {
  //     name: "John",
  //     age: 32,
  //     favoriteFoods: ["Sushi"],
  //   },
  //   {
  //     name: "Heather",
  //     age: 28,
  //     favoriteFoods: ["Salmon"],
  //   },
  //   {
  //     name: "Johnny",
  //     age: 21,
  //     favoriteFoods: ["Pizza"],
  //   }
  // );

  morePeople.create(arrayOfPeople);
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
