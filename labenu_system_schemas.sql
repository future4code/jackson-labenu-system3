CREATE TABLE student_labenu_system(
id INT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
birthdate VARCHAR(50) NOT NULL,
mission_id INT,
FOREIGN KEY (mission_id) REFERENCES mission_labenu_system(id)
);


INSERT INTO student_labenu_system (`id`,`name`,`email`,`birthdate`, `mission_id`) VALUES (1,'Michelle','mih@gmail.com','1997-11-26', 7);

CREATE TABLE mission_labenu_system(
id INT PRIMARY KEY,
name VARCHAR(40) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
module INT NOT NULL
);

CREATE TABLE teacher_labenu_system(
id INT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
birthdate VARCHAR(50) NOT NULL,
mission_id INT,
FOREIGN KEY (mission_id) REFERENCES mission_labenu_system(id)
);

INSERT INTO teacher_labenu_system (`id`,`name`,`email`,`birthdate`, `mission_id`) VALUES (1,'Soter','sot@gmail.com','1995-10-20', 4);

CREATE TABLE student_hobby_labenu_system(
id INT PRIMARY KEY,
student_id INT NOT NULL,
hobby_id INT NOT NULL,
FOREIGN KEY (student_id) REFERENCES student_labenu_system(id),
FOREIGN KEY (hobby_id) REFERENCES hobby_labenu_system(id)
);

CREATE TABLE hobby_labenu_system(
id INT PRIMARY KEY,
hobby VARCHAR(50) NOT NULL
);

CREATE TABLE teacher_specialty_labenu_system(
id INT PRIMARY KEY,
teacher_id INT NOT NULL,
specialty_id INT NOT NULL,
FOREIGN KEY (teacher_id) REFERENCES teacher_labenu_system(id),
FOREIGN KEY (specialty_id) REFERENCES specialty_labenu_system(id)
);

CREATE TABLE specialty_labenu_system(
id INT PRIMARY KEY,
specialty VARCHAR(50) NOT NULL
);
