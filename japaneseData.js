// japaneseData.js

const textbookData = [
    {
        chapter: "Minna no Nihongo I - Lesson 1",
        grammar: [
            {
                grammarPoint: "Noun 1 は Noun 2 です",
                exampleSentence: "わたし は マイク ミラー です。\nI am Mike Miller.",
                explanation: "This is the basic sentence structure in Japanese, equivalent to 'X is Y'.\nは (pronounced 'wa') is the topic particle, indicating what the sentence is about.\nです (desu) is a polite copula, similar to 'is', 'am', 'are'."
            },
            {
                grammarPoint: "Noun 1 は Noun 2 じゃありません (では ありません)",
                exampleSentence: "わたし は エンジニア じゃありません。\nI am not an engineer.",
                explanation: "This is the negative form of です, meaning 'X is not Y'.\nじゃありません (ja arimasen) is the common negative form, often used in conversation.\nでは ありません (dewa arimasen) is a more formal negative form."
            },
            {
                grammarPoint: "Noun 1 は Noun 2 ですか",
                exampleSentence: "ミラー さん は がくせい です か。\nIs Mr./Ms. Miller a student?",
                explanation: "Adding か (ka) to the end of a です sentence turns it into a question.\nNo change in word order is needed."
            },
            {
                grammarPoint: "Noun 1 も Noun 2 です",
                exampleSentence: "マイク ミラー さん は かいしゃいん です。\nグプタ さん も かいしゃいん です。\nMike Miller is a company employee.\nMr./Ms. Gupta is also a company employee.",
                explanation: "も (mo) is a particle that replaces は when the item it follows is also the same as the topic of the previous sentence.\nIt means 'also' or 'too'."
            }
            // Add more grammar points for Lesson 1 here
        ]
    },
    {
        chapter: "Minna no Nihongo I - Lesson 2",
        grammar: [
            {
                grammarPoint: "これ/それ/あれ は Noun です",
                exampleSentence: "これ は じしょ です。\nThis is a dictionary.",
                explanation: "これ (kore): 'this one' (near the speaker).\nそれ (sore): 'that one' (near the listener).\nあれ (are): 'that one over there' (far from both speaker and listener).\nThese are demonstrative pronouns used for objects."
            },
            {
                grammarPoint: "この/その/あの Noun は ~ です",
                exampleSentence: "この ほん は わたし の です。\nThis book is mine.",
                explanation: "この (kono): 'this...' (followed by a noun, near the speaker).\nその (sono): 'that...' (followed by a noun, near the listener).\nあの (ano): 'that... over there' (followed by a noun, far from both).\nThese are demonstrative adjectives that modify a noun."
            },
            {
                 grammarPoint: "そうです / そうじゃありません",
                 exampleSentence: "A: それ は テレホン カード ですか。\nB: はい、そうです。\nA: Is that a telephone card?\nB: Yes, it is.",
                 explanation: "そうです (sou desu): 'That is right.' / 'Yes, it is.'\nそうじゃありません (sou ja arimasen): 'That is not right.' / 'No, it is not.'\nUsed to affirm or deny the content of the preceding statement/question."
            },
            {
                grammarPoint: "Noun 1 ですか、 Noun 2 ですか",
                exampleSentence: "それは きゅばんですか、たばこですか。\nIs that a stamp or a cigarette?",
                explanation: "Used to ask a question with two options.\nThe structure is 'Option 1 ですか、 Option 2 ですか'."
            },
            {
                grammarPoint: "Noun 1 の Noun 2",
                exampleSentence: "ミラー さん は IMC の しゃいん です。\nMr. Miller is an employee of IMC.",
                explanation: "の (no) is a particle used to connect nouns.\nNoun 1 modifies Noun 2, indicating possession, belonging, material, etc.\nIn the structure Noun 1 の Noun 2, Noun 2 is the main noun, and Noun 1 describes it (e.g., 'company's employee', 'Japan's car', 'made of paper book')."
            }
            // Add more grammar points for Lesson 2 here
        ]
    },
     {
        chapter: "Minna no Nihongo I - Lesson 3",
        grammar: [
            {
                grammarPoint: "ここ/そこ/あそこ は Noun です (場所)",
                exampleSentence: "じむしょ は ここ です。\nThe office is here.",
                explanation: "ここ (koko): 'here' (place near the speaker).\nそこ (soko): 'there' (place near the listener).\nあそこ (asoko): 'over there' (place far from both speaker and listener).\nThese are demonstrative pronouns for places."
            },
            {
                grammarPoint: "どこ は Noun です (場所)",
                exampleSentence: "うけつけ は どこ ですか。\nWhere is the reception desk?",
                explanation: "どこ (doko) is the interrogative pronoun for asking about a place, meaning 'where?'."
            },
             {
                 grammarPoint: "だれ の Noun",
                 exampleSentence: "この かさ は だれ の ですか。\nWhose umbrella is this?",
                 explanation: "だれ (dare) means 'who'. Adding の (no) makes it 'whose'.\nCan be followed by ですか or a noun (だれ の かさ)."
             },
              {
                grammarPoint: "ここ/そこ/あそこ/どこ + Particle",
                exampleSentence: "トイレ は あそこ です。\nThe toilet is over there.\nおくに は どちら ですか。\nWhich country are you from? (polite)",
                explanation: "These location words can also be used with particles like に, へ, から, まで depending on the context of movement or origin."
            },
             {
                grammarPoint: "こちら/そちら/あちら/どちら",
                exampleSentence: "ミラー さん は こちら です。\nMr. Miller is this way (here).",
                explanation: "These are polite versions of ここ/そこ/あそこ/どこ.\nこちら (kochira), そちら (sochira), あちら (achira), どちら (dochira).\nCan also mean 'this person', 'that person', 'that person over there', 'who' (polite) or 'this way', 'that way'."
            }
            // Add more grammar points for Lesson 3 here
        ]
    },
    // Add more chapters following the same structure
];