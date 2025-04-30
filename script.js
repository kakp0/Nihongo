// script.js

// textbookData is loaded from japaneseData.js

// --- HTML Element References ---
const chapterNameSpan = document.getElementById('chapter-name');
const grammarPointTextSpan = document.getElementById('grammar-point-text');
const exampleSentencePre = document.getElementById('example-sentence');
const explanationTextParagraph = document.getElementById('explanation-text');

// Added references for the hint sections and button
const exampleSectionDiv = document.getElementById('example-section');
const explanationSectionDiv = document.getElementById('explanation-section');
const showHintButton = document.getElementById('show-hint-button');


const userSentenceTextArea = document.getElementById('user-sentence');
const sendButton = document.getElementById('send-button');
const nextButton = document.getElementById('next-button');
const feedbackTextParagraph = document.getElementById('feedback-text');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeModalButton = document.querySelector('.close-button');
const chapterSettingsDiv = document.getElementById('chapter-settings');
const grammarSettingsDiv = document.getElementById('grammar-settings');
const saveSettingsButton = document.getElementById('save-settings-button');

// --- State Variables ---
let currentGrammarPointObject = null; // Stores the full grammar point object
let currentChapter = null; // Stores the chapter name string
let selectedChapters = []; // Stores names of selected chapters
// selectedGrammarPoints will store an object mapping chapter names to arrays of selected grammar point *strings*
let selectedGrammarPointStrings = {};


// --- Functions ---

// Load settings from localStorage
function loadSettings() {
    const savedChapters = localStorage.getItem('selectedChapters');
    const savedGrammarPoints = localStorage.getItem('selectedGrammarPoints'); // These are the strings

    if (savedChapters) {
        selectedChapters = JSON.parse(savedChapters);
    } else {
        // Default: Select all chapters if no settings saved
        selectedChapters = textbookData.map(chapter => chapter.chapter);
    }

     if (savedGrammarPoints) {
         selectedGrammarPointStrings = JSON.parse(savedGrammarPoints);
     } else {
         // Default: For each chapter, select all its grammar point *strings*
         textbookData.forEach(chapter => {
             selectedGrammarPointStrings[chapter.chapter] = chapter.grammar.map(gp => gp.grammarPoint);
         });
     }

    // Populate settings UI based on loaded settings
    populateSettings();
}


// Populate the settings modal with checkboxes
function populateSettings() {
    chapterSettingsDiv.innerHTML = '<h3>Select Chapters</h3>'; // Clear previous
    grammarSettingsDiv.innerHTML = '<h3>Select Grammar Points (in selected chapters)</h3><p>Select a chapter above to see its grammar points.</p>'; // Clear previous

    // Iterate through the original textbookData to maintain order
    textbookData.forEach(chapter => {
        const chapterId = `chapter-${chapter.chapter.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`; // Create a safe ID
        const isChapterSelected = selectedChapters.includes(chapter.chapter);

        const chapterCheckboxHtml = `
            <div>
                <input type="checkbox" id="${chapterId}" value="${chapter.chapter}" ${isChapterSelected ? 'checked' : ''}>
                <label for="${chapterId}">${chapter.chapter}</label>
            </div>
        `;
        chapterSettingsDiv.innerHTML += chapterCheckboxHtml;
    });

    // Add event listeners to chapter checkboxes to update grammar points display
    chapterSettingsDiv.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleChapterSelectionChange);
    });

    // Initially populate grammar points for selected chapters
    updateGrammarSettingsUI();
}

// Handle chapter checkbox changes to update selected chapters and grammar UI
function handleChapterSelectionChange(event) {
    const chapterName = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked && !selectedChapters.includes(chapterName)) {
        selectedChapters.push(chapterName);
        // When a chapter is selected, add all its grammar point *strings* to selectedGrammarPointStrings
         const chapterData = textbookData.find(c => c.chapter === chapterName);
         if (chapterData) {
             selectedGrammarPointStrings[chapterName] = chapterData.grammar.map(gp => gp.grammarPoint); // Add all grammar point strings
         }
    } else if (!isChecked) {
        selectedChapters = selectedChapters.filter(name => name !== chapterName);
        // When a chapter is deselected, remove its entry from selectedGrammarPointStrings
        delete selectedGrammarPointStrings[chapterName];
    }

     // Update the grammar points section of the settings UI
    updateGrammarSettingsUI();
}


// Update the grammar settings UI based on currently selected chapters
function updateGrammarSettingsUI() {
    grammarSettingsDiv.innerHTML = '<h3>Select Grammar Points (in selected chapters)</h3>';

    if (selectedChapters.length === 0) {
        grammarSettingsDiv.innerHTML += '<p>Select at least one chapter to see grammar points.</p>';
        return;
    }

    // Iterate through textbookData to maintain original chapter order in grammar settings
    textbookData.forEach(chapterData => {
        const chapterName = chapterData.chapter;
        // Only show grammar points for chapters that are currently selected
        if (selectedChapters.includes(chapterName) && chapterData.grammar.length > 0) {
            grammarSettingsDiv.innerHTML += `<h4>${chapterName}</h4>`;
            chapterData.grammar.forEach(grammarPointObj => {
                 const grammarPointString = grammarPointObj.grammarPoint;
                const grammarId = `grammar-${chapterName.replace(/\s+|[^\w]/g, '-')}-${grammarPointString.replace(/\s+|[^\w]/g, '-')}`; // Create a unique safe ID
                 // Check if the grammar point string is in the selected strings for this chapter
                 const isGrammarSelected = selectedGrammarPointStrings[chapterName] && selectedGrammarPointStrings[chapterName].includes(grammarPointString);

                const grammarCheckboxHtml = `
                    <div>
                        <input type="checkbox" id="${grammarId}" value="${grammarPointString}" data-chapter="${chapterName}" ${isGrammarSelected ? 'checked' : ''}>
                        <label for="${grammarId}">${grammarPointString}</label>
                    </div>
                `;
                grammarSettingsDiv.innerHTML += grammarCheckboxHtml;
            });
        }
    });

    // Add event listeners to grammar point checkboxes
     grammarSettingsDiv.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleGrammarSelectionChange);
    });
}

// Handle grammar point checkbox changes
function handleGrammarSelectionChange(event) {
    const grammarPointString = event.target.value;
    const chapterName = event.target.dataset.chapter;
    const isChecked = event.target.checked;

    if (!selectedGrammarPointStrings[chapterName]) {
        selectedGrammarPointStrings[chapterName] = [];
    }

    if (isChecked && !selectedGrammarPointStrings[chapterName].includes(grammarPointString)) {
        selectedGrammarPointStrings[chapterName].push(grammarPointString);
    } else if (!isChecked) {
        selectedGrammarPointStrings[chapterName] = selectedGrammarPointStrings[chapterName].filter(gp => gp !== grammarPointString);
    }
}


// Save settings to localStorage
function saveSettings() {
    // Before saving, ensure selectedGrammarPointStrings only contains strings of grammar points
    // from chapters that are currently selected and that exist in the original data.
     const cleanedSelectedGrammarPointStrings = {};
     selectedChapters.forEach(chapterName => {
         if (selectedGrammarPointStrings[chapterName]) {
             // Get valid grammar point strings from the original data for this chapter
             const validGrammarStrings = textbookData.find(c => c.chapter === chapterName)?.grammar.map(gp => gp.grammarPoint) || [];
             cleanedSelectedGrammarPointStrings[chapterName] = selectedGrammarPointStrings[chapterName].filter(gpString => validGrammarStrings.includes(gpString));
              // If a chapter is selected but has no grammar points selected,
              // remove it from the selectedGrammarPointStrings to avoid errors later.
             if (cleanedSelectedGrammarPointStrings[chapterName].length === 0) {
                 delete cleanedSelectedGrammarPointStrings[chapterName];
             }
         }
     });
     selectedGrammarPointStrings = cleanedSelectedGrammarPointStrings;


    localStorage.setItem('selectedChapters', JSON.stringify(selectedChapters));
    localStorage.setItem('selectedGrammarPoints', JSON.stringify(selectedGrammarPointStrings));
    alert('Settings Saved!'); // Or a more subtle visual feedback
    settingsModal.style.display = 'none'; // Close modal after saving
    displayPrompt(); // Get a new prompt based on potentially updated settings
}


// Get a random grammar point object based on selected chapters and grammar points
function getRandomGrammarPoint() {
    // Get chapters that are selected AND have at least one selected grammar point string
    const availableChapters = textbookData.filter(chapter =>
         selectedChapters.includes(chapter.chapter) &&
         selectedGrammarPointStrings[chapter.chapter] &&
         selectedGrammarPointStrings[chapter.chapter].length > 0
     );


    if (availableChapters.length === 0) {
        // Check if chapters are selected but have no grammar points selected
         if (selectedChapters.length > 0) {
            // Return a placeholder object with informative text
            return { chapter: "No Grammar Points Selected", grammarPoint: { grammarPoint: "Please select grammar points in settings for the chosen chapters.", exampleSentence: "", explanation: "" } };
         }
         // Return a placeholder object with informative text
         return { chapter: "No Chapters Selected", grammarPoint: { grammarPoint: "Please select chapters in settings.", exampleSentence: "", explanation: "" } };
    }

    const randomChapterData = availableChapters[Math.floor(Math.random() * availableChapters.length)];
    const availableGrammarStrings = selectedGrammarPointStrings[randomChapterData.chapter]; // Get selected grammar point strings for this chapter

    const randomGrammarPointString = availableGrammarStrings[Math.floor(Math.random() * availableGrammarStrings.length)];

    // Find the full grammar point object using the selected string
    const selectedGrammarPointObject = randomChapterData.grammar.find(gp => gp.grammarPoint === randomGrammarPointString);

     // Return an object containing both the chapter and the full grammar point object
    return {
        chapter: randomChapterData.chapter,
        grammarPoint: selectedGrammarPointObject // This is the object like { grammarPoint: "...", exampleSentence: "...", explanation: "..." }
    };
}

// Display the randomly selected grammar point
function displayPrompt() {
    const promptResult = getRandomGrammarPoint(); // Get the result object with chapter and grammarPoint object
    currentGrammarPointObject = promptResult.grammarPoint; // Store the full grammar point object
    currentChapter = promptResult.chapter; // Store the chapter name

    chapterNameSpan.textContent = currentChapter; // This will now correctly display the chapter name
    grammarPointTextSpan.textContent = currentGrammarPointObject.grammarPoint; // Access grammarPoint from the object
    exampleSentencePre.textContent = currentGrammarPointObject.exampleSentence; // Access exampleSentence from the object
    explanationTextParagraph.textContent = currentGrammarPointObject.explanation; // Access explanation from the object

    // Hide hint sections by default for the new prompt
    exampleSectionDiv.classList.add('hidden');
    explanationSectionDiv.classList.add('hidden');
    showHintButton.textContent = 'Show Hint'; // Reset hint button text


    // Clear previous feedback and input
    feedbackTextParagraph.textContent = '';
    userSentenceTextArea.value = '';

    // Hide Send and Next buttons, show Send initially if valid prompt
     sendButton.classList.add('hidden');
     nextButton.classList.add('hidden');
     showHintButton.classList.add('hidden'); // Hide hint button initially


     // Enable/Disable input and buttons based on prompt validity
    if (!currentGrammarPointObject || !currentGrammarPointObject.grammarPoint || currentGrammarPointObject.grammarPoint.includes("Please select")) {
         userSentenceTextArea.disabled = true;
         userSentenceTextArea.placeholder = "Please update your settings to start practicing.";
          // Also clear prompt areas if no valid prompt
         chapterNameSpan.textContent = currentChapter; // Display the error message from getRandomGrammarPoint
         grammarPointTextSpan.textContent = currentGrammarPointObject ? currentGrammarPointObject.grammarPoint : '';
         exampleSentencePre.textContent = '';
         explanationTextParagraph.textContent = '';

     } else {
         userSentenceTextArea.disabled = false;
         userSentenceTextArea.placeholder = "Write your example sentence here...";
         sendButton.classList.remove('hidden'); // Show send button
         showHintButton.classList.remove('hidden'); // Show hint button
     }
}

// Send the user's sentence to the (simulated) AI
async function sendSentence() {
    const userSentence = userSentenceTextArea.value.trim();

    if (userSentence === "") {
        alert("Please enter a sentence.");
        return;
    }

    // Use the grammar point string from the current object
    const grammarPointString = currentGrammarPointObject ? currentGrammarPointObject.grammarPoint : '';
    const chapterName = currentChapter;

     if (!grammarPointString || !chapterName || grammarPointString.includes("Please select")) {
         feedbackTextParagraph.textContent = "Error: Cannot send. Invalid grammar point selected.";
         return;
     }


    // Hide the send button while processing
    sendButton.classList.add('hidden');
    showHintButton.classList.add('hidden'); // Hide hint button after sending

    // --- !!! SECURITY WARNING !!! ---
    // In a real application, you would send `userSentence`, `grammarPointString`, and `chapterName`
    // to your backend server using the fetch API.
    // Your backend would then securely call the OpenRouter API.
    // NEVER put your API key directly in this frontend code.
    // --- Simulated API Call ---

    feedbackTextParagraph.textContent = 'Sending to AI...';
    userSentenceTextArea.disabled = true; // Disable input while sending

    // Simulate a network request delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate an AI response
    let simulatedFeedback = "";
    // Use the grammar point string for the simulation
    const grammarKeywords = grammarPointString.replace(/[^\w\s]/g, '').split(/\s+/);

    // Simple check if any of the keywords are in the user sentence
    const usesGrammarKeyword = grammarKeywords.some(keyword => userSentence.includes(keyword));

    if (usesGrammarKeyword) {
         simulatedFeedback = `That's a good sentence using "${grammarPointString}"! Keep up the great work. This grammar point was from ${chapterName}.`;
    } else {
         simulatedFeedback = `Try again. Your sentence "${userSentence}" doesn't seem to use "${grammarPointString}". Focus on how this grammar point was used in ${chapterName}.`;
    }


    feedbackTextParagraph.textContent = simulatedFeedback;
    userSentenceTextArea.disabled = false; // Re-enable input
    // userSentenceTextArea.value = ''; // Don't clear input until Next is clicked

    // Show the Next button
    nextButton.classList.remove('hidden');
}

// Toggle visibility of hint sections
function toggleHint() {
    const isHidden = exampleSectionDiv.classList.contains('hidden');
    if (isHidden) {
        exampleSectionDiv.classList.remove('hidden');
        explanationSectionDiv.classList.remove('hidden');
        showHintButton.textContent = 'Hide Hint';
    } else {
        exampleSectionDiv.classList.add('hidden');
        explanationSectionDiv.classList.add('hidden');
        showHintButton.textContent = 'Show Hint';
    }
}


// --- Event Listeners ---
sendButton.addEventListener('click', sendSentence);

nextButton.addEventListener('click', () => {
    userSentenceTextArea.value = ''; // Clear input when moving to next
    displayPrompt(); // Get and display the next prompt
});

// Add event listener for the hint button
showHintButton.addEventListener('click', toggleHint);


settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex'; // Use flex to center modal content
    populateSettings(); // Repopulate settings to ensure correct checked states
    updateGrammarSettingsUI(); // Ensure grammar points are updated when opening settings
});

closeModalButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
    // Optional: Reload settings here if you want to discard unsaved changes
    // loadSettings();
    // displayPrompt(); // Display a new prompt based on current (potentially unsaved) settings
});

saveSettingsButton.addEventListener('click', saveSettings);

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
         // loadSettings(); // Optional: Reload settings here
         // displayPrompt(); // Display a new prompt based on current (potentially unsaved) settings
    }
});


// --- Initialization ---
loadSettings(); // Load settings first
displayPrompt(); // Display the initial grammar point