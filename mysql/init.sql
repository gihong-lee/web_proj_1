CREATE DATABASE account;
USE account;

CREATE TABLE `user` (
  `id` Int(11) NOT NULL auto_increment ,
  `user_id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE DATABASE ex_database;
USE ex_database;

CREATE TABLE `topic` (
  `id` Int(11) NOT NULL auto_increment ,
  `title` varchar(100) NOT NULL,
  `context` varchar(100) NOT NULL,
  `created` DATETIME NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `comment` (
    `id` Int(11) not null auto_increment,
    `topic_id` int(11) not null,
    `context` varchar(100), 
    `created` DATETIME not null,
    `author_id` int(11) not null,
    primary Key(`id`)
  );

INSERT INTO topic (title, context, created, author_id) VALUES ('text #1', 'text #1', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #2', 'text #2', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #3', 'text #3', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #4', 'text #4', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #5', 'text #5', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #6', 'text #6', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #7', 'text #7', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #8', 'text #8', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #9', 'text #9', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #10', 'text #10', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #11', 'text #11', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #12', 'text #12', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #13', 'text #13', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #14', 'text #14', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #15', 'text #15', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #16', 'text #16', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #17', 'text #17', NOW(), 8);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #18', 'text #18', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #19', 'text #19', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #20', 'text #20', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #21', 'text #21', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #22', 'text #22', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #23', 'text #23', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #24', 'text #24', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #25', 'text #25', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #26', 'text #26', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #27', 'text #27', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #28', 'text #28', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #29', 'text #29', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #30', 'text #30', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #31', 'text #31', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #32', 'text #32', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #33', 'text #33', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #34', 'text #34', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #35', 'text #35', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #36', 'text #36', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #37', 'text #37', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #38', 'text #38', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #39', 'text #39', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #40', 'text #40', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #41', 'text #41', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #42', 'text #42', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #43', 'text #43', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #44', 'text #44', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #45', 'text #45', NOW(), 8);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #46', 'text #46', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #47', 'text #47', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #48', 'text #48', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #49', 'text #49', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #50', 'text #50', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #51', 'text #51', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #52', 'text #52', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #53', 'text #53', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #54', 'text #54', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #55', 'text #55', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #56', 'text #56', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #57', 'text #57', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #58', 'text #58', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #59', 'text #59', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #60', 'text #60', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #61', 'text #61', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #62', 'text #62', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #63', 'text #63', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #64', 'text #64', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #65', 'text #65', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #66', 'text #66', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #67', 'text #67', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #68', 'text #68', NOW(), 8);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #69', 'text #69', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #70', 'text #70', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #71', 'text #71', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #72', 'text #72', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #73', 'text #73', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #74', 'text #74', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #75', 'text #75', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #76', 'text #76', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #77', 'text #77', NOW(), 8);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #78', 'text #78', NOW(), 4);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #79', 'text #79', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #80', 'text #80', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #81', 'text #81', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #82', 'text #82', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #83', 'text #83', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #84', 'text #84', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #85', 'text #85', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #86', 'text #86', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #87', 'text #87', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #88', 'text #88', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #89', 'text #89', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #90', 'text #90', NOW(), 5);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #91', 'text #91', NOW(), 7);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #92', 'text #92', NOW(), 3);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #93', 'text #93', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #94', 'text #94', NOW(), 8);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #95', 'text #95', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #96', 'text #96', NOW(), 6);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #97', 'text #97', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #98', 'text #98', NOW(), 1);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #99', 'text #99', NOW(), 2);
INSERT INTO topic (title, context, created, author_id) VALUES ('text #100', 'text #100', NOW(), 6);