INSERT INTO department (dept_name)
VALUES 
("Finance"),
("Legal"),
("Information Technology"),
("Marketing"),
("Sales"),
("Human Resources"),
("Manufacturing");

INSERT INTO emp_role (title,manager,salary,dept_id)
VALUES
("Accountant",false, 110000,1),
("Book-keeper",false, 85000,1),
("Chief Financial Officer",true, 150000,1),
("Paralegal",false, 135000,2),
("Lawyer",false, 150000,2),
("Coroprate Secretary",true,225000,2),
("IT Operator",false, 65000,3),
("Help Desk Analyst",false, 75000,3),
("Software Engineer",false, 140000,3),
("Test Analyst",false, 90000,3),
("Project Manager",true, 125000,3),
("IT Manager",true, 175000,3),
("Chief Information Officer",true, 210000,3),
("Product Manager",true, 185000,4),
("Marketing Manager",true, 185000,4),
("Digital Manager",true, 2250000,4),
("Sales Rep",false, 185000,4),
("Payroll Officer", false, 85000,5),
("Trainer",false, 110000,6),
("Recruitement Officer",false, 110000,6),
("WHS Officer",false, 100000,6),
("HR Manager",true, 150000,6),
("Operator",false, 90000,7),
("Shift Lead",true, 115000,7),
("Chief Opertions Manager",true, 150000,7);


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
("Snow","White",1,4),
("Pitch","Black",1,4),
("Rose","Red",2,4),
("Money", "Baggs",3,null),
("Legal","Eagle",6,null),
("Trust","Me",5,5),
("Dirty","Work",4,5),
("Trying","Hard",4,5),
("Propeller","Head",7,18),
("Tech","Guru",7,18),
("Helping","Hand",8,18),
("Bits","Bytes",9,18),
("Soft","Ware",9,18),
("Cyber","Techie",9,18),
("Code","Breaker",10,16),
("Unrealistic","Dreamer",11,19),
("Broken","Dreams",11,19),
("Hard","Core",12,19),
("Data","Mann",13,null),
("Concept","Builder",14,38),
("Story","Teller",15,38),
("Fluffy","Talk",16,38),
("Selly","One",17,20),
("Dot","Comm",17,22),
("Block","Chain",17,22),
("Edu","Cation",19,31),
("Learn","Skills",19,31),
("Finding","Work",20,31),
("Care","Giver",21,31),
("People","Things",22,31),
("Slugger","Joe",23,36),
("Grind","Stone",23,36),
("Lumbar","Jack",23,37),
("Sweat","Tears",23,37),
("Lazy","Bum",23,37),
("Dark","Night",24,38),
("Day","Break",24,38),
("Horse","Whipper",25,null);