CREATE TABLE mission_labenu_system(
	id INT PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	module INT NOT NULL
);

CREATE TABLE student_labenu_system(
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	birthdate VARCHAR(50) NOT NULL,
	mission_id INT,
	FOREIGN KEY (mission_id) REFERENCES mission_labenu_system(id)
);

CREATE TABLE teacher_labenu_system(
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	birthdate VARCHAR(50) NOT NULL,
	mission_id INT,
	FOREIGN KEY (mission_id) REFERENCES mission_labenu_system(id)
);

CREATE TABLE hobby_labenu_system(
	id INT PRIMARY KEY,
	hobby VARCHAR(50) NOT NULL
);

CREATE TABLE student_hobby_labenu_system(
	student_id INT NOT NULL,
	hobby_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES student_labenu_system(id),
	FOREIGN KEY (hobby_id) REFERENCES hobby_labenu_system(id),
  PRIMARY KEY (student_id, hobby_id)
);


CREATE TABLE specialty_labenu_system(
	id INT PRIMARY KEY,
	specialty VARCHAR(50) NOT NULL
);

CREATE TABLE teacher_specialty_labenu_system(
	teacher_id INT NOT NULL,
	specialty_id INT NOT NULL,
	FOREIGN KEY (teacher_id) REFERENCES teacher_labenu_system(id),
	FOREIGN KEY (specialty_id) REFERENCES specialty_labenu_system(id),
  PRIMARY KEY (teacher_id, specialty_id)
);

INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (1, 'Newton', '2019-09-16', '2020-03-27', 7);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (2, 'Bouman', '2019-11-25', '2020-06-05', 7);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (3, 'Sagan', '2020-02-03', '2020-08-14', 7);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (4, 'Hamilton', '2020-03-23', '2020-10-02', 7);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (5, 'Julian', '2020-04-06', '2020-10-16', 7);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (6, 'Mello', '2020-04-27', '2020-11-06', 6);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (7, 'Turing', '2020-05-15', '2020-11-13', 5);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (8, 'Jackson', '2020-07-13', '2021-01-22', 4);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (9, 'Tang-na-night', '2020-08-17', '2021-02-26', 3);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (10, 'Dumont', '2020-09-14', '2021-03-19', 2);
INSERT INTO mission_labenu_system (`id`, `name`,`start_date`, `end_date`, `module`) VALUES (11, 'Muyembe-na-night', '2020-10-19', '2021-04-30', 1);

INSERT INTO student_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (1, 'Michelle', 'mih@gmail.com', '1997-11-26', 8);
INSERT INTO student_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (2, 'Magali', 'mah@gmail.com', '1994-03-11', 8);
INSERT INTO student_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (3, 'Juan', 'juh@gmail.com', '1990-08-07', 8);
INSERT INTO student_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (4, 'Roberto', 'rob@gmail.com', '1986-01-29', 8);

INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (1, 'Soter', 'soter@labenu', '1995-10-20', 11);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (2, 'João', 'joao@labenu', '1998-01-02', 2);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (3, 'Paulo', 'paula@labenu', '1996-09-21', 3);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (4, 'Amanda', 'amanda@labenu', '1990-02-01', 4);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (5, 'Darvas', 'darvas@labenu', '1997-08-22', 5);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (6, 'Severo', 'severo@labenu', '1995-03-12', 6);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (7, 'Caio', 'caio@labenu', '1995-07-23', 7);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (8, 'Chijo', 'chijo@labenu', '1995-04-11', 8);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (9, 'Lais', 'lais@labenu', '1995-06-24', 9);
INSERT INTO teacher_labenu_system (`id`, `name`,`email`, `birthdate`, `mission_id`) VALUES (10, 'Bruno', 'bruno@labenu', '1995-05-10', 10);

INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (1, 'Yoga');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (2, 'Viajar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (3, 'Passear');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (4, 'Meditar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (5, 'Tocar um instrumento');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (6, 'Cantar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (7, 'Ouvir música');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (8, 'Correr');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (9, 'Praticar esportes');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (10, 'Pescar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (11, 'Trabalho voluntário');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (12, 'Dançar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (13, 'Ir ao cinema');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (14, 'Ir ao teatro');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (15, 'Cuidar de animais');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (16, 'Assistir série');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (17, 'Fotografar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (18, 'Jogar videogame');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (19, 'Jogar cartas');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (20, 'Jogar xadrez');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (21, 'Artes marciais');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (22, 'Academia');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (23, 'Cozinhar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (24, 'Ler');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (25, 'Costurar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (26, 'Pintar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (27, 'Desenhar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (28, 'Jardinagem');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (29, 'Sinuca');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (30, 'Pedalar');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (31, 'Escrever');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (32, 'Decoração');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (33, 'Skate');
INSERT INTO hobby_labenu_system (`id`, `hobby`) VALUES (34, 'Patins');

INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (1, 'React');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (2, 'Redux');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (3, 'CSS');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (4, 'Testes');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (5, 'Typescript');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (6, 'POO');
INSERT INTO specialty_labenu_system (`id`, `specialty`) VALUES (7, 'Backend');
