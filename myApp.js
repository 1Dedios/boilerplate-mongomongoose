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

  Person.findOneAndUpdate(
    personName,
    (err, nameOfPerson) => {
      if (err) {
        console.log("cannot update age because that person does not exist.");
      } else {
        console.log("looking for the person to set their age");
        console.log(`adding ${personName} age now`);
        nameOfPerson.age = ageToSet;
        done("set their age", nameOfPerson);
      }
    },
    { new: true }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) {
      console.log("could not remove the person because they cannot be found");
    } else {
      console.log("removing them as we speak");
      Person.deleteOne(person);
      done("removed person from database", person);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    { name: nameToRemove },
    (err, nameRemoved) => {
      if (err) {
        console.log("could not find the people to remove");
      } else {
        console.log("Removing the bulk of people");
      }
    },
    done("those people were removed", nameRemoved)
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: [foodToSearch] })
    .sort()
    .limit(2)
    .select({ name: 1, age: 0 })
    .exec((err, food) => {
      if (err) {
        console.log("could not find that food");
      } else {
        console.log("found that food");
        Person.find(food);
      }
    }, done("food found", food));
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
