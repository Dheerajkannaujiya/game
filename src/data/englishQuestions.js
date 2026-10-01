// Comprehensive English Question Bank for BrainQuest
// Categories:
// 1. unscramble: Unscramble the letters to form the correct word
// 2. fill_blank: Fill in the missing word/phrase
// 3. synonyms: Identify the closest synonym
// 4. antonyms: Identify the opposite meaning
// 5. spelling: Identify correct spelling / spot typo
// 6. grammar: Grammar rules, tenses, subject-verb agreement
// 7. correct_sentence: Choose the grammatically sound sentence
// 8. word_arrange: Arrange scrambled words into a coherent sentence
// 9. vocabulary: Word meanings and contextual usage
// 10. odd_one_out: Spot the word that does not belong
// 11. complete_sentence: Idioms, collocations, and contextual endings

export const englishQuestions = [
  // --- EASY ---
  {
    id: "eng_e1",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Easy",
    question: "Arrange the scrambled letters to form a common fruit:",
    scrambled: "A P P L E",
    answer: "APPLE",
    hint: "Keeps the doctor away!",
    explanation: "The letters A-P-P-L-E spell 'APPLE'."
  },
  {
    id: "eng_e2",
    type: "multiple_choice",
    category: "Choose the Correct Sentence",
    difficulty: "Easy",
    question: "Choose the correct sentence:",
    options: [
      "He go to school.",
      "He goes to school.",
      "He going to school.",
      "He gone to school."
    ],
    answer: "He goes to school.",
    explanation: "In present simple tense, third-person singular subjects (he, she, it) take 'goes'."
  },
  {
    id: "eng_e3",
    type: "multiple_choice",
    category: "Synonyms",
    difficulty: "Easy",
    question: "What is a synonym for 'HAPPY'?",
    options: ["Joyful", "Melancholy", "Weary", "Anxious"],
    answer: "Joyful",
    explanation: "'Joyful' means feeling or expressing great happiness."
  },
  {
    id: "eng_e4",
    type: "multiple_choice",
    category: "Antonyms",
    difficulty: "Easy",
    question: "What is the opposite of 'ANCIENT'?",
    options: ["Modern", "Antique", "Historic", "Aged"],
    answer: "Modern",
    explanation: "'Modern' refers to the present or recent times, opposite to 'ancient'."
  },
  {
    id: "eng_e5",
    type: "multiple_choice",
    category: "Correct Spelling",
    difficulty: "Easy",
    question: "Which of the following is spelled correctly?",
    options: ["Definately", "Definitely", "Defanitely", "Definetly"],
    answer: "Definitely",
    explanation: "The standard correct spelling is 'Definitely' (has an 'i' in the middle)."
  },
  {
    id: "eng_e6",
    type: "fill_blank",
    category: "Fill in the Blank",
    difficulty: "Easy",
    question: "The cat jumped ______ the kitchen table.",
    options: ["onto", "in", "with", "between"],
    answer: "onto",
    explanation: "'Onto' expresses movement toward the upper surface of something."
  },
  {
    id: "eng_e7",
    type: "word_arrange",
    category: "Arrange Words to Form a Sentence",
    difficulty: "Easy",
    question: "Arrange these words into a meaningful sentence:",
    words: ["sun", "in", "rises", "the", "The", "east."],
    answer: "The sun rises in the east.",
    explanation: "The natural grammatical sentence is 'The sun rises in the east.'"
  },
  {
    id: "eng_e8",
    type: "odd_one_out",
    category: "Odd One Out",
    difficulty: "Easy",
    question: "Which word does NOT belong with the others?",
    options: ["Guitar", "Violin", "Cello", "Flute"],
    answer: "Flute",
    explanation: "Flute is a wind instrument, while Guitar, Violin, and Cello are string instruments."
  },
  {
    id: "eng_e9",
    type: "multiple_choice",
    category: "Grammar Correction",
    difficulty: "Easy",
    question: "Identify the pronoun in this sentence: 'Sarah gave him a book.'",
    options: ["Sarah", "gave", "him", "book"],
    answer: "him",
    explanation: "'Him' is an objective personal pronoun referring to a male person."
  },
  {
    id: "eng_e10",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Easy",
    question: "Arrange the letters to spell a beloved planetary home:",
    scrambled: "E A R T H",
    answer: "EARTH",
    hint: "Our home planet",
    explanation: "E-A-R-T-H spells 'EARTH'."
  },
  {
    id: "eng_e11",
    type: "multiple_choice",
    category: "Complete the Sentence",
    difficulty: "Easy",
    question: "An apple a day keeps the ______ away.",
    options: ["doctor", "teacher", "baker", "dentist"],
    answer: "doctor",
    explanation: "The well-known English proverb is: 'An apple a day keeps the doctor away.'"
  },
  {
    id: "eng_e12",
    type: "multiple_choice",
    category: "Vocabulary",
    difficulty: "Easy",
    question: "What does the word 'ENORMOUS' mean?",
    options: ["Very large", "Very small", "Very loud", "Very quick"],
    answer: "Very large",
    explanation: "'Enormous' means extremely large in size, quantity, or extent."
  },

  // --- MEDIUM ---
  {
    id: "eng_m1",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Medium",
    question: "Unscramble the letters to form a word meaning brave:",
    scrambled: "C O U R A G E",
    answer: "COURAGE",
    hint: "Mental or moral strength to venture and persevere",
    explanation: "C-O-U-R-A-G-E spells 'COURAGE'."
  },
  {
    id: "eng_m2",
    type: "multiple_choice",
    category: "Choose the Correct Sentence",
    difficulty: "Medium",
    question: "Which sentence uses the apostrophe correctly?",
    options: [
      "The dog chased it's tail in the yard.",
      "The dog chased its tail in the yard.",
      "The dogs chased it's tail.",
      "The dog's chased its tail's."
    ],
    answer: "The dog chased its tail in the yard.",
    explanation: "'Its' is the possessive pronoun; 'it's' is a contraction of 'it is' or 'it has'."
  },
  {
    id: "eng_m3",
    type: "multiple_choice",
    category: "Synonyms",
    difficulty: "Medium",
    question: "Select the closest synonym for 'CANDID':",
    options: ["Frank", "Deceptive", "Secretive", "Shy"],
    answer: "Frank",
    explanation: "'Candid' means truthful, straightforward, and frank."
  },
  {
    id: "eng_m4",
    type: "multiple_choice",
    category: "Antonyms",
    difficulty: "Medium",
    question: "What is the antonym of 'METICULOUS'?",
    options: ["Careless", "Thorough", "Detailed", "Scrupulous"],
    answer: "Careless",
    explanation: "'Meticulous' means showing great attention to detail; its opposite is 'careless'."
  },
  {
    id: "eng_m5",
    type: "multiple_choice",
    category: "Correct Spelling",
    difficulty: "Medium",
    question: "Which of the following is spelled correctly?",
    options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
    answer: "Accommodate",
    explanation: "'Accommodate' has two 'c's and two 'm's."
  },
  {
    id: "eng_m6",
    type: "fill_blank",
    category: "Fill in the Blank",
    difficulty: "Medium",
    question: "Neither of the boys ______ present at the assembly yesterday.",
    options: ["was", "were", "are", "have been"],
    answer: "was",
    explanation: "'Neither' is singular and takes a singular past verb 'was'."
  },
  {
    id: "eng_m7",
    type: "word_arrange",
    category: "Arrange Words to Form a Sentence",
    difficulty: "Medium",
    question: "Arrange the words into a proverb:",
    words: ["actions", "louder", "speak", "than", "words."],
    answer: "actions speak louder than words.",
    explanation: "'Actions speak louder than words' is the famous English idiom."
  },
  {
    id: "eng_m8",
    type: "odd_one_out",
    category: "Odd One Out",
    difficulty: "Medium",
    question: "Pick the odd one out based on meaning:",
    options: ["Generous", "Benevolent", "Altruistic", "Miserly"],
    answer: "Miserly",
    explanation: "Miserly means stingy/hoarding, whereas the others mean kind and giving."
  },
  {
    id: "eng_m9",
    type: "multiple_choice",
    category: "Grammar Correction",
    difficulty: "Medium",
    question: "Select the sentence with correct subjunctive mood:",
    options: [
      "If I was you, I would study harder.",
      "If I were you, I would study harder.",
      "If I am you, I will study harder.",
      "If I be you, I would study harder."
    ],
    answer: "If I were you, I would study harder.",
    explanation: "Hypothetical condition contrary to fact requires subjunctive 'were': 'If I were you'."
  },
  {
    id: "eng_m10",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Medium",
    question: "Unscramble the letters to form a word meaning knowledge:",
    scrambled: "W I S D O M",
    answer: "WISDOM",
    hint: "Ability to make sensible decisions based on experience",
    explanation: "W-I-S-D-O-M spells 'WISDOM'."
  },
  {
    id: "eng_m11",
    type: "multiple_choice",
    category: "Complete the Sentence",
    difficulty: "Medium",
    question: "She decided to bite the ______ and face the consequences.",
    options: ["bullet", "apple", "dust", "coin"],
    answer: "bullet",
    explanation: "'Bite the bullet' is an idiom meaning to face a difficult situation with courage."
  },
  {
    id: "eng_m12",
    type: "multiple_choice",
    category: "Vocabulary",
    difficulty: "Medium",
    question: "What does 'EPHEMERAL' mean?",
    options: ["Lasting a very short time", "Eternal", "Heavy and solid", "Frightening"],
    answer: "Lasting a very short time",
    explanation: "'Ephemeral' describes something that is transitory or short-lived."
  },

  // --- HARD ---
  {
    id: "eng_h1",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Hard",
    question: "Unscramble this word describing endless patience or steadfastness:",
    scrambled: "P E R S E V E R A N C E",
    answer: "PERSEVERANCE",
    hint: "Persistence in doing something despite difficulty",
    explanation: "P-E-R-S-E-V-E-R-A-N-C-E spells 'PERSEVERANCE'."
  },
  {
    id: "eng_h2",
    type: "multiple_choice",
    category: "Choose the Correct Sentence",
    difficulty: "Hard",
    question: "Which sentence avoids a dangling modifier?",
    options: [
      "Walking down the street, the trees swayed in the breeze.",
      "Walking down the street, she noticed the trees swaying in the breeze.",
      "Having finished the test, the bell rang loudly.",
      "To improve his grades, the textbook was read daily."
    ],
    answer: "Walking down the street, she noticed the trees swaying in the breeze.",
    explanation: "In option B, 'she' is the logical subject performing the action 'Walking down the street'."
  },
  {
    id: "eng_h3",
    type: "multiple_choice",
    category: "Synonyms",
    difficulty: "Hard",
    question: "What is the closest synonym for 'UBIQUITOUS'?",
    options: ["Omnipresent", "Scarce", "Peculiar", "Transient"],
    answer: "Omnipresent",
    explanation: "'Ubiquitous' means present, appearing, or found everywhere; synonymous with 'omnipresent'."
  },
  {
    id: "eng_h4",
    type: "multiple_choice",
    category: "Antonyms",
    difficulty: "Hard",
    question: "What is the antonym of 'LOQUACIOUS'?",
    options: ["Taciturn", "Talkative", "Eloquent", "Voluble"],
    answer: "Taciturn",
    explanation: "'Loquacious' means tending to talk a great deal; 'taciturn' means reserved or uncommunicative in speech."
  },
  {
    id: "eng_h5",
    type: "multiple_choice",
    category: "Correct Spelling",
    difficulty: "Hard",
    question: "Identify the correctly spelled word:",
    options: ["Conscientious", "Conscensious", "Consciensious", "Conscientous"],
    answer: "Conscientious",
    explanation: "'Conscientious' is spelled C-O-N-S-C-I-E-N-T-I-O-U-S."
  },
  {
    id: "eng_h6",
    type: "fill_blank",
    category: "Fill in the Blank",
    difficulty: "Hard",
    question: "The scientist's theory was so ______ that few colleagues could comprehend its nuances.",
    options: ["esoteric", "mundane", "pellucid", "conspicuous"],
    answer: "esoteric",
    explanation: "'Esoteric' means intended for or likely to be understood by only a small number of people with specialized knowledge."
  },
  {
    id: "eng_h7",
    type: "word_arrange",
    category: "Arrange Words to Form a Sentence",
    difficulty: "Hard",
    question: "Reconstruct this famous philosophical proverb:",
    words: ["is", "the", "Patience", "companion", "of", "wisdom."],
    answer: "Patience is the companion of wisdom.",
    explanation: "Quote by Saint Augustine: 'Patience is the companion of wisdom.'"
  },
  {
    id: "eng_h8",
    type: "odd_one_out",
    category: "Odd One Out",
    difficulty: "Hard",
    question: "Find the odd word out based on tonal nuance:",
    options: ["Sycophant", "Toady", "Flatterer", "Iconoclast"],
    answer: "Iconoclast",
    explanation: "An iconoclast attacks cherished beliefs or institutions, while the other three are servile flatterers."
  },
  {
    id: "eng_h9",
    type: "multiple_choice",
    category: "Grammar Correction",
    difficulty: "Hard",
    question: "Select the sentence with correct parallel structure:",
    options: [
      "She likes hiking, swimming, and to ride horses.",
      "She likes hiking, swimming, and riding horses.",
      "She likes to hike, swimming, and to ride horses.",
      "She likes hiking, to swim, and riding horses."
    ],
    answer: "She likes hiking, swimming, and riding horses.",
    explanation: "Parallel construction requires matching gerund forms: 'hiking, swimming, and riding'."
  },
  {
    id: "eng_h10",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Hard",
    question: "Unscramble this word meaning peace or tranquility:",
    scrambled: "S E R E N I T Y",
    answer: "SERENITY",
    hint: "State of being calm, peaceful, and untroubled",
    explanation: "S-E-R-E-N-I-T-Y spells 'SERENITY'."
  },

  // --- EXPERT ---
  {
    id: "eng_x1",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Expert",
    question: "Unscramble this word for finding something good without looking for it:",
    scrambled: "S E R E N D I P I T Y",
    answer: "SERENDIPITY",
    hint: "Fortunate happenstance or pleasant surprise",
    explanation: "S-E-R-E-N-D-I-P-I-T-Y spells 'SERENDIPITY'."
  },
  {
    id: "eng_x2",
    type: "multiple_choice",
    category: "Vocabulary",
    difficulty: "Expert",
    question: "What does 'SESQUIPEDALIAN' mean?",
    options: [
      "Given to using long and polysyllabic words",
      "Pertaining to a six-legged creature",
      "Occurring every one and a half centuries",
      "Lacking symmetry or balance"
    ],
    answer: "Given to using long and polysyllabic words",
    explanation: "'Sesquipedalian' literally means 'a foot and a half long' and describes using lengthy, complex words."
  },
  {
    id: "eng_x3",
    type: "multiple_choice",
    category: "Synonyms",
    difficulty: "Expert",
    question: "Which word is synonymous with 'PUSILLANIMOUS'?",
    options: ["Cowardly", "Brave", "Generous", "Deceitful"],
    answer: "Cowardly",
    explanation: "'Pusillanimous' means showing a lack of courage or determination; timid or cowardly."
  },
  {
    id: "eng_x4",
    type: "multiple_choice",
    category: "Antonyms",
    difficulty: "Expert",
    question: "What is the antonym of 'ENERVATE'?",
    options: ["Invigorate", "Weaken", "Devitalize", "Exhaust"],
    answer: "Invigorate",
    explanation: "'Enervate' means to cause someone to feel drained of energy; 'invigorate' means to give strength or energy."
  },
  {
    id: "eng_x5",
    type: "multiple_choice",
    category: "Correct Spelling",
    difficulty: "Expert",
    question: "Select the impeccable spelling of this medicinal pain reliever:",
    options: ["Paracetamol", "Paracetemol", "Paracetomol", "Parasetamol"],
    answer: "Paracetamol",
    explanation: "The correct international non-proprietary name is 'Paracetamol'."
  },
  {
    id: "eng_x6",
    type: "fill_blank",
    category: "Fill in the Blank",
    difficulty: "Expert",
    question: "His ______ defense dismantled the prosecution's flimsy narrative point by point.",
    options: ["trenchant", "obtuse", "vacuous", "specious"],
    answer: "trenchant",
    explanation: "'Trenchant' means vigorous or incisive in expression or style."
  },
  {
    id: "eng_x7",
    type: "word_arrange",
    category: "Arrange Words to Form a Sentence",
    difficulty: "Expert",
    question: "Arrange the words into this renowned literary observation:",
    words: ["Brevity", "is", "soul", "the", "wit.", "of"],
    answer: "Brevity is the soul of wit.",
    explanation: "From Shakespeare's Hamlet: 'Brevity is the soul of wit.'"
  },
  {
    id: "eng_x8",
    type: "odd_one_out",
    category: "Odd One Out",
    difficulty: "Expert",
    question: "Which literary trope or figure of speech is the odd one out?",
    options: ["Oxymoron", "Hyperbole", "Metaphor", "Alliteration"],
    answer: "Alliteration",
    explanation: "Alliteration is a phonological sound device (repetition of consonant sounds), whereas Oxymoron, Hyperbole, and Metaphor are semantic tropes."
  },
  {
    id: "eng_x9",
    type: "multiple_choice",
    category: "Grammar Correction",
    difficulty: "Expert",
    question: "Identify the grammatical case of 'whom' in: 'Whom did you invite to the symposium?'",
    options: ["Objective (accusative)", "Nominative", "Possessive (genitive)", "Dative only"],
    answer: "Objective (accusative)",
    explanation: "'Whom' acts as the direct object of the transitive verb 'did invite'."
  },
  {
    id: "eng_x10",
    type: "unscramble",
    category: "Unscramble the Word",
    difficulty: "Expert",
    question: "Unscramble this word for deceptive speech or intentional ambiguity:",
    scrambled: "E Q U I V O C A T I O N",
    answer: "EQUIVOCATION",
    hint: "The use of ambiguous language to conceal the truth",
    explanation: "E-Q-U-I-V-O-C-A-T-I-O-N spells 'EQUIVOCATION'."
  }
];
