// Comprehensive Mathematics Question Bank for BrainQuest
// Categories:
// 1. number_series: Number sequences and progressions
// 2. missing_number: Missing values in patterns or grids
// 3. mental_math: Fast arithmetic (Addition, Subtraction, Multiplication, Division)
// 4. percentage: Percent calculation and reverse percentages
// 5. ratio: Ratios, proportions, and scaling
// 6. average: Mean calculations and weighted averages
// 7. profit_loss: Cost price, selling price, profit/loss percentage
// 8. time_work: Rates, work duration, worker efficiency
// 9. algebra: Linear equations and algebraic expressions
// 10. logic_math: Mathematical logic, clocks, and age puzzles
// 11. pattern_puzzles: Visual-numerical pattern deduction

export const mathsQuestions = [
  // --- EASY ---
  {
    id: "math_e1",
    type: "multiple_choice",
    category: "Number Series",
    difficulty: "Easy",
    question: "Find the next number in the series: 2, 4, 8, 16, ?",
    options: ["24", "30", "32", "64"],
    answer: "32",
    explanation: "Each number is multiplied by 2 (doubled). 16 × 2 = 32."
  },
  {
    id: "math_e2",
    type: "numeric",
    category: "Addition",
    difficulty: "Easy",
    question: "Calculate the sum: 47 + 38 = ?",
    answer: "85",
    explanation: "40 + 30 = 70, and 7 + 8 = 15. 70 + 15 = 85."
  },
  {
    id: "math_e3",
    type: "multiple_choice",
    category: "Percentage",
    difficulty: "Easy",
    question: "If 20% of a number is 40, what is the number?",
    options: ["160", "200", "240", "180"],
    answer: "200",
    explanation: "Let the number be x. 0.20 * x = 40 => x = 40 / 0.20 = 200."
  },
  {
    id: "math_e4",
    type: "multiple_choice",
    category: "Missing Number",
    difficulty: "Easy",
    question: "Fill in the missing number: 5, 10, 15, __, 25",
    options: ["18", "20", "22", "24"],
    answer: "20",
    explanation: "The sequence increases by adding 5 each time. 15 + 5 = 20."
  },
  {
    id: "math_e5",
    type: "numeric",
    category: "Multiplication",
    difficulty: "Easy",
    question: "What is 12 × 7?",
    answer: "84",
    explanation: "12 multiplied by 7 equals 84."
  },
  {
    id: "math_e6",
    type: "multiple_choice",
    category: "Average",
    difficulty: "Easy",
    question: "What is the average of 10, 20, and 30?",
    options: ["15", "20", "25", "30"],
    answer: "20",
    explanation: "Average = (10 + 20 + 30) / 3 = 60 / 3 = 20."
  },
  {
    id: "math_e7",
    type: "multiple_choice",
    category: "Ratio",
    difficulty: "Easy",
    question: "Simplify the ratio 18 : 24 to its lowest terms:",
    options: ["2 : 3", "3 : 4", "4 : 5", "3 : 5"],
    answer: "3 : 4",
    explanation: "Dividing both terms by their GCD (6): 18/6 = 3, 24/6 = 4. Result: 3 : 4."
  },
  {
    id: "math_e8",
    type: "numeric",
    category: "Subtraction",
    difficulty: "Easy",
    question: "Evaluate: 150 - 67 = ?",
    answer: "83",
    explanation: "150 - 60 = 90, 90 - 7 = 83."
  },
  {
    id: "math_e9",
    type: "multiple_choice",
    category: "Simple Algebra",
    difficulty: "Easy",
    question: "Solve for x: x + 14 = 39",
    options: ["25", "23", "27", "21"],
    answer: "25",
    explanation: "x = 39 - 14 = 25."
  },
  {
    id: "math_e10",
    type: "numeric",
    category: "Division",
    difficulty: "Easy",
    question: "What is 96 ÷ 8?",
    answer: "12",
    explanation: "96 divided by 8 is 12."
  },
  {
    id: "math_e11",
    type: "multiple_choice",
    category: "Logical Mathematical Puzzles",
    difficulty: "Easy",
    question: "How many sides does a regular heptagon have?",
    options: ["6", "7", "8", "9"],
    answer: "7",
    explanation: "A heptagon is a seven-sided polygon."
  },
  {
    id: "math_e12",
    type: "multiple_choice",
    category: "Pattern-based Puzzles",
    difficulty: "Easy",
    question: "Look at the pattern: 1, 4, 9, 16, 25, ? (Square numbers)",
    options: ["30", "36", "49", "32"],
    answer: "36",
    explanation: "The pattern is squares of consecutive integers: 1², 2², 3², 4², 5², 6² = 36."
  },

  // --- MEDIUM ---
  {
    id: "math_m1",
    type: "multiple_choice",
    category: "Profit & Loss",
    difficulty: "Medium",
    question: "An item purchased for $50 is sold for $65. What is the profit percentage?",
    options: ["25%", "30%", "15%", "35%"],
    answer: "30%",
    explanation: "Profit = $65 - $50 = $15. Profit % = (15 / 50) × 100 = 30%."
  },
  {
    id: "math_m2",
    type: "numeric",
    category: "Simple Algebra",
    difficulty: "Medium",
    question: "Solve for x: 3x + 7 = 31",
    answer: "8",
    explanation: "3x = 31 - 7 = 24 => x = 24 / 3 = 8."
  },
  {
    id: "math_m3",
    type: "multiple_choice",
    category: "Time & Work",
    difficulty: "Medium",
    question: "If 4 workers build a fence in 6 days, how many days will 8 workers take at the same pace?",
    options: ["2 days", "3 days", "4 days", "1.5 days"],
    answer: "3 days",
    explanation: "Total worker-days = 4 × 6 = 24. With 8 workers: 24 / 8 = 3 days."
  },
  {
    id: "math_m4",
    type: "multiple_choice",
    category: "Ratio",
    difficulty: "Medium",
    question: "The ratio of boys to girls is 4:5. If there are 20 boys, how many girls are there?",
    options: ["24", "25", "30", "28"],
    answer: "25",
    explanation: "4 parts = 20 => 1 part = 5. Girls = 5 parts × 5 = 25."
  },
  {
    id: "math_m5",
    type: "multiple_choice",
    category: "Number Series",
    difficulty: "Medium",
    question: "Identify the next number in the sequence: 3, 5, 9, 17, 33, ?",
    options: ["49", "65", "64", "57"],
    answer: "65",
    explanation: "The differences are 2, 4, 8, 16, 32. So next is 33 + 32 = 65."
  },
  {
    id: "math_m6",
    type: "numeric",
    category: "Percentage",
    difficulty: "Medium",
    question: "What is 35% of 240?",
    answer: "84",
    explanation: "0.35 × 240 = (35 × 24) / 10 = 840 / 10 = 84."
  },
  {
    id: "math_m7",
    type: "multiple_choice",
    category: "Average",
    difficulty: "Medium",
    question: "The average of 5 numbers is 24. If one number is removed, the average becomes 22. What was the removed number?",
    options: ["28", "30", "32", "34"],
    answer: "32",
    explanation: "Initial sum = 5 × 24 = 120. New sum = 4 × 22 = 88. Removed number = 120 - 88 = 32."
  },
  {
    id: "math_m8",
    type: "multiple_choice",
    category: "Logical Mathematical Puzzles",
    difficulty: "Medium",
    question: "A grandfather, two fathers and two sons went to the cinema. What is the minimum number of tickets they needed?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    explanation: "The group consists of grandfather, father, and son (3 people). The father is both a son and a father."
  },
  {
    id: "math_m9",
    type: "numeric",
    category: "Missing Number",
    difficulty: "Medium",
    question: "Find the missing number in the triangle relation: [Top: 6, Left: 4, Right: 5 => Center: 120]. If Top: 3, Left: 7, Right: 4 => Center: ?",
    answer: "84",
    explanation: "Center is the product of all three outer vertices: 3 × 7 × 4 = 84."
  },
  {
    id: "math_m10",
    type: "multiple_choice",
    category: "Pattern-based Puzzles",
    difficulty: "Medium",
    question: "Which number completes the pattern? (2, 3 -> 13), (3, 4 -> 25), (4, 5 -> 41), (5, 6 -> ?)",
    options: ["55", "60", "61", "72"],
    answer: "61",
    explanation: "Pattern is a² + b²: 5² + 6² = 25 + 36 = 61."
  },

  // --- HARD ---
  {
    id: "math_h1",
    type: "multiple_choice",
    category: "Profit & Loss",
    difficulty: "Hard",
    question: "A merchant marks his goods 40% above cost price and allows a discount of 15%. What is his actual profit percentage?",
    options: ["19%", "25%", "22%", "20%"],
    answer: "19%",
    explanation: "Let CP = 100. Marked Price = 140. Selling Price = 140 × 0.85 = 119. Profit = 119 - 100 = 19%."
  },
  {
    id: "math_h2",
    type: "multiple_choice",
    category: "Time & Work",
    difficulty: "Hard",
    question: "Pipe A fills a tank in 6 hours, while Pipe B empties it in 9 hours. If both are opened together, how long will it take to fill the tank?",
    options: ["15 hours", "18 hours", "12 hours", "16 hours"],
    answer: "18 hours",
    explanation: "Net rate = (1/6) - (1/9) = (3 - 2)/18 = 1/18 per hour. Thus it takes 18 hours."
  },
  {
    id: "math_h3",
    type: "numeric",
    category: "Simple Algebra",
    difficulty: "Hard",
    question: "Solve for y: 4(y - 3) + 2 = 2(y + 7). What is y?",
    answer: "12",
    explanation: "4y - 12 + 2 = 2y + 14 => 4y - 10 = 2y + 14 => 2y = 24 => y = 12."
  },
  {
    id: "math_h4",
    type: "multiple_choice",
    category: "Number Series",
    difficulty: "Hard",
    question: "Find the next term: 7, 13, 25, 49, 97, ?",
    options: ["189", "193", "195", "197"],
    answer: "193",
    explanation: "Pattern: ×2 - 1. (7×2 - 1 = 13, 13×2 - 1 = 25, 25×2 - 1 = 49, 49×2 - 1 = 97, 97×2 - 1 = 193)."
  },
  {
    id: "math_h5",
    type: "multiple_choice",
    category: "Logical Mathematical Puzzles",
    difficulty: "Hard",
    question: "At 3:15, what is the acute angle between the hour hand and the minute hand of a clock?",
    options: ["0°", "7.5°", "12°", "15°"],
    answer: "7.5°",
    explanation: "Minute hand is at 90°. Hour hand is at 3 × 30° + 15 × 0.5° = 90° + 7.5° = 97.5°. Angle = 97.5° - 90° = 7.5°."
  },
  {
    id: "math_h6",
    type: "multiple_choice",
    category: "Percentage",
    difficulty: "Hard",
    question: "The price of sugar increases by 25%. By what percentage must a family reduce consumption to keep expenditure constant?",
    options: ["20%", "25%", "18%", "15%"],
    answer: "20%",
    explanation: "Reduction % = [r / (100 + r)] × 100 = [25 / 125] × 100 = 1/5 × 100 = 20%."
  },
  {
    id: "math_h7",
    type: "numeric",
    category: "Ratio",
    difficulty: "Hard",
    question: "Two numbers are in the ratio 5:7. If their sum is 144, find the smaller number.",
    answer: "60",
    explanation: "5 + 7 = 12 parts = 144 => 1 part = 12. Smaller number = 5 × 12 = 60."
  },
  {
    id: "math_h8",
    type: "multiple_choice",
    category: "Pattern-based Puzzles",
    difficulty: "Hard",
    question: "Find the missing number in the grid series: [1, 8, 27], [64, 125, 216], [343, 512, ?]",
    options: ["648", "729", "800", "1000"],
    answer: "729",
    explanation: "These are consecutive cubes: 1³, 2³, 3³, ..., 9³ = 729."
  },
  {
    id: "math_h9",
    type: "multiple_choice",
    category: "Average",
    difficulty: "Hard",
    question: "A cyclist travels uphill 12 km at 4 km/h and downhill the same distance at 12 km/h. What is his average speed for the whole round trip?",
    options: ["8 km/h", "6 km/h", "7.5 km/h", "9 km/h"],
    answer: "6 km/h",
    explanation: "Total distance = 24 km. Total time = (12/4) + (12/12) = 3 + 1 = 4 hours. Average speed = 24 / 4 = 6 km/h (harmonic mean formula: 2xy/(x+y))."
  },
  {
    id: "math_h10",
    type: "numeric",
    category: "Missing Number",
    difficulty: "Hard",
    question: "In a magic square row: [17, x, 13] where the magic sum of the 3x3 square is 45, what is x?",
    answer: "15",
    explanation: "Sum = 17 + x + 13 = 30 + x = 45 => x = 15."
  },

  // --- EXPERT ---
  {
    id: "math_x1",
    type: "multiple_choice",
    category: "Simple Algebra",
    difficulty: "Expert",
    question: "If x + (1/x) = 4, find the value of x² + (1/x²):",
    options: ["14", "16", "18", "12"],
    answer: "14",
    explanation: "Squaring both sides: (x + 1/x)² = 4² => x² + 2 + 1/x² = 16 => x² + 1/x² = 16 - 2 = 14."
  },
  {
    id: "math_x2",
    type: "multiple_choice",
    category: "Time & Work",
    difficulty: "Expert",
    question: "A can do a piece of work in 10 days, and B in 15 days. They work together for 3 days, then A leaves. How many more days will B take to complete the remaining work?",
    options: ["6 days", "7.5 days", "8 days", "9 days"],
    answer: "7.5 days",
    explanation: "Combined rate = 1/10 + 1/15 = 5/30 = 1/6 per day. In 3 days they complete 3/6 = 1/2 of the work. Remaining = 1/2. Time for B = (1/2) / (1/15) = 15/2 = 7.5 days."
  },
  {
    id: "math_x3",
    type: "numeric",
    category: "Number Series",
    difficulty: "Expert",
    question: "Fibonacci prime sequence: 2, 3, 5, 13, 89, ... What is the 6th Fibonacci prime number (the next Fibonacci number that is prime after 89)?",
    answer: "233",
    explanation: "The Fibonacci sequence is 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233. 233 is a prime number."
  },
  {
    id: "math_x4",
    type: "multiple_choice",
    category: "Profit & Loss",
    difficulty: "Expert",
    question: "A shopkeeper sells two wristwatches for $990 each. On one he gains 10% and on the other he loses 10%. What is his overall gain or loss percentage?",
    options: ["No gain no loss", "1% Loss", "1% Gain", "2% Loss"],
    answer: "1% Loss",
    explanation: "When two items are sold at the same price, one at x% gain and one at x% loss, there is always an overall loss of (x/10)²% = (10/10)² = 1% Loss."
  },
  {
    id: "math_x5",
    type: "multiple_choice",
    category: "Logical Mathematical Puzzles",
    difficulty: "Expert",
    question: "A train 150 meters long crosses a bridge 250 meters long in 20 seconds. What is the speed of the train in km/h?",
    options: ["60 km/h", "72 km/h", "80 km/h", "90 km/h"],
    answer: "72 km/h",
    explanation: "Total distance = 150 + 250 = 400 m. Speed in m/s = 400 / 20 = 20 m/s. Convert to km/h: 20 × (18/5) = 72 km/h."
  },
  {
    id: "math_x6",
    type: "numeric",
    category: "Pattern-based Puzzles",
    difficulty: "Expert",
    question: "Evaluate: 1 + 2 + 3 + ... + 100 = ?",
    answer: "5050",
    explanation: "Sum of first n natural numbers = n(n + 1)/2 = 100(101)/2 = 5050."
  },
  {
    id: "math_x7",
    type: "multiple_choice",
    category: "Ratio",
    difficulty: "Expert",
    question: "A mixture of 60 liters contains milk and water in the ratio 2:1. How much water must be added so the ratio becomes 1:2?",
    options: ["40 liters", "60 liters", "50 liters", "30 liters"],
    answer: "60 liters",
    explanation: "Currently, Milk = 40 L, Water = 20 L. For ratio to become 1:2 (Milk:Water = 40:80), water needed is 80 - 20 = 60 liters."
  },
  {
    id: "math_x8",
    type: "multiple_choice",
    category: "Logical Mathematical Puzzles",
    difficulty: "Expert",
    question: "How many zeroes are at the end of the product of 25! (25 factorial)?",
    options: ["4", "5", "6", "7"],
    answer: "6",
    explanation: "Number of factors of 5 in 25! = floor(25/5) + floor(25/25) = 5 + 1 = 6 trailing zeroes."
  },
  {
    id: "math_x9",
    type: "numeric",
    category: "Percentage",
    difficulty: "Expert",
    question: "In an exam, 85% of candidates passed in English, 80% passed in Mathematics, and 75% passed in both. If 40 candidates failed in both, how many candidates sat for the exam?",
    answer: "400",
    explanation: "Passed in at least one = 85 + 80 - 75 = 90%. Failed in both = 100 - 90 = 10%. If 10% = 40, total candidates = 40 / 0.10 = 400."
  },
  {
    id: "math_x10",
    type: "multiple_choice",
    category: "Missing Number",
    difficulty: "Expert",
    question: "If (1#3 = 10), (2#4 = 20), (3#5 = 34), then what is 4#6?",
    options: ["48", "50", "52", "54"],
    answer: "52",
    explanation: "Pattern: a² + b² = 1² + 3² = 10; 2² + 4² = 20; 3² + 5² = 34; so 4² + 6² = 16 + 36 = 52."
  }
];
