DROP DATABASE IF EXISTS project_3_db;
CREATE DATABASE project_3_db;

USE project_3_db;
INSERT INTO Employees (first_name, last_name, street, city, state, zip, email, phone, account_key, isAdmin)
VALUES ("Admin", "Barber", "238 W 8th St", "Charlotte", "NC", "18293", "admin@gmail.com", "5958543940", "$2a$10$LZVSvsjR4JRVn9UYo1JQGeFl3Y/4D28eF29nr0o.AaOZ2yYR68me2", true);


USE project_3_db;
INSERT INTO Employees (first_name, last_name, street, city, state, zip, email, phone, account_key, isAdmin)
VALUES ("Employee", "Barber", "555 W 8th St", "Greensboro", "NC", "28659", "employee@gmail.com", "5555543940", "$2b$10$S1XvnOxcatPfFgfUlhG07uJvIRcXvwiXUDKnvW6.fAKZvEQyECDfC", false);

USE project_3_db;
INSERT INTO Customers (first_name, last_name, street, city, state, zip, email, phone, account_key)
VALUES ("Customer", "Barber", "444 W 8th St", "Columbia", "SC", "29659", "customer@gmail.com", "4585543940", "$2b$10$3ht0fs4AjBe48i778CBT.eTib0mzd6yeeFljqAa2StIDttjeZKIX2");

-- $2y$10$zIGRnNYyl8aLKiUZECO3BuTvY64Fg3bcFZiLhnwV45zcwFjjDmG76 test new hash

-- "$2a$10$LZVSvsjR4JRVn9UYo1JQGeFl3Y/4D28eF29nr0o.AaOZ2yYR68me2" old hash save save revert if needed admin hash 