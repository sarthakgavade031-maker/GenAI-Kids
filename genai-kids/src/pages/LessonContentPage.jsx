import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../LangContext'

const lessonData = {
  'ai-intro': {
    hi: { title: 'AI क्या है? 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 AI क्या है?', text: 'AI यानी Artificial Intelligence — computer को इंसान की तरह सोचना सिखाना! जैसे तुम school में सीखते हो, computer भी सीखता है — बस बहुत तेज़!' },
      { type: 'example', heading: '🌟 Real Examples', points: ['📱 Google Assistant — सवाल समझता है', '🎵 YouTube — पसंद के videos suggest करता है', '📸 Face Unlock — चेहरा पहचानता है', '🎮 Game Enemy — तुम्हें beat करने की कोशिश करता है'] },
      { type: 'tools', heading: '🔧 Try These AI Tools!', tools: [{ name: 'Quick Draw!', desc: 'AI तुम्हारी drawing पहचानता है', link: 'quickdraw.withgoogle.com', emoji: '🎨' }, { name: 'AutoDraw', desc: 'AI draw करने में help करता है', link: 'autodraw.com', emoji: '✏️' }, { name: 'Teachable Machine', desc: 'खुद AI train करो', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ AI कैसे काम करता है?', steps: [{ emoji: '👀', title: 'Data देखता है', desc: 'लाखों examples देखता है' }, { emoji: '🧠', title: 'Pattern सीखता है', desc: 'rules खुद बनाता है' }, { emoji: '✅', title: 'Decision लेता है', desc: 'नई situation solve करता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'तुम्हारा brain भी AI जैसा काम करता है! बचपन में हज़ारों cats देखीं इसलिए अब कोई भी cat पहचान लेते हो!' }
    ]},
    mr: { title: 'AI म्हणजे काय? 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 AI म्हणजे काय?', text: 'AI म्हणजे Artificial Intelligence — computer ला माणसासारखं विचार करायला शिकवणं! जसं तुम्ही शाळेत शिकता, computer पण शिकतो — फक्त खूप वेगाने!' },
      { type: 'example', heading: '🌟 Real Examples', points: ['📱 Google Assistant — प्रश्न समजतो', '🎵 YouTube — आवडणारे videos suggest करतो', '📸 Face Unlock — चेहरा ओळखतो', '🎮 Game Enemy — तुम्हाला beat करण्याचा प्रयत्न'] },
      { type: 'tools', heading: '🔧 हे AI Tools Try करा!', tools: [{ name: 'Quick Draw!', desc: 'AI तुमची drawing ओळखतो', link: 'quickdraw.withgoogle.com', emoji: '🎨' }, { name: 'AutoDraw', desc: 'AI draw करायला help करतो', link: 'autodraw.com', emoji: '✏️' }, { name: 'Teachable Machine', desc: 'स्वतः AI train करा', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ AI कसं काम करतो?', steps: [{ emoji: '👀', title: 'Data बघतो', desc: 'लाखो examples पाहतो' }, { emoji: '🧠', title: 'Pattern शिकतो', desc: 'rules स्वतः बनवतो' }, { emoji: '✅', title: 'Decision घेतो', desc: 'नवीन situation solve करतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'तुमचा brain पण AI सारखाच! हजारो cats बघितल्या म्हणून आता कुठलीही cat ओळखता!' }
    ]},
    en: { title: 'What is AI? 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 What is AI?', text: 'AI stands for Artificial Intelligence — teaching computers to think like humans! Just like you learn at school, computers learn too — just much faster!' },
      { type: 'example', heading: '🌟 Real Examples', points: ['📱 Google Assistant — understands your questions', '🎵 YouTube — suggests videos you like', '📸 Face Unlock — recognizes your face', '🎮 Game Enemy — tries to beat you'] },
      { type: 'tools', heading: '🔧 Try These AI Tools!', tools: [{ name: 'Quick Draw!', desc: 'AI recognizes your drawings', link: 'quickdraw.withgoogle.com', emoji: '🎨' }, { name: 'AutoDraw', desc: 'AI helps you draw', link: 'autodraw.com', emoji: '✏️' }, { name: 'Teachable Machine', desc: 'Train your own AI', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ How Does AI Work?', steps: [{ emoji: '👀', title: 'Sees Data', desc: 'Looks at millions of examples' }, { emoji: '🧠', title: 'Learns Patterns', desc: 'Creates its own rules' }, { emoji: '✅', title: 'Makes Decisions', desc: 'Solves new situations' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Your brain works just like AI! You saw thousands of cats as a kid, so now you can recognize any cat!' }
    ]},
  },
  'block-coding': {
    hi: { title: 'Block Coding Game 🎮', color: '#38bdf8', sections: [
      { type: 'intro', heading: '💻 Block Coding क्या है?', text: 'Block Coding यानी LEGO जैसी coding! Typing की ज़रूरत नहीं — बस colorful blocks जोड़ो और computer उन्हें follow करता है!' },
      { type: 'example', heading: '🌟 Block Coding कहाँ use होती है?', points: ['🎮 Scratch — MIT का free platform', '🤖 LEGO Mindstorms — Robots control करना', '🎨 Code.org — Games बनाना', '📱 MIT App Inventor — Apps बनाना'] },
      { type: 'tools', heading: '🔧 Try These Tools!', tools: [{ name: 'Scratch', desc: 'Games और stories बनाओ', link: 'scratch.mit.edu', emoji: '🐱' }, { name: 'Code.org', desc: 'Free coding lessons', link: 'code.org', emoji: '💻' }, { name: 'Blockly', desc: 'Google का block coding', link: 'blockly.games', emoji: '🧩' }] },
      { type: 'howworks', heading: '🧩 Basic Blocks कैसे होते हैं?', steps: [{ emoji: '🔵', title: 'Events', desc: '"जब button दबाया" ट्रिगर करता है' }, { emoji: '🟡', title: 'Actions', desc: '"आगे जाओ, मुड़ो" execute करता है' }, { emoji: '🟢', title: 'Loops', desc: '"यह 10 बार करो" repeat करता है' }] },
      { type: 'funfact', heading: '🎉 Try It!', text: 'Scratch.mit.edu पर जाओ — बिल्कुल free! पहला game 30 minutes में बना सकते हो!' }
    ]},
    mr: { title: 'Block Coding Game 🎮', color: '#38bdf8', sections: [
      { type: 'intro', heading: '💻 Block Coding म्हणजे काय?', text: 'Block Coding म्हणजे LEGO सारखं coding! Typing ची गरज नाही — फक्त blocks जोडा!' },
      { type: 'example', heading: '🌟 Block Coding कुठे वापरतात?', points: ['🎮 Scratch — MIT चं free platform', '🤖 LEGO Mindstorms — Robots control', '🎨 Code.org — Games बनवणे', '📱 MIT App Inventor — Apps बनवणे'] },
      { type: 'tools', heading: '🔧 हे Tools Try करा!', tools: [{ name: 'Scratch', desc: 'Games आणि stories बनवा', link: 'scratch.mit.edu', emoji: '🐱' }, { name: 'Code.org', desc: 'Free coding lessons', link: 'code.org', emoji: '💻' }, { name: 'Blockly', desc: 'Google चं block coding', link: 'blockly.games', emoji: '🧩' }] },
      { type: 'howworks', heading: '🧩 Basic Blocks कसे असतात?', steps: [{ emoji: '🔵', title: 'Events', desc: '"जेव्हा button दाबला" trigger' }, { emoji: '🟡', title: 'Actions', desc: '"पुढे जा, वळ" execute' }, { emoji: '🟢', title: 'Loops', desc: '"हे 10 वेळा कर" repeat' }] },
      { type: 'funfact', heading: '🎉 Try करा!', text: 'Scratch.mit.edu — पूर्णपणे free! पहिला game 30 minutes मध्ये बनवता येतो!' }
    ]},
    en: { title: 'Block Coding Game 🎮', color: '#38bdf8', sections: [
      { type: 'intro', heading: '💻 What is Block Coding?', text: 'Block Coding is like LEGO for coding! No typing needed — just join colorful blocks together!' },
      { type: 'example', heading: '🌟 Where is Block Coding Used?', points: ['🎮 Scratch — Free platform by MIT', '🤖 LEGO Mindstorms — Control robots', '🎨 Code.org — Build games', '📱 MIT App Inventor — Build apps'] },
      { type: 'tools', heading: '🔧 Try These Tools!', tools: [{ name: 'Scratch', desc: 'Build games and stories', link: 'scratch.mit.edu', emoji: '🐱' }, { name: 'Code.org', desc: 'Free coding lessons', link: 'code.org', emoji: '💻' }, { name: 'Blockly', desc: "Google's block coding", link: 'blockly.games', emoji: '🧩' }] },
      { type: 'howworks', heading: '🧩 What are Basic Blocks?', steps: [{ emoji: '🔵', title: 'Events', desc: '"When button pressed" triggers' }, { emoji: '🟡', title: 'Actions', desc: '"Move forward, turn" executes' }, { emoji: '🟢', title: 'Loops', desc: '"Do this 10 times" repeats' }] },
      { type: 'funfact', heading: '🎉 Try It!', text: 'Go to Scratch.mit.edu — completely free! Build your first game in 30 minutes!' }
    ]},
  },
  'robotics-intro': {
    hi: { title: 'Robot कैसे बनता है? 🦾', color: '#34d399', sections: [
      { type: 'intro', heading: '🤖 Robot क्या है?', text: 'Robot एक machine है जो खुद काम कर सकती है! Sensors हैं, brain है, body है!' },
      { type: 'example', heading: '🌟 Robots हमारे आसपास', points: ['🏭 Factory Robots — Cars बनाते हैं', '🏥 Medical Robots — Operations करते हैं', '🚀 Perseverance — Mars पर है', '🏠 Roomba — घर साफ करता है'] },
      { type: 'tools', heading: '🔧 Robotics Tools!', tools: [{ name: 'Scratch + Extensions', desc: 'Robot को code करो', link: 'scratch.mit.edu', emoji: '🤖' }, { name: 'Tinkercad', desc: '3D robot parts design करो', link: 'tinkercad.com', emoji: '🔧' }, { name: 'Arduino Simulator', desc: 'Virtual Arduino try करो', link: 'wokwi.com', emoji: '⚡' }] },
      { type: 'howworks', heading: '⚙️ Robot के 3 Parts', steps: [{ emoji: '👁️', title: 'Sensors', desc: 'Camera, Microphone, Touch' }, { emoji: '🧠', title: 'Controller', desc: 'Arduino / Raspberry Pi' }, { emoji: '💪', title: 'Actuators', desc: 'Motors, Servos, Wheels' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'NASA का Perseverance robot Mars पर है — 54 करोड़ km दूर! AI से navigate करता है!' }
    ]},
    mr: { title: 'Robot कसा बनतो? 🦾', color: '#34d399', sections: [
      { type: 'intro', heading: '🤖 Robot म्हणजे काय?', text: 'Robot म्हणजे एक machine जी स्वतः काम करू शकते! Sensors आहेत, brain आहे, body आहे!' },
      { type: 'example', heading: '🌟 Robots आपल्या आजूबाजूला', points: ['🏭 Factory Robots — Cars बनवतात', '🏥 Medical Robots — Operations', '🚀 Perseverance — Mars वर आहे', '🏠 Roomba — घर साफ करतो'] },
      { type: 'tools', heading: '🔧 Robotics Tools!', tools: [{ name: 'Scratch + Extensions', desc: 'Robot ला code करा', link: 'scratch.mit.edu', emoji: '🤖' }, { name: 'Tinkercad', desc: '3D robot parts design करा', link: 'tinkercad.com', emoji: '🔧' }, { name: 'Arduino Simulator', desc: 'Virtual Arduino try करा', link: 'wokwi.com', emoji: '⚡' }] },
      { type: 'howworks', heading: '⚙️ Robot चे 3 Parts', steps: [{ emoji: '👁️', title: 'Sensors', desc: 'Camera, Microphone, Touch' }, { emoji: '🧠', title: 'Controller', desc: 'Arduino / Raspberry Pi' }, { emoji: '💪', title: 'Actuators', desc: 'Motors, Servos, Wheels' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'NASA चा Perseverance robot Mars वर आहे — 54 कोटी km दूर! AI ने navigate करतो!' }
    ]},
    en: { title: 'How are Robots Built? 🦾', color: '#34d399', sections: [
      { type: 'intro', heading: '🤖 What is a Robot?', text: 'A robot is a machine that can work on its own! It has sensors, a brain, and a body!' },
      { type: 'example', heading: '🌟 Robots Around Us', points: ['🏭 Factory Robots — Build cars', '🏥 Medical Robots — Perform operations', '🚀 Perseverance — On Mars', '🏠 Roomba — Cleans your house'] },
      { type: 'tools', heading: '🔧 Robotics Tools!', tools: [{ name: 'Scratch + Extensions', desc: 'Code a robot', link: 'scratch.mit.edu', emoji: '🤖' }, { name: 'Tinkercad', desc: 'Design 3D robot parts', link: 'tinkercad.com', emoji: '🔧' }, { name: 'Arduino Simulator', desc: 'Try virtual Arduino', link: 'wokwi.com', emoji: '⚡' }] },
      { type: 'howworks', heading: '⚙️ 3 Parts of a Robot', steps: [{ emoji: '👁️', title: 'Sensors', desc: 'Camera, Microphone, Touch' }, { emoji: '🧠', title: 'Controller', desc: 'Arduino / Raspberry Pi' }, { emoji: '💪', title: 'Actuators', desc: 'Motors, Servos, Wheels' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: "NASA's Perseverance robot is on Mars — 540 million km away! It uses AI to navigate!" }
    ]},
  },
  'ai-games': {
    hi: { title: 'AI in Games 🎯', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎮 Games में AI कैसे काम करता है?', text: 'जब तुम video game खेलते हो तो enemies, NPCs सब AI से control होते हैं! वो तुम्हारी moves देखते हैं और react करते हैं — बिल्कुल इंसान की तरह!' },
      { type: 'example', heading: '🌟 Famous AI in Games', points: ['🏎️ Mario Kart — Rubber band AI तुम्हें catch करता है', '♟️ Chess engines — World champions को beat करते हैं', '🎯 PUBG/Free Fire — Bots तुम्हारी style copy करते हैं', '🧩 Candy Crush — AI difficulty adjust करता है'] },
      { type: 'tools', heading: '🔧 Game AI Tools!', tools: [{ name: 'Scratch', desc: 'अपना AI game बनाओ', link: 'scratch.mit.edu', emoji: '🎮' }, { name: 'AI Dungeon', desc: 'AI से story game खेलो', link: 'aidungeon.io', emoji: '📖' }, { name: 'GDevelop', desc: 'No-code game builder', link: 'gdevelop.io', emoji: '🕹️' }] },
      { type: 'howworks', heading: '⚙️ Game AI कैसे बनता है?', steps: [{ emoji: '🗺️', title: 'Pathfinding', desc: 'Enemy को रास्ता ढूंढना सिखाते हैं' }, { emoji: '🎯', title: 'Decision Trees', desc: 'Attack/defend कब करना decide करता है' }, { emoji: '🧠', title: 'Machine Learning', desc: 'Player की habits सीखता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Google DeepMind का AlphaGo AI ने 2016 में World Go Champion को beat किया — वो move जो इंसान ने कभी नहीं सोची थी!' }
    ]},
    mr: { title: 'AI in Games 🎯', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎮 Games मध्ये AI कसं काम करतं?', text: 'जेव्हा तुम्ही video game खेळता तेव्हा enemies, NPCs सगळे AI ने control होतात! ते तुमच्या moves बघतात आणि react करतात!' },
      { type: 'example', heading: '🌟 Famous AI in Games', points: ['🏎️ Mario Kart — Rubber band AI तुम्हाला catch करतो', '♟️ Chess engines — World champions ला beat करतात', '🎯 PUBG/Free Fire — Bots तुमची style copy करतात', '🧩 Candy Crush — AI difficulty adjust करतो'] },
      { type: 'tools', heading: '🔧 Game AI Tools!', tools: [{ name: 'Scratch', desc: 'स्वतःचा AI game बनवा', link: 'scratch.mit.edu', emoji: '🎮' }, { name: 'AI Dungeon', desc: 'AI ने story game खेळा', link: 'aidungeon.io', emoji: '📖' }, { name: 'GDevelop', desc: 'No-code game builder', link: 'gdevelop.io', emoji: '🕹️' }] },
      { type: 'howworks', heading: '⚙️ Game AI कसा बनतो?', steps: [{ emoji: '🗺️', title: 'Pathfinding', desc: 'Enemy ला रस्ता शोधायला शिकवतात' }, { emoji: '🎯', title: 'Decision Trees', desc: 'Attack/defend कधी करायचं decide करतो' }, { emoji: '🧠', title: 'Machine Learning', desc: "Player च्या habits शिकतो" }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Google DeepMind चा AlphaGo AI ने 2016 मध्ये World Go Champion ला beat केलं — अशी move जी कोणी विचार केली नव्हती!' }
    ]},
    en: { title: 'AI in Games 🎯', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎮 How Does AI Work in Games?', text: 'When you play video games, enemies and NPCs are all controlled by AI! They watch your moves and react — just like a human!' },
      { type: 'example', heading: '🌟 Famous AI in Games', points: ['🏎️ Mario Kart — Rubber band AI catches up to you', '♟️ Chess engines — Beat world champions', '🎯 PUBG/Free Fire — Bots copy your playing style', '🧩 Candy Crush — AI adjusts difficulty'] },
      { type: 'tools', heading: '🔧 Game AI Tools!', tools: [{ name: 'Scratch', desc: 'Build your own AI game', link: 'scratch.mit.edu', emoji: '🎮' }, { name: 'AI Dungeon', desc: 'Play AI story games', link: 'aidungeon.io', emoji: '📖' }, { name: 'GDevelop', desc: 'No-code game builder', link: 'gdevelop.io', emoji: '🕹️' }] },
      { type: 'howworks', heading: '⚙️ How is Game AI Built?', steps: [{ emoji: '🗺️', title: 'Pathfinding', desc: 'Teaches enemies to find paths' }, { emoji: '🎯', title: 'Decision Trees', desc: 'Decides when to attack/defend' }, { emoji: '🧠', title: 'Machine Learning', desc: "Learns player's habits" }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: "Google DeepMind's AlphaGo beat the World Go Champion in 2016 — with a move no human had ever thought of!" }
    ]},
  },
  'smart-devices': {
    hi: { title: 'Smart Devices 📱', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📱 Smart Devices क्या हैं?', text: 'Smart devices वो devices हैं जो AI की मदद से खुद decisions लेते हैं! Phone, Smart TV, Smart Watch, Smart Speaker — सब में AI है!' },
      { type: 'example', heading: '🌟 Smart Devices Examples', points: ['🗣️ Alexa/Siri/Google — Voice से commands समझते हैं', '📺 Smart TV — तुम्हारी पसंद के shows suggest करता है', '⌚ Smart Watch — Health track करता है', '🏠 Smart Bulb — Time और mood के हिसाब से color बदलता है'] },
      { type: 'tools', heading: '🔧 Smart Device Tools!', tools: [{ name: 'Google Home', desc: 'Smart home explore करो', link: 'home.google.com', emoji: '🏠' }, { name: 'IFTTT', desc: 'Smart automations बनाओ', link: 'ifttt.com', emoji: '⚡' }, { name: 'Micro:bit', desc: 'अपना smart device बनाओ', link: 'microbit.org', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ Smart Devices कैसे काम करते हैं?', steps: [{ emoji: '🎤', title: 'Input लेता है', desc: 'Voice, Touch, Sensor से' }, { emoji: '🧠', title: 'AI Process करता है', desc: 'Cloud में analyze करता है' }, { emoji: '💡', title: 'Action लेता है', desc: 'Smart response देता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '2030 तक दुनिया में 50 अरब smart devices होंगे — हर इंसान के लिए 6 devices!' }
    ]},
    mr: { title: 'Smart Devices 📱', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📱 Smart Devices म्हणजे काय?', text: 'Smart devices म्हणजे ते devices जे AI च्या मदतीने स्वतः decisions घेतात! Phone, Smart TV, Smart Watch सगळ्यांमध्ये AI आहे!' },
      { type: 'example', heading: '🌟 Smart Devices Examples', points: ['🗣️ Alexa/Siri/Google — Voice commands समजतात', '📺 Smart TV — आवडणारे shows suggest करतो', '⌚ Smart Watch — Health track करतो', '🏠 Smart Bulb — mood नुसार color बदलतो'] },
      { type: 'tools', heading: '🔧 Smart Device Tools!', tools: [{ name: 'Google Home', desc: 'Smart home explore करा', link: 'home.google.com', emoji: '🏠' }, { name: 'IFTTT', desc: 'Smart automations बनवा', link: 'ifttt.com', emoji: '⚡' }, { name: 'Micro:bit', desc: 'स्वतःचा smart device बनवा', link: 'microbit.org', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ Smart Devices कसे काम करतात?', steps: [{ emoji: '🎤', title: 'Input घेतो', desc: 'Voice, Touch, Sensor ने' }, { emoji: '🧠', title: 'AI Process करतो', desc: 'Cloud मध्ये analyze करतो' }, { emoji: '💡', title: 'Action घेतो', desc: 'Smart response देतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '2030 पर्यंत जगात 50 अब्ज smart devices असतील — प्रत्येक माणसासाठी 6 devices!' }
    ]},
    en: { title: 'Smart Devices 📱', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📱 What are Smart Devices?', text: 'Smart devices are devices that make their own decisions using AI! Phones, Smart TVs, Smart Watches — all have AI inside!' },
      { type: 'example', heading: '🌟 Smart Device Examples', points: ['🗣️ Alexa/Siri/Google — Understand voice commands', '📺 Smart TV — Suggests shows you like', '⌚ Smart Watch — Tracks your health', '🏠 Smart Bulb — Changes color by mood'] },
      { type: 'tools', heading: '🔧 Smart Device Tools!', tools: [{ name: 'Google Home', desc: 'Explore smart home', link: 'home.google.com', emoji: '🏠' }, { name: 'IFTTT', desc: 'Create smart automations', link: 'ifttt.com', emoji: '⚡' }, { name: 'Micro:bit', desc: 'Build your own smart device', link: 'microbit.org', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ How Do Smart Devices Work?', steps: [{ emoji: '🎤', title: 'Takes Input', desc: 'Via Voice, Touch, Sensor' }, { emoji: '🧠', title: 'AI Processes', desc: 'Analyzes in the cloud' }, { emoji: '💡', title: 'Takes Action', desc: 'Gives smart response' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'By 2030, there will be 50 billion smart devices in the world — 6 devices per person!' }
    ]},
  },
  'ai-art': {
    hi: { title: 'AI and Art 🎨', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎨 AI से Art कैसे बनता है?', text: 'AI लाखों paintings देखकर patterns सीखता है। फिर तुम्हारे description से नई image बना देता है! यह Generative AI है!' },
      { type: 'example', heading: '🌟 AI Art Tools', points: ['🖼️ DALL-E — Text से images बनाता है', '🎨 Midjourney — Photorealistic art', '✏️ AutoDraw — Drawing help करता है', '🖌️ Canva AI — Design बनाता है'] },
      { type: 'tools', heading: '🔧 AI Art Tools Try करो!', tools: [{ name: 'AutoDraw', desc: 'AI drawing assistant', link: 'autodraw.com', emoji: '✏️' }, { name: 'Canva AI', desc: 'AI design tool', link: 'canva.com', emoji: '🎨' }, { name: 'Craiyon', desc: 'Free AI image generator', link: 'craiyon.com', emoji: '🖼️' }] },
      { type: 'howworks', heading: '⚙️ AI Art कैसे बनता है?', steps: [{ emoji: '📝', title: 'Prompt लिखो', desc: '"एक sunset पर घोड़ा" describe करो' }, { emoji: '🧠', title: 'AI Process करता है', desc: 'Millions of images से सीखा knowledge use करता है' }, { emoji: '🖼️', title: 'Image बनती है', desc: 'Unique artwork तैयार!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '2022 में AI-generated painting "Théâtre D\'Opéra Spatial" Art competition जीती — लोगों को पता भी नहीं था कि AI ने बनाई है!' }
    ]},
    mr: { title: 'AI and Art 🎨', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎨 AI ने Art कसं बनतं?', text: 'AI लाखो paintings बघून patterns शिकतो. मग तुमच्या description वरून नवीन image बनवतो! हे Generative AI आहे!' },
      { type: 'example', heading: '🌟 AI Art Tools', points: ['🖼️ DALL-E — Text मधून images बनवतो', '🎨 Midjourney — Photorealistic art', '✏️ AutoDraw — Drawing help करतो', '🖌️ Canva AI — Design बनवतो'] },
      { type: 'tools', heading: '🔧 AI Art Tools Try करा!', tools: [{ name: 'AutoDraw', desc: 'AI drawing assistant', link: 'autodraw.com', emoji: '✏️' }, { name: 'Canva AI', desc: 'AI design tool', link: 'canva.com', emoji: '🎨' }, { name: 'Craiyon', desc: 'Free AI image generator', link: 'craiyon.com', emoji: '🖼️' }] },
      { type: 'howworks', heading: '⚙️ AI Art कसं बनतं?', steps: [{ emoji: '📝', title: 'Prompt लिहा', desc: '"Sunset वर घोडा" describe करा' }, { emoji: '🧠', title: 'AI Process करतो', desc: 'Millions of images चं knowledge वापरतो' }, { emoji: '🖼️', title: 'Image बनते', desc: 'Unique artwork तयार!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '2022 मध्ये AI-generated painting "Théâtre D\'Opéra Spatial" Art competition जिंकली — लोकांना माहीतच नव्हतं AI ने बनवली आहे!' }
    ]},
    en: { title: 'AI and Art 🎨', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎨 How Does AI Create Art?', text: 'AI learns patterns from millions of paintings. Then it creates new images from your description! This is Generative AI!' },
      { type: 'example', heading: '🌟 AI Art Tools', points: ['🖼️ DALL-E — Creates images from text', '🎨 Midjourney — Photorealistic art', '✏️ AutoDraw — Helps you draw', '🖌️ Canva AI — Creates designs'] },
      { type: 'tools', heading: '🔧 Try These AI Art Tools!', tools: [{ name: 'AutoDraw', desc: 'AI drawing assistant', link: 'autodraw.com', emoji: '✏️' }, { name: 'Canva AI', desc: 'AI design tool', link: 'canva.com', emoji: '🎨' }, { name: 'Craiyon', desc: 'Free AI image generator', link: 'craiyon.com', emoji: '🖼️' }] },
      { type: 'howworks', heading: '⚙️ How is AI Art Made?', steps: [{ emoji: '📝', title: 'Write Prompt', desc: 'Describe "a horse at sunset"' }, { emoji: '🧠', title: 'AI Processes', desc: 'Uses knowledge from millions of images' }, { emoji: '🖼️', title: 'Image is Created', desc: 'Unique artwork ready!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'In 2022, an AI-generated painting "Théâtre D\'Opéra Spatial" won an Art competition — people didn\'t even know AI made it!' }
    ]},
  },
  'what-is-data': {
    hi: { title: 'What is Data? 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 Data क्या है?', text: 'Data मतलब information! जब तुम YouTube देखते हो, Google search करते हो, game खेलते हो — सब data बनता है। AI इसी data से सीखता है!' },
      { type: 'example', heading: '🌟 Data Examples', points: ['📱 Social Media — Likes, comments, posts', '🛒 Shopping — क्या खरीदा, कब खरीदा', '🎵 Spotify — कौन से songs सुने', '🏃 Fitness App — Steps, heartbeat, sleep'] },
      { type: 'tools', heading: '🔧 Data Tools!', tools: [{ name: 'Google Sheets', desc: 'Data organize करो', link: 'sheets.google.com', emoji: '📊' }, { name: 'Flourish', desc: 'Data visualize करो', link: 'flourish.studio', emoji: '📈' }, { name: 'Kaggle', desc: 'Real datasets explore करो', link: 'kaggle.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ Data से AI कैसे सीखता है?', steps: [{ emoji: '📥', title: 'Data Collect', desc: 'Millions of examples इकट्ठे करते हैं' }, { emoji: '🧹', title: 'Data Clean', desc: 'Mistakes और duplicates हटाते हैं' }, { emoji: '🤖', title: 'AI Train', desc: 'Patterns ढूंढता है और सीखता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'हर दिन दुनिया में 2.5 quintillion bytes data बनता है — इतना data print करें तो books का ढेर Moon तक पहुंचेगा!' }
    ]},
    mr: { title: 'Data म्हणजे काय? 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 Data म्हणजे काय?', text: 'Data म्हणजे information! जेव्हा तुम्ही YouTube बघता, Google search करता, game खेळता — सगळं data बनतं. AI याच data मधून शिकतो!' },
      { type: 'example', heading: '🌟 Data Examples', points: ['📱 Social Media — Likes, comments, posts', '🛒 Shopping — काय विकत घेतलं, कधी घेतलं', '🎵 Spotify — कोणते songs ऐकले', '🏃 Fitness App — Steps, heartbeat, sleep'] },
      { type: 'tools', heading: '🔧 Data Tools!', tools: [{ name: 'Google Sheets', desc: 'Data organize करा', link: 'sheets.google.com', emoji: '📊' }, { name: 'Flourish', desc: 'Data visualize करा', link: 'flourish.studio', emoji: '📈' }, { name: 'Kaggle', desc: 'Real datasets explore करा', link: 'kaggle.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ Data मधून AI कसा शिकतो?', steps: [{ emoji: '📥', title: 'Data Collect', desc: 'Millions of examples गोळा करतात' }, { emoji: '🧹', title: 'Data Clean', desc: 'Mistakes आणि duplicates काढतात' }, { emoji: '🤖', title: 'AI Train', desc: 'Patterns शोधतो आणि शिकतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'रोज जगात 2.5 quintillion bytes data बनतं — हे सगळं print केलं तर books चा ढीग Moon पर्यंत पोहोचेल!' }
    ]},
    en: { title: 'What is Data? 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 What is Data?', text: 'Data means information! When you watch YouTube, search Google, play games — all of it creates data. AI learns from this data!' },
      { type: 'example', heading: '🌟 Data Examples', points: ['📱 Social Media — Likes, comments, posts', '🛒 Shopping — What you bought and when', '🎵 Spotify — Which songs you listened to', '🏃 Fitness App — Steps, heartbeat, sleep'] },
      { type: 'tools', heading: '🔧 Data Tools!', tools: [{ name: 'Google Sheets', desc: 'Organize data', link: 'sheets.google.com', emoji: '📊' }, { name: 'Flourish', desc: 'Visualize data', link: 'flourish.studio', emoji: '📈' }, { name: 'Kaggle', desc: 'Explore real datasets', link: 'kaggle.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ How Does AI Learn from Data?', steps: [{ emoji: '📥', title: 'Collect Data', desc: 'Gather millions of examples' }, { emoji: '🧹', title: 'Clean Data', desc: 'Remove mistakes and duplicates' }, { emoji: '🤖', title: 'Train AI', desc: 'Finds patterns and learns' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Every day, 2.5 quintillion bytes of data is created — if printed, the books would reach the Moon!' }
    ]},
  },
  'future-jobs': {
    hi: { title: 'Future Jobs 🚀', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🚀 AI से कौन से नए jobs आएंगे?', text: 'AI कुछ jobs लेगा, लेकिन नए और exciting jobs भी बनाएगा! जो AI को समझते हैं वो future में बहुत successful होंगे!' },
      { type: 'example', heading: '🌟 Future Jobs जो आने वाले हैं', points: ['🤖 AI Trainer — AI को सिखाना', '🎨 Prompt Engineer — AI से perfect output निकालना', '🔒 AI Safety Engineer — AI को safe रखना', '🧠 AI Ethics Officer — AI के decisions check करना', '🌍 AI for Good Specialist — AI से समाज बेहतर बनाना'] },
      { type: 'tools', heading: '🔧 Future Skills सीखो!', tools: [{ name: 'ChatGPT', desc: 'Prompt engineering practice', link: 'chat.openai.com', emoji: '🤖' }, { name: 'Coursera', desc: 'AI courses free में', link: 'coursera.org', emoji: '📚' }, { name: 'Khan Academy', desc: 'Math और coding', link: 'khanacademy.org', emoji: '🎓' }] },
      { type: 'howworks', heading: '⚙️ Future के लिए क्या सीखें?', steps: [{ emoji: '💻', title: 'Coding', desc: 'Python और JavaScript सीखो' }, { emoji: '🧠', title: 'AI/ML', desc: 'Machine learning basics' }, { emoji: '🎨', title: 'Creativity', desc: 'Problem solving और design thinking' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'World Economic Forum के अनुसार 2025 तक 97 million नए AI-related jobs बनेंगे!' }
    ]},
    mr: { title: 'Future Jobs 🚀', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🚀 AI मुळे कोणते नवीन jobs येतील?', text: 'AI काही jobs घेईल, पण नवीन आणि exciting jobs पण बनवेल! AI समजणारे future मध्ये खूप successful होतील!' },
      { type: 'example', heading: '🌟 येणारे Future Jobs', points: ['🤖 AI Trainer — AI ला शिकवणे', '🎨 Prompt Engineer — AI मधून perfect output काढणे', '🔒 AI Safety Engineer — AI ला safe ठेवणे', '🧠 AI Ethics Officer — AI चे decisions check करणे', '🌍 AI for Good Specialist — AI ने समाज सुधारणे'] },
      { type: 'tools', heading: '🔧 Future Skills शिका!', tools: [{ name: 'ChatGPT', desc: 'Prompt engineering practice', link: 'chat.openai.com', emoji: '🤖' }, { name: 'Coursera', desc: 'AI courses free मध्ये', link: 'coursera.org', emoji: '📚' }, { name: 'Khan Academy', desc: 'Math आणि coding', link: 'khanacademy.org', emoji: '🎓' }] },
      { type: 'howworks', heading: '⚙️ Future साठी काय शिकायचं?', steps: [{ emoji: '💻', title: 'Coding', desc: 'Python आणि JavaScript शिका' }, { emoji: '🧠', title: 'AI/ML', desc: 'Machine learning basics' }, { emoji: '🎨', title: 'Creativity', desc: 'Problem solving आणि design thinking' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'World Economic Forum नुसार 2025 पर्यंत 97 million नवीन AI-related jobs बनतील!' }
    ]},
    en: { title: 'Future Jobs 🚀', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🚀 What New Jobs Will AI Create?', text: 'AI will take some jobs, but it will also create exciting new ones! People who understand AI will be very successful in the future!' },
      { type: 'example', heading: '🌟 Upcoming Future Jobs', points: ['🤖 AI Trainer — Teaching AI', '🎨 Prompt Engineer — Getting perfect output from AI', '🔒 AI Safety Engineer — Keeping AI safe', '🧠 AI Ethics Officer — Checking AI decisions', '🌍 AI for Good Specialist — Using AI to improve society'] },
      { type: 'tools', heading: '🔧 Learn Future Skills!', tools: [{ name: 'ChatGPT', desc: 'Practice prompt engineering', link: 'chat.openai.com', emoji: '🤖' }, { name: 'Coursera', desc: 'Free AI courses', link: 'coursera.org', emoji: '📚' }, { name: 'Khan Academy', desc: 'Math and coding', link: 'khanacademy.org', emoji: '🎓' }] },
      { type: 'howworks', heading: '⚙️ What to Learn for the Future?', steps: [{ emoji: '💻', title: 'Coding', desc: 'Learn Python and JavaScript' }, { emoji: '🧠', title: 'AI/ML', desc: 'Machine learning basics' }, { emoji: '🎨', title: 'Creativity', desc: 'Problem solving and design thinking' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'According to the World Economic Forum, 97 million new AI-related jobs will be created by 2025!' }
    ]},
  },
  'ai-safety': {
    hi: { title: 'AI Safety 🛡️', color: '#ef4444', sections: [
      { type: 'intro', heading: '🛡️ AI Safety क्यों ज़रूरी है?', text: 'AI बहुत powerful है — लेकिन wrong hands में या बिना rules के खतरनाक हो सकता है। AI Safety मतलब AI को safe, fair और honest बनाना!' },
      { type: 'example', heading: '🌟 AI Safety Problems', points: ['😈 Deepfakes — Fake videos बनाना', '🎣 Phishing — AI से fake emails', '⚖️ Bias — AI का unfair decisions लेना', '🔒 Privacy — AI से personal data चोरी'] },
      { type: 'tools', heading: '🔧 Safety Tools!', tools: [{ name: 'Spot the Deepfake', desc: 'Fake images पहचानो', link: 'media.mitmedialab.org', emoji: '🔍' }, { name: 'Common Sense Media', desc: 'AI safety resources', link: 'commonsense.org', emoji: '🛡️' }, { name: 'Privacy Badger', desc: 'Online privacy protect करो', link: 'eff.org/privacybadger', emoji: '🔒' }] },
      { type: 'howworks', heading: '⚙️ AI को Safe कैसे रखें?', steps: [{ emoji: '📋', title: 'Rules बनाओ', desc: 'AI को clear guidelines दो' }, { emoji: '👥', title: 'Human oversight', desc: 'Humans AI को monitor करें' }, { emoji: '🧪', title: 'Test करो', desc: 'AI deploy से पहले test करो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Anthropic, OpenAI जैसी companies में "AI Safety Teams" होती हैं जो सिर्फ AI को safe बनाने पर काम करती हैं!' }
    ]},
    mr: { title: 'AI Safety 🛡️', color: '#ef4444', sections: [
      { type: 'intro', heading: '🛡️ AI Safety का महत्त्वाचं आहे?', text: 'AI खूप powerful आहे — पण चुकीच्या हातात किंवा rules शिवाय धोकादायक होऊ शकतो. AI Safety म्हणजे AI ला safe, fair आणि honest बनवणे!' },
      { type: 'example', heading: '🌟 AI Safety Problems', points: ['😈 Deepfakes — Fake videos बनवणे', '🎣 Phishing — AI ने fake emails', '⚖️ Bias — AI चे unfair decisions', '🔒 Privacy — AI ने personal data चोरी'] },
      { type: 'tools', heading: '🔧 Safety Tools!', tools: [{ name: 'Spot the Deepfake', desc: 'Fake images ओळखा', link: 'media.mitmedialab.org', emoji: '🔍' }, { name: 'Common Sense Media', desc: 'AI safety resources', link: 'commonsense.org', emoji: '🛡️' }, { name: 'Privacy Badger', desc: 'Online privacy protect करा', link: 'eff.org/privacybadger', emoji: '🔒' }] },
      { type: 'howworks', heading: '⚙️ AI ला Safe कसं ठेवायचं?', steps: [{ emoji: '📋', title: 'Rules बनवा', desc: 'AI ला clear guidelines द्या' }, { emoji: '👥', title: 'Human oversight', desc: 'Humans AI ला monitor करतात' }, { emoji: '🧪', title: 'Test करा', desc: 'AI deploy आधी test करा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Anthropic, OpenAI सारख्या companies मध्ये "AI Safety Teams" आहेत ज्या फक्त AI ला safe बनवण्यावर काम करतात!' }
    ]},
    en: { title: 'AI Safety 🛡️', color: '#ef4444', sections: [
      { type: 'intro', heading: '🛡️ Why is AI Safety Important?', text: 'AI is very powerful — but in wrong hands or without rules, it can be dangerous. AI Safety means making AI safe, fair, and honest!' },
      { type: 'example', heading: '🌟 AI Safety Problems', points: ['😈 Deepfakes — Creating fake videos', '🎣 Phishing — Fake emails using AI', '⚖️ Bias — AI making unfair decisions', '🔒 Privacy — AI stealing personal data'] },
      { type: 'tools', heading: '🔧 Safety Tools!', tools: [{ name: 'Spot the Deepfake', desc: 'Identify fake images', link: 'media.mitmedialab.org', emoji: '🔍' }, { name: 'Common Sense Media', desc: 'AI safety resources', link: 'commonsense.org', emoji: '🛡️' }, { name: 'Privacy Badger', desc: 'Protect your online privacy', link: 'eff.org/privacybadger', emoji: '🔒' }] },
      { type: 'howworks', heading: '⚙️ How to Keep AI Safe?', steps: [{ emoji: '📋', title: 'Create Rules', desc: 'Give AI clear guidelines' }, { emoji: '👥', title: 'Human Oversight', desc: 'Humans monitor AI' }, { emoji: '🧪', title: 'Test It', desc: 'Test AI before deployment' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Companies like Anthropic and OpenAI have dedicated "AI Safety Teams" that work only on making AI safer!' }
    ]},
  },
  'ai-story': {
    hi: { title: 'My First AI Story ✍️', color: '#34d399', sections: [
      { type: 'intro', heading: '✍️ AI से story कैसे लिखें?', text: 'AI एक amazing writing partner है! तुम idea दो, AI characters, plot और twists suggest करता है। मिलकर एक कमाल story बनाते हैं!' },
      { type: 'example', heading: '🌟 AI Story Tools', points: ['🤖 ChatGPT — Story ideas और writing help', '📖 AI Dungeon — Interactive story game', '✍️ Sudowrite — Story writing assistant', '📚 NovelAI — Complete story generator'] },
      { type: 'tools', heading: '🔧 Story Writing Tools!', tools: [{ name: 'ChatGPT', desc: 'Story writing partner', link: 'chat.openai.com', emoji: '🤖' }, { name: 'AI Dungeon', desc: 'Interactive stories', link: 'aidungeon.io', emoji: '📖' }, { name: 'Canva', desc: 'Story को visually design करो', link: 'canva.com', emoji: '🎨' }] },
      { type: 'howworks', heading: '⚙️ AI Story लिखने के Steps', steps: [{ emoji: '💡', title: 'Idea दो', desc: '"एक robot और एक बच्चा जो दोस्त बन जाते हैं"' }, { emoji: '🤖', title: 'AI Expand करता है', desc: 'Characters, setting, plot suggest करता है' }, { emoji: '✏️', title: 'तुम Edit करो', desc: 'अपना touch add करो' }] },
      { type: 'funfact', heading: '🎉 Try It Now!', text: 'ChatGPT पर जाओ और लिखो: "एक 10 साल के बच्चे और एक friendly robot की दोस्ती की कहानी लिखो जो Moon पर जाते हैं"!' }
    ]},
    mr: { title: 'माझी पहिली AI Story ✍️', color: '#34d399', sections: [
      { type: 'intro', heading: '✍️ AI ने story कशी लिहायची?', text: 'AI एक amazing writing partner आहे! तुम्ही idea द्या, AI characters, plot आणि twists suggest करतो. एकत्र एक कमाल story बनवू!' },
      { type: 'example', heading: '🌟 AI Story Tools', points: ['🤖 ChatGPT — Story ideas आणि writing help', '📖 AI Dungeon — Interactive story game', '✍️ Sudowrite — Story writing assistant', '📚 NovelAI — Complete story generator'] },
      { type: 'tools', heading: '🔧 Story Writing Tools!', tools: [{ name: 'ChatGPT', desc: 'Story writing partner', link: 'chat.openai.com', emoji: '🤖' }, { name: 'AI Dungeon', desc: 'Interactive stories', link: 'aidungeon.io', emoji: '📖' }, { name: 'Canva', desc: 'Story visually design करा', link: 'canva.com', emoji: '🎨' }] },
      { type: 'howworks', heading: '⚙️ AI Story लिहण्याचे Steps', steps: [{ emoji: '💡', title: 'Idea द्या', desc: '"एक robot आणि एक मुलगा जे मित्र बनतात"' }, { emoji: '🤖', title: 'AI Expand करतो', desc: 'Characters, setting, plot suggest करतो' }, { emoji: '✏️', title: 'तुम्ही Edit करा', desc: 'स्वतःचा touch add करा' }] },
      { type: 'funfact', heading: '🎉 Try It Now!', text: 'ChatGPT वर जा आणि लिहा: "10 वर्षांच्या मुलाची आणि एका friendly robot च्या मैत्रीची गोष्ट जे Moon वर जातात"!' }
    ]},
    en: { title: 'My First AI Story ✍️', color: '#34d399', sections: [
      { type: 'intro', heading: '✍️ How to Write a Story with AI?', text: "AI is an amazing writing partner! You give the idea, AI suggests characters, plot and twists. Let's create an amazing story together!" },
      { type: 'example', heading: '🌟 AI Story Tools', points: ['🤖 ChatGPT — Story ideas and writing help', '📖 AI Dungeon — Interactive story game', '✍️ Sudowrite — Story writing assistant', '📚 NovelAI — Complete story generator'] },
      { type: 'tools', heading: '🔧 Story Writing Tools!', tools: [{ name: 'ChatGPT', desc: 'Story writing partner', link: 'chat.openai.com', emoji: '🤖' }, { name: 'AI Dungeon', desc: 'Interactive stories', link: 'aidungeon.io', emoji: '📖' }, { name: 'Canva', desc: 'Design your story visually', link: 'canva.com', emoji: '🎨' }] },
      { type: 'howworks', heading: '⚙️ Steps to Write an AI Story', steps: [{ emoji: '💡', title: 'Give an Idea', desc: '"A robot and a child who become friends"' }, { emoji: '🤖', title: 'AI Expands It', desc: 'Suggests characters, setting, plot' }, { emoji: '✏️', title: 'You Edit', desc: 'Add your personal touch' }] },
      { type: 'funfact', heading: '🎉 Try It Now!', text: 'Go to ChatGPT and write: "Write a story about a 10-year-old child and a friendly robot who become friends and go to the Moon"!' }
    ]},
  },
  'python-basics': {
    hi: { title: 'Python सीखो 🐍', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🐍 Python क्या है?', text: 'Python दुनिया की सबसे popular language है! Google, Netflix, Instagram सब Python use करते हैं। AI के लिए #1 choice!' },
      { type: 'example', heading: '🌟 Python का पहला code', code: `print("नमस्ते GenAI Kids! 🚀")\nname = "Arjun"\nage = 12\nprint(f"मेरा नाम {name} है, उम्र {age}")\nprint(f"10 + 5 = {10 + 5}")` },
      { type: 'tools', heading: '🔧 Python Tools!', tools: [{ name: 'Replit', desc: 'Browser में Python', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python + AI', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Python.org', desc: 'Official docs', link: 'python.org', emoji: '🐍' }] },
      { type: 'howworks', heading: '⚙️ Python क्यों सीखें?', steps: [{ emoji: '🤖', title: 'AI बनाओ', desc: 'ML models बनाओ' }, { emoji: '🌐', title: 'Websites', desc: 'Django, Flask' }, { emoji: '📊', title: 'Data', desc: 'Analysis और Visualization' }] },
      { type: 'funfact', heading: '🎉 Practice!', text: 'replit.com पर जाओ और पहला Python program लिखो — सब browser में होगा!' }
    ]},
    mr: { title: 'Python शिका 🐍', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🐍 Python म्हणजे काय?', text: 'Python जगातलं सर्वात popular language आहे! Google, Netflix, Instagram सगळे Python वापरतात. AI साठी #1 choice!' },
      { type: 'example', heading: '🌟 Python चा पहिला code', code: `print("नमस्ते GenAI Kids! 🚀")\nname = "Arjun"\nage = 12\nprint(f"माझं नाव {name} आहे, वय {age}")\nprint(f"10 + 5 = {10 + 5}")` },
      { type: 'tools', heading: '🔧 Python Tools!', tools: [{ name: 'Replit', desc: 'Browser मध्ये Python', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python + AI', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Python.org', desc: 'Official docs', link: 'python.org', emoji: '🐍' }] },
      { type: 'howworks', heading: '⚙️ Python का शिकायचं?', steps: [{ emoji: '🤖', title: 'AI बनवा', desc: 'ML models बनवा' }, { emoji: '🌐', title: 'Websites', desc: 'Django, Flask' }, { emoji: '📊', title: 'Data', desc: 'Analysis आणि Visualization' }] },
      { type: 'funfact', heading: '🎉 Practice!', text: 'replit.com वर जा आणि पहिलं Python program लिहा — सगळं browser मध्ये होईल!' }
    ]},
    en: { title: 'Learn Python 🐍', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🐍 What is Python?', text: "Python is the world's most popular language! Google, Netflix, Instagram all use Python. It's the #1 choice for AI!" },
      { type: 'example', heading: '🌟 Your First Python Code', code: `print("Hello GenAI Kids! 🚀")\nname = "Arjun"\nage = 12\nprint(f"My name is {name}, age {age}")\nprint(f"10 + 5 = {10 + 5}")` },
      { type: 'tools', heading: '🔧 Python Tools!', tools: [{ name: 'Replit', desc: 'Python in browser', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python + AI', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Python.org', desc: 'Official docs', link: 'python.org', emoji: '🐍' }] },
      { type: 'howworks', heading: '⚙️ Why Learn Python?', steps: [{ emoji: '🤖', title: 'Build AI', desc: 'Create ML models' }, { emoji: '🌐', title: 'Websites', desc: 'Django, Flask' }, { emoji: '📊', title: 'Data', desc: 'Analysis and Visualization' }] },
      { type: 'funfact', heading: '🎉 Practice!', text: 'Go to replit.com and write your first Python program — all in the browser!' }
    ]},
  },
  'ml-intro': {
    hi: { title: 'Machine Learning 🧠', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 Machine Learning क्या है?', text: 'ML यानी examples देकर सिखाना! Rules बताने की ज़रूरत नहीं — बस data दो, AI खुद सीख लेता है!' },
      { type: 'example', heading: '🌟 ML कहाँ use होती है?', points: ['📧 Gmail spam filter', '🎵 Spotify recommendations', '🚗 Self-driving cars', '💊 Cancer detection'] },
      { type: 'tools', heading: '🔧 ML Tools!', tools: [{ name: 'Teachable Machine', desc: 'No-code ML', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }, { name: 'ML for Kids', desc: 'Kids ML projects', link: 'machinelearningforkids.co.uk', emoji: '🧒' }, { name: 'Google Colab', desc: 'Python ML', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ ML कैसे काम करती है?', steps: [{ emoji: '📚', title: 'Training Data', desc: 'हज़ारों examples देते हैं' }, { emoji: '🔄', title: 'Model Train', desc: 'Pattern सीखता है' }, { emoji: '🎯', title: 'Prediction', desc: 'नए data पर predict करता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT भी ML है — उसे internet का सब कुछ पढ़ाया और उसने खुद भाषा सीख ली!' }
    ]},
    mr: { title: 'Machine Learning 🧠', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 Machine Learning म्हणजे काय?', text: 'ML म्हणजे examples देऊन शिकवणे! Rules सांगायची गरज नाही — फक्त data द्या, AI स्वतः शिकतो!' },
      { type: 'example', heading: '🌟 ML कुठे वापरतात?', points: ['📧 Gmail spam filter', '🎵 Spotify recommendations', '🚗 Self-driving cars', '💊 Cancer detection'] },
      { type: 'tools', heading: '🔧 ML Tools!', tools: [{ name: 'Teachable Machine', desc: 'No-code ML', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }, { name: 'ML for Kids', desc: 'Kids ML projects', link: 'machinelearningforkids.co.uk', emoji: '🧒' }, { name: 'Google Colab', desc: 'Python ML', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ ML कसं काम करतं?', steps: [{ emoji: '📚', title: 'Training Data', desc: 'हजारो examples देतात' }, { emoji: '🔄', title: 'Model Train', desc: 'Pattern शिकतो' }, { emoji: '🎯', title: 'Prediction', desc: 'नवीन data वर predict करतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT पण ML आहे — त्याला internet चं सगळं वाचायला दिलं आणि त्याने स्वतः भाषा शिकली!' }
    ]},
    en: { title: 'Machine Learning 🧠', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 What is Machine Learning?', text: 'ML means teaching by giving examples! No need to tell rules — just give data, AI learns by itself!' },
      { type: 'example', heading: '🌟 Where is ML Used?', points: ['📧 Gmail spam filter', '🎵 Spotify recommendations', '🚗 Self-driving cars', '💊 Cancer detection'] },
      { type: 'tools', heading: '🔧 ML Tools!', tools: [{ name: 'Teachable Machine', desc: 'No-code ML', link: 'teachablemachine.withgoogle.com', emoji: '🤖' }, { name: 'ML for Kids', desc: 'Kids ML projects', link: 'machinelearningforkids.co.uk', emoji: '🧒' }, { name: 'Google Colab', desc: 'Python ML', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ How Does ML Work?', steps: [{ emoji: '📚', title: 'Training Data', desc: 'Give thousands of examples' }, { emoji: '🔄', title: 'Train Model', desc: 'Learns patterns' }, { emoji: '🎯', title: 'Predict', desc: 'Predicts on new data' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT is also ML — it was given everything on the internet to read and learned language by itself!' }
    ]},
  },
  'mini-project': {
    hi: { title: 'Mini AI Project 🛠️', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🛠️ पहला AI Project!', text: 'आज Emotion Detector बनाएंगे! Text लिखो और AI बताएगा Positive है या Negative!' },
      { type: 'example', heading: '📝 Project Code', code: `positive = ["खुशी", "अच्छा", "मस्त"]\nnegative = ["दुख", "बुरा", "रोना"]\n\ndef detect(text):\n    score = sum(1 for w in positive if w in text)\n    score -= sum(1 for w in negative if w in text)\n    return "😊 Positive!" if score > 0 else "😢 Negative!" if score < 0 else "😐 Neutral"\n\nprint(detect("आज बहुत खुशी हुई!"))` },
      { type: 'tools', heading: '🔧 Project Tools!', tools: [{ name: 'Replit', desc: 'Code run करो', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'HuggingFace', desc: 'Pre-built models', link: 'huggingface.co', emoji: '🤗' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '1️⃣', title: 'Word Lists', desc: 'Positive और Negative words' }, { emoji: '2️⃣', title: 'Score Count', desc: 'Words check करो' }, { emoji: '3️⃣', title: 'Result', desc: 'Positive/Negative/Neutral' }] },
      { type: 'funfact', heading: '🎉 Next Level!', text: 'और words add करो, percentage show करो, emoji add करो!' }
    ]},
    mr: { title: 'Mini AI Project 🛠️', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🛠️ पहिला AI Project!', text: 'आज Emotion Detector बनवतो! Text लिहा आणि AI सांगेल Positive आहे की Negative!' },
      { type: 'example', heading: '📝 Project Code', code: `positive = ["आनंद", "छान", "मस्त"]\nnegative = ["दुःख", "वाईट", "रडणे"]\n\ndef detect(text):\n    score = sum(1 for w in positive if w in text)\n    score -= sum(1 for w in negative if w in text)\n    return "😊 Positive!" if score > 0 else "😢 Negative!" if score < 0 else "😐 Neutral"\n\nprint(detect("आज खूप आनंद झाला!"))` },
      { type: 'tools', heading: '🔧 Project Tools!', tools: [{ name: 'Replit', desc: 'Code run करा', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'HuggingFace', desc: 'Pre-built models', link: 'huggingface.co', emoji: '🤗' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '1️⃣', title: 'Word Lists', desc: 'Positive आणि Negative words' }, { emoji: '2️⃣', title: 'Score Count', desc: 'Words check करा' }, { emoji: '3️⃣', title: 'Result', desc: 'Positive/Negative/Neutral' }] },
      { type: 'funfact', heading: '🎉 Next Level!', text: 'आणखी words add करा, percentage show करा, emoji add करा!' }
    ]},
    en: { title: 'Mini AI Project 🛠️', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🛠️ First AI Project!', text: "Today we'll build an Emotion Detector! Write text and AI will tell if it's Positive or Negative!" },
      { type: 'example', heading: '📝 Project Code', code: `positive = ["happy", "great", "awesome"]\nnegative = ["sad", "bad", "crying"]\n\ndef detect(text):\n    score = sum(1 for w in positive if w in text)\n    score -= sum(1 for w in negative if w in text)\n    return "😊 Positive!" if score > 0 else "😢 Negative!" if score < 0 else "😐 Neutral"\n\nprint(detect("I am very happy today!"))` },
      { type: 'tools', heading: '🔧 Project Tools!', tools: [{ name: 'Replit', desc: 'Run your code', link: 'replit.com', emoji: '💻' }, { name: 'Google Colab', desc: 'Free Python', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'HuggingFace', desc: 'Pre-built models', link: 'huggingface.co', emoji: '🤗' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '1️⃣', title: 'Word Lists', desc: 'Positive and Negative words' }, { emoji: '2️⃣', title: 'Count Score', desc: 'Check which words appear' }, { emoji: '3️⃣', title: 'Result', desc: 'Positive/Negative/Neutral' }] },
      { type: 'funfact', heading: '🎉 Next Level!', text: 'Add more words, show percentage, add emojis!' }
    ]},
  },
  'data-science': {
    hi: { title: 'Data Science 📈', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📈 Data Science क्या है?', text: 'Data Science यानी data से stories निकालना! Numbers, graphs और statistics से real-world problems solve करना। यह AI का brain है!' },
      { type: 'example', heading: '🌟 Data Science Applications', points: ['📈 Stock Market — Prices predict करना', '🏥 Healthcare — Disease predict करना', '⚽ Sports — Player performance analyze करना', '🛒 E-commerce — Sales predict करना'] },
      { type: 'tools', heading: '🔧 Data Science Tools!', tools: [{ name: 'Google Colab', desc: 'Python + Data analysis', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Datasets और competitions', link: 'kaggle.com', emoji: '📊' }, { name: 'Tableau Public', desc: 'Data visualization free', link: 'public.tableau.com', emoji: '📈' }] },
      { type: 'howworks', heading: '⚙️ Data Science Process', steps: [{ emoji: '📥', title: 'Data Collect', desc: 'CSV, Excel, Database से' }, { emoji: '🔍', title: 'Explore', desc: 'Patterns और trends ढूंढो' }, { emoji: '📊', title: 'Visualize', desc: 'Graphs और charts बनाओ' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Netflix Data Science team ने calculate किया कि recommendation engine से $1 billion/year बचाते हैं!' }
    ]},
    mr: { title: 'Data Science 📈', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📈 Data Science म्हणजे काय?', text: 'Data Science म्हणजे data मधून stories काढणे! Numbers, graphs आणि statistics ने real-world problems solve करणे. हे AI चा brain आहे!' },
      { type: 'example', heading: '🌟 Data Science Applications', points: ['📈 Stock Market — Prices predict करणे', '🏥 Healthcare — Disease predict करणे', '⚽ Sports — Player performance analyze करणे', '🛒 E-commerce — Sales predict करणे'] },
      { type: 'tools', heading: '🔧 Data Science Tools!', tools: [{ name: 'Google Colab', desc: 'Python + Data analysis', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Datasets आणि competitions', link: 'kaggle.com', emoji: '📊' }, { name: 'Tableau Public', desc: 'Data visualization free', link: 'public.tableau.com', emoji: '📈' }] },
      { type: 'howworks', heading: '⚙️ Data Science Process', steps: [{ emoji: '📥', title: 'Data Collect', desc: 'CSV, Excel, Database मधून' }, { emoji: '🔍', title: 'Explore', desc: 'Patterns आणि trends शोधा' }, { emoji: '📊', title: 'Visualize', desc: 'Graphs आणि charts बनवा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Netflix Data Science team ने calculate केलं की recommendation engine मुळे $1 billion/year वाचतात!' }
    ]},
    en: { title: 'Data Science 📈', color: '#38bdf8', sections: [
      { type: 'intro', heading: '📈 What is Data Science?', text: "Data Science means extracting stories from data! Solving real-world problems with numbers, graphs and statistics. It's the brain of AI!" },
      { type: 'example', heading: '🌟 Data Science Applications', points: ['📈 Stock Market — Predicting prices', '🏥 Healthcare — Predicting diseases', '⚽ Sports — Analyzing player performance', '🛒 E-commerce — Predicting sales'] },
      { type: 'tools', heading: '🔧 Data Science Tools!', tools: [{ name: 'Google Colab', desc: 'Python + Data analysis', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Datasets and competitions', link: 'kaggle.com', emoji: '📊' }, { name: 'Tableau Public', desc: 'Free data visualization', link: 'public.tableau.com', emoji: '📈' }] },
      { type: 'howworks', heading: '⚙️ Data Science Process', steps: [{ emoji: '📥', title: 'Collect Data', desc: 'From CSV, Excel, Database' }, { emoji: '🔍', title: 'Explore', desc: 'Find patterns and trends' }, { emoji: '📊', title: 'Visualize', desc: 'Create graphs and charts' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: "Netflix's Data Science team calculated that their recommendation engine saves them $1 billion/year!" }
    ]},
  },
  'computer-vision': {
    hi: { title: 'Computer Vision 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ Computer Vision क्या है?', text: 'Computer Vision यानी computers को देखना सिखाना! AI images और videos analyze करता है और समझता है — बिल्कुल इंसानी आँखों की तरह!' },
      { type: 'example', heading: '🌟 Computer Vision Applications', points: ['📸 Face Recognition — Phone unlock', '🚗 Self-driving Cars — Road देखना', '🏥 Medical Imaging — X-ray analyze करना', '📦 Amazon Go — Cashierless shopping'] },
      { type: 'tools', heading: '🔧 CV Tools!', tools: [{ name: 'Teachable Machine', desc: 'Image classifier बनाओ', link: 'teachablemachine.withgoogle.com', emoji: '📸' }, { name: 'Roboflow', desc: 'Object detection', link: 'roboflow.com', emoji: '👁️' }, { name: 'ML for Kids', desc: 'Kids computer vision', link: 'machinelearningforkids.co.uk', emoji: '🧒' }] },
      { type: 'howworks', heading: '⚙️ Computer Vision कैसे काम करती है?', steps: [{ emoji: '📸', title: 'Image Input', desc: 'Camera से photo लेता है' }, { emoji: '🔍', title: 'Feature Extract', desc: 'Edges, colors, shapes ढूंढता है' }, { emoji: '🏷️', title: 'Classify', desc: '"यह cat है" label लगाता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Instagram पर हर minute 95 lakh photos upload होती हैं — AI सबको automatically tag करता है!' }
    ]},
    mr: { title: 'Computer Vision 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ Computer Vision म्हणजे काय?', text: 'Computer Vision म्हणजे computers ला बघायला शिकवणे! AI images आणि videos analyze करतो — बिल्कुल माणसाच्या डोळ्यांसारखा!' },
      { type: 'example', heading: '🌟 Computer Vision Applications', points: ['📸 Face Recognition — Phone unlock', '🚗 Self-driving Cars — रस्ता बघणे', '🏥 Medical Imaging — X-ray analyze करणे', '📦 Amazon Go — Cashierless shopping'] },
      { type: 'tools', heading: '🔧 CV Tools!', tools: [{ name: 'Teachable Machine', desc: 'Image classifier बनवा', link: 'teachablemachine.withgoogle.com', emoji: '📸' }, { name: 'Roboflow', desc: 'Object detection', link: 'roboflow.com', emoji: '👁️' }, { name: 'ML for Kids', desc: 'Kids computer vision', link: 'machinelearningforkids.co.uk', emoji: '🧒' }] },
      { type: 'howworks', heading: '⚙️ Computer Vision कसं काम करतं?', steps: [{ emoji: '📸', title: 'Image Input', desc: 'Camera ने photo घेतो' }, { emoji: '🔍', title: 'Feature Extract', desc: 'Edges, colors, shapes शोधतो' }, { emoji: '🏷️', title: 'Classify', desc: '"हे cat आहे" label लावतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Instagram वर प्रत्येक minute 95 लाख photos upload होतात — AI सगळ्यांना automatically tag करतो!' }
    ]},
    en: { title: 'Computer Vision 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ What is Computer Vision?', text: "Computer Vision means teaching computers to see! AI analyzes images and videos — just like human eyes!" },
      { type: 'example', heading: '🌟 Computer Vision Applications', points: ['📸 Face Recognition — Phone unlock', '🚗 Self-driving Cars — Seeing the road', '🏥 Medical Imaging — Analyzing X-rays', '📦 Amazon Go — Cashierless shopping'] },
      { type: 'tools', heading: '🔧 CV Tools!', tools: [{ name: 'Teachable Machine', desc: 'Build image classifier', link: 'teachablemachine.withgoogle.com', emoji: '📸' }, { name: 'Roboflow', desc: 'Object detection', link: 'roboflow.com', emoji: '👁️' }, { name: 'ML for Kids', desc: 'Kids computer vision', link: 'machinelearningforkids.co.uk', emoji: '🧒' }] },
      { type: 'howworks', heading: '⚙️ How Does Computer Vision Work?', steps: [{ emoji: '📸', title: 'Image Input', desc: 'Takes photo from camera' }, { emoji: '🔍', title: 'Extract Features', desc: 'Finds edges, colors, shapes' }, { emoji: '🏷️', title: 'Classify', desc: 'Labels it "this is a cat"' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '95 million photos are uploaded to Instagram every minute — AI automatically tags all of them!' }
    ]},
  },
  'nlp-basics': {
    hi: { title: 'Natural Language Processing 🗣️', color: '#f472b6', sections: [
      { type: 'intro', heading: '🗣️ NLP क्या है?', text: 'NLP यानी AI को भाषा सिखाना! Computers को human language — Hindi, English, Marathi — समझना और बोलना सिखाते हैं। ChatGPT इसी से बना है!' },
      { type: 'example', heading: '🌟 NLP Applications', points: ['🤖 ChatGPT — Conversation करता है', '🌍 Google Translate — 100+ languages translate', '📧 Gmail — Smart Reply suggest करता है', '🎙️ Siri/Alexa — Voice commands समझते हैं'] },
      { type: 'tools', heading: '🔧 NLP Tools!', tools: [{ name: 'ML for Kids', desc: 'Text classifier बनाओ', link: 'machinelearningforkids.co.uk', emoji: '📝' }, { name: 'Hugging Face', desc: 'NLP models try करो', link: 'huggingface.co', emoji: '🤗' }, { name: 'Google NL API', desc: 'Text analyze करो', link: 'cloud.google.com/natural-language', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ NLP कैसे काम करती है?', steps: [{ emoji: '📝', title: 'Text Input', desc: '"मुझे भूख लगी है" पढ़ता है' }, { emoji: '🔍', title: 'Parse', desc: 'Words और grammar analyze करता है' }, { emoji: '💡', title: 'Understand', desc: 'Meaning समझता है और respond करता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT हर second में 50+ requests handle करता है — इसके पीछे massive NLP model है!' }
    ]},
    mr: { title: 'Natural Language Processing 🗣️', color: '#f472b6', sections: [
      { type: 'intro', heading: '🗣️ NLP म्हणजे काय?', text: 'NLP म्हणजे AI ला भाषा शिकवणे! Computers ला human language — Hindi, English, Marathi — समजायला आणि बोलायला शिकवतात. ChatGPT यातूनच बनलं आहे!' },
      { type: 'example', heading: '🌟 NLP Applications', points: ['🤖 ChatGPT — Conversation करतो', '🌍 Google Translate — 100+ languages translate', '📧 Gmail — Smart Reply suggest करतो', '🎙️ Siri/Alexa — Voice commands समजतात'] },
      { type: 'tools', heading: '🔧 NLP Tools!', tools: [{ name: 'ML for Kids', desc: 'Text classifier बनवा', link: 'machinelearningforkids.co.uk', emoji: '📝' }, { name: 'Hugging Face', desc: 'NLP models try करा', link: 'huggingface.co', emoji: '🤗' }, { name: 'Google NL API', desc: 'Text analyze करा', link: 'cloud.google.com/natural-language', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ NLP कसं काम करतं?', steps: [{ emoji: '📝', title: 'Text Input', desc: '"मला भूक लागली आहे" वाचतो' }, { emoji: '🔍', title: 'Parse', desc: 'Words आणि grammar analyze करतो' }, { emoji: '💡', title: 'Understand', desc: 'Meaning समजतो आणि respond करतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT प्रत्येक second मध्ये 50+ requests handle करतो — याच्या मागे massive NLP model आहे!' }
    ]},
    en: { title: 'Natural Language Processing 🗣️', color: '#f472b6', sections: [
      { type: 'intro', heading: '🗣️ What is NLP?', text: "NLP means teaching AI to understand language! We teach computers to understand and speak human languages — Hindi, English, Marathi. ChatGPT is built on this!" },
      { type: 'example', heading: '🌟 NLP Applications', points: ['🤖 ChatGPT — Has conversations', '🌍 Google Translate — Translates 100+ languages', '📧 Gmail — Suggests Smart Reply', '🎙️ Siri/Alexa — Understand voice commands'] },
      { type: 'tools', heading: '🔧 NLP Tools!', tools: [{ name: 'ML for Kids', desc: 'Build text classifier', link: 'machinelearningforkids.co.uk', emoji: '📝' }, { name: 'Hugging Face', desc: 'Try NLP models', link: 'huggingface.co', emoji: '🤗' }, { name: 'Google NL API', desc: 'Analyze text', link: 'cloud.google.com/natural-language', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ How Does NLP Work?', steps: [{ emoji: '📝', title: 'Text Input', desc: 'Reads "I am hungry"' }, { emoji: '🔍', title: 'Parse', desc: 'Analyzes words and grammar' }, { emoji: '💡', title: 'Understand', desc: 'Understands meaning and responds' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'ChatGPT handles 50+ requests per second — there is a massive NLP model behind it!' }
    ]},
  },
  'ai-ethics': {
    hi: { title: 'AI Ethics ⚖️', color: '#fbbf24', sections: [
      { type: 'intro', heading: '⚖️ AI Ethics क्या है?', text: 'AI Ethics यानी AI को सही-गलत सिखाना! AI powerful है — लेकिन क्या वो fair है? क्या वो safe है? क्या वो सबके लिए equal है? यही ethics है!' },
      { type: 'example', heading: '🌟 AI Ethics Problems', points: ['⚖️ Bias — AI कुछ groups के साथ unfair होता है', '🔒 Privacy — AI personal data use करता है', '😈 Deepfakes — Fake content बनाता है', '🎯 Manipulation — Ads और news manipulate करता है'] },
      { type: 'tools', heading: '🔧 AI Ethics Resources!', tools: [{ name: 'AI4K12', desc: 'AI ethics curriculum', link: 'ai4k12.org', emoji: '📚' }, { name: 'Responsible AI', desc: "Microsoft's AI ethics", link: 'microsoft.com/ai/responsible-ai', emoji: '⚖️' }, { name: 'AI Fairness 360', desc: 'Bias detection tool', link: 'aif360.mybluemix.net', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ Ethical AI कैसे बनाएं?', steps: [{ emoji: '📊', title: 'Fair Data', desc: 'सभी groups का equal representation' }, { emoji: '🧪', title: 'Test Bias', desc: 'AI को different groups पर test करो' }, { emoji: '👥', title: 'Human Review', desc: 'Humans AI decisions review करें' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Amazon का hiring AI बंद करना पड़ा क्योंकि वो women applicants को bias से reject कर रहा था!' }
    ]},
    mr: { title: 'AI Ethics ⚖️', color: '#fbbf24', sections: [
      { type: 'intro', heading: '⚖️ AI Ethics म्हणजे काय?', text: 'AI Ethics म्हणजे AI ला बरोबर-चूक शिकवणे! AI powerful आहे — पण तो fair आहे का? Safe आहे का? सगळ्यांसाठी equal आहे का? हेच ethics आहे!' },
      { type: 'example', heading: '🌟 AI Ethics Problems', points: ['⚖️ Bias — AI काही groups शी unfair वागतो', '🔒 Privacy — AI personal data वापरतो', '😈 Deepfakes — Fake content बनवतो', '🎯 Manipulation — Ads आणि news manipulate करतो'] },
      { type: 'tools', heading: '🔧 AI Ethics Resources!', tools: [{ name: 'AI4K12', desc: 'AI ethics curriculum', link: 'ai4k12.org', emoji: '📚' }, { name: 'Responsible AI', desc: "Microsoft's AI ethics", link: 'microsoft.com/ai/responsible-ai', emoji: '⚖️' }, { name: 'AI Fairness 360', desc: 'Bias detection tool', link: 'aif360.mybluemix.net', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ Ethical AI कसा बनवायचा?', steps: [{ emoji: '📊', title: 'Fair Data', desc: 'सगळ्या groups चं equal representation' }, { emoji: '🧪', title: 'Test Bias', desc: 'AI ला different groups वर test करा' }, { emoji: '👥', title: 'Human Review', desc: 'Humans AI decisions review करतात' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: "Amazon चा hiring AI बंद करावा लागला कारण तो women applicants ला bias ने reject करत होता!" }
    ]},
    en: { title: 'AI Ethics ⚖️', color: '#fbbf24', sections: [
      { type: 'intro', heading: '⚖️ What is AI Ethics?', text: "AI Ethics means teaching AI right from wrong! AI is powerful — but is it fair? Is it safe? Is it equal for everyone? That's ethics!" },
      { type: 'example', heading: '🌟 AI Ethics Problems', points: ['⚖️ Bias — AI is unfair to some groups', '🔒 Privacy — AI uses personal data', '😈 Deepfakes — Creates fake content', '🎯 Manipulation — Manipulates ads and news'] },
      { type: 'tools', heading: '🔧 AI Ethics Resources!', tools: [{ name: 'AI4K12', desc: 'AI ethics curriculum', link: 'ai4k12.org', emoji: '📚' }, { name: 'Responsible AI', desc: "Microsoft's AI ethics", link: 'microsoft.com/ai/responsible-ai', emoji: '⚖️' }, { name: 'AI Fairness 360', desc: 'Bias detection tool', link: 'aif360.mybluemix.net', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ How to Build Ethical AI?', steps: [{ emoji: '📊', title: 'Fair Data', desc: 'Equal representation of all groups' }, { emoji: '🧪', title: 'Test for Bias', desc: 'Test AI on different groups' }, { emoji: '👥', title: 'Human Review', desc: 'Humans review AI decisions' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: "Amazon had to shut down its hiring AI because it was biasedly rejecting women applicants!" }
    ]},
  },
  'build-chatbot': {
    hi: { title: 'Build a Chatbot 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🤖 Chatbot क्या होता है?', text: 'Chatbot एक AI program है जो humans से conversation करता है! Customer service, education, entertainment — सब में chatbots हैं। आज अपना बनाएंगे!' },
      { type: 'example', heading: '📝 Simple Chatbot Code', code: `responses = {\n    "hello": "नमस्ते! मैं आपका AI assistant हूं! 👋",\n    "how are you": "मैं बहुत अच्छा हूं! आप कैसे हैं? 😊",\n    "what is ai": "AI यानी Artificial Intelligence — computer को सोचना सिखाना!",\n    "bye": "अलविदा! फिर मिलेंगे! 👋"\n}\n\ndef chat(msg):\n    msg = msg.lower()\n    for key in responses:\n        if key in msg:\n            return responses[key]\n    return "मुझे समझ नहीं आया, फिर पूछो! 🤔"\n\nwhile True:\n    user = input("तुम: ")\n    print(f"Bot: {chat(user)}")` },
      { type: 'tools', heading: '🔧 Chatbot Tools!', tools: [{ name: 'Dialogflow', desc: 'Google का chatbot platform', link: 'dialogflow.cloud.google.com', emoji: '🤖' }, { name: 'Botpress', desc: 'Open source chatbot', link: 'botpress.com', emoji: '💬' }, { name: 'Replit', desc: 'Python chatbot run करो', link: 'replit.com', emoji: '💻' }] },
      { type: 'howworks', heading: '⚙️ Chatbot कैसे काम करता है?', steps: [{ emoji: '📝', title: 'User Input', desc: 'User message type करता है' }, { emoji: '🧠', title: 'Process', desc: 'AI message analyze करता है' }, { emoji: '💬', title: 'Response', desc: 'Smart reply देता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'दुनिया में 80% businesses अगले 5 साल में chatbots use करेंगे — यह skill बहुत valuable है!' }
    ]},
    mr: { title: 'Chatbot बनवा 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🤖 Chatbot म्हणजे काय?', text: 'Chatbot एक AI program आहे जो humans शी conversation करतो! Customer service, education, entertainment — सगळ्यांमध्ये chatbots आहेत. आज स्वतःचा बनवतो!' },
      { type: 'example', heading: '📝 Simple Chatbot Code', code: `responses = {\n    "hello": "नमस्ते! मी तुमचा AI assistant आहे! 👋",\n    "how are you": "मी खूप छान आहे! तुम्ही कसे आहात? 😊",\n    "ai mhanje": "AI म्हणजे Artificial Intelligence — computer ला विचार करायला शिकवणे!",\n    "bye": "निरोप! पुन्हा भेटू! 👋"\n}\n\ndef chat(msg):\n    msg = msg.lower()\n    for key in responses:\n        if key in msg:\n            return responses[key]\n    return "मला समजलं नाही, पुन्हा विचारा! 🤔"\n\nwhile True:\n    user = input("तुम्ही: ")\n    print(f"Bot: {chat(user)}")` },
      { type: 'tools', heading: '🔧 Chatbot Tools!', tools: [{ name: 'Dialogflow', desc: 'Google चं chatbot platform', link: 'dialogflow.cloud.google.com', emoji: '🤖' }, { name: 'Botpress', desc: 'Open source chatbot', link: 'botpress.com', emoji: '💬' }, { name: 'Replit', desc: 'Python chatbot run करा', link: 'replit.com', emoji: '💻' }] },
      { type: 'howworks', heading: '⚙️ Chatbot कसं काम करतं?', steps: [{ emoji: '📝', title: 'User Input', desc: 'User message type करतो' }, { emoji: '🧠', title: 'Process', desc: 'AI message analyze करतो' }, { emoji: '💬', title: 'Response', desc: 'Smart reply देतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'जगातील 80% businesses पुढील 5 वर्षांत chatbots वापरतील — ही skill खूप valuable आहे!' }
    ]},
    en: { title: 'Build a Chatbot 🤖', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🤖 What is a Chatbot?', text: "A chatbot is an AI program that has conversations with humans! They're everywhere — customer service, education, entertainment. Let's build one today!" },
      { type: 'example', heading: '📝 Simple Chatbot Code', code: `responses = {\n    "hello": "Hi! I'm your AI assistant! 👋",\n    "how are you": "I'm great! How are you? 😊",\n    "what is ai": "AI means Artificial Intelligence — teaching computers to think!",\n    "bye": "Goodbye! See you later! 👋"\n}\n\ndef chat(msg):\n    msg = msg.lower()\n    for key in responses:\n        if key in msg:\n            return responses[key]\n    return "I didn't understand, please ask again! 🤔"\n\nwhile True:\n    user = input("You: ")\n    print(f"Bot: {chat(user)}")` },
      { type: 'tools', heading: '🔧 Chatbot Tools!', tools: [{ name: 'Dialogflow', desc: "Google's chatbot platform", link: 'dialogflow.cloud.google.com', emoji: '🤖' }, { name: 'Botpress', desc: 'Open source chatbot', link: 'botpress.com', emoji: '💬' }, { name: 'Replit', desc: 'Run Python chatbot', link: 'replit.com', emoji: '💻' }] },
      { type: 'howworks', heading: '⚙️ How Does a Chatbot Work?', steps: [{ emoji: '📝', title: 'User Input', desc: 'User types a message' }, { emoji: '🧠', title: 'Process', desc: 'AI analyzes the message' }, { emoji: '💬', title: 'Response', desc: 'Gives a smart reply' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '80% of businesses worldwide will use chatbots in the next 5 years — this is a very valuable skill!' }
    ]},
  },
  'web-scraping': {
    hi: { title: 'Web Scraping 🕷️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '🕷️ Web Scraping क्या है?', text: 'Web Scraping यानी internet से automatically data collect करना! News, prices, reviews — सब automatically extract करो। Data Science का superpower!' },
      { type: 'example', heading: '📝 Simple Web Scraping', code: `import requests\nfrom bs4 import BeautifulSoup\n\n# Website से data लाओ\nurl = "https://quotes.toscrape.com"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, 'html.parser')\n\n# Quotes extract करो\nquotes = soup.find_all('span', class_='text')\nfor quote in quotes[:5]:\n    print(quote.text)` },
      { type: 'tools', heading: '🔧 Web Scraping Tools!', tools: [{ name: 'BeautifulSoup', desc: 'Python scraping library', link: 'beautiful-soup-4.readthedocs.io', emoji: '🕷️' }, { name: 'Scrapy', desc: 'Advanced scraping framework', link: 'scrapy.org', emoji: '⚡' }, { name: 'Octoparse', desc: 'No-code web scraping', link: 'octoparse.com', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ Web Scraping कैसे काम करती है?', steps: [{ emoji: '🌐', title: 'URL Request', desc: 'Website का HTML download करो' }, { emoji: '🔍', title: 'Parse HTML', desc: 'Data के elements ढूंढो' }, { emoji: '💾', title: 'Extract', desc: 'Data save करो CSV में' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Google खुद एक giant web scraper है — internet का सारा data scrape करके index बनाता है!' }
    ]},
    mr: { title: 'Web Scraping 🕷️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '🕷️ Web Scraping म्हणजे काय?', text: 'Web Scraping म्हणजे internet मधून automatically data collect करणे! News, prices, reviews — सगळं automatically extract करा. Data Science चा superpower!' },
      { type: 'example', heading: '📝 Simple Web Scraping', code: `import requests\nfrom bs4 import BeautifulSoup\n\n# Website मधून data आणा\nurl = "https://quotes.toscrape.com"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, 'html.parser')\n\n# Quotes extract करा\nquotes = soup.find_all('span', class_='text')\nfor quote in quotes[:5]:\n    print(quote.text)` },
      { type: 'tools', heading: '🔧 Web Scraping Tools!', tools: [{ name: 'BeautifulSoup', desc: 'Python scraping library', link: 'beautiful-soup-4.readthedocs.io', emoji: '🕷️' }, { name: 'Scrapy', desc: 'Advanced scraping framework', link: 'scrapy.org', emoji: '⚡' }, { name: 'Octoparse', desc: 'No-code web scraping', link: 'octoparse.com', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ Web Scraping कसं काम करतं?', steps: [{ emoji: '🌐', title: 'URL Request', desc: 'Website चा HTML download करा' }, { emoji: '🔍', title: 'Parse HTML', desc: "Data चे elements शोधा" }, { emoji: '💾', title: 'Extract', desc: 'Data CSV मध्ये save करा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Google स्वतः एक giant web scraper आहे — internet चा सगळा data scrape करून index बनवतो!' }
    ]},
    en: { title: 'Web Scraping 🕷️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '🕷️ What is Web Scraping?', text: "Web Scraping means automatically collecting data from the internet! News, prices, reviews — extract everything automatically. Data Science's superpower!" },
      { type: 'example', heading: '📝 Simple Web Scraping', code: `import requests\nfrom bs4 import BeautifulSoup\n\n# Get data from website\nurl = "https://quotes.toscrape.com"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, 'html.parser')\n\n# Extract quotes\nquotes = soup.find_all('span', class_='text')\nfor quote in quotes[:5]:\n    print(quote.text)` },
      { type: 'tools', heading: '🔧 Web Scraping Tools!', tools: [{ name: 'BeautifulSoup', desc: 'Python scraping library', link: 'beautiful-soup-4.readthedocs.io', emoji: '🕷️' }, { name: 'Scrapy', desc: 'Advanced scraping framework', link: 'scrapy.org', emoji: '⚡' }, { name: 'Octoparse', desc: 'No-code web scraping', link: 'octoparse.com', emoji: '🔧' }] },
      { type: 'howworks', heading: '⚙️ How Does Web Scraping Work?', steps: [{ emoji: '🌐', title: 'URL Request', desc: 'Download website HTML' }, { emoji: '🔍', title: 'Parse HTML', desc: 'Find data elements' }, { emoji: '💾', title: 'Extract', desc: 'Save data to CSV' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Google itself is a giant web scraper — it scrapes all internet data to build its index!' }
    ]},
  },
  'ai-music': {
    hi: { title: 'AI and Music 🎵', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎵 AI से Music कैसे बनती है?', text: 'AI लाखों songs सुनकर patterns सीखता है! Rhythm, melody, harmony — सब analyze करता है और नई music compose करता है। Future का music producer!' },
      { type: 'example', heading: '🌟 AI Music Tools', points: ['🎵 Suno AI — Text से complete songs', '🎸 AIVA — Classical music composer', '🎹 Amper Music — Background music', '🎤 Voicemod — Voice को AI से change करो'] },
      { type: 'tools', heading: '🔧 AI Music Tools Try करो!', tools: [{ name: 'Suno AI', desc: 'Text से songs बनाओ', link: 'suno.ai', emoji: '🎵' }, { name: 'AIVA', desc: 'AI music composer', link: 'aiva.ai', emoji: '🎸' }, { name: 'Soundraw', desc: 'Royalty-free AI music', link: 'soundraw.io', emoji: '🎹' }] },
      { type: 'howworks', heading: '⚙️ AI Music कैसे बनती है?', steps: [{ emoji: '📝', title: 'Prompt दो', desc: '"Sad piano music, slow tempo"' }, { emoji: '🧠', title: 'AI Compose करता है', desc: 'Millions of songs से patterns use करता है' }, { emoji: '🎵', title: 'Music Ready!', desc: 'Download और use करो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Suno AI पर एक user ने 5 minutes में 10 songs बनाए — जो एक professional musician को हफ्तों लगते!' }
    ]},
    mr: { title: 'AI and Music 🎵', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎵 AI ने Music कशी बनते?', text: 'AI लाखो songs ऐकून patterns शिकतो! Rhythm, melody, harmony — सगळं analyze करतो आणि नवीन music compose करतो. Future चा music producer!' },
      { type: 'example', heading: '🌟 AI Music Tools', points: ['🎵 Suno AI — Text मधून complete songs', '🎸 AIVA — Classical music composer', '🎹 Amper Music — Background music', '🎤 Voicemod — Voice AI ने change करा'] },
      { type: 'tools', heading: '🔧 AI Music Tools Try करा!', tools: [{ name: 'Suno AI', desc: 'Text मधून songs बनवा', link: 'suno.ai', emoji: '🎵' }, { name: 'AIVA', desc: 'AI music composer', link: 'aiva.ai', emoji: '🎸' }, { name: 'Soundraw', desc: 'Royalty-free AI music', link: 'soundraw.io', emoji: '🎹' }] },
      { type: 'howworks', heading: '⚙️ AI Music कशी बनते?', steps: [{ emoji: '📝', title: 'Prompt द्या', desc: '"Sad piano music, slow tempo"' }, { emoji: '🧠', title: 'AI Compose करतो', desc: 'Millions of songs चे patterns वापरतो' }, { emoji: '🎵', title: 'Music Ready!', desc: 'Download आणि use करा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Suno AI वर एका user ने 5 minutes मध्ये 10 songs बनवल्या — जे एका professional musician ला आठवडे लागले असते!' }
    ]},
    en: { title: 'AI and Music 🎵', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎵 How Does AI Create Music?', text: "AI learns patterns from millions of songs! It analyzes rhythm, melody, harmony — and composes new music. You're a future music producer!" },
      { type: 'example', heading: '🌟 AI Music Tools', points: ['🎵 Suno AI — Complete songs from text', '🎸 AIVA — Classical music composer', '🎹 Amper Music — Background music', '🎤 Voicemod — Change voice with AI'] },
      { type: 'tools', heading: '🔧 Try AI Music Tools!', tools: [{ name: 'Suno AI', desc: 'Create songs from text', link: 'suno.ai', emoji: '🎵' }, { name: 'AIVA', desc: 'AI music composer', link: 'aiva.ai', emoji: '🎸' }, { name: 'Soundraw', desc: 'Royalty-free AI music', link: 'soundraw.io', emoji: '🎹' }] },
      { type: 'howworks', heading: '⚙️ How is AI Music Made?', steps: [{ emoji: '📝', title: 'Give Prompt', desc: '"Sad piano music, slow tempo"' }, { emoji: '🧠', title: 'AI Composes', desc: 'Uses patterns from millions of songs' }, { emoji: '🎵', title: 'Music Ready!', desc: 'Download and use it' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'A user on Suno AI created 10 songs in 5 minutes — which would take a professional musician weeks!' }
    ]},
  },
  'neural-nets': {
    hi: { title: 'Neural Networks 🔬', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 Neural Network क्या है?', text: 'Neural Network तुम्हारे brain की digital copy है! 86 billion connected neurons हैं — AI में भी ऐसे ही artificial neurons होते हैं!' },
      { type: 'example', heading: '🌟 Neural Networks के उपयोग', points: ['👁️ Image Recognition — Photos में objects', '🗣️ Voice Assistant — बोलना समझना', '🎨 DALL-E — Images बनाना', '♟️ AlphaGo — World Champion beat किया'] },
      { type: 'tools', heading: '🔧 Neural Network Tools!', tools: [{ name: 'TensorFlow Playground', desc: 'Visual neural network', link: 'playground.tensorflow.org', emoji: '🔬' }, { name: 'Google Colab', desc: 'Python + TensorFlow', link: 'colab.research.google.com', emoji: '💻' }, { name: 'Fast.ai', desc: 'Practical deep learning', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Neural Network Architecture', steps: [{ emoji: '➡️', title: 'Input Layer', desc: 'Data आता है (pixels, numbers)' }, { emoji: '🔄', title: 'Hidden Layers', desc: 'Pattern सीखता है' }, { emoji: '✅', title: 'Output Layer', desc: 'Answer आता है' }] },
      { type: 'funfact', heading: '🎉 Try It!', text: 'playground.tensorflow.org पर जाओ — browser में neural network बनाओ और train करो!' }
    ]},
    mr: { title: 'Neural Networks 🔬', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 Neural Network म्हणजे काय?', text: "Neural Network हे तुमच्या brain चं digital copy आहे! 86 billion connected neurons आहेत — AI मध्ये पण असेच artificial neurons असतात!" },
      { type: 'example', heading: '🌟 Neural Networks चे उपयोग', points: ['👁️ Image Recognition — Photos मध्ये objects', '🗣️ Voice Assistant — बोलणं समजणं', '🎨 DALL-E — Images बनवणे', '♟️ AlphaGo — World Champion beat केला'] },
      { type: 'tools', heading: '🔧 Neural Network Tools!', tools: [{ name: 'TensorFlow Playground', desc: 'Visual neural network', link: 'playground.tensorflow.org', emoji: '🔬' }, { name: 'Google Colab', desc: 'Python + TensorFlow', link: 'colab.research.google.com', emoji: '💻' }, { name: 'Fast.ai', desc: 'Practical deep learning', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Neural Network Architecture', steps: [{ emoji: '➡️', title: 'Input Layer', desc: 'Data येतो (pixels, numbers)' }, { emoji: '🔄', title: 'Hidden Layers', desc: 'Pattern शिकतो' }, { emoji: '✅', title: 'Output Layer', desc: 'Answer येतो' }] },
      { type: 'funfact', heading: '🎉 Try करा!', text: 'playground.tensorflow.org वर जा — browser मध्ये neural network बनवा आणि train करा!' }
    ]},
    en: { title: 'Neural Networks 🔬', color: '#f472b6', sections: [
      { type: 'intro', heading: '🧠 What is a Neural Network?', text: "A Neural Network is a digital copy of your brain! There are 86 billion connected neurons — AI has similar artificial neurons!" },
      { type: 'example', heading: '🌟 Uses of Neural Networks', points: ['👁️ Image Recognition — Objects in photos', '🗣️ Voice Assistant — Understanding speech', '🎨 DALL-E — Creating images', '♟️ AlphaGo — Beat World Champion'] },
      { type: 'tools', heading: '🔧 Neural Network Tools!', tools: [{ name: 'TensorFlow Playground', desc: 'Visual neural network', link: 'playground.tensorflow.org', emoji: '🔬' }, { name: 'Google Colab', desc: 'Python + TensorFlow', link: 'colab.research.google.com', emoji: '💻' }, { name: 'Fast.ai', desc: 'Practical deep learning', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Neural Network Architecture', steps: [{ emoji: '➡️', title: 'Input Layer', desc: 'Data comes in (pixels, numbers)' }, { emoji: '🔄', title: 'Hidden Layers', desc: 'Learns patterns' }, { emoji: '✅', title: 'Output Layer', desc: 'Answer comes out' }] },
      { type: 'funfact', heading: '🎉 Try It!', text: 'Go to playground.tensorflow.org — build and train a neural network in your browser!' }
    ]},
  },
  'ml-project': {
    hi: { title: 'Real ML Project 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 House Price Prediction!', text: 'Real ML project — House Price Predictor! Data देकर AI को सिखाएंगे!' },
      { type: 'example', heading: '📝 Python Code', code: `import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nrooms = np.array([[1], [2], [3], [4], [5]])\nprices = np.array([20, 35, 50, 70, 90])\n\nmodel = LinearRegression()\nmodel.fit(rooms, prices)\n\npredicted = model.predict([[3]])\nprint(f"3 rooms: ₹{predicted[0]:.0f} लाख")` },
      { type: 'tools', heading: '🔧 ML Project Tools!', tools: [{ name: 'Google Colab', desc: 'Free Python + sklearn', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Real datasets', link: 'kaggle.com', emoji: '📊' }, { name: 'Scikit-learn', desc: 'ML library docs', link: 'scikit-learn.org', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '📊', title: 'Data Collect', desc: 'Real estate data' }, { emoji: '🧹', title: 'Clean Data', desc: 'Missing values handle करो' }, { emoji: '🤖', title: 'Train Model', desc: 'sklearn use करो' }] },
      { type: 'funfact', heading: '🎉 Real Use!', text: 'Magicbricks और 99acres यही ML model use करते हैं!' }
    ]},
    mr: { title: 'Real ML Project 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 House Price Prediction!', text: 'Real ML project — House Price Predictor! Data देऊन AI ला शिकवणार!' },
      { type: 'example', heading: '📝 Python Code', code: `import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nrooms = np.array([[1], [2], [3], [4], [5]])\nprices = np.array([20, 35, 50, 70, 90])\n\nmodel = LinearRegression()\nmodel.fit(rooms, prices)\n\npredicted = model.predict([[3]])\nprint(f"3 rooms: ₹{predicted[0]:.0f} लाख")` },
      { type: 'tools', heading: '🔧 ML Project Tools!', tools: [{ name: 'Google Colab', desc: 'Free Python + sklearn', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Real datasets', link: 'kaggle.com', emoji: '📊' }, { name: 'Scikit-learn', desc: 'ML library docs', link: 'scikit-learn.org', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '📊', title: 'Data Collect', desc: 'Real estate data' }, { emoji: '🧹', title: 'Clean Data', desc: 'Missing values handle करा' }, { emoji: '🤖', title: 'Train Model', desc: 'sklearn वापरा' }] },
      { type: 'funfact', heading: '🎉 Real Use!', text: 'Magicbricks आणि 99acres हेच ML model वापरतात!' }
    ]},
    en: { title: 'Real ML Project 📊', color: '#34d399', sections: [
      { type: 'intro', heading: '📊 House Price Prediction!', text: "Real ML project — House Price Predictor! We'll teach AI using data!" },
      { type: 'example', heading: '📝 Python Code', code: `import numpy as np\nfrom sklearn.linear_model import LinearRegression\n\nrooms = np.array([[1], [2], [3], [4], [5]])\nprices = np.array([20, 35, 50, 70, 90])\n\nmodel = LinearRegression()\nmodel.fit(rooms, prices)\n\npredicted = model.predict([[3]])\nprint(f"3 rooms: ₹{predicted[0]:.0f} Lakhs")` },
      { type: 'tools', heading: '🔧 ML Project Tools!', tools: [{ name: 'Google Colab', desc: 'Free Python + sklearn', link: 'colab.research.google.com', emoji: '🔬' }, { name: 'Kaggle', desc: 'Real datasets', link: 'kaggle.com', emoji: '📊' }, { name: 'Scikit-learn', desc: 'ML library docs', link: 'scikit-learn.org', emoji: '🤖' }] },
      { type: 'howworks', heading: '⚙️ Project Steps', steps: [{ emoji: '📊', title: 'Collect Data', desc: 'Real estate data' }, { emoji: '🧹', title: 'Clean Data', desc: 'Handle missing values' }, { emoji: '🤖', title: 'Train Model', desc: 'Use sklearn' }] },
      { type: 'funfact', heading: '🎉 Real Use!', text: 'Magicbricks and 99acres use this exact ML model!' }
    ]},
  },
  'ai-tools': {
    hi: { title: 'AI Tools Master ⚙️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '⚙️ Professional AI Tools', text: '2024 में AI tools इतने powerful हो गए हैं कि 16 साल का बच्चा भी professional काम कर सकता है!' },
      { type: 'example', heading: '🌟 Must-Know AI Tools', points: ['🤖 ChatGPT/Claude — Writing, Coding', '🎨 Midjourney/DALL-E — Images', '🎵 Suno AI — Music', '💻 GitHub Copilot — AI Coding'] },
      { type: 'tools', heading: '🔧 Top AI Tools!', tools: [{ name: 'Claude AI', desc: 'Best AI assistant', link: 'claude.ai', emoji: '🤖' }, { name: 'GitHub Copilot', desc: 'AI code assistant', link: 'github.com/copilot', emoji: '💻' }, { name: 'Perplexity AI', desc: 'AI search engine', link: 'perplexity.ai', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ Prompt Engineering Tips', steps: [{ emoji: '🎯', title: 'Specific रहो', desc: 'Exact output describe करो' }, { emoji: '📋', title: 'Context दो', desc: 'Role, audience बताओ' }, { emoji: '🔄', title: 'Iterate करो', desc: 'Refine करते रहो' }] },
      { type: 'funfact', heading: '🎉 Career!', text: 'Prompt Engineer की salary $300,000/year तक होती है!' }
    ]},
    mr: { title: 'AI Tools Master ⚙️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '⚙️ Professional AI Tools', text: '2024 मध्ये AI tools इतके powerful झाले आहेत की 16 वर्षांचा मुलगा पण professional काम करू शकतो!' },
      { type: 'example', heading: '🌟 Must-Know AI Tools', points: ['🤖 ChatGPT/Claude — Writing, Coding', '🎨 Midjourney/DALL-E — Images', '🎵 Suno AI — Music', '💻 GitHub Copilot — AI Coding'] },
      { type: 'tools', heading: '🔧 Top AI Tools!', tools: [{ name: 'Claude AI', desc: 'Best AI assistant', link: 'claude.ai', emoji: '🤖' }, { name: 'GitHub Copilot', desc: 'AI code assistant', link: 'github.com/copilot', emoji: '💻' }, { name: 'Perplexity AI', desc: 'AI search engine', link: 'perplexity.ai', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ Prompt Engineering Tips', steps: [{ emoji: '🎯', title: 'Specific रहा', desc: 'Exact output describe करा' }, { emoji: '📋', title: 'Context द्या', desc: 'Role, audience सांगा' }, { emoji: '🔄', title: 'Iterate करा', desc: 'Refine करत राहा' }] },
      { type: 'funfact', heading: '🎉 Career!', text: 'Prompt Engineer ची salary $300,000/year पर्यंत असते!' }
    ]},
    en: { title: 'AI Tools Master ⚙️', color: '#38bdf8', sections: [
      { type: 'intro', heading: '⚙️ Professional AI Tools', text: 'In 2024, AI tools are so powerful that a 16-year-old can do professional work!' },
      { type: 'example', heading: '🌟 Must-Know AI Tools', points: ['🤖 ChatGPT/Claude — Writing, Coding', '🎨 Midjourney/DALL-E — Images', '🎵 Suno AI — Music', '💻 GitHub Copilot — AI Coding'] },
      { type: 'tools', heading: '🔧 Top AI Tools!', tools: [{ name: 'Claude AI', desc: 'Best AI assistant', link: 'claude.ai', emoji: '🤖' }, { name: 'GitHub Copilot', desc: 'AI code assistant', link: 'github.com/copilot', emoji: '💻' }, { name: 'Perplexity AI', desc: 'AI search engine', link: 'perplexity.ai', emoji: '🔍' }] },
      { type: 'howworks', heading: '⚙️ Prompt Engineering Tips', steps: [{ emoji: '🎯', title: 'Be Specific', desc: 'Describe exact output' }, { emoji: '📋', title: 'Give Context', desc: 'Mention role, audience' }, { emoji: '🔄', title: 'Iterate', desc: 'Keep refining' }] },
      { type: 'funfact', heading: '🎉 Career!', text: 'Prompt Engineers earn up to $300,000/year!' }
    ]},
  },
  'deep-learning': {
    hi: { title: 'Deep Learning 🧠', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 Deep Learning क्या है?', text: 'Deep Learning यानी बहुत सारे layers वाले Neural Networks! "Deep" इसलिए क्योंकि network में बहुत सारे hidden layers होते हैं। GPT, DALL-E, AlphaGo सब Deep Learning से बने हैं!' },
      { type: 'example', heading: '🌟 Deep Learning Applications', points: ['🗣️ ChatGPT — Language generation', '🎨 DALL-E — Image generation', '🎵 Music generation — AI compositions', '🎮 AlphaGo — Game playing AI'] },
      { type: 'tools', heading: '🔧 Deep Learning Tools!', tools: [{ name: 'TensorFlow', desc: "Google's DL framework", link: 'tensorflow.org', emoji: '🔬' }, { name: 'PyTorch', desc: "Meta's DL framework", link: 'pytorch.org', emoji: '🔥' }, { name: 'Fast.ai', desc: 'Beginner-friendly DL', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Deep Learning vs ML', steps: [{ emoji: '🔷', title: 'ML', desc: 'Features manually define करने पड़ते हैं' }, { emoji: '🔶', title: 'Deep Learning', desc: 'Automatically features सीखता है' }, { emoji: '🚀', title: 'Result', desc: 'Much better accuracy!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GPT-4 में 1.8 trillion parameters हैं — यह दुनिया का सबसे large neural network है!' }
    ]},
    mr: { title: 'Deep Learning 🧠', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 Deep Learning म्हणजे काय?', text: 'Deep Learning म्हणजे खूप जास्त layers असलेले Neural Networks! "Deep" कारण network मध्ये खूप hidden layers असतात. GPT, DALL-E, AlphaGo सगळे Deep Learning ने बनले आहेत!' },
      { type: 'example', heading: '🌟 Deep Learning Applications', points: ['🗣️ ChatGPT — Language generation', '🎨 DALL-E — Image generation', '🎵 Music generation — AI compositions', '🎮 AlphaGo — Game playing AI'] },
      { type: 'tools', heading: '🔧 Deep Learning Tools!', tools: [{ name: 'TensorFlow', desc: "Google's DL framework", link: 'tensorflow.org', emoji: '🔬' }, { name: 'PyTorch', desc: "Meta's DL framework", link: 'pytorch.org', emoji: '🔥' }, { name: 'Fast.ai', desc: 'Beginner-friendly DL', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Deep Learning vs ML', steps: [{ emoji: '🔷', title: 'ML', desc: 'Features manually define करायला लागतात' }, { emoji: '🔶', title: 'Deep Learning', desc: 'Automatically features शिकतो' }, { emoji: '🚀', title: 'Result', desc: 'Much better accuracy!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GPT-4 मध्ये 1.8 trillion parameters आहेत — हे जगातलं सर्वात मोठं neural network आहे!' }
    ]},
    en: { title: 'Deep Learning 🧠', color: '#a78bfa', sections: [
      { type: 'intro', heading: '🧠 What is Deep Learning?', text: 'Deep Learning means Neural Networks with many layers! "Deep" because the network has many hidden layers. GPT, DALL-E, AlphaGo — all built with Deep Learning!' },
      { type: 'example', heading: '🌟 Deep Learning Applications', points: ['🗣️ ChatGPT — Language generation', '🎨 DALL-E — Image generation', '🎵 Music generation — AI compositions', '🎮 AlphaGo — Game playing AI'] },
      { type: 'tools', heading: '🔧 Deep Learning Tools!', tools: [{ name: 'TensorFlow', desc: "Google's DL framework", link: 'tensorflow.org', emoji: '🔬' }, { name: 'PyTorch', desc: "Meta's DL framework", link: 'pytorch.org', emoji: '🔥' }, { name: 'Fast.ai', desc: 'Beginner-friendly DL', link: 'fast.ai', emoji: '🚀' }] },
      { type: 'howworks', heading: '⚙️ Deep Learning vs ML', steps: [{ emoji: '🔷', title: 'ML', desc: 'Features must be manually defined' }, { emoji: '🔶', title: 'Deep Learning', desc: 'Automatically learns features' }, { emoji: '🚀', title: 'Result', desc: 'Much better accuracy!' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GPT-4 has 1.8 trillion parameters — making it the largest neural network in the world!' }
    ]},
  },
  'computer-vision-adv': {
    hi: { title: 'Computer Vision Advanced 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ Advanced Computer Vision', text: 'Basic CV से आगे — Object Detection, Segmentation, Face Recognition, Video Analysis! Real-world applications बनाते हैं!' },
      { type: 'example', heading: '📝 OpenCV Code', code: `import cv2\nimport numpy as np\n\n# Webcam से video लो\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    \n    # Face detection\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    face_cascade = cv2.CascadeClassifier(\n        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'\n    )\n    faces = face_cascade.detectMultiScale(gray, 1.1, 4)\n    \n    for (x, y, w, h) in faces:\n        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)\n    \n    cv2.imshow('Face Detection', frame)\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break\n\ncap.release()` },
      { type: 'tools', heading: '🔧 Advanced CV Tools!', tools: [{ name: 'OpenCV', desc: 'Computer vision library', link: 'opencv.org', emoji: '👁️' }, { name: 'YOLO', desc: 'Real-time object detection', link: 'ultralytics.com', emoji: '🎯' }, { name: 'Roboflow', desc: 'CV dataset platform', link: 'roboflow.com', emoji: '📸' }] },
      { type: 'howworks', heading: '⚙️ CV Techniques', steps: [{ emoji: '🎯', title: 'Object Detection', desc: 'Objects को locate और classify करो' }, { emoji: '✂️', title: 'Segmentation', desc: 'Pixel-level classification' }, { emoji: '🔍', title: 'Feature Matching', desc: 'Similar images ढूंढना' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Tesla cars में 8 cameras हैं जो real-time CV से road analyze करती हैं — हर second में!' }
    ]},
    mr: { title: 'Computer Vision Advanced 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ Advanced Computer Vision', text: 'Basic CV च्या पुढे — Object Detection, Segmentation, Face Recognition, Video Analysis! Real-world applications बनवतो!' },
      { type: 'example', heading: '📝 OpenCV Code', code: `import cv2\nimport numpy as np\n\n# Webcam मधून video घ्या\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    \n    # Face detection\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    face_cascade = cv2.CascadeClassifier(\n        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'\n    )\n    faces = face_cascade.detectMultiScale(gray, 1.1, 4)\n    \n    for (x, y, w, h) in faces:\n        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)\n    \n    cv2.imshow('Face Detection', frame)\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break\n\ncap.release()` },
      { type: 'tools', heading: '🔧 Advanced CV Tools!', tools: [{ name: 'OpenCV', desc: 'Computer vision library', link: 'opencv.org', emoji: '👁️' }, { name: 'YOLO', desc: 'Real-time object detection', link: 'ultralytics.com', emoji: '🎯' }, { name: 'Roboflow', desc: 'CV dataset platform', link: 'roboflow.com', emoji: '📸' }] },
      { type: 'howworks', heading: '⚙️ CV Techniques', steps: [{ emoji: '🎯', title: 'Object Detection', desc: 'Objects locate आणि classify करा' }, { emoji: '✂️', title: 'Segmentation', desc: 'Pixel-level classification' }, { emoji: '🔍', title: 'Feature Matching', desc: 'Similar images शोधणे' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Tesla cars मध्ये 8 cameras आहेत जे real-time CV ने road analyze करतात — प्रत्येक second मध्ये!' }
    ]},
    en: { title: 'Computer Vision Advanced 👁️', color: '#34d399', sections: [
      { type: 'intro', heading: '👁️ Advanced Computer Vision', text: 'Beyond basic CV — Object Detection, Segmentation, Face Recognition, Video Analysis! Building real-world applications!' },
      { type: 'example', heading: '📝 OpenCV Code', code: `import cv2\n\n# Get video from webcam\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    face_cascade = cv2.CascadeClassifier(\n        cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'\n    )\n    faces = face_cascade.detectMultiScale(gray, 1.1, 4)\n    for (x, y, w, h) in faces:\n        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)\n    cv2.imshow('Face Detection', frame)\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break\ncap.release()` },
      { type: 'tools', heading: '🔧 Advanced CV Tools!', tools: [{ name: 'OpenCV', desc: 'Computer vision library', link: 'opencv.org', emoji: '👁️' }, { name: 'YOLO', desc: 'Real-time object detection', link: 'ultralytics.com', emoji: '🎯' }, { name: 'Roboflow', desc: 'CV dataset platform', link: 'roboflow.com', emoji: '📸' }] },
      { type: 'howworks', heading: '⚙️ CV Techniques', steps: [{ emoji: '🎯', title: 'Object Detection', desc: 'Locate and classify objects' }, { emoji: '✂️', title: 'Segmentation', desc: 'Pixel-level classification' }, { emoji: '🔍', title: 'Feature Matching', desc: 'Finding similar images' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Tesla cars have 8 cameras that analyze roads in real-time using CV — every single second!' }
    ]},
  },
  'nlp-transformers': {
    hi: { title: 'NLP & Transformers 📝', color: '#f472b6', sections: [
      { type: 'intro', heading: '📝 Transformers क्या है?', text: 'Transformer 2017 में Google ने invent किया — "Attention is All You Need" paper! यही technology ChatGPT, Gemini, Claude में है। AI का game-changer!' },
      { type: 'example', heading: '📝 Hugging Face Code', code: `from transformers import pipeline\n\n# Sentiment analysis\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love AI! It's amazing!")\nprint(result)\n# Output: [{'label': 'POSITIVE', 'score': 0.9998}]\n\n# Text generation\ngenerator = pipeline("text-generation", model="gpt2")\ntext = generator("AI is", max_length=50)\nprint(text[0]['generated_text'])` },
      { type: 'tools', heading: '🔧 Transformer Tools!', tools: [{ name: 'Hugging Face', desc: 'Largest AI model hub', link: 'huggingface.co', emoji: '🤗' }, { name: 'OpenAI API', desc: 'GPT models API', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Google Colab', desc: 'Free GPU for training', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ Transformer Architecture', steps: [{ emoji: '👁️', title: 'Self-Attention', desc: 'हर word दूसरे words को "देखता" है' }, { emoji: '🔄', title: 'Multi-Head', desc: 'Multiple attention heads parallel' }, { emoji: '📤', title: 'Output', desc: 'Context-aware representation' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '"Attention is All You Need" paper 2017 में आया — इसी से ChatGPT, Gemini, Claude सब बने!' }
    ]},
    mr: { title: 'NLP & Transformers 📝', color: '#f472b6', sections: [
      { type: 'intro', heading: '📝 Transformers म्हणजे काय?', text: 'Transformer 2017 मध्ये Google ने invent केला — "Attention is All You Need" paper! हीच technology ChatGPT, Gemini, Claude मध्ये आहे. AI चा game-changer!' },
      { type: 'example', heading: '📝 Hugging Face Code', code: `from transformers import pipeline\n\n# Sentiment analysis\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love AI! It's amazing!")\nprint(result)\n# Output: [{'label': 'POSITIVE', 'score': 0.9998}]\n\n# Text generation\ngenerator = pipeline("text-generation", model="gpt2")\ntext = generator("AI is", max_length=50)\nprint(text[0]['generated_text'])` },
      { type: 'tools', heading: '🔧 Transformer Tools!', tools: [{ name: 'Hugging Face', desc: 'Largest AI model hub', link: 'huggingface.co', emoji: '🤗' }, { name: 'OpenAI API', desc: 'GPT models API', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Google Colab', desc: 'Free GPU for training', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ Transformer Architecture', steps: [{ emoji: '👁️', title: 'Self-Attention', desc: 'प्रत्येक word इतर words ला "बघतो"' }, { emoji: '🔄', title: 'Multi-Head', desc: 'Multiple attention heads parallel' }, { emoji: '📤', title: 'Output', desc: 'Context-aware representation' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '"Attention is All You Need" paper 2017 मध्ये आलं — यातूनच ChatGPT, Gemini, Claude सगळे बनले!' }
    ]},
    en: { title: 'NLP & Transformers 📝', color: '#f472b6', sections: [
      { type: 'intro', heading: '📝 What are Transformers?', text: 'Transformer was invented by Google in 2017 — "Attention is All You Need" paper! This same technology is in ChatGPT, Gemini, Claude. AI\'s game-changer!' },
      { type: 'example', heading: '📝 Hugging Face Code', code: `from transformers import pipeline\n\n# Sentiment analysis\nclassifier = pipeline("sentiment-analysis")\nresult = classifier("I love AI! It's amazing!")\nprint(result)\n# [{'label': 'POSITIVE', 'score': 0.9998}]\n\n# Text generation\ngenerator = pipeline("text-generation", model="gpt2")\ntext = generator("AI is", max_length=50)\nprint(text[0]['generated_text'])` },
      { type: 'tools', heading: '🔧 Transformer Tools!', tools: [{ name: 'Hugging Face', desc: 'Largest AI model hub', link: 'huggingface.co', emoji: '🤗' }, { name: 'OpenAI API', desc: 'GPT models API', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Google Colab', desc: 'Free GPU for training', link: 'colab.research.google.com', emoji: '🔬' }] },
      { type: 'howworks', heading: '⚙️ Transformer Architecture', steps: [{ emoji: '👁️', title: 'Self-Attention', desc: 'Each word "looks at" other words' }, { emoji: '🔄', title: 'Multi-Head', desc: 'Multiple attention heads in parallel' }, { emoji: '📤', title: 'Output', desc: 'Context-aware representation' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: '"Attention is All You Need" paper came in 2017 — ChatGPT, Gemini, Claude all came from this!' }
    ]},
  },
  'reinforcement-learning': {
    hi: { title: 'Reinforcement Learning 🎮', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎮 Reinforcement Learning क्या है?', text: 'RL यानी AI को trial and error से सिखाना! जैसे बच्चा cycle सीखता है — गिरता है, उठता है, सीख लेता है। AI भी ऐसे ही सीखता है!' },
      { type: 'example', heading: '🌟 RL Applications', points: ['🎮 AlphaGo — Chess और Go में world champion', '🚗 Self-driving Cars — Road navigation', '🤖 Boston Dynamics — Robot walking', '📈 Stock Trading — Optimal strategies'] },
      { type: 'tools', heading: '🔧 RL Tools!', tools: [{ name: 'OpenAI Gym', desc: 'RL environments', link: 'gymnasium.farama.org', emoji: '🏋️' }, { name: 'Stable Baselines3', desc: 'RL algorithms', link: 'stable-baselines3.readthedocs.io', emoji: '🤖' }, { name: 'Unity ML-Agents', desc: 'Game AI training', link: 'unity.com/products/machine-learning-agents', emoji: '🎮' }] },
      { type: 'howworks', heading: '⚙️ RL कैसे काम करती है?', steps: [{ emoji: '🎯', title: 'Agent', desc: 'AI जो actions लेता है' }, { emoji: '🌍', title: 'Environment', desc: 'World जिसमें agent है' }, { emoji: '🏆', title: 'Reward', desc: 'Good action पर reward, bad पर penalty' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'AlphaZero ने 4 घंटे में खुद को Chess सिखाया और World Champion को beat कर दिया!' }
    ]},
    mr: { title: 'Reinforcement Learning 🎮', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎮 Reinforcement Learning म्हणजे काय?', text: 'RL म्हणजे AI ला trial and error ने शिकवणे! जसं मुल cycle शिकतो — पडतो, उठतो, शिकतो. AI पण असंच शिकतो!' },
      { type: 'example', heading: '🌟 RL Applications', points: ['🎮 AlphaGo — Chess आणि Go मध्ये world champion', '🚗 Self-driving Cars — Road navigation', '🤖 Boston Dynamics — Robot walking', '📈 Stock Trading — Optimal strategies'] },
      { type: 'tools', heading: '🔧 RL Tools!', tools: [{ name: 'OpenAI Gym', desc: 'RL environments', link: 'gymnasium.farama.org', emoji: '🏋️' }, { name: 'Stable Baselines3', desc: 'RL algorithms', link: 'stable-baselines3.readthedocs.io', emoji: '🤖' }, { name: 'Unity ML-Agents', desc: 'Game AI training', link: 'unity.com/products/machine-learning-agents', emoji: '🎮' }] },
      { type: 'howworks', heading: '⚙️ RL कसं काम करतं?', steps: [{ emoji: '🎯', title: 'Agent', desc: 'AI जो actions घेतो' }, { emoji: '🌍', title: 'Environment', desc: 'World ज्यात agent आहे' }, { emoji: '🏆', title: 'Reward', desc: 'Good action ला reward, bad ला penalty' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'AlphaZero ने 4 तासांत स्वतःला Chess शिकवलं आणि World Champion ला beat केलं!' }
    ]},
    en: { title: 'Reinforcement Learning 🎮', color: '#fbbf24', sections: [
      { type: 'intro', heading: '🎮 What is Reinforcement Learning?', text: "RL means teaching AI through trial and error! Just like a child learns to ride a bike — falls, gets up, learns. AI learns the same way!" },
      { type: 'example', heading: '🌟 RL Applications', points: ['🎮 AlphaGo — World champion in Chess and Go', '🚗 Self-driving Cars — Road navigation', '🤖 Boston Dynamics — Robot walking', '📈 Stock Trading — Optimal strategies'] },
      { type: 'tools', heading: '🔧 RL Tools!', tools: [{ name: 'OpenAI Gym', desc: 'RL environments', link: 'gymnasium.farama.org', emoji: '🏋️' }, { name: 'Stable Baselines3', desc: 'RL algorithms', link: 'stable-baselines3.readthedocs.io', emoji: '🤖' }, { name: 'Unity ML-Agents', desc: 'Game AI training', link: 'unity.com/products/machine-learning-agents', emoji: '🎮' }] },
      { type: 'howworks', heading: '⚙️ How Does RL Work?', steps: [{ emoji: '🎯', title: 'Agent', desc: 'AI that takes actions' }, { emoji: '🌍', title: 'Environment', desc: 'World the agent is in' }, { emoji: '🏆', title: 'Reward', desc: 'Reward for good actions, penalty for bad' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'AlphaZero taught itself Chess in 4 hours and beat the World Champion!' }
    ]},
  },
  'generative-ai': {
    hi: { title: 'Generative AI 🎨', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎨 Generative AI क्या है?', text: 'Generative AI नई content create करता है — images, text, music, video! यह AI सबसे exciting field है। DALL-E, ChatGPT, Suno — सब Generative AI हैं!' },
      { type: 'example', heading: '🌟 Generative AI Tools', points: ['🖼️ DALL-E 3 — Photorealistic images', '🗣️ ChatGPT — Human-like text', '🎵 Suno AI — Complete songs', '🎬 Runway ML — AI videos', '💻 GitHub Copilot — Code generation'] },
      { type: 'tools', heading: '🔧 Gen AI Tools!', tools: [{ name: 'Stable Diffusion', desc: 'Open-source image gen', link: 'stability.ai', emoji: '🎨' }, { name: 'Midjourney', desc: 'Best image quality', link: 'midjourney.com', emoji: '🖼️' }, { name: 'Runway ML', desc: 'AI video generation', link: 'runwayml.com', emoji: '🎬' }] },
      { type: 'howworks', heading: '⚙️ How Generative AI Works', steps: [{ emoji: '📚', title: 'Train on Data', desc: 'Billions of images/texts से' }, { emoji: '🧠', title: 'Learn Patterns', desc: 'Style, structure, content' }, { emoji: '✨', title: 'Generate New', desc: 'Unique content create करता है' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Generative AI market 2030 तक $1.3 trillion का होगा — सबसे fast-growing tech industry!' }
    ]},
    mr: { title: 'Generative AI 🎨', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎨 Generative AI म्हणजे काय?', text: 'Generative AI नवीन content create करतो — images, text, music, video! हे AI चं सर्वात exciting field आहे. DALL-E, ChatGPT, Suno — सगळे Generative AI आहेत!' },
      { type: 'example', heading: '🌟 Generative AI Tools', points: ['🖼️ DALL-E 3 — Photorealistic images', '🗣️ ChatGPT — Human-like text', '🎵 Suno AI — Complete songs', '🎬 Runway ML — AI videos', '💻 GitHub Copilot — Code generation'] },
      { type: 'tools', heading: '🔧 Gen AI Tools!', tools: [{ name: 'Stable Diffusion', desc: 'Open-source image gen', link: 'stability.ai', emoji: '🎨' }, { name: 'Midjourney', desc: 'Best image quality', link: 'midjourney.com', emoji: '🖼️' }, { name: 'Runway ML', desc: 'AI video generation', link: 'runwayml.com', emoji: '🎬' }] },
      { type: 'howworks', heading: '⚙️ Generative AI कसं काम करतं?', steps: [{ emoji: '📚', title: 'Train on Data', desc: 'Billions of images/texts मधून' }, { emoji: '🧠', title: 'Learn Patterns', desc: 'Style, structure, content' }, { emoji: '✨', title: 'Generate New', desc: 'Unique content create करतो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'Generative AI market 2030 पर्यंत $1.3 trillion चा होईल — सर्वात fast-growing tech industry!' }
    ]},
    en: { title: 'Generative AI 🎨', color: '#f472b6', sections: [
      { type: 'intro', heading: '🎨 What is Generative AI?', text: "Generative AI creates new content — images, text, music, video! It's the most exciting field of AI. DALL-E, ChatGPT, Suno — all Generative AI!" },
      { type: 'example', heading: '🌟 Generative AI Tools', points: ['🖼️ DALL-E 3 — Photorealistic images', '🗣️ ChatGPT — Human-like text', '🎵 Suno AI — Complete songs', '🎬 Runway ML — AI videos', '💻 GitHub Copilot — Code generation'] },
      { type: 'tools', heading: '🔧 Gen AI Tools!', tools: [{ name: 'Stable Diffusion', desc: 'Open-source image gen', link: 'stability.ai', emoji: '🎨' }, { name: 'Midjourney', desc: 'Best image quality', link: 'midjourney.com', emoji: '🖼️' }, { name: 'Runway ML', desc: 'AI video generation', link: 'runwayml.com', emoji: '🎬' }] },
      { type: 'howworks', heading: '⚙️ How Generative AI Works', steps: [{ emoji: '📚', title: 'Train on Data', desc: 'From billions of images/texts' }, { emoji: '🧠', title: 'Learn Patterns', desc: 'Style, structure, content' }, { emoji: '✨', title: 'Generate New', desc: 'Creates unique content' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'The Generative AI market will be worth $1.3 trillion by 2030 — fastest-growing tech industry!' }
    ]},
  },
  'ai-security': {
    hi: { title: 'AI Security 🔒', color: '#ef4444', sections: [
      { type: 'intro', heading: '🔒 AI Security क्या है?', text: 'AI Security यानी AI systems को attacks से protect करना! Hackers AI को fool कर सकते हैं — हमें defense techniques सीखनी हैं!' },
      { type: 'example', heading: '🌟 AI Security Threats', points: ['⚔️ Adversarial Attacks — AI को fool करना', '🎭 Model Poisoning — Training data corrupt करना', '🕵️ Model Stealing — AI को copy करना', '😈 Prompt Injection — AI को manipulate करना'] },
      { type: 'tools', heading: '🔧 AI Security Tools!', tools: [{ name: 'Adversarial Robustness Toolbox', desc: 'IBM का AI security', link: 'github.com/Trusted-AI/adversarial-robustness-toolbox', emoji: '🔒' }, { name: 'CleverHans', desc: 'Adversarial examples', link: 'github.com/cleverhans-lab/cleverhans', emoji: '⚔️' }, { name: 'OWASP LLM Top 10', desc: 'LLM security risks', link: 'owasp.org/www-project-top-10-for-large-language-model-applications', emoji: '🛡️' }] },
      { type: 'howworks', heading: '⚙️ AI Security Techniques', steps: [{ emoji: '🛡️', title: 'Adversarial Training', desc: 'Attacks के साथ train करो' }, { emoji: '🧪', title: 'Red Teaming', desc: 'AI को खुद attack करके test करो' }, { emoji: '🔍', title: 'Input Validation', desc: 'Malicious inputs filter करो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'एक researcher ने stop sign पर sticker लगाया और Tesla car उसे 55mph speed limit sign समझने लगी!' }
    ]},
    mr: { title: 'AI Security 🔒', color: '#ef4444', sections: [
      { type: 'intro', heading: '🔒 AI Security म्हणजे काय?', text: 'AI Security म्हणजे AI systems ला attacks पासून protect करणे! Hackers AI ला fool करू शकतात — आपल्याला defense techniques शिकायला हव्या!' },
      { type: 'example', heading: '🌟 AI Security Threats', points: ['⚔️ Adversarial Attacks — AI ला fool करणे', '🎭 Model Poisoning — Training data corrupt करणे', '🕵️ Model Stealing — AI ला copy करणे', '😈 Prompt Injection — AI ला manipulate करणे'] },
      { type: 'tools', heading: '🔧 AI Security Tools!', tools: [{ name: 'Adversarial Robustness Toolbox', desc: "IBM's AI security", link: 'github.com/Trusted-AI/adversarial-robustness-toolbox', emoji: '🔒' }, { name: 'CleverHans', desc: 'Adversarial examples', link: 'github.com/cleverhans-lab/cleverhans', emoji: '⚔️' }, { name: 'OWASP LLM Top 10', desc: 'LLM security risks', link: 'owasp.org/www-project-top-10-for-large-language-model-applications', emoji: '🛡️' }] },
      { type: 'howworks', heading: '⚙️ AI Security Techniques', steps: [{ emoji: '🛡️', title: 'Adversarial Training', desc: 'Attacks सोबत train करा' }, { emoji: '🧪', title: 'Red Teaming', desc: 'AI ला स्वतः attack करून test करा' }, { emoji: '🔍', title: 'Input Validation', desc: 'Malicious inputs filter करा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'एका researcher ने stop sign वर sticker लावलं आणि Tesla car ला ते 55mph speed limit sign वाटलं!' }
    ]},
    en: { title: 'AI Security 🔒', color: '#ef4444', sections: [
      { type: 'intro', heading: '🔒 What is AI Security?', text: 'AI Security means protecting AI systems from attacks! Hackers can fool AI — we need to learn defense techniques!' },
      { type: 'example', heading: '🌟 AI Security Threats', points: ['⚔️ Adversarial Attacks — Fooling AI', '🎭 Model Poisoning — Corrupting training data', '🕵️ Model Stealing — Copying AI models', '😈 Prompt Injection — Manipulating AI'] },
      { type: 'tools', heading: '🔧 AI Security Tools!', tools: [{ name: 'Adversarial Robustness Toolbox', desc: "IBM's AI security", link: 'github.com/Trusted-AI/adversarial-robustness-toolbox', emoji: '🔒' }, { name: 'CleverHans', desc: 'Adversarial examples', link: 'github.com/cleverhans-lab/cleverhans', emoji: '⚔️' }, { name: 'OWASP LLM Top 10', desc: 'LLM security risks', link: 'owasp.org/www-project-top-10-for-large-language-model-applications', emoji: '🛡️' }] },
      { type: 'howworks', heading: '⚙️ AI Security Techniques', steps: [{ emoji: '🛡️', title: 'Adversarial Training', desc: 'Train with attacks included' }, { emoji: '🧪', title: 'Red Teaming', desc: 'Test AI by attacking it yourself' }, { emoji: '🔍', title: 'Input Validation', desc: 'Filter malicious inputs' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'A researcher put a sticker on a stop sign and Tesla car thought it was a 55mph speed limit sign!' }
    ]},
  },
  'ai-startup': {
    hi: { title: 'Build AI Startup 💼', color: '#34d399', sections: [
      { type: 'intro', heading: '💼 AI Startup कैसे बनाएं?', text: 'आज 18 साल में AI startup शुरू करना possible है! OpenAI, Anthropic, Midjourney — सब छोटी teams से शुरू हुए। तुम्हारा turn है!' },
      { type: 'example', heading: '🌟 Successful Young AI Founders', points: ['🚀 Sam Altman — OpenAI CEO (शुरू किया 28 में)', '💡 Alexandr Wang — Scale AI ($7.3B, 19 में शुरू)', '🎨 David Holz — Midjourney founder', '⚡ Vitalik Buterin — Ethereum (19 में)'] },
      { type: 'tools', heading: '🔧 AI Startup Tools!', tools: [{ name: 'OpenAI API', desc: 'AI features add करो', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Vercel', desc: 'Free deployment', link: 'vercel.com', emoji: '🚀' }, { name: 'Stripe', desc: 'Payment integration', link: 'stripe.com', emoji: '💳' }] },
      { type: 'howworks', heading: '⚙️ AI Startup Steps', steps: [{ emoji: '💡', title: 'Problem ढूंढो', desc: 'कौन सी problem solve करोगे?' }, { emoji: '🛠️', title: 'MVP बनाओ', desc: 'Simple product जल्दी launch करो' }, { emoji: '📈', title: 'Grow करो', desc: 'Users feedback लो, iterate करो' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GenAI Kids खुद एक AI startup है — तुम already एक founder हो! 🚀' }
    ]},
    mr: { title: 'AI Startup बनवा 💼', color: '#34d399', sections: [
      { type: 'intro', heading: '💼 AI Startup कसा बनवायचा?', text: 'आज 18 वर्षांत AI startup सुरू करणं शक्य आहे! OpenAI, Anthropic, Midjourney — सगळे छोट्या teams ने सुरू केले. तुमची वेळ आहे!' },
      { type: 'example', heading: '🌟 Successful Young AI Founders', points: ['🚀 Sam Altman — OpenAI CEO (28 मध्ये सुरू केलं)', '💡 Alexandr Wang — Scale AI ($7.3B, 19 मध्ये सुरू)', '🎨 David Holz — Midjourney founder', '⚡ Vitalik Buterin — Ethereum (19 मध्ये)'] },
      { type: 'tools', heading: '🔧 AI Startup Tools!', tools: [{ name: 'OpenAI API', desc: 'AI features add करा', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Vercel', desc: 'Free deployment', link: 'vercel.com', emoji: '🚀' }, { name: 'Stripe', desc: 'Payment integration', link: 'stripe.com', emoji: '💳' }] },
      { type: 'howworks', heading: '⚙️ AI Startup Steps', steps: [{ emoji: '💡', title: 'Problem शोधा', desc: 'कोणती problem solve करणार?' }, { emoji: '🛠️', title: 'MVP बनवा', desc: 'Simple product लवकर launch करा' }, { emoji: '📈', title: 'Grow करा', desc: 'Users feedback घ्या, iterate करा' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GenAI Kids स्वतः एक AI startup आहे — तुम्ही आधीच एक founder आहात! 🚀' }
    ]},
    en: { title: 'Build AI Startup 💼', color: '#34d399', sections: [
      { type: 'intro', heading: '💼 How to Build an AI Startup?', text: "It's possible to start an AI startup at 18 today! OpenAI, Anthropic, Midjourney — all started with small teams. It's your turn!" },
      { type: 'example', heading: '🌟 Successful Young AI Founders', points: ['🚀 Sam Altman — OpenAI CEO (started at 28)', '💡 Alexandr Wang — Scale AI ($7.3B, started at 19)', '🎨 David Holz — Midjourney founder', '⚡ Vitalik Buterin — Ethereum (at 19)'] },
      { type: 'tools', heading: '🔧 AI Startup Tools!', tools: [{ name: 'OpenAI API', desc: 'Add AI features', link: 'platform.openai.com', emoji: '🤖' }, { name: 'Vercel', desc: 'Free deployment', link: 'vercel.com', emoji: '🚀' }, { name: 'Stripe', desc: 'Payment integration', link: 'stripe.com', emoji: '💳' }] },
      { type: 'howworks', heading: '⚙️ AI Startup Steps', steps: [{ emoji: '💡', title: 'Find a Problem', desc: 'What problem will you solve?' }, { emoji: '🛠️', title: 'Build MVP', desc: 'Launch a simple product quickly' }, { emoji: '📈', title: 'Grow', desc: 'Get user feedback, iterate' }] },
      { type: 'funfact', heading: '🎉 Fun Fact!', text: 'GenAI Kids itself is an AI startup — you are already a founder! 🚀' }
    ]},
  },
}

const navText = {
  hi: { prev: '← पिछला', next: 'आगे →', quiz: '🧠 Quiz दो →', tutor: '🤖 AI Tutor →', back: '← वापस' },
  mr: { prev: '← मागील', next: 'पुढे →', quiz: '🧠 Quiz द्या →', tutor: '🤖 AI Tutor →', back: '← मागे जा' },
  en: { prev: '← Previous', next: 'Next →', quiz: '🧠 Take Quiz →', tutor: '🤖 AI Tutor →', back: '← Go Back' },
}

export default function LessonContentPage() {
  const { age, topic } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const [step, setStep] = useState(0)

  const lessonLang = lessonData[topic]?.[lang] || lessonData[topic]?.en
  const nav = navText[lang]

  if (!lessonLang) return (
    <div className="app" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
      <div style={{textAlign:'center', color:'white'}}>
        <div style={{fontSize:'4rem'}}>🚧</div>
        <h2>Coming Soon!</h2>
        <p style={{color:'#94a3b8', marginTop:'8px'}}>This lesson is under construction</p>
        <button className="back-btn" style={{marginTop:'20px'}} onClick={() => navigate(-1)}>{nav.back}</button>
      </div>
    </div>
  )

  const sections = lessonLang.sections
  const isLast = step === sections.length - 1

  const renderSection = (section) => {
    switch (section.type) {
      case 'intro':
        return (
          <div className="content-block intro-block">
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </div>
        )
      case 'example':
        return (
          <div className="content-block example-block">
            <h2>{section.heading}</h2>
            {section.points && (
              <ul className="points-list">
                {section.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            )}
            {section.code && (
              <pre className="code-block"><code>{section.code}</code></pre>
            )}
          </div>
        )
      case 'tools':
        return (
          <div className="content-block" style={{background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:'20px', padding:'32px'}}>
            <h2 style={{color:'#34d399', marginBottom:'20px'}}>{section.heading}</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              {section.tools.map((tool, i) => (
                <a key={i} href={`https://${tool.link}`} target="_blank" rel="noopener noreferrer"
                  style={{display:'flex', alignItems:'center', gap:'14px', padding:'14px 18px', background:'rgba(255,255,255,0.05)', borderRadius:'12px', border:'1px solid rgba(52,211,153,0.15)', textDecoration:'none', color:'white', transition:'all 0.3s'}}
                  onMouseOver={e => e.currentTarget.style.background='rgba(52,211,153,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
                >
                  <span style={{fontSize:'1.8rem'}}>{tool.emoji}</span>
                  <div>
                    <div style={{fontWeight:'700', color:'#34d399'}}>{tool.name}</div>
                    <div style={{fontSize:'0.85rem', color:'#94a3b8'}}>{tool.desc}</div>
                  </div>
                  <div style={{marginLeft:'auto', color:'#34d399', fontSize:'1.2rem'}}>→</div>
                </a>
              ))}
            </div>
          </div>
        )
      case 'howworks':
        return (
          <div className="content-block howworks-block">
            <h2>{section.heading}</h2>
            <div className="steps-row">
              {section.steps.map((s, i) => (
                <div key={i} className="step-card">
                  <div className="step-emoji">{s.emoji}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'funfact':
        return (
          <div className="content-block funfact-block">
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{nav.back}</button>
      </nav>

      <div className="content-container">
        <div className="lesson-header" style={{borderColor: lessonLang.color}}>
          <h1>{lessonLang.title}</h1>
          <div className="progress-dots">
            {sections.map((_, i) => (
              <div key={i} className="dot" style={{background: i <= step ? lessonLang.color : 'rgba(255,255,255,0.2)'}}></div>
            ))}
          </div>
          <p style={{color:'#94a3b8', fontSize:'0.85rem'}}>{step + 1} / {sections.length}</p>
        </div>

        <div className="section-content">
          {renderSection(sections[step])}
        </div>

        <div className="nav-btns">
          {step > 0 && (
            <button className="back-btn" onClick={() => setStep(s => s - 1)}>{nav.prev}</button>
          )}
          {!isLast ? (
            <button className="cta-btn" onClick={() => setStep(s => s + 1)} style={{marginLeft:'auto'}}>
              {nav.next}
            </button>
          ) : (
            <div style={{marginLeft:'auto', display:'flex', gap:'12px', flexWrap:'wrap'}}>
              <button className="cta-btn" onClick={() => navigate(`/quiz/${age}/${topic}`)} style={{background:'linear-gradient(135deg, #fbbf24, #f472b6)'}}>
                {nav.quiz}
              </button>
              <button className="cta-btn" onClick={() => navigate(`/tutor/${age}/${topic}`)} style={{background:'linear-gradient(135deg, #34d399, #38bdf8)'}}>
                {nav.tutor}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}