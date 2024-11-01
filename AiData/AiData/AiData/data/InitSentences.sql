﻿/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

DECLARE @sentences AS TABLE
(
	[Sentence] VARCHAR(MAX) NOT NULL DEFAULT '',
	[Topic] VARCHAR(MAX) NOT NULL DEFAULT '',
	[InitId] INT NOT NULL DEFAULT 0
)

INSERT INTO @sentences (Sentence, Topic, InitId)
VALUES
(N'The sky is blue.', N'Sky', 1)
,(N'The sun rises.', N'Sun', 2)
,(N'The moon rises.', N'Moon', 3)
,(N'What time is it now?', N'General Questions',4)
,(N'Where are you going?', N'General Questions',5)
,(N'How do you feel today?', N'General Questions',6)
,(N'Why are you late?', N'General Questions',7)
,(N'Who is your best friend?', N'General Questions',8)
,(N'When is the meeting?', N'General Questions',9)
,(N'What is your favorite food?', N'General Questions',10)
,(N'Where do you live?', N'General Questions',11)
,(N'How old are you?', N'General Questions',12)
,(N'Why did you move here?', N'General Questions',13)
,(N'Work and Study:', N'General Questions',14)
,(N'What are your career goals?', N'General Questions',15)
,(N'When will the project be finished?', N'General Questions',16)
,(N'How long have you been working here?', N'General Questions',17)
,(N'What is the deadline for the report?', N'General Questions',18)
,(N'How do you manage your time?', N'General Questions',19)
,(N'Who is your supervisor?', N'General Questions',20)
,(N'What courses are you studying this semester?', N'General Questions',21)
,(N'Why did you choose this field of study?', N'General Questions',22)
,(N'How do you prepare for exams?', N'General Questions',23)
,(N'Where did you attend college?', N'General Questions',24)
,(N'What do you enjoy doing in your free time?', N'Social and Personal',25)
,(N'How do you usually spend your weekends?', N'Social and Personal',26)
,(N'Who do you admire the most?', N'Social and Personal',27)
,(N'When did you meet your partner?', N'Social and Personal',28)
,(N'Why do you like to travel?', N'Social and Personal',29)
,(N'What is the most exciting thing you’ve ever done?', N'Social and Personal',30)
,(N'Where do you want to go on your next vacation?', N'Social and Personal',31)
,(N'How do you maintain a healthy work-life balance?', N'Social and Personal',32)
,(N'When did you last go to a concert?', N'Social and Personal',33)
,(N'What kind of music do you listen to?', N'Social and Personal',34)
,(N'How often do you update your phone?', N'Technology',35)
,(N'What is your favorite app?', N'Technology',36)
,(N'Why did you choose to use a Mac instead of a PC?', N'Technology',37)
,(N'Who invented the first smartphone?', N'Technology',38)
,(N'What programming languages do you know?', N'Technology',39)
,(N'How do you troubleshoot technical issues?', N'Technology',40)
,(N'When did you first start using the internet?', N'Technology',41)
,(N'Where can I find a good tutorial for learning JavaScript?', N'Technology',42)
,(N'What is the most useful gadget you own?', N'Technology',43)
,(N'How does artificial intelligence work?', N'Technology',44)
,(N'How often do you exercise?', N'Health and Fitness',45)
,(N'What kind of workouts do you prefer?', N'Health and Fitness',46)
,(N'Why is a balanced diet important?', N'Health and Fitness',47)
,(N'When did you last visit the doctor?', N'Health and Fitness',48)
,(N'How do you stay motivated to stay fit?', N'Health and Fitness',49)
,(N'What foods do you avoid for a healthy lifestyle?', N'Health and Fitness',50)
,(N'Where can I find a good personal trainer?', N'Health and Fitness',51)
,(N'How much sleep do you get each night?', N'Health and Fitness',52)
,(N'What is your favorite type of exercise?', N'Health and Fitness',53)
,(N'Why do people meditate?', N'Health and Fitness',54)
,(N'Where is the best place to visit in the summer?', N'Travel and Geography',55)
,(N'How do you plan for an international trip?', N'Travel and Geography',56)
,(N'What is the capital of France?', N'Travel and Geography',57)
,(N'When is the best time to visit Japan?', N'Travel and Geography',58)
,(N'Why are some countries more popular tourist destinations?', N'Travel and Geography',59)
,(N'How far is it from New York to London?', N'Travel and Geography',60)
,(N'What travel apps do you use?', N'Travel and Geography',61)
,(N'Where did you go on your last vacation?', N'Travel and Geography',62)
,(N'What languages are spoken in Brazil?', N'Travel and Geography',63)
,(N'How can I find cheap flights?', N'Travel and Geography',64)
,(N'What is the best movie you’ve seen recently?', N'Entertainment',65)
,(N'Who is your favorite actor?', N'Entertainment',66)
,(N'How often do you go to the theater?', N'Entertainment',67)
,(N'When is the new season of your favorite TV show coming out?', N'Entertainment',68)
,(N'Why do you enjoy watching documentaries?', N'Entertainment',69)
,(N'What book are you reading right now?', N'Entertainment',70)
,(N'How do you discover new music?', N'Entertainment',71)
,(N'Who is the most famous celebrity right now?', N'Entertainment',72)
,(N'What is the plot of that movie?', N'Entertainment',73)
,(N'Where can I stream that series?', N'Entertainment',74)
,(N'How can I improve my communication skills?', N'Miscellaneous',75)
,(N'What motivates you to succeed?', N'Miscellaneous',76)
,(N'Why do people procrastinate?', N'Miscellaneous',77)
,(N'When did you start learning a second language?', N'Miscellaneous',78)
,(N'What are your thoughts on climate change?', N'Miscellaneous',79)
,(N'How do you handle stressful situations?', N'Miscellaneous',80)
,(N'Where can I buy organic produce?', N'Miscellaneous',81)
,(N'Why are you interested in this hobby?', N'Miscellaneous',82)
,(N'What is your favorite childhood memory?', N'Miscellaneous',83)
,(N'How do you usually celebrate your birthday?', N'Miscellaneous',84)