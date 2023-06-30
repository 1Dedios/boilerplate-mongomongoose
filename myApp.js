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
  const newPerson = new Person({
    name: "Eddie",
    age: 32,
    favoriteFoods: ["wings"],
  });

  newPerson.save((err, data) => {
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
      done("null", data);
    }
  });
};

const arrayOfPeople = [
  { name: "Jesus", age: 33, favoriteFoods: ["wings"] },
  { name: "Johnny", age: 23, favoriteFoods: ["burger"] },
  { name: "Ralph", age: 28, favoriteFoods: ["Hibachi"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, muchoPeople) => {
    if (err) {
      console.log("Error");
    } else {
      console.log("arrayOfPeople created");
      done("created many", muchoPeople);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, nameOfPerson) => {
    if (err) {
      console.log("Error");
    } else {
      console.log("nameOfPerson found");
      done("found them", nameOfPerson);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, food) => {
    if (err) {
      console.log("No one likes that here.");
    } else {
      console.log("food found");
      done("find by food", food);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      console.log("could not find that person");
    } else {
      console.log("found em");
      done("person found", person);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      console.log(
        "could not find that person, therefore could not update their favorite foods"
      );
    } else {
      console.log("found them, adding their favorite food");
      person.favoriteFoods.push(foodToAdd);
      done("we've added their favorite food", person);
    }
  });
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
