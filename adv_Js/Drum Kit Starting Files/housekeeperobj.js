 function housekeeperobj(yearsOfExperience, name, cleaningRepertoire) {
   this.yearsOfExperience = yearsOfExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire;
 }

 let newHouseKeeper = new housekeeperobj(12, "Jane", ["bathrooms", "bedrooms", "living room"]);
    console.log(newHouseKeeper);
    console.log(newHouseKeeper.cleaningRepertoire);