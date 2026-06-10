import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const quizData = {
  'ai-intro': {
    hi: [
      { q: 'AI का पूरा नाम क्या है?', opts: ['Artificial Intelligence', 'Automatic Interface', 'Advanced Internet', 'Active Innovation'], ans: 0 },
      { q: 'AI किस चीज़ से सीखता है?', opts: ['Rules से', 'Data और Examples से', 'Books से', 'Teachers से'], ans: 1 },
      { q: 'इनमें से AI का example कौन सा है?', opts: ['Calculator', 'Fan', 'Google Assistant', 'Bulb'], ans: 2 },
      { q: 'AI को कौन बनाता है?', opts: ['Robots', 'Programmers और Scientists', 'Nature', 'Aliens'], ans: 1 },
      { q: 'YouTube videos suggest करने के लिए क्या use करता है?', opts: ['Magic', 'AI Algorithm', 'Random', 'Friends'], ans: 1 },
    ],
    mr: [
      { q: 'AI चं पूर्ण नाव काय आहे?', opts: ['Artificial Intelligence', 'Automatic Interface', 'Advanced Internet', 'Active Innovation'], ans: 0 },
      { q: 'AI कशापासून शिकतो?', opts: ['Rules पासून', 'Data आणि Examples पासून', 'Books पासून', 'Teachers पासून'], ans: 1 },
      { q: 'यापैकी AI चा example कोणता?', opts: ['Calculator', 'Fan', 'Google Assistant', 'Bulb'], ans: 2 },
      { q: 'AI कोण बनवतो?', opts: ['Robots', 'Programmers आणि Scientists', 'Nature', 'Aliens'], ans: 1 },
      { q: 'YouTube videos suggest करण्यासाठी काय वापरतो?', opts: ['Magic', 'AI Algorithm', 'Random', 'Friends'], ans: 1 },
    ],
    en: [
      { q: 'What does AI stand for?', opts: ['Artificial Intelligence', 'Automatic Interface', 'Advanced Internet', 'Active Innovation'], ans: 0 },
      { q: 'How does AI learn?', opts: ['From rules', 'From data and examples', 'From books', 'From teachers'], ans: 1 },
      { q: 'Which is an example of AI?', opts: ['Calculator', 'Fan', 'Google Assistant', 'Bulb'], ans: 2 },
      { q: 'Who creates AI?', opts: ['Robots', 'Programmers and Scientists', 'Nature', 'Aliens'], ans: 1 },
      { q: 'What does YouTube use to suggest videos?', opts: ['Magic', 'AI Algorithm', 'Random', 'Friends'], ans: 1 },
    ],
  },
  'block-coding': {
    hi: [
      { q: 'Block Coding में code कैसे लिखते हैं?', opts: ['Typing करके', 'Blocks जोड़कर', 'Drawing करके', 'Speaking करके'], ans: 1 },
      { q: 'Scratch किसने बनाया?', opts: ['Google', 'MIT', 'Apple', 'Microsoft'], ans: 1 },
      { q: 'Loop block का काम क्या है?', opts: ['Game बनाना', 'बार-बार करना', 'Color बदलना', 'Sound चलाना'], ans: 1 },
      { q: 'Event block कब काम करता है?', opts: ['हमेशा', 'कभी नहीं', 'जब action हो', 'Random'], ans: 2 },
      { q: 'Block coding किसके लिए best है?', opts: ['सिर्फ experts', 'सिर्फ adults', 'Beginners और kids', 'सिर्फ teachers'], ans: 2 },
    ],
    mr: [
      { q: 'Block Coding मध्ये code कसा लिहितात?', opts: ['Typing करून', 'Blocks जोडून', 'Drawing करून', 'बोलून'], ans: 1 },
      { q: 'Scratch कोणी बनवलं?', opts: ['Google', 'MIT', 'Apple', 'Microsoft'], ans: 1 },
      { q: 'Loop block चं काम काय?', opts: ['Game बनवणं', 'परत-परत करणं', 'Color बदलणं', 'Sound चालवणं'], ans: 1 },
      { q: 'Event block कधी काम करतो?', opts: ['नेहमी', 'कधीच नाही', 'जेव्हा action होतो', 'Random'], ans: 2 },
      { q: 'Block coding कोणासाठी best आहे?', opts: ['फक्त experts', 'फक्त adults', 'Beginners आणि kids', 'फक्त teachers'], ans: 2 },
    ],
    en: [
      { q: 'How do you write code in Block Coding?', opts: ['By typing', 'By joining blocks', 'By drawing', 'By speaking'], ans: 1 },
      { q: 'Who created Scratch?', opts: ['Google', 'MIT', 'Apple', 'Microsoft'], ans: 1 },
      { q: 'What does a Loop block do?', opts: ['Make a game', 'Repeat actions', 'Change color', 'Play sound'], ans: 1 },
      { q: 'When does an Event block work?', opts: ['Always', 'Never', 'When an action happens', 'Randomly'], ans: 2 },
      { q: 'Block coding is best for?', opts: ['Experts only', 'Adults only', 'Beginners and kids', 'Teachers only'], ans: 2 },
    ],
  },
  'robotics-intro': {
    hi: [
      { q: 'Robot के मुख्य parts कितने हैं?', opts: ['1', '2', '3', '5'], ans: 2 },
      { q: 'Robot की आँखें कौन सा part है?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
      { q: 'Mars पर कौन सा robot है?', opts: ['Roomba', 'ASIMO', 'Perseverance', 'Atlas'], ans: 2 },
      { q: 'Arduino क्या है?', opts: ['Game', 'Robot brain/controller', 'Sensor', 'Wheel'], ans: 1 },
      { q: 'Robot move करने के लिए क्या चाहिए?', opts: ['Sensors', 'Motors/Actuators', 'Camera', 'Speaker'], ans: 1 },
    ],
    mr: [
      { q: 'Robot चे मुख्य parts किती असतात?', opts: ['1', '2', '3', '5'], ans: 2 },
      { q: 'Robot चे डोळे कोणता part आहे?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
      { q: 'Mars वर कोणता robot आहे?', opts: ['Roomba', 'ASIMO', 'Perseverance', 'Atlas'], ans: 2 },
      { q: 'Arduino म्हणजे काय?', opts: ['Game', 'Robot brain/controller', 'Sensor', 'Wheel'], ans: 1 },
      { q: 'Robot ला move करण्यासाठी काय लागतं?', opts: ['Sensors', 'Motors/Actuators', 'Camera', 'Speaker'], ans: 1 },
    ],
    en: [
      { q: 'How many main parts does a Robot have?', opts: ['1', '2', '3', '5'], ans: 2 },
      { q: 'Which part acts as the eyes of a robot?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
      { q: 'Which robot is on Mars?', opts: ['Roomba', 'ASIMO', 'Perseverance', 'Atlas'], ans: 2 },
      { q: 'What is Arduino?', opts: ['A game', "Robot brain/controller", 'A sensor', 'A wheel'], ans: 1 },
      { q: 'What does a robot need to move?', opts: ['Sensors', 'Motors/Actuators', 'Camera', 'Speaker'], ans: 1 },
    ],
  },
  'ai-games': {
    hi: [
      { q: 'Game में AI enemies को क्या सिखाया जाता है?', opts: ['Dancing', 'Pathfinding और Decision making', 'Cooking', 'Singing'], ans: 1 },
      { q: 'AlphaGo किस game में World Champion बना?', opts: ['Chess', 'Go', 'Cricket', 'Football'], ans: 1 },
      { q: 'Mario Kart में Rubber band AI क्या करता है?', opts: ['Rubber से बना है', 'तुम्हें catch up करने देता है', 'Slow हो जाता है', 'Level छोड़ता है'], ans: 1 },
      { q: 'Game AI के लिए कौन सा technique use होती है?', opts: ['Decision Trees', 'Cooking recipes', 'Music notes', 'Paint mixing'], ans: 0 },
      { q: 'Scratch पर game बना सकते हैं?', opts: ['हाँ, free में', 'नहीं', 'Paid में', 'सिर्फ experts'], ans: 0 },
    ],
    mr: [
      { q: 'Game मध्ये AI enemies ला काय शिकवतात?', opts: ['Dancing', 'Pathfinding आणि Decision making', 'Cooking', 'Singing'], ans: 1 },
      { q: 'AlphaGo कोणत्या game मध्ये World Champion बनला?', opts: ['Chess', 'Go', 'Cricket', 'Football'], ans: 1 },
      { q: 'Mario Kart मधला Rubber band AI काय करतो?', opts: ['Rubber ने बनलेला', 'तुम्हाला catch up करू देतो', 'Slow होतो', 'Level सोडतो'], ans: 1 },
      { q: 'Game AI साठी कोणतं technique वापरतात?', opts: ['Decision Trees', 'Cooking recipes', 'Music notes', 'Paint mixing'], ans: 0 },
      { q: 'Scratch वर game बनवता येतो का?', opts: ['हो, free मध्ये', 'नाही', 'Paid मध्ये', 'फक्त experts'], ans: 0 },
    ],
    en: [
      { q: 'What are game AI enemies taught?', opts: ['Dancing', 'Pathfinding and Decision making', 'Cooking', 'Singing'], ans: 1 },
      { q: 'AlphaGo became World Champion in which game?', opts: ['Chess', 'Go', 'Cricket', 'Football'], ans: 1 },
      { q: 'What does Rubber band AI do in Mario Kart?', opts: ["It's made of rubber", 'Lets you catch up', 'Slows down', 'Skips levels'], ans: 1 },
      { q: 'Which technique is used for game AI?', opts: ['Decision Trees', 'Cooking recipes', 'Music notes', 'Paint mixing'], ans: 0 },
      { q: 'Can you build games on Scratch?', opts: ['Yes, for free', 'No', 'Paid only', 'Experts only'], ans: 0 },
    ],
  },
  'smart-devices': {
    hi: [
      { q: 'Smart devices में क्या होता है?', opts: ['Magic', 'AI', 'Electricity only', 'Water'], ans: 1 },
      { q: 'Alexa और Siri क्या हैं?', opts: ['Games', 'Voice AI assistants', 'Robots', 'Cameras'], ans: 1 },
      { q: '2030 तक कितने smart devices होंगे?', opts: ['1 million', '50 billion', '100', '1000'], ans: 1 },
      { q: 'Smart Watch क्या track करता है?', opts: ['Weather only', 'Health और fitness', 'Movies', 'News'], ans: 1 },
      { q: 'Smart devices internet से connect क्यों होते हैं?', opts: ['Fun के लिए', 'AI processing के लिए', 'Music के लिए', 'Color के लिए'], ans: 1 },
    ],
    mr: [
      { q: 'Smart devices मध्ये काय असतं?', opts: ['Magic', 'AI', 'फक्त Electricity', 'Water'], ans: 1 },
      { q: 'Alexa आणि Siri काय आहेत?', opts: ['Games', 'Voice AI assistants', 'Robots', 'Cameras'], ans: 1 },
      { q: '2030 पर्यंत किती smart devices असतील?', opts: ['1 million', '50 billion', '100', '1000'], ans: 1 },
      { q: 'Smart Watch काय track करतो?', opts: ['फक्त Weather', 'Health आणि fitness', 'Movies', 'News'], ans: 1 },
      { q: 'Smart devices internet ला connect का असतात?', opts: ['Fun साठी', 'AI processing साठी', 'Music साठी', 'Color साठी'], ans: 1 },
    ],
    en: [
      { q: 'What do smart devices have inside?', opts: ['Magic', 'AI', 'Electricity only', 'Water'], ans: 1 },
      { q: 'What are Alexa and Siri?', opts: ['Games', 'Voice AI assistants', 'Robots', 'Cameras'], ans: 1 },
      { q: 'How many smart devices by 2030?', opts: ['1 million', '50 billion', '100', '1000'], ans: 1 },
      { q: 'What does a Smart Watch track?', opts: ['Weather only', 'Health and fitness', 'Movies', 'News'], ans: 1 },
      { q: 'Why do smart devices connect to internet?', opts: ['For fun', 'For AI processing', 'For music', 'For color'], ans: 1 },
    ],
  },
  'ai-art': {
    hi: [
      { q: 'AI Art बनाने के लिए क्या देते हैं?', opts: ['Paint', 'Text prompt', 'Canvas', 'Brush'], ans: 1 },
      { q: 'DALL-E किस company का है?', opts: ['Google', 'OpenAI', 'Microsoft', 'Apple'], ans: 1 },
      { q: 'AutoDraw क्या करता है?', opts: ['Music बनाता है', 'Drawing में help करता है', 'Videos बनाता है', 'Code लिखता है'], ans: 1 },
      { q: 'AI Art 2022 competition में क्या किया?', opts: ['हारा', 'जीता', 'Participate नहीं किया', 'Disqualified'], ans: 1 },
      { q: 'Generative AI क्या बनाता है?', opts: ['सिर्फ text', 'सिर्फ images', 'New content — images, text, music', 'सिर्फ code'], ans: 2 },
    ],
    mr: [
      { q: 'AI Art बनवण्यासाठी काय देतात?', opts: ['Paint', 'Text prompt', 'Canvas', 'Brush'], ans: 1 },
      { q: 'DALL-E कोणत्या company चं आहे?', opts: ['Google', 'OpenAI', 'Microsoft', 'Apple'], ans: 1 },
      { q: 'AutoDraw काय करतो?', opts: ['Music बनवतो', 'Drawing ला help करतो', 'Videos बनवतो', 'Code लिहतो'], ans: 1 },
      { q: 'AI Art 2022 competition मध्ये काय केलं?', opts: ['हरलं', 'जिंकलं', 'Participate नाही केलं', 'Disqualified'], ans: 1 },
      { q: 'Generative AI काय बनवतो?', opts: ['फक्त text', 'फक्त images', 'New content — images, text, music', 'फक्त code'], ans: 2 },
    ],
    en: [
      { q: 'What do you give AI to create art?', opts: ['Paint', 'Text prompt', 'Canvas', 'Brush'], ans: 1 },
      { q: 'Which company made DALL-E?', opts: ['Google', 'OpenAI', 'Microsoft', 'Apple'], ans: 1 },
      { q: 'What does AutoDraw do?', opts: ['Creates music', 'Helps with drawing', 'Creates videos', 'Writes code'], ans: 1 },
      { q: 'What did AI Art do in 2022 competition?', opts: ['Lost', 'Won', "Didn't participate", 'Disqualified'], ans: 1 },
      { q: 'What does Generative AI create?', opts: ['Only text', 'Only images', 'New content — images, text, music', 'Only code'], ans: 2 },
    ],
  },
  'what-is-data': {
    hi: [
      { q: 'Data का मतलब क्या है?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
      { q: 'हर दिन कितना data बनता है?', opts: ['1 GB', '2.5 quintillion bytes', '100 MB', '1 TB'], ans: 1 },
      { q: 'AI को data क्यों चाहिए?', opts: ['खेलने के लिए', 'सीखने के लिए', 'Sleeping के लिए', 'Dancing के लिए'], ans: 1 },
      { q: 'Spotify किस data से songs suggest करता है?', opts: ['Age data', 'Listening history', 'Location', 'Name'], ans: 1 },
      { q: 'Data clean करने का मतलब?', opts: ['Washing', 'Mistakes और duplicates हटाना', 'Printing', 'Deleting all'], ans: 1 },
    ],
    mr: [
      { q: 'Data म्हणजे काय?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
      { q: 'रोज किती data बनतं?', opts: ['1 GB', '2.5 quintillion bytes', '100 MB', '1 TB'], ans: 1 },
      { q: 'AI ला data का लागतो?', opts: ['खेळण्यासाठी', 'शिकण्यासाठी', 'Sleeping साठी', 'Dancing साठी'], ans: 1 },
      { q: 'Spotify कोणत्या data ने songs suggest करतो?', opts: ['Age data', 'Listening history', 'Location', 'Name'], ans: 1 },
      { q: 'Data clean करणं म्हणजे काय?', opts: ['Washing', 'Mistakes आणि duplicates काढणे', 'Printing', 'Deleting all'], ans: 1 },
    ],
    en: [
      { q: 'What does Data mean?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
      { q: 'How much data is created every day?', opts: ['1 GB', '2.5 quintillion bytes', '100 MB', '1 TB'], ans: 1 },
      { q: 'Why does AI need data?', opts: ['To play', 'To learn', 'To sleep', 'To dance'], ans: 1 },
      { q: 'What data does Spotify use to suggest songs?', opts: ['Age data', 'Listening history', 'Location', 'Name'], ans: 1 },
      { q: 'What does cleaning data mean?', opts: ['Washing it', 'Removing mistakes and duplicates', 'Printing', 'Deleting all'], ans: 1 },
    ],
  },
  'future-jobs': {
    hi: [
      { q: 'Prompt Engineer क्या करता है?', opts: ['Code लिखता है', 'AI को सही instructions देता है', 'Robots बनाता है', 'Websites design करता है'], ans: 1 },
      { q: '2025 तक AI से कितने नए jobs बनेंगे?', opts: ['1000', '97 million', '100', '50'], ans: 1 },
      { q: 'AI Ethics Officer क्या करता है?', opts: ['AI games खेलता है', 'AI decisions check करता है', 'AI बेचता है', 'AI सोता है'], ans: 1 },
      { q: 'Future के लिए सबसे important skill?', opts: ['सिर्फ Math', 'Coding + AI + Creativity', 'सिर्फ English', 'सिर्फ Sports'], ans: 1 },
      { q: 'Prompt Engineer की salary?', opts: ['$1,000/year', '$300,000/year', '$100/year', '$10/year'], ans: 1 },
    ],
    mr: [
      { q: 'Prompt Engineer काय करतो?', opts: ['Code लिहतो', 'AI ला योग्य instructions देतो', 'Robots बनवतो', 'Websites design करतो'], ans: 1 },
      { q: '2025 पर्यंत AI मुळे किती नवीन jobs बनतील?', opts: ['1000', '97 million', '100', '50'], ans: 1 },
      { q: 'AI Ethics Officer काय करतो?', opts: ['AI games खेळतो', 'AI decisions check करतो', 'AI विकतो', 'AI झोपतो'], ans: 1 },
      { q: 'Future साठी सर्वात important skill?', opts: ['फक्त Math', 'Coding + AI + Creativity', 'फक्त English', 'फक्त Sports'], ans: 1 },
      { q: 'Prompt Engineer ची salary?', opts: ['$1,000/year', '$300,000/year', '$100/year', '$10/year'], ans: 1 },
    ],
    en: [
      { q: 'What does a Prompt Engineer do?', opts: ['Writes code', 'Gives correct instructions to AI', 'Builds robots', 'Designs websites'], ans: 1 },
      { q: 'How many new jobs will AI create by 2025?', opts: ['1000', '97 million', '100', '50'], ans: 1 },
      { q: 'What does an AI Ethics Officer do?', opts: ['Plays AI games', 'Checks AI decisions', 'Sells AI', 'Sleeps with AI'], ans: 1 },
      { q: 'Most important skill for the future?', opts: ['Math only', 'Coding + AI + Creativity', 'English only', 'Sports only'], ans: 1 },
      { q: 'Prompt Engineer salary?', opts: ['$1,000/year', '$300,000/year', '$100/year', '$10/year'], ans: 1 },
    ],
  },
  'ai-safety': {
    hi: [
      { q: 'Deepfake क्या है?', opts: ['Deep sea fish', 'AI से बना fake video/image', 'Deep meditation', 'Fake money'], ans: 1 },
      { q: 'AI Bias का मतलब?', opts: ["AI का color", "AI का unfair decision", "AI की speed", "AI का size"], ans: 1 },
      { q: 'AI को safe रखने का तरीका?', opts: ['Internet बंद करना', 'Human oversight रखना', 'AI delete करना', 'Rules न बनाना'], ans: 1 },
      { q: "Amazon का hiring AI क्यों बंद हुआ?", opts: ['Slow था', 'Women के साथ biased था', 'Expensive था', 'Broken था'], ans: 1 },
      { q: 'AI Safety teams किस company में हैं?', opts: ["McDonald's", 'Anthropic और OpenAI', 'Pizza Hut', 'Walmart'], ans: 1 },
    ],
    mr: [
      { q: 'Deepfake म्हणजे काय?', opts: ['Deep sea fish', 'AI ने बनवलेला fake video/image', 'Deep meditation', 'Fake money'], ans: 1 },
      { q: 'AI Bias म्हणजे काय?', opts: ["AI चा color", "AI चा unfair decision", "AI ची speed", "AI चा size"], ans: 1 },
      { q: 'AI ला safe ठेवण्याचा मार्ग?', opts: ['Internet बंद करणे', 'Human oversight ठेवणे', 'AI delete करणे', 'Rules न बनवणे'], ans: 1 },
      { q: 'Amazon चा hiring AI का बंद झाला?', opts: ['Slow होता', 'Women शी biased होता', 'Expensive होता', 'Broken होता'], ans: 1 },
      { q: 'AI Safety teams कोणत्या company मध्ये आहेत?', opts: ["McDonald's", 'Anthropic आणि OpenAI', 'Pizza Hut', 'Walmart'], ans: 1 },
    ],
    en: [
      { q: 'What is a Deepfake?', opts: ['Deep sea fish', 'AI-created fake video/image', 'Deep meditation', 'Fake money'], ans: 1 },
      { q: 'What does AI Bias mean?', opts: ["AI's color", "AI's unfair decision", "AI's speed", "AI's size"], ans: 1 },
      { q: 'One way to keep AI safe?', opts: ['Turn off internet', 'Have human oversight', 'Delete AI', 'Make no rules'], ans: 1 },
      { q: "Why was Amazon's hiring AI shut down?", opts: ['It was slow', 'It was biased against women', 'It was expensive', 'It was broken'], ans: 1 },
      { q: 'Which companies have AI Safety teams?', opts: ["McDonald's", 'Anthropic and OpenAI', 'Pizza Hut', 'Walmart'], ans: 1 },
    ],
  },
  'ai-story': {
    hi: [
      { q: 'AI को story में कैसे use करें?', opts: ['AI से copy करो', 'Idea दो, AI expand करे, तुम edit करो', 'AI से मत पूछो', 'सिर्फ AI लिखे'], ans: 1 },
      { q: 'ChatGPT किसमें help करता है?', opts: ['Cooking', 'Writing और story ideas', 'Driving', 'Swimming'], ans: 1 },
      { q: 'AI Story का पहला step?', opts: ['Direct लिखना', 'पहले idea देना', 'AI बंद करना', 'Paper लेना'], ans: 1 },
      { q: 'AI Dungeon क्या है?', opts: ['Game', 'Interactive AI story platform', 'Social media', 'News app'], ans: 1 },
      { q: 'AI story में तुम्हारा role?', opts: ['कुछ नहीं', 'Idea देना और edit करना', 'सिर्फ पढ़ना', 'Print करना'], ans: 1 },
    ],
    mr: [
      { q: 'AI ला story मध्ये कसं वापरायचं?', opts: ['AI कडून copy करा', 'Idea द्या, AI expand करेल, तुम्ही edit करा', 'AI ला विचारू नका', 'फक्त AI लिहू दे'], ans: 1 },
      { q: 'ChatGPT कशात help करतो?', opts: ['Cooking', 'Writing आणि story ideas', 'Driving', 'Swimming'], ans: 1 },
      { q: 'AI Story चा पहिला step?', opts: ['Direct लिहणे', 'आधी idea देणे', 'AI बंद करणे', 'Paper घेणे'], ans: 1 },
      { q: 'AI Dungeon म्हणजे काय?', opts: ['Game', 'Interactive AI story platform', 'Social media', 'News app'], ans: 1 },
      { q: 'AI story मध्ये तुमचा role?', opts: ['काहीच नाही', 'Idea देणे आणि edit करणे', 'फक्त वाचणे', 'Print करणे'], ans: 1 },
    ],
    en: [
      { q: 'How to use AI for story writing?', opts: ['Copy from AI', 'Give idea, AI expands, you edit', "Don't ask AI", 'Let AI write everything'], ans: 1 },
      { q: 'What does ChatGPT help with?', opts: ['Cooking', 'Writing and story ideas', 'Driving', 'Swimming'], ans: 1 },
      { q: 'First step to write an AI story?', opts: ['Start writing directly', 'Give an idea/prompt first', 'Turn off AI', 'Get paper'], ans: 1 },
      { q: 'What is AI Dungeon?', opts: ['A game', 'Interactive AI story platform', 'Social media', 'News app'], ans: 1 },
      { q: 'Your role when writing stories with AI?', opts: ['Nothing', 'Give idea and edit', 'Just read', 'Print it'], ans: 1 },
    ],
  },
  'python-basics': {
    hi: [
      { q: 'Python में output कैसे print करते हैं?', opts: ['console.log()', 'print()', 'echo()', 'output()'], ans: 1 },
      { q: 'Python किसके लिए popular है?', opts: ['Gaming', 'AI और ML', 'Web Design', 'Music'], ans: 1 },
      { q: 'Python में comment कैसे लिखते हैं?', opts: ['//', '/* */', '#', '--'], ans: 2 },
      { q: 'Variable बनाने का तरीका?', opts: ['var x = 5', 'x = 5', 'let x = 5', 'int x = 5'], ans: 1 },
      { q: 'Python practice कहाँ करें?', opts: ['Scratch.mit.edu', 'replit.com', 'minecraft.net', 'youtube.com'], ans: 1 },
    ],
    mr: [
      { q: 'Python मध्ये output कसं print करतात?', opts: ['console.log()', 'print()', 'echo()', 'output()'], ans: 1 },
      { q: 'Python कशासाठी popular आहे?', opts: ['Gaming', 'AI आणि ML', 'Web Design', 'Music'], ans: 1 },
      { q: 'Python मध्ये comment कसा लिहितात?', opts: ['//', '/* */', '#', '--'], ans: 2 },
      { q: 'Variable बनवण्याचा मार्ग?', opts: ['var x = 5', 'x = 5', 'let x = 5', 'int x = 5'], ans: 1 },
      { q: 'Python practice कुठे करायचं?', opts: ['Scratch.mit.edu', 'replit.com', 'minecraft.net', 'youtube.com'], ans: 1 },
    ],
    en: [
      { q: 'How do you print output in Python?', opts: ['console.log()', 'print()', 'echo()', 'output()'], ans: 1 },
      { q: 'Python is most popular for?', opts: ['Gaming', 'AI and ML', 'Web Design', 'Music'], ans: 1 },
      { q: 'How do you write a comment in Python?', opts: ['//', '/* */', '#', '--'], ans: 2 },
      { q: 'How to create a variable?', opts: ['var x = 5', 'x = 5', 'let x = 5', 'int x = 5'], ans: 1 },
      { q: 'Where to practice Python?', opts: ['Scratch.mit.edu', 'replit.com', 'minecraft.net', 'youtube.com'], ans: 1 },
    ],
  },
  'ml-intro': {
    hi: [
      { q: 'ML का मतलब?', opts: ['Machine Language', 'Machine Learning', 'Modern Logic', 'Multiple Layers'], ans: 1 },
      { q: 'ML में model कैसे सीखता है?', opts: ['Rules से', 'Examples से', 'Books से', 'Teachers से'], ans: 1 },
      { q: 'Gmail spam filter किस technology use करता है?', opts: ['Simple rules', 'Machine Learning', 'Manual review', 'Random'], ans: 1 },
      { q: 'ML के 3 steps सही order में?', opts: ['Predict→Train→Data', 'Data→Train→Predict', 'Train→Data→Predict', 'Predict→Data→Train'], ans: 1 },
      { q: 'ChatGPT किस technology पर है?', opts: ['Simple coding', 'Machine Learning', 'Database', 'Copy-paste'], ans: 1 },
    ],
    mr: [
      { q: 'ML चा अर्थ?', opts: ['Machine Language', 'Machine Learning', 'Modern Logic', 'Multiple Layers'], ans: 1 },
      { q: 'ML मध्ये model कसा शिकतो?', opts: ['Rules ने', 'Examples ने', 'Books ने', 'Teachers ने'], ans: 1 },
      { q: 'Gmail spam filter कोणती technology वापरतो?', opts: ['Simple rules', 'Machine Learning', 'Manual review', 'Random'], ans: 1 },
      { q: 'ML चे 3 steps योग्य order मध्ये?', opts: ['Predict→Train→Data', 'Data→Train→Predict', 'Train→Data→Predict', 'Predict→Data→Train'], ans: 1 },
      { q: 'ChatGPT कोणत्या technology वर आहे?', opts: ['Simple coding', 'Machine Learning', 'Database', 'Copy-paste'], ans: 1 },
    ],
    en: [
      { q: 'What does ML stand for?', opts: ['Machine Language', 'Machine Learning', 'Modern Logic', 'Multiple Layers'], ans: 1 },
      { q: 'How does an ML model learn?', opts: ['From rules', 'From examples', 'From books', 'From teachers'], ans: 1 },
      { q: 'What technology does Gmail spam filter use?', opts: ['Simple rules', 'Machine Learning', 'Manual review', 'Random'], ans: 1 },
      { q: 'Correct order of ML steps?', opts: ['Predict→Train→Data', 'Data→Train→Predict', 'Train→Data→Predict', 'Predict→Data→Train'], ans: 1 },
      { q: 'What technology is ChatGPT based on?', opts: ['Simple coding', 'Machine Learning', 'Database', 'Copy-paste'], ans: 1 },
    ],
  },
  'mini-project': {
    hi: [
      { q: 'Sentiment Analysis क्या है?', opts: ['Numbers calculate करना', 'Text का emotion पहचानना', 'Images देखना', 'Music बनाना'], ans: 1 },
      { q: 'Positive score कब बढ़ता है?', opts: ['Negative words से', 'Positive words से', 'कभी नहीं', 'Random'], ans: 1 },
      { q: 'Python में list कैसे बनाते हैं?', opts: ['list = {}', 'list = []', 'list = ()', 'list = ""'], ans: 1 },
      { q: 'score = 0 होने पर emotion?', opts: ['Positive', 'Negative', 'Neutral', 'Error'], ans: 2 },
      { q: 'Project improve कैसे करें?', opts: ['और words add करो', 'Delete करो', 'बंद करो', 'कुछ नहीं'], ans: 0 },
    ],
    mr: [
      { q: 'Sentiment Analysis म्हणजे काय?', opts: ['Numbers calculate करणं', 'Text चा emotion ओळखणं', 'Images बघणं', 'Music बनवणं'], ans: 1 },
      { q: 'Positive score कधी वाढतो?', opts: ['Negative words ने', 'Positive words ने', 'कधीच नाही', 'Random'], ans: 1 },
      { q: 'Python मध्ये list कशी बनवतात?', opts: ['list = {}', 'list = []', 'list = ()', 'list = ""'], ans: 1 },
      { q: 'score = 0 असेल तर emotion?', opts: ['Positive', 'Negative', 'Neutral', 'Error'], ans: 2 },
      { q: 'Project improve कसं करायचं?', opts: ['आणखी words add करा', 'Delete करा', 'बंद करा', 'काहीच नाही'], ans: 0 },
    ],
    en: [
      { q: 'What is Sentiment Analysis?', opts: ['Calculating numbers', 'Detecting emotion in text', 'Viewing images', 'Creating music'], ans: 1 },
      { q: 'When does positive score increase?', opts: ['From negative words', 'From positive words', 'Never', 'Randomly'], ans: 1 },
      { q: 'How to create a list in Python?', opts: ['list = {}', 'list = []', 'list = ()', 'list = ""'], ans: 1 },
      { q: 'If score = 0, what is the emotion?', opts: ['Positive', 'Negative', 'Neutral', 'Error'], ans: 2 },
      { q: 'How to improve the project?', opts: ['Add more words', 'Delete it', 'Close it', 'Nothing'], ans: 0 },
    ],
  },
  'data-science': {
    hi: [
      { q: 'Data Science क्या है?', opts: ['Data बनाना', 'Data से insights निकालना', 'Data delete करना', 'Data sell करना'], ans: 1 },
      { q: 'Netflix Data Science से कितना बचाते हैं?', opts: ['$100', '$1 billion/year', '$1000', '$1 million'], ans: 1 },
      { q: 'Kaggle क्या है?', opts: ['Game platform', 'Data science competitions', 'Social media', 'Shopping site'], ans: 1 },
      { q: 'Data Science process का पहला step?', opts: ['Visualize', 'Collect Data', 'Delete Data', 'Share Data'], ans: 1 },
      { q: 'Sports में Data Science किसलिए?', opts: ['Ticket sell', 'Player performance analyze', 'Food बनाना', 'Music play'], ans: 1 },
    ],
    mr: [
      { q: 'Data Science म्हणजे काय?', opts: ['Data बनवणे', 'Data मधून insights काढणे', 'Data delete करणे', 'Data sell करणे'], ans: 1 },
      { q: 'Netflix Data Science मुळे किती वाचवतात?', opts: ['$100', '$1 billion/year', '$1000', '$1 million'], ans: 1 },
      { q: 'Kaggle म्हणजे काय?', opts: ['Game platform', 'Data science competitions', 'Social media', 'Shopping site'], ans: 1 },
      { q: 'Data Science process चा पहिला step?', opts: ['Visualize', 'Collect Data', 'Delete Data', 'Share Data'], ans: 1 },
      { q: 'Sports मध्ये Data Science कशासाठी?', opts: ['Ticket sell', 'Player performance analyze', 'Food बनवणे', 'Music play'], ans: 1 },
    ],
    en: [
      { q: 'What is Data Science?', opts: ['Creating data', 'Extracting insights from data', 'Deleting data', 'Selling data'], ans: 1 },
      { q: 'How much does Netflix save from Data Science?', opts: ['$100', '$1 billion/year', '$1000', '$1 million'], ans: 1 },
      { q: 'What is Kaggle?', opts: ['Game platform', 'Data science competitions', 'Social media', 'Shopping site'], ans: 1 },
      { q: 'First step in Data Science process?', opts: ['Visualize', 'Collect Data', 'Delete Data', 'Share Data'], ans: 1 },
      { q: 'What is Data Science used for in sports?', opts: ['Selling tickets', 'Analyzing player performance', 'Making food', 'Playing music'], ans: 1 },
    ],
  },
  'computer-vision': {
    hi: [
      { q: 'Computer Vision क्या सिखाता है?', opts: ['सुनना', 'देखना', 'खाना', 'सोना'], ans: 1 },
      { q: 'Instagram पर हर minute कितनी photos?', opts: ['100', '95 lakh', '1000', '10'], ans: 1 },
      { q: 'Self-driving car में CV का use?', opts: ['Music', 'Road देखना', 'AC', 'Seat belt'], ans: 1 },
      { q: 'Teachable Machine से क्या बनाएं?', opts: ['Music', 'Image Classifier', 'Games', 'Videos'], ans: 1 },
      { q: 'CV में पहला step?', opts: ['Classify', 'Image input', 'Delete', 'Print'], ans: 1 },
    ],
    mr: [
      { q: 'Computer Vision काय शिकवतो?', opts: ['ऐकायला', 'बघायला', 'खायला', 'झोपायला'], ans: 1 },
      { q: 'Instagram वर प्रत्येक minute किती photos?', opts: ['100', '95 लाख', '1000', '10'], ans: 1 },
      { q: 'Self-driving car मध्ये CV चा use?', opts: ['Music', 'Road बघणे', 'AC', 'Seat belt'], ans: 1 },
      { q: 'Teachable Machine ने काय बनवायचं?', opts: ['Music', 'Image Classifier', 'Games', 'Videos'], ans: 1 },
      { q: 'CV मधला पहिला step?', opts: ['Classify', 'Image input', 'Delete', 'Print'], ans: 1 },
    ],
    en: [
      { q: 'What does Computer Vision teach computers?', opts: ['To hear', 'To see', 'To eat', 'To sleep'], ans: 1 },
      { q: 'How many photos on Instagram per minute?', opts: ['100', '95 million', '1000', '10'], ans: 1 },
      { q: 'How is CV used in self-driving cars?', opts: ['Music', 'Seeing roads', 'AC', 'Seat belts'], ans: 1 },
      { q: 'What to build with Teachable Machine?', opts: ['Music', 'Image Classifier', 'Games', 'Videos'], ans: 1 },
      { q: 'First step in CV?', opts: ['Classify', 'Image input', 'Delete', 'Print'], ans: 1 },
    ],
  },
  'nlp-basics': {
    hi: [
      { q: 'NLP का full form?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Language Path', 'Normal Loop Process'], ans: 0 },
      { q: 'ChatGPT किस technology से बना है?', opts: ['Computer Vision', 'NLP', 'Robotics', 'Gaming'], ans: 1 },
      { q: 'Google Translate कितनी languages?', opts: ['10', '50', '100+', '5'], ans: 2 },
      { q: 'NLP का पहला step?', opts: ['Image लेना', 'Text input', 'Video', 'Sound'], ans: 1 },
      { q: 'Gmail Smart Reply किस technology से?', opts: ['Random', 'NLP', 'Copy paste', 'Manual'], ans: 1 },
    ],
    mr: [
      { q: 'NLP चा full form?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Language Path', 'Normal Loop Process'], ans: 0 },
      { q: 'ChatGPT कोणत्या technology ने बनलं?', opts: ['Computer Vision', 'NLP', 'Robotics', 'Gaming'], ans: 1 },
      { q: 'Google Translate किती languages?', opts: ['10', '50', '100+', '5'], ans: 2 },
      { q: 'NLP चा पहिला step?', opts: ['Image घेणे', 'Text input', 'Video', 'Sound'], ans: 1 },
      { q: 'Gmail Smart Reply कोणत्या technology ने?', opts: ['Random', 'NLP', 'Copy paste', 'Manual'], ans: 1 },
    ],
    en: [
      { q: 'What does NLP stand for?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Language Path', 'Normal Loop Process'], ans: 0 },
      { q: 'What technology is ChatGPT built on?', opts: ['Computer Vision', 'NLP', 'Robotics', 'Gaming'], ans: 1 },
      { q: 'How many languages does Google Translate support?', opts: ['10', '50', '100+', '5'], ans: 2 },
      { q: 'First step in NLP?', opts: ['Taking image', 'Text input', 'Video', 'Sound'], ans: 1 },
      { q: 'What powers Gmail Smart Reply?', opts: ['Random guessing', 'NLP', 'Copy paste', 'Manual typing'], ans: 1 },
    ],
  },
  'ai-ethics': {
    hi: [
      { q: 'AI Bias क्या है?', opts: ["AI की power", "AI का unfair behavior", "AI की speed", "AI का color"], ans: 1 },
      { q: "Amazon का hiring AI क्यों बंद हुआ?", opts: ['Expensive', 'Women के साथ biased', 'Slow', 'Broken'], ans: 1 },
      { q: 'Ethical AI बनाने का तरीका?', opts: ['Biased data', 'Fair data और human review', 'No testing', 'Fast deploy'], ans: 1 },
      { q: 'Deepfake किस तरह का problem?', opts: ['AI Safety', 'Music', 'Food', 'Sports'], ans: 0 },
      { q: 'AI Ethics का goal?', opts: ['AI fast बनाना', 'AI को fair, safe, honest बनाना', 'AI cheap बनाना', 'AI colorful बनाना'], ans: 1 },
    ],
    mr: [
      { q: 'AI Bias म्हणजे काय?', opts: ["AI ची power", "AI चं unfair behavior", "AI ची speed", "AI चा color"], ans: 1 },
      { q: 'Amazon चा hiring AI का बंद झाला?', opts: ['Expensive', 'Women शी biased', 'Slow', 'Broken'], ans: 1 },
      { q: 'Ethical AI बनवण्याचा मार्ग?', opts: ['Biased data', 'Fair data आणि human review', 'No testing', 'Fast deploy'], ans: 1 },
      { q: 'Deepfake कोणत्या प्रकारची problem?', opts: ['AI Safety', 'Music', 'Food', 'Sports'], ans: 0 },
      { q: 'AI Ethics चा goal?', opts: ['AI fast बनवणे', 'AI ला fair, safe, honest बनवणे', 'AI cheap बनवणे', 'AI colorful बनवणे'], ans: 1 },
    ],
    en: [
      { q: 'What is AI Bias?', opts: ["AI's power", "AI's unfair behavior", "AI's speed", "AI's color"], ans: 1 },
      { q: "Why was Amazon's hiring AI shut down?", opts: ['Expensive', 'Biased against women', 'Slow', 'Broken'], ans: 1 },
      { q: 'How to build ethical AI?', opts: ['Biased data', 'Fair data and human review', 'No testing', 'Fast deploy'], ans: 1 },
      { q: 'What kind of problem is Deepfake?', opts: ['AI Safety', 'Music', 'Food', 'Sports'], ans: 0 },
      { q: 'What is the goal of AI Ethics?', opts: ['Make AI fast', 'Make AI fair, safe, honest', 'Make AI cheap', 'Make AI colorful'], ans: 1 },
    ],
  },
  'build-chatbot': {
    hi: [
      { q: 'Chatbot क्या करता है?', opts: ['Photos लेता है', 'Humans से conversation', 'Music बनाता है', 'Games खेलता है'], ans: 1 },
      { q: '80% businesses कब chatbots use करेंगे?', opts: ['अभी', 'अगले 5 साल में', '100 साल में', 'कभी नहीं'], ans: 1 },
      { q: 'Simple chatbot में responses कहाँ?', opts: ['Cloud', 'Dictionary', 'Database', 'File'], ans: 1 },
      { q: 'Dialogflow किसका है?', opts: ['Microsoft', 'Google', 'Apple', 'Amazon'], ans: 1 },
      { q: 'Chatbot के लिए Python में क्या?', opts: ['List', 'Dictionary + functions', 'Only loops', 'Only variables'], ans: 1 },
    ],
    mr: [
      { q: 'Chatbot काय करतो?', opts: ['Photos घेतो', 'Humans शी conversation', 'Music बनवतो', 'Games खेळतो'], ans: 1 },
      { q: '80% businesses कधी chatbots वापरतील?', opts: ['आत्ता', 'पुढील 5 वर्षांत', '100 वर्षांत', 'कधीच नाही'], ans: 1 },
      { q: 'Simple chatbot मध्ये responses कुठे?', opts: ['Cloud', 'Dictionary', 'Database', 'File'], ans: 1 },
      { q: 'Dialogflow कोणाचं?', opts: ['Microsoft', 'Google', 'Apple', 'Amazon'], ans: 1 },
      { q: 'Chatbot साठी Python मध्ये काय?', opts: ['List', 'Dictionary + functions', 'फक्त loops', 'फक्त variables'], ans: 1 },
    ],
    en: [
      { q: 'What does a Chatbot do?', opts: ['Takes photos', 'Converses with humans', 'Creates music', 'Plays games'], ans: 1 },
      { q: 'When will 80% businesses use chatbots?', opts: ['Now', 'Next 5 years', 'In 100 years', 'Never'], ans: 1 },
      { q: 'Where are responses stored in simple chatbot?', opts: ['Cloud', 'Dictionary', 'Database', 'File'], ans: 1 },
      { q: "Whose platform is Dialogflow?", opts: ['Microsoft', 'Google', 'Apple', 'Amazon'], ans: 1 },
      { q: 'What to use in Python for chatbot?', opts: ['List', 'Dictionary + functions', 'Only loops', 'Only variables'], ans: 1 },
    ],
  },
  'web-scraping': {
    hi: [
      { q: 'Web Scraping क्या है?', opts: ['Web Design', 'Internet से data collect करना', 'Website बनाना', 'Web delete'], ans: 1 },
      { q: 'Python में scraping library?', opts: ['Numpy', 'BeautifulSoup', 'Pandas', 'Matplotlib'], ans: 1 },
      { q: 'Google क्या है?', opts: ['Social media', 'Giant web scraper', 'Music app', 'Game'], ans: 1 },
      { q: 'Scraped data किसमें save?', opts: ['Video', 'CSV file', 'Image', 'Audio'], ans: 1 },
      { q: 'Web scraping का पहला step?', opts: ['Data analyze', 'URL से HTML download', 'CSV बनाना', 'Graph बनाना'], ans: 1 },
    ],
    mr: [
      { q: 'Web Scraping म्हणजे काय?', opts: ['Web Design', 'Internet मधून data collect करणे', 'Website बनवणे', 'Web delete'], ans: 1 },
      { q: 'Python मध्ये scraping library?', opts: ['Numpy', 'BeautifulSoup', 'Pandas', 'Matplotlib'], ans: 1 },
      { q: 'Google म्हणजे काय?', opts: ['Social media', 'Giant web scraper', 'Music app', 'Game'], ans: 1 },
      { q: 'Scraped data कशात save?', opts: ['Video', 'CSV file', 'Image', 'Audio'], ans: 1 },
      { q: 'Web scraping चा पहिला step?', opts: ['Data analyze', 'URL मधून HTML download', 'CSV बनवणे', 'Graph बनवणे'], ans: 1 },
    ],
    en: [
      { q: 'What is Web Scraping?', opts: ['Web Design', 'Collecting data from internet', 'Building websites', 'Deleting web'], ans: 1 },
      { q: 'Python scraping library?', opts: ['Numpy', 'BeautifulSoup', 'Pandas', 'Matplotlib'], ans: 1 },
      { q: 'What is Google?', opts: ['Social media', 'Giant web scraper', 'Music app', 'Game'], ans: 1 },
      { q: 'Where is scraped data saved?', opts: ['Video', 'CSV file', 'Image', 'Audio'], ans: 1 },
      { q: 'First step in web scraping?', opts: ['Analyze data', 'Download HTML from URL', 'Create CSV', 'Make graph'], ans: 1 },
    ],
  },
  'ai-music': {
    hi: [
      { q: 'Suno AI क्या करता है?', opts: ['Games बनाता है', 'Text से songs बनाता है', 'Images बनाता है', 'Code लिखता है'], ans: 1 },
      { q: 'AI Music बनाने के लिए क्या देते हैं?', opts: ['Guitar', 'Text prompt', 'Piano', 'Drums'], ans: 1 },
      { q: 'Suno AI पर 10 songs कितने time में?', opts: ['10 hours', '5 minutes', '1 day', '1 week'], ans: 1 },
      { q: 'AIVA क्या है?', opts: ['Social media', 'AI music composer', 'Gaming platform', 'News app'], ans: 1 },
      { q: 'AI Music में AI क्या analyze करता है?', opts: ['Colors', 'Rhythm, melody, harmony', 'Taste', 'Smell'], ans: 1 },
    ],
    mr: [
      { q: 'Suno AI काय करतो?', opts: ['Games बनवतो', 'Text मधून songs बनवतो', 'Images बनवतो', 'Code लिहतो'], ans: 1 },
      { q: 'AI Music बनवण्यासाठी काय देतात?', opts: ['Guitar', 'Text prompt', 'Piano', 'Drums'], ans: 1 },
      { q: 'Suno AI वर 10 songs किती वेळात?', opts: ['10 hours', '5 minutes', '1 day', '1 week'], ans: 1 },
      { q: 'AIVA म्हणजे काय?', opts: ['Social media', 'AI music composer', 'Gaming platform', 'News app'], ans: 1 },
      { q: 'AI Music मध्ये AI काय analyze करतो?', opts: ['Colors', 'Rhythm, melody, harmony', 'Taste', 'Smell'], ans: 1 },
    ],
    en: [
      { q: 'What does Suno AI do?', opts: ['Makes games', 'Creates songs from text', 'Makes images', 'Writes code'], ans: 1 },
      { q: 'What do you give to create AI Music?', opts: ['Guitar', 'Text prompt', 'Piano', 'Drums'], ans: 1 },
      { q: 'How long to make 10 songs on Suno AI?', opts: ['10 hours', '5 minutes', '1 day', '1 week'], ans: 1 },
      { q: 'What is AIVA?', opts: ['Social media', 'AI music composer', 'Gaming platform', 'News app'], ans: 1 },
      { q: 'What does AI analyze in AI Music?', opts: ['Colors', 'Rhythm, melody, harmony', 'Taste', 'Smell'], ans: 1 },
    ],
  },
  'neural-nets': {
    hi: [
      { q: 'Neural Network किससे inspired है?', opts: ['Computer circuits', 'Human brain', 'Internet', 'Solar system'], ans: 1 },
      { q: 'Neural Network में कितनी layers?', opts: ['1', '2', '3 (Input, Hidden, Output)', '10'], ans: 2 },
      { q: 'Deep Learning में Deep का मतलब?', opts: ['समुद्र', 'बहुत hidden layers', 'Difficult', 'Dark'], ans: 1 },
      { q: 'Image recognition के लिए best?', opts: ['RNN', 'CNN', 'Simple NN', 'Linear'], ans: 1 },
      { q: 'AlphaGo ने किसे beat किया?', opts: ['Chess computer', 'World Go Champion', 'Calculator', 'Programmer'], ans: 1 },
    ],
    mr: [
      { q: 'Neural Network कशापासून inspired?', opts: ['Computer circuits', 'Human brain', 'Internet', 'Solar system'], ans: 1 },
      { q: 'Neural Network मध्ये किती layers?', opts: ['1', '2', '3 (Input, Hidden, Output)', '10'], ans: 2 },
      { q: 'Deep Learning मध्ये Deep चा अर्थ?', opts: ['समुद्र', 'खूप hidden layers', 'Difficult', 'Dark'], ans: 1 },
      { q: 'Image recognition साठी best?', opts: ['RNN', 'CNN', 'Simple NN', 'Linear'], ans: 1 },
      { q: 'AlphaGo ने कोणाला beat केलं?', opts: ['Chess computer', 'World Go Champion', 'Calculator', 'Programmer'], ans: 1 },
    ],
    en: [
      { q: 'What is Neural Network inspired by?', opts: ['Computer circuits', 'Human brain', 'Internet', 'Solar system'], ans: 1 },
      { q: 'How many layers in Neural Network?', opts: ['1', '2', '3 (Input, Hidden, Output)', '10'], ans: 2 },
      { q: 'What does Deep mean in Deep Learning?', opts: ['Ocean', 'Many hidden layers', 'Difficult', 'Dark'], ans: 1 },
      { q: 'Best for image recognition?', opts: ['RNN', 'CNN', 'Simple NN', 'Linear'], ans: 1 },
      { q: 'Who did AlphaGo beat?', opts: ['Chess computer', 'World Go Champion', 'Calculator', 'Programmer'], ans: 1 },
    ],
  },
  'ml-project': {
    hi: [
      { q: 'Linear Regression किसके लिए?', opts: ['Images', 'Numbers predict', 'Text translate', 'Music'], ans: 1 },
      { q: 'sklearn का full name?', opts: ['Scikit-learn', 'Sky-learn', 'Science-learn', 'Simple-learn'], ans: 0 },
      { q: 'model.fit() क्या करता है?', opts: ['Delete', 'Train', 'Print', 'Copy'], ans: 1 },
      { q: 'House price prediction में input?', opts: ['Price', 'Rooms', 'Location', 'Color'], ans: 1 },
      { q: 'Real estate websites ML क्यों use करती हैं?', opts: ['Manual pricing', 'Price prediction', 'Photos', 'Calls'], ans: 1 },
    ],
    mr: [
      { q: 'Linear Regression कशासाठी?', opts: ['Images', 'Numbers predict', 'Text translate', 'Music'], ans: 1 },
      { q: 'sklearn चं full name?', opts: ['Scikit-learn', 'Sky-learn', 'Science-learn', 'Simple-learn'], ans: 0 },
      { q: 'model.fit() काय करतो?', opts: ['Delete', 'Train', 'Print', 'Copy'], ans: 1 },
      { q: 'House price prediction मध्ये input?', opts: ['Price', 'Rooms', 'Location', 'Color'], ans: 1 },
      { q: 'Real estate websites ML का वापरतात?', opts: ['Manual pricing', 'Price prediction', 'Photos', 'Calls'], ans: 1 },
    ],
    en: [
      { q: 'What is Linear Regression for?', opts: ['Images', 'Predicting numbers', 'Translating text', 'Music'], ans: 1 },
      { q: 'Full name of sklearn?', opts: ['Scikit-learn', 'Sky-learn', 'Science-learn', 'Simple-learn'], ans: 0 },
      { q: 'What does model.fit() do?', opts: ['Delete', 'Train', 'Print', 'Copy'], ans: 1 },
      { q: 'Input in house price prediction?', opts: ['Price', 'Rooms', 'Location', 'Color'], ans: 1 },
      { q: 'Why do real estate websites use ML?', opts: ['Manual pricing', 'Price prediction', 'Photos', 'Calls'], ans: 1 },
    ],
  },
  'ai-tools': {
    hi: [
      { q: 'Prompt Engineering क्या है?', opts: ['Computer programming', 'AI को सही instructions', 'Hardware', 'Database'], ans: 1 },
      { q: 'Coding के लिए AI tool?', opts: ['Midjourney', 'Suno AI', 'GitHub Copilot', 'Runway ML'], ans: 2 },
      { q: 'Images के लिए tool?', opts: ['ChatGPT', 'DALL-E/Midjourney', 'GitHub Copilot', 'Pandas'], ans: 1 },
      { q: 'Good prompt में क्या होना चाहिए?', opts: ['Vague', 'Specific context', 'One word', 'Nothing'], ans: 1 },
      { q: 'Prompt Engineer salary?', opts: ['$10,000/year', '$50,000/year', '$300,000/year', '$1,000/year'], ans: 2 },
    ],
    mr: [
      { q: 'Prompt Engineering म्हणजे काय?', opts: ['Computer programming', 'AI ला योग्य instructions', 'Hardware', 'Database'], ans: 1 },
      { q: 'Coding साठी AI tool?', opts: ['Midjourney', 'Suno AI', 'GitHub Copilot', 'Runway ML'], ans: 2 },
      { q: 'Images साठी tool?', opts: ['ChatGPT', 'DALL-E/Midjourney', 'GitHub Copilot', 'Pandas'], ans: 1 },
      { q: 'Good prompt मध्ये काय असावं?', opts: ['Vague', 'Specific context', 'One word', 'Nothing'], ans: 1 },
      { q: 'Prompt Engineer salary?', opts: ['$10,000/year', '$50,000/year', '$300,000/year', '$1,000/year'], ans: 2 },
    ],
    en: [
      { q: 'What is Prompt Engineering?', opts: ['Computer programming', 'Giving correct AI instructions', 'Hardware', 'Database'], ans: 1 },
      { q: 'AI tool for coding?', opts: ['Midjourney', 'Suno AI', 'GitHub Copilot', 'Runway ML'], ans: 2 },
      { q: 'Tool for images?', opts: ['ChatGPT', 'DALL-E/Midjourney', 'GitHub Copilot', 'Pandas'], ans: 1 },
      { q: 'What should a good prompt include?', opts: ['Vague instructions', 'Specific context', 'One word', 'Nothing'], ans: 1 },
      { q: 'Prompt Engineer salary?', opts: ['$10,000/year', '$50,000/year', '$300,000/year', '$1,000/year'], ans: 2 },
    ],
  },
  'deep-learning': {
    hi: [
      { q: 'Deep Learning में Deep का मतलब?', opts: ['समुद्र', 'Many hidden layers', 'Difficult code', 'Dark screen'], ans: 1 },
      { q: 'GPT-4 में कितने parameters हैं?', opts: ['1 million', '1.8 trillion', '100', '1 billion'], ans: 1 },
      { q: 'TensorFlow किस company का है?', opts: ['Apple', 'Google', 'Microsoft', 'Amazon'], ans: 1 },
      { q: 'DL और ML में फर्क?', opts: ['कोई नहीं', 'DL automatically features सीखता है', 'ML better', 'DL slower'], ans: 1 },
      { q: 'ChatGPT किस पर based है?', opts: ['Simple coding', 'Deep Learning', 'Database', 'Rules'], ans: 1 },
    ],
    mr: [
      { q: 'Deep Learning मध्ये Deep चा अर्थ?', opts: ['समुद्र', 'Many hidden layers', 'Difficult code', 'Dark screen'], ans: 1 },
      { q: 'GPT-4 मध्ये किती parameters?', opts: ['1 million', '1.8 trillion', '100', '1 billion'], ans: 1 },
      { q: 'TensorFlow कोणत्या company चं?', opts: ['Apple', 'Google', 'Microsoft', 'Amazon'], ans: 1 },
      { q: 'DL आणि ML मध्ये फरक?', opts: ['काहीच नाही', 'DL automatically features शिकतो', 'ML better', 'DL slower'], ans: 1 },
      { q: 'ChatGPT कशावर based?', opts: ['Simple coding', 'Deep Learning', 'Database', 'Rules'], ans: 1 },
    ],
    en: [
      { q: 'What does Deep mean in Deep Learning?', opts: ['Ocean', 'Many hidden layers', 'Difficult code', 'Dark screen'], ans: 1 },
      { q: 'How many parameters does GPT-4 have?', opts: ['1 million', '1.8 trillion', '100', '1 billion'], ans: 1 },
      { q: 'Which company made TensorFlow?', opts: ['Apple', 'Google', 'Microsoft', 'Amazon'], ans: 1 },
      { q: 'Difference between DL and ML?', opts: ['None', 'DL automatically learns features', 'ML is better', 'DL is slower'], ans: 1 },
      { q: 'What is ChatGPT based on?', opts: ['Simple coding', 'Deep Learning', 'Database', 'Rules'], ans: 1 },
    ],
  },
  'computer-vision-adv': {
    hi: [
      { q: 'Tesla में कितने cameras हैं?', opts: ['1', '4', '8', '16'], ans: 2 },
      { q: 'OpenCV किसलिए use होती है?', opts: ['Music', 'Computer Vision', 'Database', 'Web'], ans: 1 },
      { q: 'YOLO क्या करता है?', opts: ['Music बनाता है', 'Real-time object detection', 'Web scraping', 'Database'], ans: 1 },
      { q: 'Image Segmentation क्या है?', opts: ['Image delete', 'Pixel-level classification', 'Image copy', 'Image print'], ans: 1 },
      { q: 'Face detection में पहला step?', opts: ['Color analyze', 'Grayscale convert', 'Delete', 'Print'], ans: 1 },
    ],
    mr: [
      { q: 'Tesla मध्ये किती cameras?', opts: ['1', '4', '8', '16'], ans: 2 },
      { q: 'OpenCV कशासाठी?', opts: ['Music', 'Computer Vision', 'Database', 'Web'], ans: 1 },
      { q: 'YOLO काय करतो?', opts: ['Music बनवतो', 'Real-time object detection', 'Web scraping', 'Database'], ans: 1 },
      { q: 'Image Segmentation म्हणजे काय?', opts: ['Image delete', 'Pixel-level classification', 'Image copy', 'Image print'], ans: 1 },
      { q: 'Face detection मधला पहिला step?', opts: ['Color analyze', 'Grayscale convert', 'Delete', 'Print'], ans: 1 },
    ],
    en: [
      { q: 'How many cameras does Tesla have?', opts: ['1', '4', '8', '16'], ans: 2 },
      { q: 'What is OpenCV used for?', opts: ['Music', 'Computer Vision', 'Database', 'Web'], ans: 1 },
      { q: 'What does YOLO do?', opts: ['Creates music', 'Real-time object detection', 'Web scraping', 'Database'], ans: 1 },
      { q: 'What is Image Segmentation?', opts: ['Deleting image', 'Pixel-level classification', 'Copying image', 'Printing image'], ans: 1 },
      { q: 'First step in face detection?', opts: ['Color analyze', 'Grayscale convert', 'Delete', 'Print'], ans: 1 },
    ],
  },
  'nlp-transformers': {
    hi: [
      { q: 'Transformer किस company ने बनाया?', opts: ['OpenAI', 'Google', 'Microsoft', 'Apple'], ans: 1 },
      { q: '"Attention is All You Need" कब आया?', opts: ['2015', '2017', '2020', '2022'], ans: 1 },
      { q: 'Hugging Face क्या है?', opts: ['Social media', 'AI model hub', 'Game platform', 'Music app'], ans: 1 },
      { q: 'Self-Attention क्या करता है?', opts: ['Images देखता है', 'हर word दूसरे words को देखता है', 'Music सुनता है', 'Code लिखता है'], ans: 1 },
      { q: 'ChatGPT, Gemini, Claude सब किससे बने?', opts: ['Simple rules', 'Transformer architecture', 'Database', 'Excel'], ans: 1 },
    ],
    mr: [
      { q: 'Transformer कोणत्या company ने बनवलं?', opts: ['OpenAI', 'Google', 'Microsoft', 'Apple'], ans: 1 },
      { q: '"Attention is All You Need" कधी आलं?', opts: ['2015', '2017', '2020', '2022'], ans: 1 },
      { q: 'Hugging Face म्हणजे काय?', opts: ['Social media', 'AI model hub', 'Game platform', 'Music app'], ans: 1 },
      { q: 'Self-Attention काय करतो?', opts: ['Images बघतो', 'प्रत्येक word इतर words ला बघतो', 'Music ऐकतो', 'Code लिहतो'], ans: 1 },
      { q: 'ChatGPT, Gemini, Claude सगळे कशापासून बनले?', opts: ['Simple rules', 'Transformer architecture', 'Database', 'Excel'], ans: 1 },
    ],
    en: [
      { q: 'Which company created Transformer?', opts: ['OpenAI', 'Google', 'Microsoft', 'Apple'], ans: 1 },
      { q: 'When did "Attention is All You Need" come?', opts: ['2015', '2017', '2020', '2022'], ans: 1 },
      { q: 'What is Hugging Face?', opts: ['Social media', 'AI model hub', 'Game platform', 'Music app'], ans: 1 },
      { q: 'What does Self-Attention do?', opts: ['Views images', 'Each word looks at other words', 'Listens to music', 'Writes code'], ans: 1 },
      { q: 'What are ChatGPT, Gemini, Claude built on?', opts: ['Simple rules', 'Transformer architecture', 'Database', 'Excel'], ans: 1 },
    ],
  },
  'reinforcement-learning': {
    hi: [
      { q: 'RL में AI कैसे सीखता है?', opts: ['Rules से', 'Trial and error से', 'Books से', 'Videos से'], ans: 1 },
      { q: 'AlphaZero ने Chess कितने time में सीखा?', opts: ['4 days', '4 hours', '4 years', '4 minutes'], ans: 1 },
      { q: 'RL में Reward क्या है?', opts: ['Money', 'Good action का positive signal', 'Food', 'Sleep'], ans: 1 },
      { q: 'OpenAI Gym क्या है?', opts: ['Physical gym', 'RL environments platform', 'Social media', 'Game store'], ans: 1 },
      { q: 'Self-driving cars में RL का use?', opts: ['Music', 'Road navigation', 'AC', 'Seat belt'], ans: 1 },
    ],
    mr: [
      { q: 'RL मध्ये AI कसा शिकतो?', opts: ['Rules ने', 'Trial and error ने', 'Books ने', 'Videos ने'], ans: 1 },
      { q: 'AlphaZero ने Chess किती वेळात शिकलं?', opts: ['4 days', '4 hours', '4 years', '4 minutes'], ans: 1 },
      { q: 'RL मध्ये Reward म्हणजे काय?', opts: ['Money', 'Good action चा positive signal', 'Food', 'Sleep'], ans: 1 },
      { q: 'OpenAI Gym म्हणजे काय?', opts: ['Physical gym', 'RL environments platform', 'Social media', 'Game store'], ans: 1 },
      { q: 'Self-driving cars मध्ये RL?', opts: ['Music', 'Road navigation', 'AC', 'Seat belt'], ans: 1 },
    ],
    en: [
      { q: 'How does AI learn in RL?', opts: ['From rules', 'Through trial and error', 'From books', 'From videos'], ans: 1 },
      { q: 'How long did AlphaZero take to learn Chess?', opts: ['4 days', '4 hours', '4 years', '4 minutes'], ans: 1 },
      { q: 'What is Reward in RL?', opts: ['Money', 'Positive signal for good action', 'Food', 'Sleep'], ans: 1 },
      { q: 'What is OpenAI Gym?', opts: ['Physical gym', 'RL environments platform', 'Social media', 'Game store'], ans: 1 },
      { q: 'How is RL used in self-driving cars?', opts: ['Music', 'Road navigation', 'AC', 'Seat belts'], ans: 1 },
    ],
  },
  'generative-ai': {
    hi: [
      { q: 'Generative AI क्या बनाता है?', opts: ['Rules', 'New content — images, text, music', 'Old content copy', 'Nothing'], ans: 1 },
      { q: 'Generative AI market 2030 में?', opts: ['$1 million', '$1.3 trillion', '$1000', '$100 billion'], ans: 1 },
      { q: 'Stable Diffusion क्या है?', opts: ['Social media', 'Open-source image generator', 'Game', 'Database'], ans: 1 },
      { q: 'DALL-E किसलिए है?', opts: ['Music', 'Text से images', 'Code', 'Videos only'], ans: 1 },
      { q: 'Gen AI training में क्या use होता है?', opts: ['100 images', 'Billions of images/texts', '10 images', '1 image'], ans: 1 },
    ],
    mr: [
      { q: 'Generative AI काय बनवतो?', opts: ['Rules', 'New content — images, text, music', 'Old content copy', 'Nothing'], ans: 1 },
      { q: 'Generative AI market 2030 मध्ये?', opts: ['$1 million', '$1.3 trillion', '$1000', '$100 billion'], ans: 1 },
      { q: 'Stable Diffusion म्हणजे काय?', opts: ['Social media', 'Open-source image generator', 'Game', 'Database'], ans: 1 },
      { q: 'DALL-E कशासाठी?', opts: ['Music', 'Text मधून images', 'Code', 'फक्त Videos'], ans: 1 },
      { q: 'Gen AI training मध्ये काय?', opts: ['100 images', 'Billions of images/texts', '10 images', '1 image'], ans: 1 },
    ],
    en: [
      { q: 'What does Generative AI create?', opts: ['Rules', 'New content — images, text, music', 'Old content copy', 'Nothing'], ans: 1 },
      { q: 'Gen AI market by 2030?', opts: ['$1 million', '$1.3 trillion', '$1000', '$100 billion'], ans: 1 },
      { q: 'What is Stable Diffusion?', opts: ['Social media', 'Open-source image generator', 'Game', 'Database'], ans: 1 },
      { q: 'What is DALL-E for?', opts: ['Music', 'Images from text', 'Code', 'Videos only'], ans: 1 },
      { q: 'What is used in Gen AI training?', opts: ['100 images', 'Billions of images/texts', '10 images', '1 image'], ans: 1 },
    ],
  },
  'ai-security': {
    hi: [
      { q: 'Adversarial Attack क्या है?', opts: ['Physical attack', 'AI को fool करना', 'Database attack', 'Network attack'], ans: 1 },
      { q: 'Stop sign sticker से Tesla को क्या हुआ?', opts: ['Stop हो गई', 'Speed limit sign समझने लगी', 'Crash', 'कुछ नहीं'], ans: 1 },
      { q: 'Red Teaming क्या है?', opts: ['Red color use', 'AI को खुद attack करके test', 'Red team बनाना', 'Red flag'], ans: 1 },
      { q: 'Model Poisoning क्या है?', opts: ['AI को poison', 'Training data corrupt करना', 'Model delete', 'Model paint'], ans: 1 },
      { q: 'AI Security का goal?', opts: ['AI fast बनाना', 'AI को attacks से protect', 'AI cheap बनाना', 'AI बड़ा बनाना'], ans: 1 },
    ],
    mr: [
      { q: 'Adversarial Attack म्हणजे काय?', opts: ['Physical attack', 'AI ला fool करणे', 'Database attack', 'Network attack'], ans: 1 },
      { q: 'Stop sign sticker मुळे Tesla ला काय झालं?', opts: ['Stop झाली', 'Speed limit sign वाटला', 'Crash', 'काहीच नाही'], ans: 1 },
      { q: 'Red Teaming म्हणजे काय?', opts: ['Red color', 'AI ला स्वतः attack करून test', 'Red team', 'Red flag'], ans: 1 },
      { q: 'Model Poisoning म्हणजे काय?', opts: ['AI ला poison', 'Training data corrupt करणे', 'Model delete', 'Model paint'], ans: 1 },
      { q: 'AI Security चा goal?', opts: ['AI fast बनवणे', 'AI ला attacks पासून protect', 'AI cheap', 'AI मोठं'], ans: 1 },
    ],
    en: [
      { q: 'What is an Adversarial Attack?', opts: ['Physical attack', 'Fooling AI', 'Database attack', 'Network attack'], ans: 1 },
      { q: 'What happened to Tesla with stop sign sticker?', opts: ['It stopped', 'Read it as speed limit sign', 'Crashed', 'Nothing'], ans: 1 },
      { q: 'What is Red Teaming?', opts: ['Using red color', 'Testing AI by attacking it yourself', 'Building red team', 'Adding red flags'], ans: 1 },
      { q: 'What is Model Poisoning?', opts: ['Giving AI poison', 'Corrupting training data', 'Deleting model', 'Painting model'], ans: 1 },
      { q: 'Goal of AI Security?', opts: ['Make AI fast', 'Protect AI from attacks', 'Make AI cheap', 'Make AI big'], ans: 1 },
    ],
  },
  'ai-startup': {
    hi: [
      { q: 'Alexandr Wang ने Scale AI कितने साल में start किया?', opts: ['25', '19', '30', '16'], ans: 1 },
      { q: 'AI Startup का पहला step?', opts: ['Company register', 'Problem ढूंढना', 'Office लेना', 'Staff hire'], ans: 1 },
      { q: 'MVP का मतलब?', opts: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value', 'Most Visible Product'], ans: 1 },
      { q: 'GenAI Kids किस category में है?', opts: ['Gaming', 'AI Education Startup', 'Social Media', 'E-commerce'], ans: 1 },
      { q: 'Stripe किसलिए use होता है?', opts: ['Hosting', 'Payment integration', 'Design', 'Database'], ans: 1 },
    ],
    mr: [
      { q: 'Alexandr Wang ने Scale AI किती वर्षांत start केलं?', opts: ['25', '19', '30', '16'], ans: 1 },
      { q: 'AI Startup चा पहिला step?', opts: ['Company register', 'Problem शोधणे', 'Office घेणे', 'Staff hire'], ans: 1 },
      { q: 'MVP चा अर्थ?', opts: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value', 'Most Visible Product'], ans: 1 },
      { q: 'GenAI Kids कोणत्या category मध्ये?', opts: ['Gaming', 'AI Education Startup', 'Social Media', 'E-commerce'], ans: 1 },
      { q: 'Stripe कशासाठी?', opts: ['Hosting', 'Payment integration', 'Design', 'Database'], ans: 1 },
    ],
    en: [
      { q: 'At what age did Alexandr Wang start Scale AI?', opts: ['25', '19', '30', '16'], ans: 1 },
      { q: 'First step of an AI Startup?', opts: ['Register company', 'Find a problem', 'Get an office', 'Hire staff'], ans: 1 },
      { q: 'What does MVP stand for?', opts: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Value', 'Most Visible Product'], ans: 1 },
      { q: 'What category is GenAI Kids?', opts: ['Gaming', 'AI Education Startup', 'Social Media', 'E-commerce'], ans: 1 },
      { q: 'What is Stripe used for?', opts: ['Hosting', 'Payment integration', 'Design', 'Database'], ans: 1 },
    ],
  },
}

const uiText = {
  hi: { title: 'Quiz Time! 🧠', timeLeft: 'समय', next: 'अगला →', finish: 'Result देखो 🏆', correct: '✅ सही!', wrong: '❌ गलत!', result: 'तुम्हारा Result', pass: '🏆 Quiz Pass!', fail: '📚 फिर try करो!', retry: 'फिर कोशिश', home: 'Home', tutor: 'AI Tutor', saved: '✅ Lesson Complete!', q: 'सवाल' },
  mr: { title: 'Quiz Time! 🧠', timeLeft: 'वेळ', next: 'पुढे →', finish: 'Result बघा 🏆', correct: '✅ बरोबर!', wrong: '❌ चुकीचं!', result: 'तुमचा Result', pass: '🏆 Quiz Pass!', fail: '📚 पुन्हा try करा!', retry: 'पुन्हा प्रयत्न', home: 'Home', tutor: 'AI Tutor', saved: '✅ Lesson Complete!', q: 'प्रश्न' },
  en: { title: 'Quiz Time! 🧠', timeLeft: 'Time', next: 'Next →', finish: 'See Result 🏆', correct: '✅ Correct!', wrong: '❌ Wrong!', result: 'Your Result', pass: '🏆 Quiz Passed!', fail: '📚 Try Again!', retry: 'Try Again', home: 'Home', tutor: 'AI Tutor', saved: '✅ Lesson Complete!', q: 'Question' },
}

export default function QuizPage() {
  const { age, topic } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const { markComplete, isComplete } = useProgress()

  const questions = quizData[topic]?.[lang] || quizData[topic]?.mr || []
  const ui = uiText[lang]

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [timer, setTimer] = useState(30)
  const [answers, setAnswers] = useState([])
  const [justSaved, setJustSaved] = useState(false)

  const passed = score >= 3

  useEffect(() => {
    if (showResult || answered) return
    const t = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(t); handleAnswer(-1); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [current, answered, showResult])

  useEffect(() => {
    if (showResult && passed && !isComplete(age, topic)) {
      markComplete(age, topic)
      setJustSaved(true)
    }
  }, [showResult])

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const correct = questions[current]?.ans
    const isCorrect = idx === correct
    if (isCorrect) setScore(s => s + 1)
    setAnswers(prev => [...prev, { q: questions[current]?.q, selected: idx, correct, isCorrect }])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) setShowResult(true)
    else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); setTimer(30) }
  }

  if (!questions.length) return (
    <div className="app" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <div style={{textAlign:'center', color:'white'}}>
        <div style={{fontSize:'4rem'}}>🚧</div>
        <h2>Quiz Coming Soon!</h2>
        <button className="back-btn" style={{marginTop:'20px'}} onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  )

  if (showResult) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        </nav>
        <div className="quiz-container">
          {justSaved && (
            <div style={{background:'rgba(52,211,153,0.15)', border:'1px solid #34d399', borderRadius:'12px', padding:'12px 20px', marginBottom:'20px', color:'#34d399', fontWeight:'700', textAlign:'center'}}>
              {ui.saved}
            </div>
          )}
          <div className={`result-card ${passed ? 'result-pass' : 'result-fail'}`}>
            <div className="result-emoji">{passed ? '🏆' : '📚'}</div>
            <h2>{ui.result}</h2>
            <div className="score-circle">
              <span className="score-num">{score}</span>
              <span className="score-of">/{questions.length}</span>
            </div>
            <p className="score-pct">{Math.round((score / questions.length) * 100)}%</p>
            <p className="result-msg">{passed ? ui.pass : ui.fail}</p>
            <div className="answer-review">
              {answers.map((a, i) => (
                <div key={i} className={`review-item ${a.isCorrect ? 'correct' : 'wrong'}`}>
                  <span>{a.isCorrect ? '✅' : '❌'}</span>
                  <span style={{fontSize:'0.82rem'}}>{a.q}</span>
                </div>
              ))}
            </div>
            <div className="result-btns">
              {!passed && (
                <button className="card-btn" onClick={() => {
                  setCurrent(0); setScore(0); setSelected(null)
                  setAnswered(false); setTimer(30); setAnswers([])
                  setShowResult(false); setJustSaved(false)
                }}>{ui.retry}</button>
              )}
              <button className="cta-btn" onClick={() => navigate(`/tutor/${age}/${topic}`)}>{ui.tutor}</button>
              <button className="back-btn" onClick={() => navigate('/home')}>{ui.home}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const timerPct = (timer / 30) * 100

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </nav>
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-meta">
            <span>{ui.q} {current + 1} / {questions.length}</span>
            <span className="quiz-score">⭐ {score}</span>
          </div>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{width:`${(current / questions.length) * 100}%`}}></div>
          </div>
          <div className="timer-row">
            <span style={{color: timer <= 10 ? '#ef4444' : '#94a3b8', fontSize:'0.9rem'}}>
              ⏱️ {ui.timeLeft}: {timer}s
            </span>
            <div className="timer-bar">
              <div className="timer-fill" style={{width:`${timerPct}%`, background: timer <= 10 ? '#ef4444' : timer <= 20 ? '#fbbf24' : '#34d399'}}></div>
            </div>
          </div>
        </div>
        <div className="question-card">
          <h2 className="question-text">{q?.q}</h2>
          <div className="options-grid">
            {q?.opts.map((opt, i) => {
              let cls = 'option-btn'
              if (answered) {
                if (i === q.ans) cls += ' correct'
                else if (i === selected && i !== q.ans) cls += ' wrong'
                else cls += ' dimmed'
              }
              return (
                <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered}>
                  <span className="opt-letter">{['A','B','C','D'][i]}</span>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>
          {answered && (
            <div className={`feedback ${selected === q?.ans ? 'fb-correct' : 'fb-wrong'}`}>
              {selected === q?.ans ? ui.correct : `${ui.wrong} → ${q?.opts[q?.ans]}`}
            </div>
          )}
        </div>
        {answered && (
          <button className="cta-btn" style={{marginTop:'24px', width:'100%'}} onClick={handleNext}>
            {current + 1 >= questions.length ? ui.finish : ui.next}
          </button>
        )}
      </div>
    </div>
  )
}