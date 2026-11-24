// ==========================================
// AI COMMAND CENTER
// JavaScript Foundation
// ==========================================


// ---------- DOM ELEMENTS ----------

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const settingsThemeToggle = document.getElementById("settingsThemeToggle");

const notificationToggle = document.getElementById("notificationToggle");
const settingsNotificationToggle = document.getElementById("settingsNotificationToggle");
const notificationDot = document.querySelector(".notification-dot");

const mobileMenu = document.getElementById("mobileMenu");

const quickAddBtn = document.getElementById("quickAddBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const globalSearch = document.getElementById("globalSearch");

const commandInput = document.getElementById("commandInput");
const commandButton = document.getElementById("commandButton");

// ==========================================
// GLOBAL SEARCH
// ==========================================

const globalSearchResults =
    document.getElementById(
        "globalSearchResults"
    );


// ==========================================
// SEARCH RESULTS
// ==========================================

function performGlobalSearch(query) {

    const searchQuery =
        query.trim().toLowerCase();


    globalSearchResults.innerHTML = "";


    if (!searchQuery) {

        globalSearchResults.classList.remove(
            "active"
        );

        return;
    }


    // ==========================================
    // SEARCH TASKS
    // ==========================================

    const taskResults =
        tasks
            .filter((task) => {

                return (
                    task.title
                        .toLowerCase()
                        .includes(searchQuery)
                    ||
                    task.priority
                        .toLowerCase()
                        .includes(searchQuery)
                );

            })
            .map((task) => ({

                type: "task",

                id: task.id,

                title: task.title,

                preview:
                    `${task.priority} priority`
            }));


    // ==========================================
    // SEARCH NOTES
    // ==========================================

    const noteResults =
        notes
            .filter((note) => {

                return (
                    note.title
                        .toLowerCase()
                        .includes(searchQuery)
                    ||
                    note.content
                        .toLowerCase()
                        .includes(searchQuery)
                );

            })
            .map((note) => ({

                type: "note",

                id: note.id,

                title: note.title,

                preview: note.content
            }));


    const results = [
        ...taskResults,
        ...noteResults
    ];


    // ==========================================
    // NO RESULTS
    // ==========================================

    if (results.length === 0) {

        globalSearchResults.innerHTML = `
            <div class="search-empty">
                No tasks or notes found.
            </div>
        `;

        globalSearchResults.classList.add(
            "active"
        );

        return;
    }


    // ==========================================
    // RENDER RESULTS
    // ==========================================

    results.forEach((result) => {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "search-result";


        button.dataset.type =
            result.type;

        button.dataset.id =
            result.id;


        button.innerHTML = `

            <span class="search-result-icon">
                ${result.type === "task" ? "✓" : "▤"}
            </span>

            <span class="search-result-content">

                <span class="search-result-title">
                    ${result.title}
                </span>

                <span class="search-result-preview">
                    ${result.preview}
                </span>

            </span>

            <span class="search-result-type">
                ${result.type}
            </span>

        `;


        globalSearchResults.appendChild(
            button
        );

    });


    globalSearchResults.classList.add(
        "active"
    );
}


// ==========================================
// LIVE SEARCH
// ==========================================

globalSearch.addEventListener(
    "input",
    () => {

        performGlobalSearch(
            globalSearch.value
        );

    }
);


// ==========================================
// SEARCH RESULT CLICK
// ==========================================

globalSearchResults.addEventListener(
    "click",
    (event) => {

        const result =
            event.target.closest(
                ".search-result"
            );


        if (!result) {
            return;
        }


        const type =
            result.dataset.type;


        // ==========================================
        // OPEN TASKS PAGE
        // ==========================================

        if (type === "task") {

            showPage("tasks");

        }


        // ==========================================
        // OPEN NOTES PAGE
        // ==========================================

        if (type === "note") {

            showPage("notes");

        }


        // ==========================================
        // OPEN GOALS PAGE
        // ==========================================

        if (type === "goal") {

            showPage("goals");

        }


        // ==========================================
        // OPEN PLANNER PAGE
        // ==========================================

        if (type === "planner") {

            showPage("planner");

        }


        // ==========================================
        // CLEAR SEARCH
        // ==========================================

        globalSearch.value = "";

        globalSearchResults.innerHTML = "";

        globalSearchResults.classList.remove(
            "active"
        );

    }
);


// ---------- THEME ----------

function toggleTheme() {
    body.classList.toggle("light-theme");

    const isLight = body.classList.contains("light-theme");

    localStorage.setItem(
        "commandCenterTheme",
        isLight ? "light" : "dark"
    );

    themeToggle.textContent = isLight ? "☀" : "☾";
}


function loadTheme() {
    const savedTheme =
        localStorage.getItem("commandCenterTheme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    } else {
        body.classList.remove("light-theme");
    }

    const isLight =
        body.classList.contains("light-theme");

    themeToggle.textContent =
        isLight ? "☀" : "☾";
}


themeToggle.addEventListener(
    "click",
    toggleTheme
);

settingsThemeToggle.addEventListener(
    "click",
    toggleTheme
);

themeToggle.addEventListener("click", toggleTheme);
settingsThemeToggle.addEventListener("click", toggleTheme);

loadTheme();


// ---------- NOTIFICATIONS ----------

let notificationsEnabled =
    localStorage.getItem("commandCenterNotifications") !== "off";


function updateNotificationUI() {

    settingsNotificationToggle.textContent =
        notificationsEnabled
            ? "Notifications On"
            : "Notifications Off";

    notificationToggle.classList.toggle(
        "notifications-off",
        !notificationsEnabled
    );

    notificationDot.style.display =
        notificationsEnabled ? "block" : "none";
}


function toggleNotifications() {

    notificationsEnabled =
        !notificationsEnabled;

    localStorage.setItem(
        "commandCenterNotifications",
        notificationsEnabled ? "on" : "off"
    );

    updateNotificationUI();
}


notificationToggle.addEventListener(
    "click",
    toggleNotifications
);

settingsNotificationToggle.addEventListener(
    "click",
    toggleNotifications
);

updateNotificationUI();


// ---------- MOBILE SIDEBAR ----------

mobileMenu.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("mobile-open");
});


// ---------- QUICK ADD MODAL ----------

function openModal() {
    modalOverlay.classList.add("active");
}


function closeModal() {
    modalOverlay.classList.remove("active");
}


quickAddBtn.addEventListener("click", openModal);

modalClose.addEventListener("click", closeModal);


// Close modal when clicking outside it

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});


// ---------- KEYBOARD SHORTCUT ----------

document.addEventListener("keydown", (event) => {

    // Ctrl + K / Cmd + K
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {

        event.preventDefault();

        globalSearch.focus();
    }


    // Escape closes modal
    if (event.key === "Escape") {
        closeModal();
    }
});




// ==========================================
// PAGE NAVIGATION
// ==========================================

const dashboardElements = [
    document.querySelector(".welcome-section"),
    document.querySelector(".stats-grid"),
    document.querySelector(".dashboard-grid")
];

const tasksPage =
    document.getElementById(
        "tasksPage"
    );

const notesPage =
    document.getElementById(
        "notesPage"
    );

const goalsPage =
    document.getElementById(
        "goalsPage"
    );

// ==========================================
// FINANCE PAGE ELEMENT
// ==========================================

const financePage =
    document.getElementById(
        "financePage"
    );

// ==========================================
// AI COMMAND CENTER PAGE
// ==========================================

const aiPage =
    document.getElementById(
        "aiPage"
    );

// ==========================================
// AI COMMAND CENTER
// ==========================================

const aiCommandInput =
    document.getElementById(
        "aiCommandInput"
    );

const aiSendCommandBtn =
    document.getElementById(
        "aiSendCommandBtn"
    );

const aiConversation =
    document.getElementById(
        "aiConversation"
    );

const aiStatus =
    document.getElementById(
        "aiStatus"
    );

const aiSuggestions =
    document.querySelectorAll(
        ".ai-suggestion"
    );

// ==========================================
// AI HISTORY MODAL
// ==========================================

const aiHistoryToggle =
    document.getElementById(
        "aiHistoryToggle"
    );

const aiHistoryModal =
    document.getElementById(
        "aiHistoryModal"
    );

const aiHistoryClose =
    document.getElementById(
        "aiHistoryClose"
    );

const aiHistoryBackdrop =
    document.getElementById(
        "aiHistoryBackdrop"
    );


// ==========================================
// OPEN AI HISTORY
// ==========================================

function openAIHistory() {
    const modal = document.getElementById("aiHistoryModal");
    if (!modal) return;

    modal.hidden = false;
    modal.style.display = "flex";

    document.body.classList.add("ai-history-open");
}


// ==========================================
// CLOSE AI HISTORY
// ==========================================


function closeAIHistory() {
    const modal = document.getElementById("aiHistoryModal");
    if (!modal) return;

    modal.hidden = true;
    modal.style.display = "none";
    document.body.classList.remove("ai-history-open");
}



// ==========================================
// HISTORY BUTTON
// ==========================================

if (aiHistoryToggle) {

    aiHistoryToggle.addEventListener(
        "click",
        () => {

            openAIHistory();

        }
    );

}


// ==========================================
// CLOSE BUTTON
// ==========================================

if (aiHistoryClose) {

    aiHistoryClose.addEventListener(
        "click",
        () => {

            closeAIHistory();

        }
    );

}


// ==========================================
// BACKDROP CLOSE
// ==========================================

if (aiHistoryBackdrop) {

    aiHistoryBackdrop.addEventListener(
        "click",
        () => {

            closeAIHistory();

        }
    );

}


// ==========================================
// ESC CLOSE
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            aiHistoryModal &&
            !aiHistoryModal.hidden
        ) {

            closeAIHistory();

        }

    }
);

// ==========================================
// AI CONFIRMATION CARD
// ==========================================

const aiConfirmationCard =
    document.getElementById(
        "aiConfirmationCard"
    );

const aiConfirmationTitle =
    document.getElementById(
        "aiConfirmationTitle"
    );

const aiConfirmationMain =
    document.getElementById(
        "aiConfirmationMain"
    );

const aiConfirmationMeta =
    document.getElementById(
        "aiConfirmationMeta"
    );

const aiConfirmationConfirm =
    document.getElementById(
        "aiConfirmationConfirm"
    );

const aiConfirmationCancel =
    document.getElementById(
        "aiConfirmationCancel"
    );

const aiConfirmationClose =
    document.getElementById(
        "aiConfirmationClose"
    );

let pendingAIAction = null;

function showAIConfirmation(
    title,
    mainText,
    metaText,
    action
) {
    if (!aiConfirmationCard) return;

    if (aiConfirmationTitle) {
        aiConfirmationTitle.textContent =
            String(title || "Confirm Action");
    }

    if (aiConfirmationMain) {
        aiConfirmationMain.textContent =
            String(mainText || "Please confirm this action.");
    }

    if (aiConfirmationMeta) {
        aiConfirmationMeta.textContent =
            String(metaText || "");
    }

    // Store the actual action safely.
    pendingAIAction =
        typeof action === "function"
            ? action
            : null;

    // Store confirmation context only when the
    // existing memory system is available.
    if (typeof rememberAIAction === "function") {
        rememberAIAction(
            "confirmation_pending",
            String(mainText || ""),
            String(title || "Confirm Action")
        );
    }

    // Open confirmation UI.
    aiConfirmationCard.hidden = false;

    // Move focus to the confirmation card when possible.
    const focusTarget =
        aiConfirmationCard.querySelector(
            "button"
        );

    if (
        focusTarget &&
        typeof focusTarget.focus === "function"
    ) {
        setTimeout(() => {
            focusTarget.focus();
        }, 50);
    }
}

function hideAIConfirmation() {
    if (!aiConfirmationCard) return;

    aiConfirmationCard.hidden = true;
    pendingAIAction = null;
}

if (aiConfirmationConfirm) {
    aiConfirmationConfirm.addEventListener(
        "click",
        () => {

            if (
                typeof pendingAIAction ===
                "function"
            ) {

                const action =
                    pendingAIAction;

                if (
                    typeof rememberAIAction ===
                    "function"
                ) {
                    rememberAIAction(
                        "confirmed",
                        aiConfirmationMain
                            ? aiConfirmationMain.textContent
                            : null,
                        aiConfirmationTitle
                            ? aiConfirmationTitle.textContent
                            : null
                    );
                }

                hideAIConfirmation();

                action();
            }
        }
    );
}

if (aiConfirmationCancel) {
    aiConfirmationCancel.addEventListener(
        "click",
        () => {

            if (
                typeof rememberAIAction ===
                "function"
            ) {
                rememberAIAction(
                    "cancelled",
                    aiConfirmationMain
                        ? aiConfirmationMain.textContent
                        : null,
                    aiConfirmationTitle
                        ? aiConfirmationTitle.textContent
                        : null
                );
            }

            hideAIConfirmation();

            addAIMessage(
                "Action cancelled.",
                "assistant"
            );
        }
    );
}

if (aiConfirmationClose) {

    aiConfirmationClose.addEventListener(
        "click",
        () => {

            hideAIConfirmation();

            addAIMessage(
                "Action cancelled.",
                "assistant"
            );

        }
    );

}


function addAIMessage(message, type = "assistant") {

    if (!aiConversation) {
        return;
    }

    const emptyState =
        aiConversation.querySelector(
            ".ai-empty-state"
        );

    if (emptyState) {
        emptyState.remove();
    }

    // ==========================================
    // NORMALIZE MESSAGE
    // ==========================================

    let displayMessage = message;

    if (
        message &&
        typeof message === "object"
    ) {

        if (
            typeof message.text === "string"
        ) {

            displayMessage =
                message.text;

        } else if (
            typeof message.message === "string"
        ) {

            displayMessage =
                message.message;

        } else {

            displayMessage =
                JSON.stringify(message);
        }
    }

    if (
        displayMessage === null ||
        displayMessage === undefined ||
        String(displayMessage).trim() === ""
    ) {

        displayMessage =
            "I couldn't generate a response.";
    }

    displayMessage =
        String(displayMessage);

    // ==========================================
    // MESSAGE TYPE
    // ==========================================

    const messageType =
        type === "user"
            ? "user"
            : "assistant";


    // ==========================================
    // MESSAGE WRAPPER
    // ==========================================

    const messageElement =
        document.createElement("div");

    messageElement.className =
        `ai-message ${messageType}`;


    // ==========================================
    // MESSAGE CONTENT
    // ==========================================

    const messageContent =
        document.createElement("div");

    messageContent.className =
        "ai-message-content";


    // ==========================================
    // MESSAGE META
    // ==========================================

    const messageMeta =
        document.createElement("div");

    messageMeta.className =
        "ai-message-meta";


    const messageAuthor =
        document.createElement("span");

    messageAuthor.className =
        "ai-message-author";

    messageAuthor.textContent =
        messageType === "user"
            ? "You"
            : "✦ AI Assistant";


    // ==========================================
    // MESSAGE BUBBLE
    // ==========================================

    const messageBubble =
        document.createElement("div");

    messageBubble.className =
        "ai-message-bubble";

    messageBubble.textContent =
        displayMessage;


    // ==========================================
    // MESSAGE TIME
    // ==========================================

    const messageTime =
        document.createElement("span");

    messageTime.className =
        "ai-message-time";

    messageTime.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );


    // ==========================================
    // BUILD META
    // ==========================================

    messageMeta.appendChild(
        messageAuthor
    );


    // ==========================================
    // BUILD CONTENT
    // ==========================================

    messageContent.appendChild(
        messageMeta
    );

    messageContent.appendChild(
        messageBubble
    );

    messageContent.appendChild(
        messageTime
    );


    // ==========================================
    // ADD MESSAGE
    // ==========================================

    messageElement.appendChild(
        messageContent
    );

    aiConversation.appendChild(
        messageElement
    );


    // ==========================================
    // AUTO SCROLL
    // ==========================================

    requestAnimationFrame(() => {

        aiConversation.scrollTo({
            top:
                aiConversation.scrollHeight,

            behavior:
                "smooth"
        });

    });


    // ==========================================
    // CONVERSATION MEMORY
    // ==========================================

    if (
        typeof rememberAIMessage ===
        "function"
    ) {

        rememberAIMessage(
            displayMessage,
            messageType
        );
    }
}


function setAIStatus(status) {
    if (!aiStatus) return;

    aiStatus.textContent =
        status;
}

// ==========================================
// AI CONVERSATION CONTEXT
// ==========================================

const aiConversationContext = {
    messages: [],
    lastAction: null,
    lastEntity: null,
    lastEntityType: null
};

function rememberAIMessage(
    message,
    type = "assistant"
) {
    aiConversationContext.messages.push({
        message: String(message),
        type: type,
        timestamp: new Date().toISOString()
    });

    if (
        aiConversationContext.messages.length >
        20
    ) {
        aiConversationContext.messages.shift();
    }
}

function rememberAIAction(
    action,
    entity = null,
    entityType = null
) {
    aiConversationContext.lastAction =
        action;

    aiConversationContext.lastEntity =
        entity;

    aiConversationContext.lastEntityType =
        entityType;
}

function clearAIContext() {
    aiConversationContext.messages = [];
    aiConversationContext.lastAction = null;
    aiConversationContext.lastEntity = null;
    aiConversationContext.lastEntityType = null;
}


function handleAICommand(command) {

    console.log(
                "HANDLE AI COMMAND:",
                command
            );


    const originalCommand = String(command || "").trim();
    const normalizedCommand = originalCommand
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    // ==========================================
    // AI FIND GOAL COMMAND DETECTION
    // ==========================================

    const isAIFindGoalCommand =
        /^find\s+(?:the\s+)?goal\s+.+$/i.test(
            originalCommand
        );

    // ==========================================
    // AI UNDO DELETE COMMAND DETECTION
    // ==========================================

    const isAIUndoDeletedGoalCommand =
        normalizedCommand === "undo that" ||
        normalizedCommand === "undo it" ||
        normalizedCommand === "restore that goal";

    if (!normalizedCommand) {
        return;
    }

     // ==========================================
            // AI ACTION: UNDO LAST DELETED GOAL
            // ==========================================

            if (
                normalizedCommand === "undo that" ||
                normalizedCommand === "undo it" ||
                normalizedCommand === "restore that goal"
            ) {

                addAIMessage(
                    originalCommand,
                    "user"
                );

                const deletedGoal =
                    window.lastDeletedGoal;

                if (!deletedGoal) {

                    addAIMessage(
                        "There is no recently deleted goal to restore.",
                        "assistant"
                    );

                    return;
                }

                // Restore the deleted goal.
                goals.unshift(
                    deletedGoal
                );

                // Persist restored goal immediately.
                localStorage.setItem(
                    "commandCenterGoals",
                    JSON.stringify(goals)
                );

                renderGoals();

                window.aiFollowUpContext = {
                    type: "goal",
                    description:
                        `goal "${deletedGoal.title}" was restored`,
                    title:
                        deletedGoal.title,
                    id:
                        deletedGoal.id
                };

                addAIMessage(
                    `Restored. "${deletedGoal.title}" is back in your goals.`,
                    "assistant"
                );

                // Clear undo state only after successful restore.
                window.lastDeletedGoal =
                    null;

                return;
            }

    // ==========================================
    // AI CONTEXT
    // ==========================================

    if (typeof window.aiFollowUpContext === "undefined") {
        window.aiFollowUpContext = null;
    }

    const confirmWords = new Set([
        "yes",
        "yes please",
        "confirm",
        "do it",
        "go ahead",
        "okay",
        "ok",
        "sure",
        "create it",
        "do that"
    ]);

    const cancelWords = new Set([
        "no",
        "no thanks",
        "cancel",
        "stop",
        "don't",
        "dont",
        "never mind"
    ]);

    const contextQueryWords = new Set([
    "what did i just ask",
    "what did i just asked",
    "what did i ask",
    "what was that",
    "repeat that",
    "repeat it",
    "what are we doing",
    "what were we doing"
    ]);
    // ==========================================
    // PENDING CONFIRMATION
    // ==========================================

    console.log(
                    "PENDING ACTION CHECK:",
                    typeof pendingAIAction,
                    pendingAIAction
                );

    if (typeof pendingAIAction === "function") {
        if (confirmWords.has(normalizedCommand)) {
            addAIMessage(originalCommand, "user");

            const action = pendingAIAction;

            hideAIConfirmation();

            setAIStatus("Thinking...");

            setTimeout(() => {
                try {
                    action();
                }catch (error) {

                    console.error(
                        "AI Confirmation Action Error:",
                        error
                    );


                    if (aiStatus) {

                        aiStatus.textContent =
                            "AI Error";

                    }


                    let recoveryMessage =
                        "I couldn't complete that action right now.";


                    if (
                        error &&
                        error.message
                    ) {

                        const errorText =
                            String(
                                error.message
                            ).toLowerCase();


                        if (
                            errorText.includes("failed to fetch") ||
                            errorText.includes("network")
                        ) {

                            recoveryMessage =
                                "I couldn't reach the AI service. Please make sure the server is running, then try again.";

                        }
                        else if (
                            errorText.includes("timeout")
                        ) {

                            recoveryMessage =
                                "The action took too long to complete. Please try again.";

                        }
                        else if (
                            errorText.includes("unauthorized") ||
                            errorText.includes("401")
                        ) {

                            recoveryMessage =
                                "The AI service authentication failed. Please check the server configuration.";

                        }

                    }


                    addAIMessage(
                        recoveryMessage +
                        " Your action was not completed. You can try again.",
                        "assistant"
                    );


                    if (aiConversation) {

                        aiConversation.scrollTop =
                            aiConversation.scrollHeight;

                    }

                }finally {
                    setAIStatus("Ready");
                }
            }, 150);

            return;
        }

        if (cancelWords.has(normalizedCommand)) {
            addAIMessage(originalCommand, "user");

            hideAIConfirmation();

            window.aiFollowUpContext = null;

            addAIMessage(
                "Action cancelled.",
                "assistant"
            );

            setAIStatus("Ready");

            return;
        }

        if (contextQueryWords.has(normalizedCommand)) {
            addAIMessage(originalCommand, "user");

            const context =
                window.aiFollowUpContext;

            if (context && context.description) {
                addAIMessage(
                    `You were asking me to ${context.description}.`,
                    "assistant"
                );
            } else {
                addAIMessage(
                    "You have a pending action waiting for confirmation.",
                    "assistant"
                );
            }

            setAIStatus("Ready");

            return;
        }

        // Do not overwrite a pending action with a new command.
        addAIMessage(originalCommand, "user");

        addAIMessage(
            "You still have a pending action. Please confirm or cancel it first.",
            "assistant"
        );

        setAIStatus("Ready");

        return;
    }

    console.log(
            "PASSED PENDING CONFIRMATION BLOCK"
        );

    console.log(
            "PASSED TOMORROW BLOCK:",
            normalizedCommand
        );

    console.log(
            "DELETE HANDLER REACHED"
        );

        // ==========================================
        // AI ACTION: FIND GOAL
        // ==========================================

        if (isAIFindGoalCommand) {

            addAIMessage(
                originalCommand,
                "user"
            );

            const findGoalMatch =
                originalCommand.match(
                    /^find\s+(?:the\s+)?goal\s+(.+)$/i
                );

            if (!findGoalMatch) {
                addAIMessage(
                    "I need a goal title to search for.",
                    "assistant"
                );
                return;
            }

            const goalTitle =
                findGoalMatch[1]
                    .replace(/\s+/g, " ")
                    .trim();

            const goal =
                goals.find(
                    (item) =>
                        String(item.title || "")
                            .replace(/\s+/g, " ")
                            .trim()
                            .toLowerCase() ===
                        goalTitle
                            .replace(/\s+/g, " ")
                            .trim()
                            .toLowerCase()
                );

            if (!goal) {
                addAIMessage(
                    `I couldn't find the goal "${goalTitle}".`,
                    "assistant"
                );
                return;
            }

            addAIMessage(
                `I found the goal "${goal.title}" in your goals.`,
                "assistant"
            );

            window.aiFollowUpContext = {
                type: "goal",
                description:
                    `found goal "${goal.title}"`,
                title:
                    goal.title,
                category:
                    goal.category,
                progress:
                    goal.progress,
                target:
                    goal.target,
                id:
                    goal.id
            };

            return;
        }

        

      // ==========================================
        // AI ACTION: DELETE GOAL — FIND GOAL
        // ==========================================

        const aiDeleteGoalMatch =
            originalCommand.match(
                /^delete\s+(?:(?:the\s+)?goal\s+)?(.+)$/i
            );

        if (aiDeleteGoalMatch) {

            addAIMessage(
                originalCommand,
                "user"
            );

            const goalTitle =
                aiDeleteGoalMatch[1]
                    .replace(/\s+/g, " ")
                    .trim();

            let goal = null;

            // Use the latest goal context for "it" / "its".
            if (
                ["it", "its"].includes(
                    goalTitle.toLowerCase()
                )
            ) {

                const contextGoal =
                    window.aiFollowUpContext;

                if (
                    contextGoal &&
                    contextGoal.type === "goal" &&
                    contextGoal.id
                ) {

                    goal =
                        goals.find(
                            (item) =>
                                Number(item.id) ===
                                Number(contextGoal.id)
                        );
                }

            } else {

                goal =
                    goals.find(
                        (item) =>
                            String(item.title || "")
                                .replace(/\s+/g, " ")
                                .trim()
                                .toLowerCase() ===
                            goalTitle
                                .toLowerCase()
                    );
            }

            if (!goal) {

                addAIMessage(
                    `I couldn't find the goal "${goalTitle}".`,
                    "assistant"
                );

                return;
            }

            // Open existing goal delete confirmation modal.
            openGoalDeleteModal(
                goal.id
            );

            window.pendingAIGoalDelete = {
                id: goal.id,
                title: goal.title
            };

            return;
        }

    // ==========================================
    // AI FOLLOW-UP: MAKE IT TOMORROW
    // ==========================================

    if (
        window.aiFollowUpContext &&
        window.aiFollowUpContext.type === "task" &&
        (
            normalizedCommand === "make it tomorrow" ||
            normalizedCommand === "move it to tomorrow" ||
            normalizedCommand === "set it for tomorrow"
        )
    ) {

        addAIMessage(
            originalCommand,
            "user"
        );


        const task =
            findTaskForAI({
                id:
                    window.aiFollowUpContext.id
            });


        if (!task) {

            addAIMessage(
                "I couldn't find the previous task.",
                "assistant"
            );

            return;
        }


        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const year =
            tomorrow.getFullYear();

        const month =
            String(
                tomorrow.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                tomorrow.getDate()
            ).padStart(2, "0");

        const tomorrowDate =
            `${year}-${month}-${day}`;


        task.date =
            tomorrowDate;

                if (!task.date) {
            addAIMessage(
                "I couldn't save the task date.",
                "assistant"
            );
            return;
        }


        saveTasks();

        renderTasks();

        updateDashboardStats();

        refreshAnalytics();

        renderDashboardProductivity();


        window.aiFollowUpContext = {

            type:
                "task",

            description:
                `task "${task.title}" moved to tomorrow`,

            title:
                task.title,

            id:
                task.id

        };


        addAIActionHistory({

            action:
                "Task Date Updated",

            description:
                `Moved task "${task.title}" to tomorrow`,

            status:
                "success",

            entityType:
                "task",

            entityId:
                task.id

        });


        addAIMessage(
            `Done. I moved the task "${task.title}" to tomorrow (${formatTaskDate(task.date)}).`,
            "assistant"
        );


        return;
    }

    console.log(
            "PASSED COMPLETE TASK BLOCK:",
            normalizedCommand
        );

// ==========================================
// AI FOLLOW-UP: COMPLETE TASK
// ==========================================

if (
    normalizedCommand === "mark it complete"
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const task =
        findTaskForAI({
            id:
                window.aiFollowUpContext?.id
        });

    if (!task) {

        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );

        return;
    }

    task.completed =
        true;

    task.completedAt =
        new Date().toISOString();

    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();

    window.aiFollowUpContext = {

        type:
            "task",

        description:
            `task "${task.title}" marked as complete`,

        title:
            task.title,

        id:
            task.id

    };

    addAIActionHistory({

        action:
            "Task Completed",

        description:
            `Marked task "${task.title}" as complete`,

        status:
            "success",

        entityType:
            "task",

        entityId:
            task.id

    });

    addAIMessage(
        `Done. I marked the task "${task.title}" as complete.`,
        "assistant"
    );

    return;
}

console.log(
            "PASSED NAMED TASK BLOCK:",
            normalizedCommand
        );

// ==========================================
// AI FOLLOW-UP: COMPLETE NAMED TASK
// ==========================================

if (
    normalizedCommand.startsWith("mark ") &&
    normalizedCommand.endsWith(" complete")
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const taskName =
        originalCommand
            .substring(
                5,
                originalCommand.length - 9
            )
            .trim();

    if (!taskName) {

        addAIMessage(
            "Please provide the task name.",
            "assistant"
        );

        return;
    }

    const task =
        tasks.find(
            (task) =>
                task.title.toLowerCase() ===
                taskName.toLowerCase()
        );

    if (!task) {

        addAIMessage(
            `I couldn't find a task named "${taskName}".`,
            "assistant"
        );

        return;
    }

    task.completed =
        true;

    task.completedAt =
        new Date().toISOString();

    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();

    window.aiFollowUpContext = {

        type:
            "task",

        description:
            `task "${task.title}" marked as complete`,

        title:
            task.title,

        id:
            task.id
    };

    addAIActionHistory({

        action:
            "Task Completed",

        description:
            `Marked task "${task.title}" as complete`,

        status:
            "success",

        entityType:
            "task",

        entityId:
            task.id
    });

    addAIMessage(
        `Done. I marked the task "${task.title}" as complete.`,
        "assistant"
    );

    return;
}

console.log(
            "PASSED EDIT PREVIOUS TASK BLOCK:",
            normalizedCommand
        );

// ==========================================
// AI FOLLOW-UP: EDIT PREVIOUS TASK
// ==========================================

if (
    normalizedCommand === "change it" &&
    window.aiFollowUpContext?.type === "task"
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const task =
        findTaskForAI({
            id:
                window.aiFollowUpContext.id
        });

    if (!task) {

        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );

        return;
    }

    editingTaskId =
        task.id;

    openTaskModal(
        task
    );

    window.aiFollowUpContext = {

        type:
            "task",

        description:
            `editing task "${task.title}"`,

        title:
            task.title,

        id:
            task.id

    };

    addAIMessage(
        `Sure. I'm opening "${task.title}" for editing.`,
        "assistant"
    );

    return;
}

console.log(
            "PASSED TASK DELETE BLOCK:",
            normalizedCommand
        );

 // ==========================================
// AI TASK DELETE REQUEST
// ==========================================

if (
    normalizedCommand === "delete it" ||
    (
        normalizedCommand.startsWith("delete ") &&
        normalizedCommand.endsWith(" task")
    )
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    let task = null;

    // ==========================================
    // CONTEXT-AWARE DELETE
    // ==========================================

    if (
        normalizedCommand === "delete it" &&
        window.aiFollowUpContext?.type === "task"
    ) {

        task =
            findTaskForAI({
                id:
                    window.aiFollowUpContext.id
            });

    }

    // ==========================================
    // NAMED TASK DELETE
    // ==========================================

    if (!task) {

        const taskName =
            originalCommand
                .substring(
                    7,
                    originalCommand.length - 5
                )
                .trim();

        if (!taskName) {

            addAIMessage(
                "Please provide the task name.",
                "assistant"
            );

            return;
        }

        task =
            tasks.find(
                (item) =>
                    item.title.toLowerCase() ===
                    taskName.toLowerCase()
            );
    }

    if (!task) {

        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );

        return;
    }

    // ==========================================
    // DELETE CONFIRMATION ACTION
    // ==========================================

    pendingAIAction =
        () => {

            const taskToDelete =
                tasks.find(
                    (item) =>
                        item.id === task.id
                );

            if (!taskToDelete) {

                addAIMessage(
                    `I couldn't find the task "${task.title}" anymore.`,
                    "assistant"
                );

                return;
            }

            tasks =
                tasks.filter(
                    (item) =>
                        item.id !== task.id
                );

            saveTasks();

            renderTasks();

            updateDashboardStats();

            refreshAnalytics();

            renderDashboardProductivity();

            // ==========================================
            // AI FOLLOW-UP CONTEXT
            // ==========================================

            window.aiFollowUpContext = {

                type:
                    "task",

                description:
                    `task "${taskToDelete.title}" deleted`,

                title:
                    taskToDelete.title,

                id:
                    taskToDelete.id

            };

            // ==========================================
            // AI ACTION HISTORY
            // ==========================================

            addAIActionHistory({

                action:
                    "Task Deleted",

                description:
                    `Deleted task "${taskToDelete.title}"`,

                status:
                    "success",

                entityType:
                    "task",

                entityId:
                    taskToDelete.id

            });

            addAIMessage(
                `Done. I deleted the task "${taskToDelete.title}".`,
                "assistant"
            );
        };

    // ==========================================
    // SHOW CONFIRMATION
    // ==========================================

    showAIConfirmation(
        "Delete Task?",
        task.title,
        "Task · This action cannot be undone.",
        pendingAIAction
    );

    return;
}

// ==========================================
// AI GOAL DELETE REQUEST
// ==========================================

if (
    /^delete\s+.+?\s+goal$/i.test(
        originalCommand.trim()
    )
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const goalDeleteMatch =
        originalCommand.match(
            /^delete\s+(.+?)\s+goal$/i
        );

    if (!goalDeleteMatch) {

        addAIMessage(
            "Please provide the goal name.",
            "assistant"
        );

        return;
    }

    const goalTitle =
        goalDeleteMatch[1].trim();

    const goal =
        goals.find(
            (item) =>
                String(item.title || "")
                    .trim()
                    .toLowerCase() ===
                goalTitle.toLowerCase()
        );

    if (!goal) {

        addAIMessage(
            `I couldn't find the goal "${goalTitle}".`,
            "assistant"
        );

        return;
    }

    pendingAIAction =
        () => {

            const goalToDelete =
                goals.find(
                    (item) =>
                        item.id === goal.id
                );

            if (!goalToDelete) {

                addAIMessage(
                    `I couldn't find the goal "${goal.title}" anymore.`,
                    "assistant"
                );

                return;
            }

            goals =
                goals.filter(
                    (item) =>
                        item.id !== goal.id
                );

            saveGoals();

            renderGoals();

            addAIMessage(
                `Done. I deleted the goal "${goalToDelete.title}".`,
                "assistant"
            );
        };

    showAIConfirmation(
        "Delete Goal?",
        goal.title,
        "Goal · This action cannot be undone.",
        pendingAIAction
    );

    return;
}

    // ==========================================
// AI FOLLOW-UP: CHANGE TASK PRIORITY
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "task" &&
    (
        normalizedCommand.startsWith(
            "change its priority to "
        ) ||
        normalizedCommand.startsWith(
            "change priority to "
        ) ||
        normalizedCommand.startsWith(
            "set priority to "
        ) ||
        normalizedCommand.startsWith(
            "make it priority to "
        ) ||
        normalizedCommand.startsWith(
            "make priority "
        )
    )
) {

    addAIMessage(
        originalCommand,
        "user"
    );


    const task =
        findTaskForAI({
            id:
                window.aiFollowUpContext.id
        });


    if (!task) {

        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );

        return;
    }


    let newPriority = "";


    if (
        normalizedCommand.startsWith(
            "change its priority to "
        )
    ) {

        newPriority =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf(
                        "change its priority to "
                    ) +
                "change its priority to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "change priority to "
        )
    ) {

        newPriority =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf(
                        "change priority to "
                    ) +
                "change priority to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "set priority to "
        )
    ) {

        newPriority =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf(
                        "set priority to "
                    ) +
                "set priority to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "make it priority to "
        )
    ) {

        newPriority =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf(
                        "make it priority to "
                    ) +
                "make it priority to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "make priority "
        )
    ) {

        newPriority =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf(
                        "make priority "
                    ) +
                "make priority ".length
            ).trim();
    }


    const allowedPriorities = [
        "low",
        "medium",
        "high"
    ];


    newPriority =
        newPriority
            .toLowerCase()
            .trim();


    if (
        !allowedPriorities.includes(
            newPriority
        )
    ) {

        addAIMessage(
            "Priority must be low, medium, or high.",
            "assistant"
        );

        return;
    }


    task.priority =
        newPriority;


    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();


    window.aiFollowUpContext = {
        type:
            "task",

        description:
            `task "${task.title}" priority changed to ${task.priority}`,

        title:
            task.title,

        id:
            task.id
    };


    addAIActionHistory({

        action:
            "Task Priority Updated",

        description:
            `Changed task "${task.title}" priority to ${task.priority}`,

        status:
            "success",

        entityType:
            "task",

        entityId:
            task.id

    });


    addAIMessage(
        `Done. I changed the priority of "${task.title}" to ${task.priority}.`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: SET TASK TIME
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "task" &&
    (
        normalizedCommand.startsWith("make it at ") ||
        normalizedCommand.startsWith("set it at ") ||
        normalizedCommand.startsWith("move it to ")
    )
) {

    addAIMessage(originalCommand, "user");

    const task = findTaskForAI({
        id: window.aiFollowUpContext.id
    });

    if (!task) {
        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );
        return;
    }

    let timeText = "";

    if (normalizedCommand.startsWith("make it at ")) {
        timeText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("make it at ") +
                "make it at ".length
            ).trim();
    } else if (normalizedCommand.startsWith("set it at ")) {
        timeText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("set it at ") +
                "set it at ".length
            ).trim();
    } else if (normalizedCommand.startsWith("move it to ")) {
        timeText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("move it to ") +
                "move it to ".length
            ).trim();
    }

    const timeMatch =
        timeText.match(
            /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i
        );

    if (!timeMatch) {
        addAIMessage(
            "Please provide a valid time, such as 5pm or 17:00.",
            "assistant"
        );
        return;
    }

    let hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2] || "00");
    const meridiem = timeMatch[3]
        ? timeMatch[3].toLowerCase()
        : "";

    if (minutes > 59) {
        addAIMessage(
            "Please provide a valid time.",
            "assistant"
        );
        return;
    }

    if (meridiem) {
        if (hours < 1 || hours > 12) {
            addAIMessage(
                "Please provide a valid time.",
                "assistant"
            );
            return;
        }

        if (meridiem === "am" && hours === 12) {
            hours = 0;
        }

        if (meridiem === "pm" && hours !== 12) {
            hours += 12;
        }
    } else if (hours > 23) {
        addAIMessage(
            "Please provide a valid time.",
            "assistant"
        );
        return;
    }

    task.time =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    saveTasks();
    renderTasks();
    updateDashboardStats();
    refreshAnalytics();
    renderDashboardProductivity();

    window.aiFollowUpContext = {
        type: "task",
        description: `task "${task.title}" time set to ${task.time}`,
        title: task.title,
        id: task.id
    };

    addAIActionHistory({
        action: "Task Time Updated",
        description: `Set time for "${task.title}" to ${task.time}`,
        status: "success",
        entityType: "task",
        entityId: task.id
    });

    addAIMessage(
        `Done. I set the task "${task.title}" for ${task.time}.`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: CHANGE GOAL TARGET
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "goal" &&
    (
        normalizedCommand.startsWith("change its target to ") ||
        normalizedCommand.startsWith("change target to ") ||
        normalizedCommand.startsWith("set its target to ") ||
        normalizedCommand.startsWith("set target to ")
    )
) {
    addAIMessage(
        originalCommand,
        "user"
    );

    let goal = null;

    if (
        window.aiFollowUpContext.id !== undefined &&
        window.aiFollowUpContext.id !== null
    ) {
        goal =
            goals.find(
                (item) =>
                    item.id ===
                    window.aiFollowUpContext.id
            );
    }

    if (!goal && window.aiFollowUpContext.title) {
        const contextTitle =
            String(
                window.aiFollowUpContext.title
            )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal =
            goals.find(
                (item) =>
                    String(item.title || "")
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase() ===
                    contextTitle
            );
    }

    if (!goal) {
        addAIMessage(
            "I couldn't find the previous goal.",
            "assistant"
        );
        return;
    }

    let targetText = "";

    if (
        normalizedCommand.startsWith(
            "change its target to "
        )
    ) {
        targetText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "change its target to "
                    ) +
                "change its target to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "change target to "
        )
    ) {
        targetText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "change target to "
                    ) +
                "change target to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "set its target to "
        )
    ) {
        targetText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "set its target to "
                    ) +
                "set its target to ".length
            ).trim();
    }

    else {
        targetText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "set target to "
                    ) +
                "set target to ".length
            ).trim();
    }

    const target =
        Number(
            targetText.replace(
                /[^0-9.-]/g,
                ""
            )
        );

    if (
        !targetText ||
        Number.isNaN(target) ||
        target < 0
    ) {
        addAIMessage(
            "Please provide a valid goal target.",
            "assistant"
        );
        return;
    }

    goal.target = target;

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" target changed to ${goal.target}`,
        title: goal.title,
        target: goal.target,
        id: goal.id
    };

    addAIActionHistory({
        action: "Goal Target Updated",
        description:
            `Changed target of "${goal.title}" to ${goal.target}`,
        status: "success",
        entityType: "goal",
        entityId: goal.id
    });

    addAIMessage(
        `Done. I changed the target of "${goal.title}" to ${goal.target}.`,
        "assistant"
    );

    return;
}


// ==========================================
// AI FOLLOW-UP: CHANGE NAMED GOAL CATEGORY
// ==========================================

const namedGoalCategoryMatch =
    originalCommand.match(
        /^(?:change|set|update)\s+(.+?)\s+category\s+to\s+(Personal|Career|Health|Finance|Education)\s*$/i
    );

if (
    namedGoalCategoryMatch &&
    !["it", "its"].includes(
        namedGoalCategoryMatch[1]
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase()
    )
) {
    addAIMessage(
        originalCommand,
        "user"
    );

    const goalTitle =
        namedGoalCategoryMatch[1]
            .replace(/\s+/g, " ")
            .trim();

    const category =
        namedGoalCategoryMatch[2]
            .trim();

    const goal =
        goals.find(
            (item) =>
                String(item.title || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase() ===
                goalTitle
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase()
        );

    if (!goal) {
        addAIMessage(
            `I couldn't find the goal "${goalTitle}".`,
            "assistant"
        );
        return;
    }

    const validCategory =
        [
            "Personal",
            "Career",
            "Health",
            "Finance",
            "Education"
        ].find(
            (item) =>
                item.toLowerCase() ===
                category.toLowerCase()
        );

    if (!validCategory) {
        addAIMessage(
            "Please use Personal, Career, Health, Finance, or Education.",
            "assistant"
        );
        return;
    }

    goal.category =
        validCategory;

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" category changed to ${goal.category}`,
        title: goal.title,
        category: goal.category,
        id: goal.id
    };

    addAIActionHistory({
        action: "Goal Category Updated",
        description:
            `Changed category of "${goal.title}" to ${goal.category}`,
        status: "success",
        entityType: "goal",
        entityId: goal.id
    });

    addAIMessage(
        `Done. I changed the category of "${goal.title}" to ${goal.category}.`,
        "assistant"
    );

    return;
}


// ==========================================
// AI FOLLOW-UP: CHANGE GOAL CATEGORY BY CONTEXT
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "goal" &&
    (
        normalizedCommand.startsWith("change its category to ") ||
        normalizedCommand.startsWith("change category to ") ||
        normalizedCommand.startsWith("set its category to ") ||
        normalizedCommand.startsWith("set category to ") ||
        normalizedCommand.startsWith("update its category to ") ||
        normalizedCommand.startsWith("update category to ")
    )
) {
    addAIMessage(
        originalCommand,
        "user"
    );

    let goal = null;

    if (
        window.aiFollowUpContext.id !== undefined &&
        window.aiFollowUpContext.id !== null
    ) {
        goal =
            goals.find(
                (item) =>
                    item.id ===
                    window.aiFollowUpContext.id
            );
    }

    if (!goal && window.aiFollowUpContext.title) {
        const contextTitle =
            String(
                window.aiFollowUpContext.title
            )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal =
            goals.find(
                (item) =>
                    String(item.title || "")
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase() ===
                    contextTitle
            );
    }

    if (!goal) {
        addAIMessage(
            "I couldn't find the previous goal.",
            "assistant"
        );
        return;
    }

    let categoryText = "";

    if (
        normalizedCommand.startsWith(
            "change its category to "
        )
    ) {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "change its category to "
                    ) +
                "change its category to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "change category to "
        )
    ) {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "change category to "
                    ) +
                "change category to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "set its category to "
        )
    ) {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "set its category to "
                    ) +
                "set its category to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "set category to "
        )
    ) {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "set category to "
                    ) +
                "set category to ".length
            ).trim();
    }

    else if (
        normalizedCommand.startsWith(
            "update its category to "
        )
    ) {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "update its category to "
                    ) +
                "update its category to ".length
            ).trim();
    }

    else {
        categoryText =
            originalCommand.substring(
                originalCommand
                    .toLowerCase()
                    .indexOf(
                        "update category to "
                    ) +
                "update category to ".length
            ).trim();
    }

    const validCategories = [
        "Personal",
        "Career",
        "Health",
        "Finance",
        "Education"
    ];

    const matchedCategory =
        validCategories.find(
            (category) =>
                category.toLowerCase() ===
                categoryText.toLowerCase()
        );

    if (!matchedCategory) {
        addAIMessage(
            "Please provide a valid goal category: Personal, Career, Health, Finance, or Education.",
            "assistant"
        );
        return;
    }

    goal.category =
        matchedCategory;

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" category changed to ${goal.category}`,
        title: goal.title,
        category: goal.category,
        id: goal.id
    };

    addAIActionHistory({
        action: "Goal Category Updated",
        description:
            `Changed category of "${goal.title}" to ${goal.category}`,
        status: "success",
        entityType: "goal",
        entityId: goal.id
    });

    addAIMessage(
        `Done. I changed the category of "${goal.title}" to ${goal.category}.`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: NAMED GOAL RENAME
// ==========================================

if (
    /^(?:rename|change)\s+.+?\s+to\s+.+$/i.test(
        originalCommand.trim()
    ) &&
    !/^(?:change|set|update)\s+.+?\s+(?:progress|target|category|description)\s+to\s+.+$/i.test(
        originalCommand.trim()
    )
) {

    const namedGoalRenameMatch =
        originalCommand.match(
            /^(?:rename|change)\s+(.+?)\s+to\s+(.+)$/i
        );

    if (namedGoalRenameMatch) {

        const oldTitle =
            namedGoalRenameMatch[1]
                .replace(/\s+/g, " ")
                .trim();

        const newTitle =
            namedGoalRenameMatch[2]
                .replace(/\s+/g, " ")
                .trim();

        let goal = null;

        // Use the latest goal context for "it" / "its".
        if (
            ["it", "its"].includes(
                oldTitle.toLowerCase()
            )
        ) {

            const contextGoal =
                window.aiFollowUpContext;

            if (
                contextGoal &&
                contextGoal.type === "goal" &&
                contextGoal.id
            ) {
                goal =
                    goals.find(
                        (item) =>
                            Number(item.id) ===
                            Number(contextGoal.id)
                    );
            }

        } else {

            goal =
                goals.find(
                    (item) =>
                        String(item.title || "")
                            .replace(/\s+/g, " ")
                            .trim()
                            .toLowerCase() ===
                        oldTitle
                            .toLowerCase()
                );
        }

        if (!goal) {
            addAIMessage(
                `I couldn't find the goal "${oldTitle}".`,
                "assistant"
            );
            return;
        }

        if (!newTitle) {
            addAIMessage(
                "Please provide a new goal name.",
                "assistant"
            );
            return;
        }

        addAIMessage(
            originalCommand,
            "user"
        );

        goal.title = newTitle;

        saveGoals();
        renderGoals();

        window.aiFollowUpContext = {
            type: "goal",
            description:
                `goal renamed to "${goal.title}"`,
            title: goal.title,
            id: goal.id
        };

        addAIActionHistory({
            action: "Goal Renamed",
            description:
                `Renamed goal to "${goal.title}"`,
            status: "success",
            entityType: "goal",
            entityId: goal.id
        });

        addAIMessage(
            `Done. I renamed the goal to "${goal.title}".`,
            "assistant"
        );

        return;
    }
}

// ==========================================
// AI FOLLOW-UP: NAMED GOAL TARGET UPDATE
// ==========================================

if (
    /^(?:change|set|update)\s+.+?\s+target\s+to\s+-?[0-9,]+(?:\.[0-9]+)?\s*$/i.test(
        originalCommand.trim()
    )
) {
    addAIMessage(
        originalCommand,
        "user"
    );

    const namedGoalTargetMatch =
        originalCommand.match(
            /^(?:change|set|update)\s+(.+?)\s+target\s+to\s+(-?[0-9,]+(?:\.[0-9]+)?)\s*$/i
        );

    if (!namedGoalTargetMatch) {
        addAIMessage(
            "I couldn't understand the goal target change.",
            "assistant"
        );
        return;
    }

    const goalTitle =
        namedGoalTargetMatch[1]
            .replace(/\s+/g, " ")
            .trim();

    const targetText =
        namedGoalTargetMatch[2].trim();

    const goal =
        goals.find(
            (item) =>
                String(item.title || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase() ===
                goalTitle
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase()
        );

    if (!goal) {
        addAIMessage(
            `I couldn't find the goal "${goalTitle}".`,
            "assistant"
        );
        return;
    }

    const target =
        Number(
            targetText.replace(/,/g, "")
        );

    if (
        Number.isNaN(target) ||
        target < 0
    ) {
        addAIMessage(
            "Please provide a valid goal target.",
            "assistant"
        );
        return;
    }

    goal.target = target;

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" target changed to ${goal.target}`,
        title: goal.title,
        target: goal.target,
        id: goal.id
    };

    addAIActionHistory({
        action: "Goal Target Updated",
        description:
            `Changed target of "${goal.title}" to ${goal.target}`,
        status: "success",
        entityType: "goal",
        entityId: goal.id
    });

    addAIMessage(
        `Done. I changed the target of "${goal.title}" to ${goal.target}.`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: CHANGE GOAL DESCRIPTION
// ==========================================

if (
    /^(?:change|set|update)\s+.+?\s+description\s+to\s+.+$/i.test(
        originalCommand.trim()
    )
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const goalDescriptionMatch =
        originalCommand.match(
            /^(?:change|set|update)\s+(.+?)\s+description\s+to\s+(.+)$/i
        );

    if (!goalDescriptionMatch) {

        addAIMessage(
            "I couldn't understand the goal description change.",
            "assistant"
        );

        return;
    }

    const goalTitle =
        goalDescriptionMatch[1]
            .replace(/\s+/g, " ")
            .trim();

    const description =
        goalDescriptionMatch[2]
            .trim();

    let goal = null;

    // Use the latest goal context for "it" / "its".
    if (
        ["it", "its"].includes(
            goalTitle.toLowerCase()
        )
    ) {

        const contextGoal =
            window.aiFollowUpContext;

        if (
            contextGoal &&
            contextGoal.type === "goal" &&
            contextGoal.id
        ) {

            goal =
                goals.find(
                    (item) =>
                        Number(item.id) ===
                        Number(contextGoal.id)
                );
        }

    } else {

        // Named goal lookup.
        const normalizedGoalTitle =
            goalTitle
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal =
            goals.find(
                (item) => {

                    const currentTitle =
                        String(
                            item.title || ""
                        )
                            .replace(/\s+/g, " ")
                            .trim()
                            .toLowerCase();

                    return (
                        currentTitle ===
                        normalizedGoalTitle
                    );
                }
            );
    }

    if (!goal) {

        addAIMessage(
            `I couldn't find the goal "${goalTitle}".`,
            "assistant"
        );

        return;
    }

    const goalIndex =
        goals.findIndex(
            (item) =>
                Number(item.id) ===
                Number(goal.id)
        );

    if (goalIndex === -1) {

        addAIMessage(
            `I couldn't update the goal "${goalTitle}".`,
            "assistant"
        );

        return;
    }

    goals[goalIndex] = {
        ...goals[goalIndex],
        description: description
    };

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" description updated`,
        title: goal.title,
        description: goal.description,
        id: goal.id
    };

    addAIActionHistory({
        action: "Goal Description Updated",
        description:
            `Updated description of "${goal.title}"`,
        status: "success",
        entityType: "goal",
        entityId: goal.id
    });

    addAIMessage(
        `Done. I updated the description of "${goal.title}".`,
        "assistant"
    );

    return;
}


// ==========================================
// AI FOLLOW-UP: CHANGE GOAL PROGRESS
// ==========================================

console.log(
    "GOAL PROGRESS PRECHECK:",
    {
        command: originalCommand,
        normalized: normalizedCommand,
        context: window.aiFollowUpContext,
        contextType: window.aiFollowUpContext?.type
    }
);

if (
    /^(?:change|set|update)\s+.+?\s+progress\s+to\s+[0-9]+%?\s*$/i.test(
        originalCommand.trim()
    )
) {

    console.log(
        "GOAL PROGRESS MATCHED DIRECTLY"
    );

}

const namedGoalProgressMatch =
    originalCommand.match(
       /^(?:increase|change|set|update)\s+(.+?)\s+progress\s+(?:to|at)\s+([0-9]+(?:\.[0-9]+)?)%?\s*$/i
    );

if (
    namedGoalProgressMatch ||
    (
        window.aiFollowUpContext &&
        window.aiFollowUpContext.type === "goal" &&
        (
            normalizedCommand.startsWith("increase its progress to ") ||
            normalizedCommand.startsWith("change its progress to ") ||
            normalizedCommand.startsWith("set its progress to ") ||
            normalizedCommand.startsWith("update its progress to ") ||
            normalizedCommand.startsWith("change progress to ") ||
            normalizedCommand.startsWith("set progress to ") ||
            normalizedCommand.startsWith("update progress to ")
        )
    )
) {
    addAIMessage(
        originalCommand,
        "user"
    );

    let goal = null;
    let progressText = "";

    // ==========================================
    // NAMED GOAL
    // Example: change Emergency Fund progress to 50%
    // ==========================================

    if (
        namedGoalProgressMatch &&
        namedGoalProgressMatch[1].trim().toLowerCase() !== "its" &&
        namedGoalProgressMatch[1].trim().toLowerCase() !== "it"
    ) {
        const goalTitle =
            namedGoalProgressMatch[1].trim();

        progressText =
            namedGoalProgressMatch[2].trim();

        const normalizedGoalTitle =
            goalTitle
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal =
            goals.find(
                (item) => {
                    const currentTitle =
                        String(item.title || "")
                            .replace(/\s+/g, " ")
                            .trim()
                            .toLowerCase();

                    return (
                        currentTitle ===
                        normalizedGoalTitle
                    );
                }
            );

        if (!goal) {
            addAIMessage(
                `I couldn't find the goal "${goalTitle}".`,
                "assistant"
            );
            return;
        }
    }

    // ==========================================
    // RESOLVE "IT" / "ITS" TO CURRENT GOAL
    // ==========================================

    if (
        !goal &&
        window.aiFollowUpContext &&
        window.aiFollowUpContext.type === "goal" &&
        (
            normalizedCommand.startsWith("increase its progress to ") ||
            normalizedCommand.startsWith("change its progress to ") ||
            normalizedCommand.startsWith("set its progress to ") ||
            normalizedCommand.startsWith("update its progress to ")
        )
    ) {
        if (
            window.aiFollowUpContext.id !== undefined &&
            window.aiFollowUpContext.id !== null
        ) {
            goal = goals.find(
                (item) =>
                    item.id ===
                    window.aiFollowUpContext.id
            );
        }

        if (
            !goal &&
            window.aiFollowUpContext.title
        ) {
            const contextTitle =
                String(
                    window.aiFollowUpContext.title
                )
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase();

            goal = goals.find(
                (item) =>
                    String(item.title || "")
                        .replace(/\s+/g, " ")
                        .trim()
                        .toLowerCase() ===
                    contextTitle
            );
        }
    }

// ==========================================
// CONTEXT GOAL
// ==========================================

if (
    !goal &&
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "goal" &&
    (
        normalizedCommand.startsWith("increase its progress to ") ||
        normalizedCommand.startsWith("change its progress to ") ||
        normalizedCommand.startsWith("set its progress to ") ||
        normalizedCommand.startsWith("update its progress to ")
    )
) {
    if (
        window.aiFollowUpContext.id !== undefined &&
        window.aiFollowUpContext.id !== null
    ) {
        goal = goals.find(
            (item) =>
                item.id ===
                window.aiFollowUpContext.id
        );
    }

    if (
        !goal &&
        window.aiFollowUpContext.title
    ) {
        const contextTitle =
            String(
                window.aiFollowUpContext.title
            )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal = goals.find(
            (item) =>
                String(item.title || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase() ===
                contextTitle
        );
    }
}

if (!goal) {
    if (
        window.aiFollowUpContext &&
        window.aiFollowUpContext.id !== undefined &&
        window.aiFollowUpContext.id !== null
    ) {
        goal = goals.find(
            (item) =>
                item.id ===
                window.aiFollowUpContext.id
        );
    }

    if (
        !goal &&
        window.aiFollowUpContext &&
        window.aiFollowUpContext.title
    ) {
        const contextTitle =
            String(
                window.aiFollowUpContext.title
            )
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

        goal = goals.find(
            (item) =>
                String(item.title || "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .toLowerCase() ===
                contextTitle
        );
    }
}

if (!goal) {
    addAIMessage(
        "I couldn't find that goal.",
        "assistant"
    );
    return;
}

    // ==========================================
    // CONTEXT PROGRESS
    // ==========================================

    if (!progressText) {
        const progressMatch =
            originalCommand.match(
                /(?:increase|change|set|update)(?:\s+(?:it|its))?\s+progress\s+(?:to|at)\s+([0-9]+(?:\.[0-9]+)?)%?\s*$/i
            );

        if (progressMatch) {
            progressText =
                progressMatch[1].trim();
        }
    }

    // ==========================================
    // VALIDATE PROGRESS
    // ==========================================

    const progress =
        Number(
            progressText.replace(
                /[^0-9.-]/g,
                ""
            )
        );

    if (
        !progressText ||
        Number.isNaN(progress) ||
        progress < 0 ||
        progress > 100
    ) {
        addAIMessage(
            "Please provide a valid progress value between 0 and 100.",
            "assistant"
        );
        return;
    }

    // ==========================================
    // UPDATE GOAL
    // ==========================================

    goal.progress = progress;

    console.log(
            "GOAL PROGRESS AFTER UPDATE:",
            goal.title,
            goal.progress
        );

    console.log(
            "GOAL PROGRESS UPDATED:",
            goal.title,
            goal.progress
        );

    saveGoals();
    renderGoals();

    window.aiFollowUpContext = {
        type: "goal",
        description:
            `goal "${goal.title}" progress changed to ${goal.progress}%`,
        title: goal.title,
        id: goal.id
    };

    addAIActionHistory({
        action:
            "Goal Progress Updated",
        description:
            `Changed progress of "${goal.title}" to ${goal.progress}%`,
        status:
            "success",
        entityType:
            "goal",
        entityId:
            goal.id
    });

    addAIMessage(
        `Done. I changed the progress of "${goal.title}" to ${goal.progress}%.`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: CHANGE TASK REMINDER
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "task" &&
    (
        normalizedCommand.startsWith("change the reminder to ") ||
        normalizedCommand.startsWith("change reminder to ") ||
        normalizedCommand.startsWith("set the reminder to ")
    )
) {

    addAIMessage(originalCommand, "user");

    const task = findTaskForAI({
        id: window.aiFollowUpContext.id
    });

    if (!task) {
        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );
        return;
    }

    let reminderText = "";

    if (normalizedCommand.startsWith("change the reminder to ")) {
        reminderText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("change the reminder to ") +
                "change the reminder to ".length
            ).trim();
    } else if (normalizedCommand.startsWith("change reminder to ")) {
        reminderText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("change reminder to ") +
                "change reminder to ".length
            ).trim();
    } else {
        reminderText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("set the reminder to ") +
                "set the reminder to ".length
            ).trim();
    }

    const reminderDateTime =
        parseAIReminderDateTime(
            `remind me ${reminderText}`
        );

    if (!reminderDateTime) {
        addAIMessage(
            "I couldn't understand the new reminder time.",
            "assistant"
        );
        return;
    }

    task.reminder =
        reminderDateTime.toISOString();

    task.reminderTriggered = false;

    saveTasks();
    renderTasks();
    updateDashboardStats();
    refreshAnalytics();
    renderDashboardProductivity();

    window.aiFollowUpContext = {
        type: "task",
        description: `task "${task.title}" reminder updated`,
        title: task.title,
        id: task.id
    };

    addAIActionHistory({
        action: "Task Reminder Updated",
        description: `Updated reminder for "${task.title}"`,
        status: "success",
        entityType: "task",
        entityId: task.id
    });

    addAIMessage(
        `Done. I updated the reminder for "${task.title}".`,
        "assistant"
    );

    return;
}

// ==========================================
// AI FOLLOW-UP: MOVE TASK TO EXACT DATE
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "task" &&
    (
        normalizedCommand.startsWith("make it on ") ||
        normalizedCommand.startsWith("move it to ") ||
        normalizedCommand.startsWith("set it for ")
    )
) {

    addAIMessage(originalCommand, "user");

    const task = findTaskForAI({
        id: window.aiFollowUpContext.id
    });

    if (!task) {
        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );
        return;
    }

    let dateText = "";

    if (normalizedCommand.startsWith("make it on ")) {
        dateText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("make it on ") +
                "make it on ".length
            ).trim();
    } else if (normalizedCommand.startsWith("move it to ")) {
        dateText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("move it to ") +
                "move it to ".length
            ).trim();
    } else if (normalizedCommand.startsWith("set it for ")) {
        dateText =
            originalCommand.substring(
                originalCommand.toLowerCase().indexOf("set it for ") +
                "set it for ".length
            ).trim();
    }

    const exactDate = getExactDateAI(dateText);

    if (!exactDate) {
        addAIMessage(
            "Please provide a valid date, such as October 15.",
            "assistant"
        );
        return;
    }

    task.date = exactDate;

    saveTasks();
    renderTasks();
    updateDashboardStats();
    refreshAnalytics();
    renderDashboardProductivity();

    window.aiFollowUpContext = {
        type: "task",
        description: `task "${task.title}" moved to ${dateText}`,
        title: task.title,
        id: task.id
    };

    addAIActionHistory({
        action: "Task Date Updated",
        description: `Moved task "${task.title}" to ${dateText}`,
        status: "success",
        entityType: "task",
        entityId: task.id
    });

    addAIMessage(
        `Done. I moved the task "${task.title}" to ${formatTaskDate(task.date)}.`,
        "assistant"
    );

    return;
}

    // ==========================================
// AI FOLLOW-UP: MOVE TASK TO WEEKDAY
// ==========================================

if (
    window.aiFollowUpContext &&
    window.aiFollowUpContext.type === "task" &&
    (
        normalizedCommand.startsWith(
            "move it to "
        ) ||
        normalizedCommand.startsWith(
            "set it for "
        ) ||
        normalizedCommand.startsWith(
            "move the task to "
        ) ||
        normalizedCommand.startsWith(
            "make it "
        )
    )
) {

    addAIMessage(
        originalCommand,
        "user"
    );

    const task =
        findTaskForAI({
            id:
                window.aiFollowUpContext.id
        });

    if (!task) {

        addAIMessage(
            "I couldn't find the previous task.",
            "assistant"
        );

        return;
    }

    let dayName = "";

    if (
        normalizedCommand.startsWith(
            "move it to "
        )
    ) {

        dayName =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf("move it to ") +
                "move it to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "set it for "
        )
    ) {

        dayName =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf("set it for ") +
                "set it for ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "move the task to "
        )
    ) {

        dayName =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf("move the task to ") +
                "move the task to ".length
            ).trim();

    } else if (
        normalizedCommand.startsWith(
            "make it "
        )
    ) {

        dayName =
            originalCommand.substring(
                originalCommand.toLowerCase()
                    .indexOf("make it ") +
                "make it ".length
            ).trim();
    }

    const weekdayDate =
        getNextWeekdayDateAI(
            dayName
        );

    if (!weekdayDate) {

        addAIMessage(
            "Please provide a valid weekday, such as Monday or Friday.",
            "assistant"
        );

        return;
    }

    task.date =
        weekdayDate;

    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();

    window.aiFollowUpContext = {
        type:
            "task",

        description:
            `task "${task.title}" moved to ${dayName}`,

        title:
            task.title,

        id:
            task.id
    };

    addAIMessage(
        `Done. I moved the task "${task.title}" to ${dayName}.`,
        "assistant"
    );

    return;
}



    // ==========================================
    // AI FOLLOW-UP: MARK TASK COMPLETE
    // ==========================================

    if (
        window.aiFollowUpContext &&
        window.aiFollowUpContext.type === "task" &&
        (
            normalizedCommand === "mark it complete" ||
            normalizedCommand === "mark it as complete" ||
            normalizedCommand === "complete it" ||
            normalizedCommand === "complete the task"
        )
    ) {

        addAIMessage(
            originalCommand,
            "user"
        );

        const taskId =
            window.aiFollowUpContext.id;

        const task =
            tasks.find(
                (task) => task.id === taskId
            );

        if (!task) {

            addAIMessage(
                "I couldn't find the previous task.",
                "assistant"
            );

            return;
        }

        task.completed =
            true;

        task.completedAt =
            new Date().toISOString();

        saveTasks();

        renderTasks();

        updateDashboardStats();

        refreshAnalytics();

        renderDashboardProductivity();

        window.aiFollowUpContext.description =
            `task "${task.title}" marked as complete`;

        addAIMessage(
            `Done. I marked the task "${task.title}" as complete.`,
            "assistant"
        );

        return;
    }

    // ==========================================
    // AI FOLLOW-UP: CHANGE TASK TITLE
    // ==========================================

    if (
        window.aiFollowUpContext &&
        window.aiFollowUpContext.type === "task" &&
        (
            normalizedCommand.startsWith("change the title to ") ||
            normalizedCommand.startsWith("change title to ") ||
            normalizedCommand.startsWith("rename it to ") ||
            normalizedCommand.startsWith("rename the task to ")
        )
    ) {

        addAIMessage(
            originalCommand,
            "user"
        );

        const taskId =
            window.aiFollowUpContext.id;

        const task =
            tasks.find(
                (task) => task.id === taskId
            );

        if (!task) {

            addAIMessage(
                "I couldn't find the previous task.",
                "assistant"
            );

            return;
        }

        let newTitle = "";

        if (
            normalizedCommand.startsWith(
                "change the title to "
            )
        ) {

            newTitle =
                originalCommand.substring(
                    originalCommand.toLowerCase()
                        .indexOf("change the title to ") +
                    "change the title to ".length
                ).trim();

        } else if (
            normalizedCommand.startsWith(
                "change title to "
            )
        ) {

            newTitle =
                originalCommand.substring(
                    originalCommand.toLowerCase()
                        .indexOf("change title to ") +
                    "change title to ".length
                ).trim();

        } else if (
            normalizedCommand.startsWith(
                "rename it to "
            )
        ) {

            newTitle =
                originalCommand.substring(
                    originalCommand.toLowerCase()
                        .indexOf("rename it to ") +
                    "rename it to ".length
                ).trim();

        } else if (
            normalizedCommand.startsWith(
                "rename the task to "
            )
        ) {

            newTitle =
                originalCommand.substring(
                    originalCommand.toLowerCase()
                        .indexOf("rename the task to ") +
                    "rename the task to ".length
                ).trim();
        }

        if (!newTitle) {

            addAIMessage(
                "Please provide the new task title.",
                "assistant"
            );

            return;
        }

        task.title =
            newTitle;

        saveTasks();

        renderTasks();

        updateDashboardStats();

        refreshAnalytics();

        renderDashboardProductivity();

        window.aiFollowUpContext.description =
            `task renamed to "${task.title}"`;

        window.aiFollowUpContext.title =
            task.title;

        addAIMessage(
            `Done. I renamed the task to "${task.title}".`,
            "assistant"
        );

        return;
    }

   // ==========================================
    // CONTEXT QUERY + CONTEXT-AWARE FOLLOW-UP
    // ==========================================
    else if (
        contextQueryWords.has(normalizedCommand)
    ) {
        if (window.aiFollowUpContext) {
            const context =
                window.aiFollowUpContext;

            addAIMessage(
                `Your previous request was to ${context.description}.`,
                "assistant"
            );
        }
        else {
            addAIMessage(
                "I don't have a previous action to repeat yet.",
                "assistant"
            );
        }

        return;
    }

    // ==========================================
    // ADD USER COMMAND
    // ==========================================

    addAIMessage(originalCommand, "user");
    setAIStatus("Thinking...");

    setTimeout(() => {
        try {
            // ==========================================
            // OPEN PAGES
            // ==========================================

            if (
                normalizedCommand.includes("open planner") ||
                normalizedCommand.includes("show planner") ||
                normalizedCommand.includes("go to planner")
            ) {
                showPage("planner");

                addAIMessage(
                    "Planner opened for you.",
                    "assistant"
                );
            }

            else if (
                normalizedCommand.includes("open finance") ||
                normalizedCommand.includes("show finance") ||
                normalizedCommand.includes("go to finance")
            ) {
                showPage("finance");

                addAIMessage(
                    "Finance opened for you.",
                    "assistant"
                );
            }

            else if (
                normalizedCommand.includes("open analytics") ||
                normalizedCommand.includes("show analytics") ||
                normalizedCommand.includes("go to analytics")
            ) {
                showPage("analytics");

                addAIMessage(
                    "Analytics opened for you.",
                    "assistant"
                );
            }

            else if (
                (
                    normalizedCommand.includes("open goals") ||
                    normalizedCommand.includes("show goals") ||
                    normalizedCommand.includes("go to goals")
                ) &&
                !normalizedCommand.includes("show me my goals")
            ) {
                showPage("goals");

                addAIMessage(
                    "Goals opened for you.",
                    "assistant"
                );
            }

            else if (
                normalizedCommand.includes("open notes") ||
                normalizedCommand.includes("show notes") ||
                normalizedCommand.includes("go to notes")
            ) {
                showPage("notes");

                addAIMessage(
                    "Notes opened for you.",
                    "assistant"
                );
            }

            else if (
                normalizedCommand.includes("open tasks") ||
                normalizedCommand.includes("show tasks") ||
                normalizedCommand.includes("go to tasks")
            ) {
                showPage("tasks");

                addAIMessage(
                    "Tasks opened for you.",
                    "assistant"
                );
            }

            // ==========================================
            // QUERY — MONTHLY EXPENSES
            // ==========================================

            else if (
                (
                    normalizedCommand.includes("how much") ||
                    normalizedCommand.includes("what did i") ||
                    normalizedCommand.includes("how much have i")
                ) &&
                (
                    normalizedCommand.includes("spent") ||
                    normalizedCommand.includes("spend") ||
                    normalizedCommand.includes("expenses") ||
                    normalizedCommand.includes("expense")
                ) &&
                normalizedCommand.includes("this month")
            ) {
                if (typeof transactions === "undefined") {
                    addAIMessage(
                        "I can't access your finance data right now.",
                        "assistant"
                    );
                } else {
                    const now = new Date();

                    const currentYear =
                        now.getFullYear();

                    const currentMonth =
                        now.getMonth();

                    let totalExpenses = 0;

                    transactions.forEach((transaction) => {
                        if (
                            !transaction ||
                            transaction.type !== "expense" ||
                            !transaction.date
                        ) {
                            return;
                        }

                        const transactionDate =
                            new Date(transaction.date);

                        if (
                            Number.isNaN(
                                transactionDate.getTime()
                            )
                        ) {
                            return;
                        }

                        if (
                            transactionDate.getFullYear() ===
                                currentYear &&
                            transactionDate.getMonth() ===
                                currentMonth
                        ) {
                            totalExpenses +=
                                Number(transaction.amount) || 0;
                        }
                    });

                    if (totalExpenses > 0) {
                        addAIMessage(
                            `You have spent Rs ${totalExpenses.toLocaleString("en-PK")} this month.`,
                            "assistant"
                        );
                    } else {
                        addAIMessage(
                            "You haven't recorded any expenses this month yet.",
                            "assistant"
                        );
                    }
                }
            }

           // ==========================================
            // QUERY — NAMED GOAL PROGRESS
            // ==========================================

            else if (
                /^what\s+is\s+.+?\s+progress$/i.test(
                    originalCommand.trim()
                ) ||
                /^what\s+is\s+the\s+progress\s+of\s+.+$/i.test(
                    originalCommand.trim()
                )
            ) {
                const goalProgressQueryMatch =
                    originalCommand.match(
                        /^what\s+is\s+(?:the\s+)?(?:progress\s+of\s+)?(.+?)\s+progress$/i
                    );

                if (!goalProgressQueryMatch) {
                    addAIMessage(
                        "Please specify a goal name.",
                        "assistant"
                    );
                }

                else {
                    const goalTitle =
                        goalProgressQueryMatch[1].trim();

                    let goal = null;

                    // ==========================================
                    // RESOLVE "IT" / "ITS" FROM CONTEXT
                    // ==========================================

                    if (
                        goalTitle.toLowerCase() === "it" ||
                        goalTitle.toLowerCase() === "its"
                    ) {
                        if (
                            window.aiFollowUpContext &&
                            window.aiFollowUpContext.type === "goal"
                        ) {
                            if (
                                window.aiFollowUpContext.id !== undefined &&
                                window.aiFollowUpContext.id !== null
                            ) {
                                goal = goals.find(
                                    (item) =>
                                        item.id ===
                                        window.aiFollowUpContext.id
                                );
                            }

                            if (
                                !goal &&
                                window.aiFollowUpContext.title
                            ) {
                                const contextTitle =
                                    String(
                                        window.aiFollowUpContext.title
                                    )
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase();

                                goal = goals.find(
                                    (item) =>
                                        String(item.title || "")
                                            .replace(/\s+/g, " ")
                                            .trim()
                                            .toLowerCase() ===
                                        contextTitle
                                );
                            }
                        }
                    }

                    // ==========================================
                    // NAMED GOAL
                    // ==========================================

                    else {
                        goal =
                            goals.find(
                                (item) =>
                                    String(item.title || "")
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase() ===
                                    goalTitle
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase()
                            );
                    }

                    if (!goal) {
                        addAIMessage(
                            `I couldn't find the goal "${goalTitle}".`,
                            "assistant"
                        );

                        return;
                    }

                    addAIMessage(
                        `${goal.title} progress is ${goal.progress}%.`,
                        "assistant"
                    );

                    return;
                }
            }

            // ==========================================
            // QUERY — NAMED GOAL TARGET
            // ==========================================

            else if (
                /^what\s+is\s+.+?\s+target$/i.test(
                    originalCommand.trim()
                ) ||
                /^what\s+is\s+the\s+target\s+of\s+.+$/i.test(
                    originalCommand.trim()
                )
            ) {
                const goalTargetQueryMatch =
                    originalCommand.match(
                        /^what\s+is\s+(?:the\s+target\s+of\s+(.+)|(?:the\s+)?(.+?)\s+target)$/i
                    );

                if (!goalTargetQueryMatch) {
                    addAIMessage(
                        "Please specify a goal name.",
                        "assistant"
                    );
                }

                else {
                    const goalTitle =
                    (
                        goalTargetQueryMatch[1] ||
                        goalTargetQueryMatch[2] ||
                        ""
                    )
                        .replace(/\s+/g, " ")
                        .trim();

                    let goal = null;

                    

                    // ==========================================
                    // RESOLVE "IT" / "ITS" FROM CONTEXT
                    // ==========================================

                    if (
                        goalTitle.toLowerCase() === "it" ||
                        goalTitle.toLowerCase() === "its"
                    ) {
                        if (
                            window.aiFollowUpContext &&
                            window.aiFollowUpContext.type === "goal"
                        ) {
                            if (
                                window.aiFollowUpContext.id !== undefined &&
                                window.aiFollowUpContext.id !== null
                            ) {
                                goal = goals.find(
                                    (item) =>
                                        item.id ===
                                        window.aiFollowUpContext.id
                                );
                            }

                            if (
                                !goal &&
                                window.aiFollowUpContext.title
                            ) {
                                const contextTitle =
                                    String(
                                        window.aiFollowUpContext.title
                                    )
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase();

                                goal = goals.find(
                                    (item) =>
                                        String(item.title || "")
                                            .replace(/\s+/g, " ")
                                            .trim()
                                            .toLowerCase() ===
                                        contextTitle
                                );
                            }
                        }
                    }

                    // ==========================================
                    // NAMED GOAL
                    // ==========================================

                    else {
                        goal =
                            goals.find(
                                (item) =>
                                    String(item.title || "")
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase() ===
                                    goalTitle
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .toLowerCase()
                            );
                    }

                    if (!goal) {
                        addAIMessage(
                            `I couldn't find the goal "${goalTitle}".`,
                            "assistant"
                        );

                        return;
                    }

                    if (
                        goal.target === null ||
                        goal.target === undefined ||
                        goal.target === ""
                    ) {
                        window.aiFollowUpContext = {
                            type: "goal",
                            description:
                                `goal "${goal.title}" target queried`,
                            title: goal.title,
                            target: null,
                            id: goal.id
                        };

                        addAIMessage(
                            `${goal.title} does not have a target set.`,
                            "assistant"
                        );

                        return;
                    }

                    window.aiFollowUpContext = {
                        type: "goal",
                        description:
                            `goal "${goal.title}" target queried`,
                        title: goal.title,
                        target: goal.target,
                        id: goal.id
                    };

                    addAIMessage(
                        `${goal.title} target is ${Number(goal.target).toLocaleString()}.`,
                        "assistant"
                    );

                    return;
                }
            }

           // ==========================================
            // QUERY — NAMED GOAL DESCRIPTION
            // ==========================================

            if (
                /^what\s+is\s+.+?\s+description$/i.test(
                    originalCommand.trim()
                )
            ) {
                const goalDescriptionQueryMatch =
                    originalCommand.match(
                        /^what\s+is\s+(?:the\s+)?(?:description\s+of\s+)?(.+?)\s+description$/i
                    );

                if (!goalDescriptionQueryMatch) {
                    addAIMessage(
                        "Please specify a goal name.",
                        "assistant"
                    );
                    return;
                }

                const goalTitle =
                    goalDescriptionQueryMatch[1].trim();

                let goal = null;

                // Resolve "it" / "its" from previous goal context
                if (
                    goalTitle.toLowerCase() === "it" ||
                    goalTitle.toLowerCase() === "its"
                ) {
                    if (
                        window.aiFollowUpContext &&
                        window.aiFollowUpContext.type === "goal"
                    ) {
                        if (
                            window.aiFollowUpContext.id !== undefined &&
                            window.aiFollowUpContext.id !== null
                        ) {
                            goal =
                                goals.find(
                                    (item) =>
                                        item.id ===
                                        window.aiFollowUpContext.id
                                );
                        }

                        if (
                            !goal &&
                            window.aiFollowUpContext.title
                        ) {
                            const contextTitle =
                                String(
                                    window.aiFollowUpContext.title
                                )
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .toLowerCase();

                            goal =
                                goals.find(
                                    (item) =>
                                        String(item.title || "")
                                            .replace(/\s+/g, " ")
                                            .trim()
                                            .toLowerCase() ===
                                        contextTitle
                                );
                        }
                    }
                }

                // Resolve named goal
                else {
                    goal =
                        goals.find(
                            (item) =>
                                String(item.title || "")
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .toLowerCase() ===
                                goalTitle
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .toLowerCase()
                        );
                }

                if (!goal) {
                    addAIMessage(
                        `I couldn't find the goal "${goalTitle}".`,
                        "assistant"
                    );
                    return;
                }

                if (
                    !goal.description ||
                    !String(goal.description).trim()
                ) {
                    addAIMessage(
                        `${goal.title} does not have a description set.`,
                        "assistant"
                    );
                    return;
                }

                window.aiFollowUpContext = {
                    type: "goal",
                    description:
                        `goal "${goal.title}" description queried`,
                    title: goal.title,
                    description: goal.description,
                    id: goal.id
                };

                addAIMessage(
                    `${goal.title} description is: ${goal.description}`,
                    "assistant"
                );

                return;
            }

            // ==========================================
            // QUERY — NAMED GOAL CATEGORY
            // ==========================================

            if (
                /^what\s+is\s+.+?\s+category$/i.test(
                    originalCommand.trim()
                ) ||
                /^what\s+is\s+(?:the\s+)?category\s+of\s+.+$/i.test(
                    originalCommand.trim()
                )
            ) {
                const goalCategoryQueryMatch =
                    originalCommand.match(
                        /^what\s+is\s+(?:the\s+)?category\s+of\s+(.+)$/i
                    ) ||
                    originalCommand.match(
                        /^what\s+is\s+(.+?)\s+category$/i
                    );

                if (!goalCategoryQueryMatch) {
                    addAIMessage(
                        "Please specify a goal name.",
                        "assistant"
                    );
                    return;
                }

                const goalTitle =
                    goalCategoryQueryMatch[1].trim();

                let goal = null;

                if (
                    goalTitle.toLowerCase() === "it" ||
                    goalTitle.toLowerCase() === "its"
                ) {
                    if (
                        window.aiFollowUpContext &&
                        window.aiFollowUpContext.type === "goal"
                    ) {
                        if (
                            window.aiFollowUpContext.id !== undefined &&
                            window.aiFollowUpContext.id !== null
                        ) {
                            goal =
                                goals.find(
                                    (item) =>
                                        item.id ===
                                        window.aiFollowUpContext.id
                                );
                        }
                    }
                }

                else {
                    goal =
                        goals.find(
                            (item) =>
                                String(item.title || "")
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .toLowerCase() ===
                                goalTitle
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .toLowerCase()
                        );
                }

                if (!goal) {
                    addAIMessage(
                        `I couldn't find the goal "${goalTitle}".`,
                        "assistant"
                    );
                    return;
                }

                if (
                    !goal.category ||
                    !String(goal.category).trim()
                ) {
                    addAIMessage(
                        `${goal.title} does not have a category set.`,
                        "assistant"
                    );
                    return;
                }

                window.aiFollowUpContext = {
                    type: "goal",
                    description:
                        `goal "${goal.title}" category queried`,
                    title: goal.title,
                    category: goal.category,
                    id: goal.id
                };

                addAIMessage(
                    `${goal.title} category is ${goal.category}.`,
                    "assistant"
                );

                return;
            }


            // ==========================================
            // QUERY — PLANNER / TOMORROW
            // ==========================================

            else if (
                (
                    normalizedCommand.includes("what do i have") ||
                    normalizedCommand.includes("what's on my schedule") ||
                    normalizedCommand.includes("whats on my schedule") ||
                    normalizedCommand.includes("what is on my schedule") ||
                    normalizedCommand.includes("do i have anything") ||
                    normalizedCommand.includes("anything scheduled") ||
                    normalizedCommand.includes("what am i doing")
                ) &&
                normalizedCommand.includes("tomorrow")
            ) {
                if (typeof plannerEvents === "undefined") {
                    addAIMessage(
                        "I can't access your planner right now.",
                        "assistant"
                    );
                }

                else {
                    const tomorrow = new Date();

                    tomorrow.setDate(
                        tomorrow.getDate() + 1
                    );

                    const tomorrowDate = [
                        tomorrow.getFullYear(),
                        String(
                            tomorrow.getMonth() + 1
                        ).padStart(2, "0"),
                        String(
                            tomorrow.getDate()
                        ).padStart(2, "0")
                    ].join("-");

                    const tomorrowEvents =
                        plannerEvents
                            .filter(
                                (event) =>
                                    event &&
                                    event.date ===
                                        tomorrowDate
                            )
                            .sort(
                                (a, b) =>
                                    String(
                                        a.startTime || ""
                                    ).localeCompare(
                                        String(
                                            b.startTime || ""
                                        )
                                    )
                            );

                    if (
                        tomorrowEvents.length === 0
                    ) {
                        addAIMessage(
                            "You don't have anything scheduled for tomorrow.",
                            "assistant"
                        );
                    }

                    else {
                        const eventSummary =
                            tomorrowEvents
                                .map((event) => {
                                    const start =
                                        event.startTime ||
                                        "unspecified time";

                                    const end =
                                        event.endTime
                                            ? `–${event.endTime}`
                                            : "";

                                    return `• ${event.title} — ${start}${end}`;
                                })
                                .join("\n");

                        addAIMessage(
                            `You have ${tomorrowEvents.length} event${tomorrowEvents.length === 1 ? "" : "s"} tomorrow:\n${eventSummary}`,
                            "assistant"
                        );
                    }
                }
            }

            // ==========================================
            // CREATE NOTE — CONFIRMATION
            // ==========================================

            else if (
                normalizedCommand.startsWith(
                    "create a note called"
                )
            ) {
                const naturalNoteMatch =
                    originalCommand.match(
                        /^create\s+a\s+note\s+called\s+(.+?)\s+with\s+content\s*:\s*(.+)$/i
                    );

                if (!naturalNoteMatch) {
                    addAIMessage(
                        "I need both a note title and content.",
                        "assistant"
                    );
                }

                else {
                    const noteTitle =
                        naturalNoteMatch[1].trim();

                    const noteContent =
                        naturalNoteMatch[2].trim();

                    if (
                        !noteTitle ||
                        !noteContent ||
                        typeof createNoteFromAI !==
                            "function"
                    ) {
                        addAIMessage(
                            "I need both a note title and content.",
                            "assistant"
                        );
                    }

                    else {
                        window.aiFollowUpContext = {
                            type: "note",
                            description:
                                `create the note "${noteTitle}"`,
                            title: noteTitle,
                            content: noteContent
                        };

                        showAIConfirmation(
                            "Create Note?",
                            noteTitle,
                            "Note · Ready to create",
                            () => {

                                showPage("notes");

                                const created =
                                    createNoteFromAI(
                                        noteTitle,
                                        noteContent
                                    );

                                if (created) {

                                    // ==========================================
                                    // AI ACTION HISTORY
                                    // ==========================================

                                            addAIActionHistory({

                                                action:
                                                    "Note Created",

                                                description:
                                                    `Created note "${noteTitle}"`,

                                                status:
                                                    "success",

                                                entityType:
                                                    "note",

                                                entityId:
                                                    created.id

                                            });


                                            addAIMessage(
                                                `Note "${noteTitle}" created successfully.`,
                                                "assistant"
                                            );

                                        }

                                        else {

                                            addAIMessage(
                                                "I couldn't create that note. Please try again.",
                                                "assistant"
                                            );

                                        }

                                    }
                                );
                            }
                        }
                    }

            // ==========================================
            // CREATE GOAL — CONFIRMATION
            // ==========================================

            else if (
                normalizedCommand.startsWith(
                    "create a goal called"
                )
            ) {
                const naturalGoalMatch =
                    originalCommand.match(
                        /^create\s+a\s+goal\s+called\s+(.+?)(?:\s+with\s+category\s+(.+?))?(?:\s+and\s+progress\s+([0-9]+)%?)?$/i
                    );

                if (!naturalGoalMatch) {
                    addAIMessage(
                        "I need a goal title.",
                        "assistant"
                    );
                }

                else {
                    const goalTitle =
                        naturalGoalMatch[1].trim();

                    const goalCategory =
                        naturalGoalMatch[2]
                            ? naturalGoalMatch[2].trim()
                            : "Personal";

                    const goalProgress =
                        naturalGoalMatch[3]
                            ? naturalGoalMatch[3].trim()
                            : "0";

                    if (
                        !goalTitle ||
                        typeof createGoalFromAI !==
                            "function"
                    ) {
                        addAIMessage(
                            "I need a goal title.",
                            "assistant"
                        );
                    }

                    else {
                        window.aiFollowUpContext = {
                            type: "goal",
                            description:
                                `create the goal "${goalTitle}"`,
                            title: goalTitle,
                            category: goalCategory,
                            progress: goalProgress
                        };

                        showAIConfirmation(
                            "Create Goal?",
                            goalTitle,
                            `Goal · ${goalCategory} · ${goalProgress}% progress`,
                            () => {
                                showPage("goals");

                                const created =
                                    createGoalFromAI(
                                        goalTitle,
                                        goalCategory,
                                        goalProgress,
                                        ""
                                    );

                                if (created) {
                                    window.aiFollowUpContext = {
                                        type: "goal",
                                        description:
                                            `goal "${goalTitle}" created`,
                                        title: goalTitle,
                                        category: goalCategory,
                                        progress: goalProgress,
                                        id: created.id
                                    };

                                    addAIActionHistory({
                                        action: "Goal Created",
                                        description:
                                            `Created goal "${goalTitle}"`,
                                        status: "success",
                                        entityType: "goal",
                                        entityId: created.id
                                    });

                                    addAIMessage(
                                        `Goal "${goalTitle}" created successfully.`,
                                        "assistant"
                                    );
                                }

                                else {
                                    addAIMessage(
                                        "I couldn't create that goal. Please check the category and progress.",
                                        "assistant"
                                    );
                                }
                            }
                        );
                    }
                }
            }

            // ==========================================
            // CREATE GOAL — STRUCTURED
            // Format:
            // add goal Title | Category | Progress | Description
            // ==========================================

            else if (
                normalizedCommand.startsWith("add goal")
            ) {
                const goalCommand =
                    originalCommand
                        .replace(
                            /^add\s+goal\s*/i,
                            ""
                        )
                        .trim();

                const parts =
                    goalCommand
                        .split("|")
                        .map(
                            (part) =>
                                part.trim()
                        );

                const goalTitle =
                    parts[0] || "";

                const goalCategory =
                    parts[1] || "Personal";

                const goalProgress =
                    parts[2] || "0";

                const goalDescription =
                    parts
                        .slice(3)
                        .join(" | ")
                        .trim();

                if (
                    goalTitle &&
                    typeof createGoalFromAI ===
                        "function"
                ) {
                    window.aiFollowUpContext = {
                        type: "goal",
                        description:
                            `create the goal "${goalTitle}"`,
                        title: goalTitle,
                        category: goalCategory,
                        progress: goalProgress,
                        details: goalDescription
                    };

                    showAIConfirmation(
                        "Create Goal?",
                        goalTitle,
                        `Goal · ${goalCategory} · ${goalProgress}% progress`,
                        () => {

                            showPage("goals");

                            const created =
                                createGoalFromAI(
                                    goalTitle,
                                    goalCategory,
                                    goalProgress,
                                    goalDescription
                                );

                            if (created) {

                                // ==========================================
                                // AI ACTION HISTORY
                                // ==========================================

                                addAIActionHistory({

                                    action:
                                        "Goal Created",

                                    description:
                                        `Created goal "${goalTitle}"`,

                                    status:
                                        "success",

                                    entityType:
                                        "goal",

                                    entityId:
                                        created.id

                                });


                                addAIMessage(
                                    `Goal "${goalTitle}" created successfully.`,
                                    "assistant"
                                );

                            }

                            else {

                                addAIMessage(
                                    "I couldn't create that goal. Please check the category and progress.",
                                    "assistant"
                                );

                            }

                        }
                    );
                }

                else {
                    addAIMessage(
                        "Sure. What goal would you like me to add?",
                        "assistant"
                    );
                }
            }

            // ==========================================
            // CREATE PLANNER EVENT — CONFIRMATION
            // ==========================================

            else if (
                normalizedCommand.startsWith("add event") ||
                (
                    (
                        normalizedCommand.includes("schedule") ||
                        normalizedCommand.includes("meeting") ||
                        normalizedCommand.includes("appointment")
                    ) &&
                    (
                        normalizedCommand.includes("tomorrow") ||
                        normalizedCommand.includes("today")
                    )
                )
            ) {
                const eventDate =
                    normalizedCommand.includes("tomorrow")
                        ? "tomorrow"
                        : "today";

                const timeMatches =
                    normalizedCommand.match(
                        /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/gi
                    );

                const startTime =
                    timeMatches &&
                    timeMatches.length >= 1
                        ? timeMatches[0]
                        : "";

                const endTime =
                    timeMatches &&
                    timeMatches.length >= 2
                        ? timeMatches[1]
                        : "";

                let eventTitle =
                    originalCommand
                        .replace(
                            /^schedule\s+/i,
                            ""
                        )
                        .replace(
                            /^add\s+event\s+/i,
                            ""
                        )
                        .replace(
                            /^a\s+meeting\s+called\s+/i,
                            ""
                        )
                        .replace(
                            /^meeting\s+called\s+/i,
                            ""
                        )
                        .replace(
                            /\s+from\s+\d{1,2}(?::\d{2})?\s*(am|pm)?\s*(to|-)\s*\d{1,2}(?::\d{2})?\s*(am|pm)?/i,
                            ""
                        )
                        .replace(
                            /\s+at\s+\d{1,2}(?::\d{2})?\s*(am|pm)?/i,
                            ""
                        )
                        .replace(
                            /\s+(tomorrow|today)\b/i,
                            ""
                        )
                        .trim();

                if (
                    eventTitle.toLowerCase() ===
                    "a meeting"
                ) {
                    eventTitle = "Meeting";
                }

                const finalEventTitle =
                    eventTitle || "Meeting";

                if (
                    startTime &&
                    typeof createPlannerEventFromAI ===
                        "function"
                ) {
                    window.aiFollowUpContext = {
                        type: "planner",
                        description:
                            `schedule "${finalEventTitle}" for ${eventDate} at ${startTime}`,
                        title: finalEventTitle,
                        date: eventDate,
                        startTime,
                        endTime
                    };

                    showAIConfirmation(
                        "Schedule Event?",
                        finalEventTitle,
                        `Planner · ${eventDate} · ${startTime}`,
                        () => {

                            const created =
                                createPlannerEventFromAI(
                                    finalEventTitle,
                                    eventDate,
                                    startTime,
                                    endTime,
                                    ""
                                );

                            if (created) {

                                // ==========================================
                                // AI ACTION HISTORY
                                // ==========================================

                                addAIActionHistory({

                                    action:
                                        "Planner Created",

                                    description:
                                        `Scheduled "${finalEventTitle}" for ${eventDate} at ${startTime}`,

                                    status:
                                        "success",

                                    entityType:
                                        "planner",

                                    entityId:
                                        created.id

                                });


                                addAIMessage(
                                    `Scheduled "${finalEventTitle}" for ${eventDate} from ${startTime}${endTime ? ` to ${endTime}` : ""}.`,
                                    "assistant"
                                );

                            }

                            else {

                                addAIMessage(
                                    "I understood the scheduling request, but I couldn't create the event. Please check the date and time.",
                                    "assistant"
                                );

                            }

                        }
                    );
                }

                else {
                    addAIMessage(
                        "I understood this as a scheduling request, but I need a valid time.",
                        "assistant"
                    );
                }
            }

           // ==========================================
            // ADD EXPENSE — STRUCTURED
            // Format:
            // add expense 850 | Food | Dinner
            // ==========================================

            else if (
                normalizedCommand.startsWith(
                    "add expense"
                )
            ) {

                const expenseCommand =
                    originalCommand
                        .replace(
                            /^add\s+expense\s*/i,
                            ""
                        )
                        .trim();


                const parts =
                    expenseCommand
                        .split("|")
                        .map(
                            (part) =>
                                part.trim()
                        );


                const amount =
                    Number(
                        (
                            parts[0] || ""
                        ).replace(
                            /,/g,
                            ""
                        )
                    );


                const category =
                    parts[1] ||
                    "Other";


                const description =
                    parts
                        .slice(2)
                        .join(" | ")
                        .trim();


                if (
                    amount > 0 &&
                    typeof createFinanceTransactionFromAI ===
                        "function"
                ) {

                    window.aiFollowUpContext = {

                        type:
                            "expense",

                        description:
                            `record an expense of Rs ${amount.toLocaleString("en-PK")}`,

                        amount:
                            amount,

                        category:
                            category,

                        details:
                            description

                    };


                    showAIConfirmation(

                        "Record Expense?",

                        `Rs ${amount.toLocaleString("en-PK")}`,

                        `${category} · ${description || "Expense"}`,

                        () => {

                            const created =
                                createFinanceTransactionFromAI(
                                    "expense",
                                    amount,
                                    category,
                                    description
                                );


                            if (created) {

                                // ==========================================
                                // AI ACTION HISTORY
                                // ==========================================

                                addAIActionHistory({

                                    action:
                                        "Expense Created",

                                    description:
                                        `Recorded expense of Rs ${amount.toLocaleString("en-PK")} · ${category}${description ? ` · ${description}` : ""}`,

                                    status:
                                        "success",

                                    entityType:
                                        "expense",

                                    entityId:
                                        created.id

                                });


                                addAIMessage(
                                    `Expense of Rs ${amount.toLocaleString("en-PK")} added successfully.`,
                                    "assistant"
                                );

                            }

                            else {

                                addAIMessage(
                                    "I couldn't record that expense. Please try again.",
                                    "assistant"
                                );

                            }

                        }
                    );

                }

                else {

                    addAIMessage(
                        "Sure. Tell me the expense amount and details.",
                        "assistant"
                    );

                }
            }

            // ==========================================
            // NATURAL LANGUAGE EXPENSE
            // ==========================================

            else if (

                normalizedCommand.includes("spent") ||

                normalizedCommand.includes("spend") ||

                normalizedCommand.includes("paid") ||

                normalizedCommand.includes("bought") ||

                normalizedCommand.includes("purchase") ||

                normalizedCommand.includes("purchased") ||

                normalizedCommand.includes("cost me")

            ) {

                const numberMatch =

                    normalizedCommand.match(
                        /[0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?/
                    );


                if (!numberMatch) {

                    addAIMessage(
                        "I understood this as an expense, but I couldn't find a valid amount.",
                        "assistant"
                    );

                }

                else {

                    const amount =

                        Number(
                            numberMatch[0].replace(/,/g, "")
                        );


                    let description =

                        originalCommand

                            .replace(
                                /^(i\s+)?(spent|spend|paid|bought|purchase|purchased|cost\s+me)\s+/i,
                                ""
                            )

                            .replace(
                                /^[0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?\s*(rs\.?|pkr|rupees?)?\s*/i,
                                ""
                            )

                            .replace(
                                /\b(today|yesterday)\b/gi,
                                ""
                            )

                            .trim();


                    description =

                        description

                            .replace(
                                /^(on|for)\s+/i,
                                ""
                            )

                            .trim();


                    let category = "Other";


                    const lowerDescription =
                        description.toLowerCase();


                    if (

                        [

                            "dinner",
                            "lunch",
                            "breakfast",
                            "food",
                            "meal",
                            "restaurant",
                            "groceries",
                            "pizza",
                            "burger",
                            "tea",
                            "coffee",
                            "milk shake",
                            "milkshake"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Food";

                    }

                    else if (

                        [

                            "electricity",
                            "gas",
                            "water",
                            "internet",
                            "wifi",
                            "bill",
                            "utility",
                            "mobile",
                            "phone"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Bills";

                    }

                    else if (

                        [

                            "uber",
                            "careem",
                            "taxi",
                            "fuel",
                            "petrol",
                            "diesel",
                            "transport",
                            "bus",
                            "train",
                            "ride"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Transport";

                    }

                    else if (

                        [

                            "shirt",
                            "clothes",
                            "clothing",
                            "shoes",
                            "shopping",
                            "watch",
                            "bag",
                            "electronics"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Shopping";

                    }

                    else if (

                        [

                            "doctor",
                            "hospital",
                            "medicine",
                            "medical",
                            "pharmacy",
                            "clinic",
                            "gym"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Health";

                    }

                    else if (

                        [

                            "book",
                            "course",
                            "school",
                            "college",
                            "university",
                            "tuition",
                            "education"

                        ].some(

                            (word) =>
                                lowerDescription.includes(word)

                        )

                    ) {

                        category = "Education";

                    }


                    if (

                        amount > 0 &&

                        typeof createFinanceTransactionFromAI ===
                            "function"

                    ) {

                        window.aiFollowUpContext = {

                            type:
                                "expense",

                            description:
                                `record an expense of Rs ${amount.toLocaleString("en-PK")}`,

                            amount:
                                amount,

                            category:
                                category,

                            details:
                                description

                        };


                        showAIConfirmation(

                            "Record Expense?",

                            `Rs ${amount.toLocaleString("en-PK")}`,

                            `${category} · ${description || "Expense"}`,

                            () => {

                                const created =
                                    createFinanceTransactionFromAI(
                                        "expense",
                                        amount,
                                        category,
                                        description
                                    );


                                if (created) {

                                    // ==========================================
                                    // AI ACTION HISTORY
                                    // ==========================================

                                    addAIActionHistory({

                                        action:
                                            "Expense Created",

                                        description:
                                            `Recorded expense of Rs ${amount.toLocaleString("en-PK")} · ${category}${description ? ` · ${description}` : ""}`,

                                        status:
                                            "success",

                                        entityType:
                                            "expense",

                                        entityId:
                                            created.id

                                    });


                                    addAIMessage(

                                        `Got it. I recorded Rs ${amount.toLocaleString("en-PK")} as ${category.toLowerCase()} expense${description ? ` for ${description}` : ""}.`,

                                        "assistant"

                                    );

                                }

                                else {

                                    addAIMessage(

                                        "I couldn't record that expense. Please try again.",

                                        "assistant"

                                    );

                                }

                            }

                        );

                    }

                    else {

                        addAIMessage(

                            "I understood the expense, but the amount doesn't look valid.",

                            "assistant"

                        );

                    }

                }

            }

            // ==========================================
            // ADD INCOME
            // ==========================================

            else if (

                normalizedCommand.startsWith("add income") ||

                normalizedCommand.includes("received") ||

                normalizedCommand.includes("salary")

            ) {

                const numberMatch =

                    normalizedCommand.match(
                        /[0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?/
                    );


                if (!numberMatch) {

                    addAIMessage(
                        "Sure. Tell me the income amount.",
                        "assistant"
                    );

                }

                else {

                    const amount =

                        Number(
                            numberMatch[0].replace(
                                /,/g,
                                ""
                            )
                        );


                    let description =

                        originalCommand

                            .replace(
                                /^add\s+income\s+/i,
                                ""
                            )

                            .replace(
                                /^(i\s+)?received\s+/i,
                                ""
                            )

                            .replace(
                                /^[0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?\s*(rs\.?|pkr|rupees?)?\s*/i,
                                ""
                            )

                            .trim();


                    if (

                        typeof createFinanceTransactionFromAI ===
                            "function" &&

                        amount > 0

                    ) {

                        window.aiFollowUpContext = {

                            type:
                                "income",

                            description:
                                `record income of Rs ${amount.toLocaleString("en-PK")}`,

                            amount:
                                amount,

                            details:
                                description

                        };


                        showAIConfirmation(

                            "Record Income?",

                            `Rs ${amount.toLocaleString("en-PK")}`,

                            `Income · ${description || "General income"}`,

                            () => {

                                const created =
                                    createFinanceTransactionFromAI(
                                        "income",
                                        amount,
                                        "Income",
                                        description
                                    );


                                if (created) {

                                    // ==========================================
                                    // AI ACTION HISTORY
                                    // ==========================================

                                    addAIActionHistory({

                                        action:
                                            "Income Created",

                                        description:
                                            `Recorded income of Rs ${amount.toLocaleString("en-PK")}${description ? ` · ${description}` : ""}`,

                                        status:
                                            "success",

                                        entityType:
                                            "income",

                                        entityId:
                                            created.id

                                    });


                                    addAIMessage(

                                        `Income of Rs ${amount.toLocaleString("en-PK")} added successfully.`,

                                        "assistant"

                                    );

                                }

                                else {

                                    addAIMessage(

                                        "I couldn't record that income. Please try again.",

                                        "assistant"

                                    );

                                }

                            }

                        );

                    }

                    else {

                        addAIMessage(

                            "I couldn't record that income. Please check the amount.",

                            "assistant"

                        );

                    }

                }

            }

           // ==========================================
            // CREATE TASK — NATURAL LANGUAGE
            // ==========================================

            else if (

                normalizedCommand.startsWith("create task") ||

                normalizedCommand.startsWith("create a task") ||

                normalizedCommand.startsWith("make a task") ||

                normalizedCommand.startsWith("make task") ||

                normalizedCommand.startsWith("add a task") ||

                normalizedCommand.startsWith("add task") ||

                normalizedCommand.startsWith("remind me to") ||

                normalizedCommand.startsWith("remind me ") ||

                normalizedCommand.includes("need to") ||

                normalizedCommand.startsWith("i have to ") ||

                normalizedCommand.startsWith("i want to ") ||

                normalizedCommand.startsWith("can you add ") ||

                normalizedCommand.startsWith("please add ") ||

                normalizedCommand.startsWith("put ")

            ) {

               

                // ==========================================
                // AI FOLLOW-UP: REMINDER FOR PREVIOUS TASK
                // ==========================================

                if (
                    window.aiFollowUpContext &&
                    window.aiFollowUpContext.type === "task" &&
                    normalizedCommand.startsWith("remind me ") &&
                    !/^remind\s+me\s+.+\s+to\s+.+$/i.test(
                        originalCommand
                    )
                ) {

                    const task =
                        findTaskForAI({
                            id:
                                window.aiFollowUpContext.id
                        });

                    if (!task) {

                        addAIMessage(
                            "I couldn't find the previous task.",
                            "assistant"
                        );

                        return;
                    }

                    const reminderDateTime =
                        parseAIReminderDateTime(
                            originalCommand
                        );

                    if (!reminderDateTime) {

                        addAIMessage(
                            "I couldn't understand the reminder time. Try something like: \"Remind me tomorrow at 10pm.\"",
                            "assistant"
                        );

                        return;
                    }

                    task.reminder =
                        reminderDateTime.toISOString();

                    task.reminderTriggered =
                        false;

                    saveTasks();

                    renderTasks();

                    updateDashboardStats();

                    refreshAnalytics();

                    renderDashboardProductivity();

                    const reminderText =
                        reminderDateTime.toLocaleString(
                            [],
                            {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "numeric",
                                minute: "2-digit"
                            }
                        );

                    window.aiFollowUpContext = {

                        type:
                            "task",

                        description:
                            `task "${task.title}" reminder set for ${reminderText}`,

                        title:
                            task.title,

                        id:
                            task.id

                    };

                    addAIActionHistory({

                        action:
                            "Task Reminder Updated",

                        description:
                            `Set reminder for "${task.title}" at ${reminderText}`,

                        status:
                            "success",

                        entityType:
                            "task",

                        entityId:
                            task.id

                    });

                    addAIMessage(
                        `Done. I set a reminder for "${task.title}" at ${reminderText}.`,
                        "assistant"
                    );

                    return;
                }

                const reminderCommandMatch =
                    originalCommand.match(
                        /^remind\s+me\s+(.+?)\s+to\s+(.+)$/i
                    );


                if (
                    reminderCommandMatch &&
                    typeof createTaskFromAI ===
                        "function" &&
                    typeof parseAIReminderDateTime ===
                        "function"
                ) {

                    const reminderInstruction =
                        reminderCommandMatch[1]
                            .trim();

                    const taskTitle =
                        reminderCommandMatch[2]
                            .replace(/[.!?]+\s*$/i, "")
                            .trim();


                    const reminderDateTime =
                        parseAIReminderDateTime(
                            originalCommand
                        );


                    if (
                        !taskTitle ||
                        !reminderDateTime
                    ) {

                        addAIMessage(

                            "I couldn't understand the reminder time. Try something like: \"Remind me tomorrow at 5pm to call Ali.\"",

                            "assistant"

                        );

                        return;
                    }


                    const reminderText =
                        reminderDateTime.toLocaleString(
                            [],
                            {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                hour: "numeric",
                                minute: "2-digit"
                            }
                        );


                    window.aiFollowUpContext = {

                        type:
                            "task",

                        description:
                            `create the task "${taskTitle}" with a reminder`,

                        title:
                            taskTitle

                    };


                    showAIConfirmation(

                        "Create Reminder?",

                        taskTitle,

                        `Task · ${reminderText}`,

                        () => {

                            showPage("tasks");


                            const created =
                                createTaskFromAI(
                                    taskTitle
                                );


                            if (!created) {

                                addAIMessage(

                                    "I couldn't create that reminder. Please try again.",

                                    "assistant"

                                );

                                return;
                            }


                            // ==========================================
                            // SAVE REMINDER ON CREATED TASK
                            // ==========================================

                            created.reminder =
                                reminderDateTime.toISOString();

                            created.reminderTriggered =
                                false;


                            saveTasks();

                            renderTasks();

                            updateDashboardStats();

                            refreshAnalytics();

                            renderDashboardProductivity();


                            // ==========================================
                            // AI FOLLOW-UP CONTEXT
                            // ==========================================

                            window.aiFollowUpContext = {

                                type:
                                    "task",

                                description:
                                    `task "${taskTitle}" with a reminder created`,

                                title:
                                    taskTitle,

                                id:
                                    created.id

                            };


                            // ==========================================
                            // AI ACTION HISTORY
                            // ==========================================

                            addAIActionHistory({

                                action:
                                    "Reminder Created",

                                description:
                                    `Created reminder for "${taskTitle}" at ${reminderText}`,

                                status:
                                    "success",

                                entityType:
                                    "task",

                                entityId:
                                    created.id

                            });


                            addAIMessage(

                                `Done. I created the task "${taskTitle}" with a reminder for ${reminderText}.`,

                                "assistant"

                            );

                        }

                    );


                    return;
                }


                // ==========================================
                // NORMAL TASK CREATION
                // ==========================================

                let taskTitle =

                    originalCommand

                        .replace(
                            /^create\s+(?:a\s+)?task\s*(?:for|called)?\s*/i,
                            ""
                        )

                        .replace(
                            /^make\s+(?:a\s+)?task\s*(?:for|called)?\s*/i,
                            ""
                        )

                        .replace(
                            /^add\s+(?:a\s+)?task\s*(?:for|called)?\s*/i,
                            ""
                        )

                        .replace(
                            /^remind\s+me\s+to\s+/i,
                            ""
                        )

                        .replace(
                            /^i\s+need\s+to\s+/i,
                            ""
                        )

                        .replace(
                            /^i\s+have\s+to\s+/i,
                            ""
                        )

                        .replace(
                            /^i\s+want\s+to\s+/i,
                            ""
                        )

                        .replace(
                            /^can\s+you\s+add\s+/i,
                            ""
                        )

                        .replace(
                            /^please\s+add\s+/i,
                            ""
                        )

                        .replace(
                            /^put\s+/i,
                            ""
                        )

                        .replace(
                            /\s+to\s+my\s+(tasks|task list)\s*$/i,
                            ""
                        )

                        .replace(
                            /\s+in\s+my\s+task\s+list\s*$/i,
                            ""
                        )

                        .replace(
                            /\s+as\s+a\s+task\s*$/i,
                            ""
                        )

                        .replace(
                            /[.!?]+\s*$/i,
                            ""
                        )

                        .trim();


                if (

                    !taskTitle ||

                    typeof createTaskFromAI !==
                        "function"

                ) {

                    addAIMessage(

                        "Sure. What task would you like me to create?",

                        "assistant"

                    );

                }

                else {

                    window.aiFollowUpContext = {

                        type:
                            "task",

                        description:
                            `create the task "${taskTitle}"`,

                        title:
                            taskTitle

                    };


                    showAIConfirmation(

                        "Create Task?",

                        taskTitle,

                        "Task · Medium priority",

                        () => {

                            showPage("tasks");


                            const created =
                                createTaskFromAI(
                                    taskTitle
                                );


                            if (created) {

                                window.aiFollowUpContext = {

                                    type:
                                        "task",

                                    description:
                                        `create the task "${taskTitle}"`,

                                    title:
                                        taskTitle,

                                    id:
                                        created.id

                                };


                                // ==========================================
                                // AI ACTION HISTORY
                                // ==========================================

                                addAIActionHistory({

                                    action:
                                        "Task Created",

                                    description:
                                        `Created task "${taskTitle}"`,

                                    status:
                                        "success",

                                    entityType:
                                        "task",

                                    entityId:
                                        created.id

                                });


                                addAIMessage(

                                    `Got it. I created a task: "${taskTitle}".`,

                                    "assistant"

                                );

                            }

                            else {

                                addAIMessage(

                                    "I couldn't create that task. Please try again.",

                                    "assistant"

                                );

                            }

                        }

                    );

                }

            }

            // ==========================================
            // FALLBACK
            // ==========================================

            else {
                addAIMessage(
                    "I understood your request, but I don't have an action for it yet. Try asking me to create a task, note, goal, planner event, expense, income, or query your data.",
                    "assistant"
                );
            }
        }

        catch (error) {
            console.error(
                "AI Command Error:",
                error
            );

            addAIMessage(
                "Something went wrong while processing that command. Please try again.",
                "assistant"
            );
        }

        finally {
            setAIStatus("Ready");
        }
    }, 350);
}


if (aiSendCommandBtn) {
    aiSendCommandBtn.addEventListener(
        "click",
        () => {

            if (!aiCommandInput) return;

            const command =
                aiCommandInput.value;

            if (!command.trim()) {
                return;
            }

            handleAICommand(
                command
            );

            aiCommandInput.value = "";
        }
    );
}


if (aiCommandInput) {
    aiCommandInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Enter"
            ) {
                event.preventDefault();

                if (
                    aiSendCommandBtn
                ) {
                    aiSendCommandBtn.click();
                }
            }

        }
    );
}


aiSuggestions.forEach(
    (suggestion) => {

        suggestion.addEventListener(
            "click",
            () => {

                const command =
                    suggestion.dataset
                        .command;

                if (!command) {
                    return;
                }

                if (aiCommandInput) {
                    aiCommandInput.value =
                        command;

                    aiCommandInput.focus();
                }

            }
        );

    }
);

// ==========================================
// FINANCE TRANSACTION MODAL
// ==========================================

const financeModal =
    document.getElementById(
        "financeModal"
    );

const financeModalOverlay =
    document.getElementById(
        "financeModalOverlay"
    );

const financeModalCloseBtn =
    document.getElementById(
        "financeModalCloseBtn"
    );

const financeCancelBtn =
    document.getElementById(
        "financeCancelBtn"
    );

const financeForm =
    document.getElementById(
        "financeForm"
    );

const financeType =
    document.getElementById(
        "financeType"
    );

const financeAmount =
    document.getElementById(
        "financeAmount"
    );

const financeCategory =
    document.getElementById(
        "financeCategory"
    );

const financeDate =
    document.getElementById(
        "financeDate"
    );

const financeDescription =
    document.getElementById(
        "financeDescription"
    );

const financeModalTitle =
    document.getElementById(
        "financeModalTitle"
    );

const financeSaveBtn =
    document.getElementById(
        "financeSaveBtn"
    );

let editingFinanceTransactionId =
    null;

const addTransactionBtn =
    document.getElementById(
        "addTransactionBtn"
    );

const financeEmptyAddBtn =
    document.getElementById(
        "financeEmptyAddBtn"
    );

function openFinanceModal() {

    if (!financeModal) {
        return;
    }

    editingFinanceTransactionId =
        null;

    if (financeModalTitle) {
        financeModalTitle.textContent =
            "Add Transaction";
    }

    if (financeSaveBtn) {
        financeSaveBtn.textContent =
            "Add Transaction";
    }

    financeModal.classList.add(
        "active"
    );

    if (financeDate) {
        financeDate.value =
            new Date()
                .toISOString()
                .split("T")[0];
    }

    if (financeAmount) {
        setTimeout(() => {
            financeAmount.focus();
        }, 50);
    }

}

function closeFinanceModal() {

    if (!financeModal) {
        console.log(
            "Finance modal not found"
        );
        return;
    }

    financeModal.classList.remove(
        "active"
    );

    if (financeForm) {
        financeForm.reset();
    }

    if (financeType) {
        financeType.value =
            "expense";
    }

    if (financeCategory) {
        financeCategory.value =
            "Food";
    }

}

function closeFinanceModal() {

    if (!financeModal) {
        return;
    }

    financeModal.classList.remove(
        "active"
    );

    if (financeForm) {
        financeForm.reset();
    }

    if (financeType) {
        financeType.value =
            "expense";
    }

    if (financeCategory) {
        financeCategory.value =
            "Food";
    }

}

// ==========================================
// FINANCE MODAL EVENTS
// ==========================================

if (addTransactionBtn) {

    addTransactionBtn.addEventListener(
        "click",
        () => {
            openFinanceModal();
        }
    );

}

if (financeEmptyAddBtn) {

    financeEmptyAddBtn.addEventListener(
        "click",
        () => {
            openFinanceModal();
        }
    );

}

if (financeModalCloseBtn) {

    financeModalCloseBtn.addEventListener(
        "click",
        () => {
            closeFinanceModal();
        }
    );

}

if (financeCancelBtn) {

    financeCancelBtn.addEventListener(
        "click",
        () => {
            closeFinanceModal();
        }
    );

}

if (financeModalOverlay) {

    financeModalOverlay.addEventListener(
        "click",
        () => {
            closeFinanceModal();
        }
    );

}

// ==========================================
// FINANCE FORM SUBMIT
// ==========================================

function saveFinanceTransaction() {

    const type =
        financeType
            ? financeType.value
            : "expense";

    const amount =
        financeAmount
            ? Number(
                financeAmount.value
            )
            : 0;

    const category =
        financeCategory
            ? financeCategory.value
            : "Other";

    const date =
        financeDate
            ? financeDate.value
            : "";

    const description =
        financeDescription
            ? financeDescription.value.trim()
            : "";


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !amount ||
        amount <= 0
    ) {

        if (financeAmount) {
            financeAmount.focus();
        }

        return;
    }


    if (!date) {

        if (financeDate) {
            financeDate.focus();
        }

        return;
    }


    // ==========================================
    // EDIT EXISTING TRANSACTION
    // ==========================================

    if (
        editingFinanceTransactionId !==
        null
    ) {

        const transaction =
            transactions.find(
                (item) =>
                    Number(item.id) ===
                    Number(
                        editingFinanceTransactionId
                    )
            );

        if (!transaction) {
            return;
        }

        transaction.type =
            type;

        transaction.amount =
            amount;

        transaction.category =
            category;

        transaction.date =
            date;

        transaction.description =
            description;


        saveTransactions();

        addDashboardActivity({
                action: "Finance Updated",
                description: `Updated ${type}: ${description || category}`,
                entityType: "finance",
                entityId: transaction.id
            });

        renderFinanceTransactions();

        updateDashboardMonthlyBalance();

        updateFinanceOverview();

        closeFinanceModal();

        editingFinanceTransactionId =
            null;

        return;

    }


    // ==========================================
    // ADD NEW TRANSACTION
    // ==========================================

    const newTransaction = {

        id:
            Date.now(),

        type:
            type,

        amount:
            amount,

        category:
            category,

        date:
            date,

        description:
            description,

        createdAt:
            new Date().toISOString()

    };


    transactions.unshift(
        newTransaction
    );


    saveTransactions();

    addDashboardActivity({
            action: "Finance Added",
            description: `Added ${type}: ${description || category}`,
            entityType: "finance",
            entityId: newTransaction.id
        });

    renderFinanceTransactions();

    updateFinanceOverview();

    closeFinanceModal();

}


// ==========================================
// FINANCE FORM SUBMIT EVENT
// ==========================================

if (financeForm) {

    financeForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            saveFinanceTransaction();

        }
    );

}

// ==========================================
// FINANCE TRANSACTIONS
// ==========================================

let transactions =
    JSON.parse(
        localStorage.getItem(
            "commandCenterTransactions"
        )
    ) || [];

const financeTransactions =
    document.getElementById(
        "financeTransactions"
    );

function saveTransactions() {

    localStorage.setItem(
        "commandCenterTransactions",
        JSON.stringify(
            transactions
        )
    );

}

// ==========================================
// AI FINANCE TRANSACTION HELPER
// ==========================================

function createFinanceTransactionFromAI(
    type,
    amount,
    category = "Other",
    description = ""
) {

    const cleanType =
        type === "income"
            ? "income"
            : "expense";

    const cleanAmount =
        Number(amount);

    if (
        Number.isNaN(cleanAmount) ||
        cleanAmount <= 0
    ) {
        return false;
    }

    const newTransaction = {

        id: Date.now(),

        type: cleanType,

        amount: cleanAmount,

        category:
            category.trim() || "Other",

        date:
            new Date()
                .toISOString()
                .split("T")[0],

        description:
            description.trim(),

        createdAt:
            new Date().toISOString()
    };

    transactions.unshift(
        newTransaction
    );

    saveTransactions();

    if (
        typeof renderFinanceTransactions ===
        "function"
    ) {
        renderFinanceTransactions();
    }

    if (
        typeof updateFinanceOverview ===
        "function"
    ) {
        updateFinanceOverview();
    }

    return true;
}

function renderFinanceTransactions() {

    if (!financeTransactions) {
        return;
    }

    financeTransactions.innerHTML = "";

    if (transactions.length === 0) {

        financeTransactions.innerHTML = `
            <div class="finance-empty-state">

                <div class="finance-empty-icon">
                    ◈
                </div>

                <h4>
                    No transactions yet
                </h4>

                <p>
                    Add your first income or expense to start tracking your finances.
                </p>

                <button
                    class="primary-button"
                    id="financeEmptyAddBtn"
                    type="button"
                >
                    <span>＋</span>
                    Add Transaction
                </button>

            </div>
        `;

        const emptyAddButton =
            document.getElementById(
                "financeEmptyAddBtn"
            );

        if (emptyAddButton) {

            emptyAddButton.addEventListener(
                "click",
                () => {
                    openFinanceModal();
                }
            );

        }

        return;
    }

    transactions.forEach(
        (transaction) => {

            const transactionItem =
                document.createElement(
                    "div"
                );

            transactionItem.className =
                "finance-transaction-item";

            const formattedAmount =
                Number(
                    transaction.amount
                ).toLocaleString(
                    "en-PK"
                );

            const formattedDate =
                new Date(
                    transaction.date
                ).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }
                );

            const amountPrefix =
                transaction.type ===
                "income"
                    ? "+"
                    : "-";

            transactionItem.innerHTML = `
                <div class="finance-transaction-main">

                    <div class="finance-transaction-icon ${
                        transaction.type ===
                        "income"
                            ? "income"
                            : "expense"
                    }">
                       ${
                            transaction.type ===
                            "income"
                                ? "+"
                                : "−"
                        }
                    </div>

                    <div class="finance-transaction-info">

                        <strong>
                            ${
                                transaction.description ||
                                transaction.category
                            }
                        </strong>

                        <span>
                            ${transaction.category}
                            ·
                            ${formattedDate}
                        </span>

                    </div>

                </div>

                <div class="finance-transaction-right">

                <div class="finance-transaction-amount ${
                    transaction.type ===
                    "income"
                        ? "income"
                        : "expense"
                }">
                    ${amountPrefix} Rs ${formattedAmount}
                </div>

                <div class="finance-transaction-actions">

                    <button
                        type="button"
                        class="finance-edit-button"
                        data-transaction-id="${transaction.id}"
                        aria-label="Edit transaction"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="finance-delete-button"
                        data-transaction-id="${transaction.id}"
                        aria-label="Delete transaction"
                    >
                        Delete
                    </button>

                </div>

            </div>
            `;

            financeTransactions.appendChild(
                transactionItem
            );

        }
    );

}

renderFinanceTransactions();

// ==========================================
// FINANCE DELETE CONFIRMATION
// ==========================================

const financeDeleteModal =
    document.getElementById(
        "financeDeleteModal"
    );

const financeDeleteModalOverlay =
    document.getElementById(
        "financeDeleteModalOverlay"
    );

const financeDeleteCancelBtn =
    document.getElementById(
        "financeDeleteCancelBtn"
    );

const financeDeleteConfirmBtn =
    document.getElementById(
        "financeDeleteConfirmBtn"
    );

const financeDeleteModalMessage =
    document.getElementById(
        "financeDeleteModalMessage"
    );

let pendingFinanceDeleteId = null;


// OPEN DELETE MODAL

function openFinanceDeleteModal(
    transactionId
) {

    if (!financeDeleteModal) {
        return;
    }

    pendingFinanceDeleteId =
        Number(transactionId);

    const transaction =
        transactions.find(
            (item) =>
                Number(item.id) ===
                pendingFinanceDeleteId
        );

    if (
        transaction &&
        financeDeleteModalMessage
    ) {

        const transactionName =
            transaction.description ||
            transaction.category;

        financeDeleteModalMessage.textContent =
            `"${transactionName}" will be permanently removed from your finance records.`;

    }

    financeDeleteModal.classList.add(
        "active"
    );

}


// CLOSE DELETE MODAL

function closeFinanceDeleteModal() {

    if (!financeDeleteModal) {
        return;
    }

    financeDeleteModal.classList.remove(
        "active"
    );

    pendingFinanceDeleteId = null;

}


// DELETE BUTTON CLICK

if (financeTransactions) {

    financeTransactions.addEventListener(
        "click",
        (event) => {

            const editButton =
                event.target.closest(
                    ".finance-edit-button"
                );

            const deleteButton =
                event.target.closest(
                    ".finance-delete-button"
                );


            // ==================================
            // EDIT TRANSACTION
            // ==================================

            if (editButton) {

                const transactionId =
                    Number(
                        editButton.dataset
                            .transactionId
                    );

                const transaction =
                    transactions.find(
                        (item) =>
                            Number(item.id) ===
                            transactionId
                    );

                if (!transaction) {
                    return;
                }

                editingFinanceTransactionId =
                    transactionId;

                if (financeType) {
                    financeType.value =
                        transaction.type;
                }

                if (financeAmount) {
                    financeAmount.value =
                        transaction.amount;
                }

                if (financeCategory) {
                    financeCategory.value =
                        transaction.category;
                }

                if (financeDate) {
                    financeDate.value =
                        transaction.date;
                }

                if (financeDescription) {
                    financeDescription.value =
                        transaction.description ||
                        "";
                }

                if (financeModalTitle) {
                    financeModalTitle.textContent =
                        "Edit Transaction";
                }

                if (financeSaveBtn) {
                    financeSaveBtn.textContent =
                        "Save Changes";
                }

                if (financeModal) {
                    financeModal.classList.add(
                        "active"
                    );
                }

                if (financeAmount) {
                    financeAmount.focus();
                }

                return;
            }


            // ==================================
            // DELETE TRANSACTION
            // ==================================

            if (deleteButton) {

                openFinanceDeleteModal(
                    deleteButton.dataset
                        .transactionId
                );

            }

        }
    );

}


// CONFIRM DELETE

if (financeDeleteConfirmBtn) {

    financeDeleteConfirmBtn.addEventListener(
        "click",
        () => {

            if (
                pendingFinanceDeleteId ===
                null
            ) {
                return;
            }

            const transactionIndex =
                transactions.findIndex(
                    (item) =>
                        Number(item.id) ===
                        Number(
                            pendingFinanceDeleteId
                        )
                );

            if (
                transactionIndex === -1
            ) {
                closeFinanceDeleteModal();
                return;
            }

            transactions.splice(
                transactionIndex,
                1
            );

            saveTransactions();

            renderFinanceTransactions();

            updateFinanceOverview();

            closeFinanceDeleteModal();

        }
    );

}


// CANCEL

if (financeDeleteCancelBtn) {

    financeDeleteCancelBtn.addEventListener(
        "click",
        () => {

            closeFinanceDeleteModal();

        }
    );

}


// OVERLAY CLICK

if (financeDeleteModalOverlay) {

    financeDeleteModalOverlay.addEventListener(
        "click",
        () => {

            closeFinanceDeleteModal();

        }
    );

}


// ==========================================
// FINANCE OVERVIEW CALCULATIONS
// ==========================================

const financeBalance =
    document.getElementById(
        "financeBalance"
    );

const financeIncome =
    document.getElementById(
        "financeIncome"
    );

const financeExpenses =
    document.getElementById(
        "financeExpenses"
    );

const financeSavings =
    document.getElementById(
        "financeSavings"
    );

function formatFinanceAmount(
    amount
) {

    return Number(
        amount || 0
    ).toLocaleString(
        "en-PK"
    );

}

function updateFinanceOverview() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(
        (transaction) => {

            const amount =
                Number(
                    transaction.amount
                ) || 0;

            if (
                transaction.type ===
                "income"
            ) {
                income += amount;
            }

            else {

                expenses += amount;

            }

        }
    );

    const balance =
        income - expenses;

    const savings =
        income - expenses;

    if (financeBalance) {

        financeBalance.textContent =
            `Rs ${formatFinanceAmount(
                balance
            )}`;

    }

    if (financeIncome) {

        financeIncome.textContent =
            `Rs ${formatFinanceAmount(
                income
            )}`;

    }

    if (financeExpenses) {

        financeExpenses.textContent =
            `Rs ${formatFinanceAmount(
                expenses
            )}`;

    }

    if (financeSavings) {

        financeSavings.textContent =
            `Rs ${formatFinanceAmount(
                savings
            )}`;

    }

}

updateFinanceOverview();

 // ==========================================
// GOALS MODAL ELEMENTS
// ==========================================

const goalModal =
    document.getElementById(
        "goalModal"
    );

const goalModalOverlay =
    document.getElementById(
        "goalModalOverlay"
    );

const goalModalCloseBtn =
    document.getElementById(
        "goalModalCloseBtn"
    );

const goalCancelBtn =
    document.getElementById(
        "goalCancelBtn"
    );

const addGoalBtn =
    document.getElementById(
        "addGoalBtn"
    );

const goalForm =
    document.getElementById(
        "goalForm"
    );

const goalTitle =
    document.getElementById(
        "goalTitle"
    );

const goalCategory =
    document.getElementById(
        "goalCategory"
    );

const goalProgress =
    document.getElementById(
        "goalProgress"
    );

const goalDescription =
    document.getElementById(
        "goalDescription"
    );


// ==========================================
// GOAL MODAL FUNCTIONS
// ==========================================

function openGoalModal() {

    if (!goalModal) {
        return;
    }

    if (goalForm) {

        goalForm.reset();

        delete goalForm.dataset.editingGoalId;
    }

    const modalTitle =
        document.getElementById(
            "goalModalTitle"
        );

    const submitButton =
        goalForm
            ? goalForm.querySelector(
                'button[type="submit"]'
            )
            : null;

    if (modalTitle) {
        modalTitle.textContent =
            "Create New Goal";
    }

    if (submitButton) {
        submitButton.textContent =
            "Create Goal";
    }

    goalModal.classList.add(
        "active"
    );

    if (goalTitle) {
        goalTitle.focus();
    }
}


function closeGoalModal() {

    if (!goalModal) {
        return;
    }

    goalModal.classList.remove(
        "active"
    );

}

// ==========================================
// AI GOAL CONFIRMATION MODAL
// ==========================================

const aiGoalConfirmModal =
    document.getElementById(
        "aiGoalConfirmModal"
    );

const aiGoalConfirmName =
    document.getElementById(
        "aiGoalConfirmName"
    );

const aiGoalConfirmCategory =
    document.getElementById(
        "aiGoalConfirmCategory"
    );

const aiGoalConfirmCreateBtn =
    document.getElementById(
        "aiGoalConfirmCreateBtn"
    );

const aiGoalConfirmCancelBtn =
    document.getElementById(
        "aiGoalConfirmCancelBtn"
    );

const aiGoalConfirmCloseBtn =
    document.getElementById(
        "aiGoalConfirmCloseBtn"
    );

const aiGoalConfirmOverlay =
    document.getElementById(
        "aiGoalConfirmOverlay"
    );


// ==========================================
// PENDING AI GOAL
// ==========================================

let pendingAIGoal = null;


// ==========================================
// OPEN AI GOAL CONFIRMATION
// ==========================================

function openAIGoalConfirmation(
    title,
    category = "Personal"
) {

    if (!aiGoalConfirmModal) {
        return;
    }

    pendingAIGoal = {
        title: title,
        category: category
    };

    if (aiGoalConfirmName) {
        aiGoalConfirmName.value =
            title;
    }

    if (aiGoalConfirmCategory) {
        aiGoalConfirmCategory.value =
            category;
    }

    aiGoalConfirmModal.classList.add(
        "active"
    );
}


// ==========================================
// CLOSE AI GOAL CONFIRMATION
// ==========================================

function closeAIGoalConfirmation() {

    if (!aiGoalConfirmModal) {
        return;
    }

    aiGoalConfirmModal.classList.remove(
        "active"
    );

    pendingAIGoal = null;
}


// ==========================================
// CANCEL / CLOSE
// ==========================================

if (aiGoalConfirmCancelBtn) {

    aiGoalConfirmCancelBtn.addEventListener(
        "click",
        () => {

            closeAIGoalConfirmation();

            addAIMessage(
                "Okay. I cancelled that action.",
                "assistant"
            );

        }
    );

}

if (aiGoalConfirmCloseBtn) {

    aiGoalConfirmCloseBtn.addEventListener(
        "click",
        closeAIGoalConfirmation
    );

}

if (aiGoalConfirmOverlay) {

    aiGoalConfirmOverlay.addEventListener(
        "click",
        closeAIGoalConfirmation
    );

}


// ==========================================
// CONFIRM & CREATE
// ==========================================

if (aiGoalConfirmCreateBtn) {

    aiGoalConfirmCreateBtn.addEventListener(
        "click",
        () => {

            if (!pendingAIGoal) {
                return;
            }

            // Save the title before closing the modal
            const createdGoalTitle =
                pendingAIGoal.title;

            const createdGoalCategory =
                aiGoalConfirmCategory
                    ? aiGoalConfirmCategory.value
                    : pendingAIGoal.category;

            const created =
                createGoalFromAI(
                    createdGoalTitle,
                    createdGoalCategory,
                    0,
                    ""
                );

            if (!created) {
                return;
            }

            closeAIGoalConfirmation();

            addAIMessage(
                `Done. I created this goal for you: "${createdGoalTitle}".`,
                "assistant"
            );

            // Open Goals page after creation
            const goalsNav =
                document.querySelector(
                    '[data-page="goals"]'
                );

            if (goalsNav) {
                goalsNav.click();
            }

        }
    );

}


// ==========================================
// GOAL MODAL EVENTS
// ==========================================

if (addGoalBtn) {

    addGoalBtn.addEventListener(
        "click",
        openGoalModal
    );

}


if (goalModalCloseBtn) {

    goalModalCloseBtn.addEventListener(
        "click",
        closeGoalModal
    );

}


if (goalCancelBtn) {

    goalCancelBtn.addEventListener(
        "click",
        closeGoalModal
    );

}


if (goalModalOverlay) {

    goalModalOverlay.addEventListener(
        "click",
        closeGoalModal
    );

}

// ==========================================
// GOAL DELETE CONFIRMATION MODAL
// ==========================================

const goalDeleteModal =
    document.getElementById(
        "goalDeleteModal"
    );

const goalDeleteOverlay =
    document.getElementById(
        "goalDeleteOverlay"
    );

const goalDeleteCancelBtn =
    document.getElementById(
        "goalDeleteCancelBtn"
    );

const goalDeleteConfirmBtn =
    document.getElementById(
        "goalDeleteConfirmBtn"
    );

const goalDeleteName =
    document.getElementById(
        "goalDeleteName"
    );

let pendingGoalDeleteId = null;

function openGoalDeleteModal(
    goalId
) {

    const goal =
        goals.find(
            (item) =>
                Number(item.id) ===
                Number(goalId)
        );

    if (!goal || !goalDeleteModal) {
        return;
    }

    pendingGoalDeleteId =
        Number(goalId);

    if (goalDeleteName) {
        goalDeleteName.textContent =
            goal.title;
    }

    goalDeleteModal.classList.add(
        "active"
    );
}

function closeGoalDeleteModal() {

    if (!goalDeleteModal) {
        return;
    }

    goalDeleteModal.classList.remove(
        "active"
    );

    pendingGoalDeleteId =
        null;
}

if (goalDeleteCancelBtn) {

    goalDeleteCancelBtn.addEventListener(
        "click",
        () => {

            const cancelledGoalTitle =
                window.pendingAIGoalDelete?.title;

            closeGoalDeleteModal();

            if (cancelledGoalTitle) {

                addAIMessage(
                    `No problem. I cancelled the deletion of "${cancelledGoalTitle}".`,
                    "assistant"
                );

                window.pendingAIGoalDelete =
                    null;
            }
        }
    );
}

if (goalDeleteOverlay) {

    goalDeleteOverlay.addEventListener(
        "click",
        closeGoalDeleteModal
    );
}

if (goalDeleteConfirmBtn) {

    goalDeleteConfirmBtn.addEventListener(
        "click",
        () => {

            if (
                pendingGoalDeleteId ===
                null
            ) {
                return;
            }

            const goalIndex =
                goals.findIndex(
                    (item) =>
                        Number(item.id) ===
                        Number(
                            pendingGoalDeleteId
                        )
                );

            if (
                goalIndex === -1
            ) {
                closeGoalDeleteModal();
                return;
            }

            // Save deleted goal for AI undo.
            const deletedGoal =
                goals[goalIndex];

            window.lastDeletedGoal = {
                ...deletedGoal
            };

            // Persist last deleted goal for undo after refresh.
                localStorage.setItem(
                    "lastDeletedGoal",
                    JSON.stringify(
                        window.lastDeletedGoal
                    )
                );

            const deletedGoalTitle =
                deletedGoal.title;

            goals.splice(
                goalIndex,
                1
            );

            saveGoals();

            renderGoals();

            closeGoalDeleteModal();

            if (window.pendingAIGoalDelete) {

                addAIMessage(
                    `Done. "${deletedGoalTitle}" has been deleted.`,
                    "assistant"
                );

                window.pendingAIGoalDelete =
                    null;
            }
        }
    );
}

// ==========================================
// GLOBAL SEARCH ENGINE
// ==========================================

function getGlobalSearchData() {

    const searchItems = [];


    // ==========================================
    // TASKS
    // ==========================================

    if (Array.isArray(tasks)) {

        tasks.forEach((task) => {

            searchItems.push({

                type:
                    "Task",

                title:
                    task.title || "Untitled Task",

                description:
                    task.description || "",

                meta:
                    task.completed
                        ? "Completed"
                        : "Pending",

                id:
                    task.id,

                source:
                    "tasks"
            });

        });

    }




    // ==========================================
    // NOTES
    // ==========================================

    if (Array.isArray(notes)) {

        notes.forEach((note) => {

            searchItems.push({

                type:
                    "Note",

                title:
                    note.title || "Untitled Note",

                description:
                    note.content || "",

                meta:
                    note.createdAt || "",

                id:
                    note.id,

                source:
                    "notes"
            });

        });

    }


    // ==========================================
    // GOALS
    // ==========================================

    if (Array.isArray(goals)) {

        goals.forEach((goal) => {

            searchItems.push({

                type:
                    "Goal",

                title:
                    goal.title || "Untitled Goal",

                description:
                    goal.description || "",

                meta:
                    `${goal.progress || 0}% progress`,

                id:
                    goal.id,

                source:
                    "goals"
            });

        });

    }


    // ==========================================
    // PLANNER EVENTS
    // ==========================================

    if (Array.isArray(plannerEvents)) {

        plannerEvents.forEach((event) => {

            searchItems.push({

                type:
                    "Planner",

                title:
                    event.title || "Untitled Event",

                description:
                    event.description || "",

                meta:
                    event.date || "",

                id:
                    event.id,

                source:
                    "planner"
            });

        });

    }


    return searchItems;
}

// ==========================================
// GLOBAL SEARCH UI
// ==========================================

const globalSearchInput =
    document.getElementById("globalSearch");


function renderGlobalSearchResults(query) {

    if (!globalSearchResults) {
        return;
    }

    const searchQuery =
        query.trim().toLowerCase();

    if (!searchQuery) {

        globalSearchResults.innerHTML = "";

        globalSearchResults.classList.remove(
            "active"
        );

        return;
    }


    const searchData =
        getGlobalSearchData();


    const filteredResults =
        searchData.filter((item) => {

            const searchableText = [

                item.type,

                item.title,

                item.description,

                item.meta

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                searchQuery
            );

        });


    globalSearchResults.innerHTML = "";


    if (filteredResults.length === 0) {

        globalSearchResults.innerHTML = `
            <div class="global-search-empty">
                <span>⌕</span>

                <div>
                    <strong>No results found</strong>

                    <p>
                        Try searching for another task,
                        note, goal or planner event.
                    </p>
                </div>
            </div>
        `;

        globalSearchResults.classList.add(
            "active"
        );

        return;
    }


   filteredResults
    .slice(0, 8)
    .forEach((item) => {

        const resultItem =
            document.createElement("button");

        resultItem.type =
            "button";

        resultItem.className =
            "global-search-result";

        resultItem.innerHTML = `

            <div class="global-search-result-type">
                ${item.type}
            </div>

            <div class="global-search-result-content">

                <strong>
                    ${item.title}
                </strong>

                ${
                    item.description
                        ? `
                            <p>
                                ${item.description}
                            </p>
                        `
                        : ""
                }

                ${
                    item.meta
                        ? `
                            <span>
                                ${item.meta}
                            </span>
                        `
                        : ""
                }

            </div>

        `;

        resultItem.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                console.log(
                    "SEARCH RESULT CLICKED:",
                    item
                );

                // Close search results
                globalSearchResults.classList.remove(
                    "active"
                );

                // Clear search input
                globalSearchInput.value = "";

                // Navigate to the correct page
                if (item.source === "tasks") {

                    showPage("tasks");

                    setTimeout(() => {

                        focusTaskFromSearch(
                            item.id
                        );

                    }, 300);

                }

                else if (item.source === "notes") {

                showPage("notes");

                setTimeout(() => {

                    openNoteDetail(
                        item.id
                    );

                }, 300);

            }

                else if (item.source === "goals") {

                    showPage("goals");

                }

                else if (item.source === "planner") {

                    showPage("planner");

                }

            }
        );

        globalSearchResults.appendChild(
            resultItem
        );

    });

        globalSearchResults.classList.add(
            "active"
        );

        }

        // ==========================================
        // LIVE GLOBAL SEARCH INPUT
        // ==========================================

        if (globalSearchInput) {

            globalSearchInput.addEventListener(
                "input",
                () => {

                    renderGlobalSearchResults(
                        globalSearchInput.value
                    );

                }
            );

        }



 // ==========================================
// GOALS DATA
// ==========================================

let goals =
    JSON.parse(
        localStorage.getItem(
            "commandCenterGoals"
        )
    ) || [];

  // ==========================================
// AI GOAL CREATION HELPER
// ==========================================

function createGoalFromAI(
    title,
    category = "Personal",
    progress = 0,
    description = ""
) {
    const cleanTitle =
        String(title || "")
            .replace(/\s+/g, " ")
            .trim();

    if (!cleanTitle) {
        return false;
    }

    const validCategories = [
        "Personal",
        "Career",
        "Health",
        "Finance",
        "Education"
    ];

    const cleanCategory =
        validCategories.find(
            (item) =>
                item.toLowerCase() ===
                String(category)
                    .trim()
                    .toLowerCase()
        ) || "Personal";

    let cleanProgress =
        Number(progress);

    if (Number.isNaN(cleanProgress)) {
        cleanProgress = 0;
    }

    cleanProgress =
        Math.max(
            0,
            Math.min(
                100,
                cleanProgress
            )
        );

    const newGoal = {
        id: Date.now(),
        title: cleanTitle,
        category: cleanCategory,
        progress: cleanProgress,
        target: null,
        description:
            String(description || "")
                .trim(),
        createdAt:
            new Date().toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }
            )
    };

    goals.unshift(newGoal);

    saveGoals();
    renderGoals();

    return newGoal;
}

// ==========================================
// GOALS ELEMENTS
// ==========================================

const goalsList =
    document.getElementById(
        "goalsList"
    );

const goalsActiveCount =
    document.getElementById(
        "goalsActiveCount"
    );

const goalsCompletedCount =
    document.getElementById(
        "goalsCompletedCount"
    );

const goalsAverageProgress =
    document.getElementById(
        "goalsAverageProgress"
    );


// ==========================================
// SAVE GOALS
// ==========================================

function saveGoals() {

    localStorage.setItem(
        "commandCenterGoals",
        JSON.stringify(goals)
    );

}

// ==========================================
// RENDER GOALS
// ==========================================

function renderGoals() {

    if (!goalsList) {
        return;
    }

    goalsList.innerHTML = "";

    console.log("RENDERING GOALS:", goals.map(goal => goal.title));

    if (goals.length === 0) {

        updateGoalOverview();

        return;

    }

    goals.forEach(
        (goal) => {

            const goalCard =
                document.createElement(
                    "div"
                );

            goalCard.className =
                "goal-card";

            goalCard.innerHTML = `

        <div class="goal-card-header">

            <div>

                <span class="goal-category">

                    ${goal.category}

                </span>

                <h4>

                    ${goal.title}

                </h4>

            </div>

            <span class="goal-progress-value">

                ${goal.progress}%

            </span>

        </div>


        <div class="goal-progress">

            <div
                class="goal-progress-fill"
                style="width: ${goal.progress}%"
            ></div>

        </div>


        ${
            goal.target !== null &&
            goal.target !== undefined &&
            goal.target !== ""
                ? `
                    <div class="goal-target">

                        🎯 Target:
                        ${Number(goal.target).toLocaleString()}

                    </div>
                `
                : ""
        }


        ${
            goal.description
                ? `
                    <p class="goal-description">

                        ${goal.description}

                    </p>
                `
                : ""
        }


        <div class="goal-card-footer">

            <span>

                ${
                    goal.progress >= 100
                        ? "Completed"
                        : "In progress"
                }

            </span>

            <span>

                ${goal.createdAt}

            </span>

        </div>


        <div class="goal-card-actions">

            <button
                type="button"
                class="goal-edit-button"
                data-goal-id="${goal.id}"
            >
                Edit
            </button>

            <button
                type="button"
                class="goal-delete-button"
                data-goal-id="${goal.id}"
            >
                Delete
            </button>

        </div>

    `;

            goalsList.appendChild(
                goalCard
            );

        }
    );

    updateGoalOverview();

}

renderGoals();


// ==========================================
// GOAL OVERVIEW
// ==========================================

function updateGoalOverview() {

    const activeGoals =
        goals.filter(
            (goal) =>
                Number(goal.progress) <
                100
        ).length;


    const completedGoals =
        goals.filter(
            (goal) =>
                Number(goal.progress) >=
                100
        ).length;


    const totalProgress =
        goals.reduce(
            (
                total,
                goal
            ) => {

                return (
                    total +
                    Number(
                        goal.progress
                    )
                );

            },
            0
        );


    const averageProgress =
        goals.length > 0
            ? Math.round(
                totalProgress /
                goals.length
            )
            : 0;


    if (goalsActiveCount) {

        goalsActiveCount.textContent =
            activeGoals;

    }


    if (goalsCompletedCount) {

        goalsCompletedCount.textContent =
            completedGoals;

    }


    if (goalsAverageProgress) {

        goalsAverageProgress.textContent =
            `${averageProgress}%`;

    }

}

// ==========================================
// GOAL EDIT / DELETE
// ==========================================

if (goalsList) {

    goalsList.addEventListener(
        "click",
        (event) => {

            const editButton =
                event.target.closest(
                    ".goal-edit-button"
                );

            const deleteButton =
                event.target.closest(
                    ".goal-delete-button"
                );


                        // ======================================
                        // EDIT GOAL
                        // ======================================

                        if (editButton) {

                            const goalId =
                                Number(
                                    editButton.dataset.goalId
                                );


                            const goal =
                                goals.find(
                                    (item) =>
                                        Number(item.id) ===
                                        goalId
                                );


                            if (!goal) {
                                return;
                            }


                            goalTitle.value =
                                goal.title;


                            goalCategory.value =
                                goal.category;


                            goalProgress.value =
                                String(
                                    goal.progress
                                );


                            goalTarget.value =
                                goal.target !== null &&
                                goal.target !== undefined &&
                                goal.target !== ""
                                    ? String(
                                        goal.target
                                    )
                                    : "";


                            goalDescription.value =
                                goal.description || "";


                            goalForm.dataset.editingGoalId =
                                String(
                                    goal.id
                                );


                            const modalTitle =
                                document.getElementById(
                                    "goalModalTitle"
                                );


                            const submitButton =
                                goalForm.querySelector(
                                    'button[type="submit"]'
                                );


                            if (modalTitle) {

                                modalTitle.textContent =
                                    "Edit Goal";
                            }


                            if (submitButton) {

                                submitButton.textContent =
                                    "Save Changes";

                                submitButton.classList.add(
                                    "goal-save-button"
                                );
                            }


                            goalModal.classList.add(
                                "active"
                            );


                            goalTitle.focus();

                        }

        


            // ======================================
            // DELETE GOAL
            // ======================================

            if (deleteButton) {

                const goalId =
                    Number(
                        deleteButton.dataset.goalId
                    );


                openGoalDeleteModal(
                    goalId
                );
            }

        }
    );

}


// ==========================================
// CREATE GOAL
// ==========================================

if (goalForm) {

    goalForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const title =
                goalTitle.value.trim();

            if (!title) {
                goalTitle.focus();
                return;
            }

            const editingGoalId =
                goalForm.dataset.editingGoalId;

            // ==========================================
            // EDIT EXISTING GOAL
            // ==========================================

            if (editingGoalId) {

                const goal =
                    goals.find(
                        (item) =>
                            String(item.id) ===
                            String(editingGoalId)
                    );

                if (!goal) {
                    return;
                }

                goal.title =
                    title;

                goal.category =
                    goalCategory.value;

                goal.progress =
                    Number(
                        goalProgress.value
                    );

                goal.target =
                goalTarget.value === ""
                    ? null
                    : Number(
                        goalTarget.value
                    );

                goal.description =
                    goalDescription.value.trim();

            }

                       // ==========================================
                        // CREATE NEW GOAL
                        // ==========================================

                        else {

                            const newGoal = {

                                id:
                                    Date.now(),

                                title:
                                    title,

                                category:
                                    goalCategory.value,

                                progress:
                                    Number(
                                        goalProgress.value
                                    ),

                                target:
                                    goalTarget.value === ""
                                        ? null
                                        : Number(
                                            goalTarget.value
                                        ),

                                description:
                                    goalDescription.value.trim(),

                                createdAt:
                                    new Date()
                                        .toLocaleDateString(
                                            "en-US",
                                            {
                                                month:
                                                    "short",
                                                day:
                                                    "numeric",
                                                year:
                                                    "numeric"
                                            }
                                        )
                            };

                            goals.unshift(
                                newGoal
                            );

                        }

            // ==========================================
            // SAVE + REFRESH UI
            // ==========================================

            saveGoals();

            renderGoals();

            // Reset edit mode
            delete goalForm.dataset.editingGoalId;

            const modalTitle =
                document.getElementById(
                    "goalModalTitle"
                );

            const submitButton =
                goalForm.querySelector(
                    'button[type="submit"]'
                );

            if (modalTitle) {
                modalTitle.textContent =
                    "Create New Goal";
            }

            if (submitButton) {
                submitButton.textContent =
                    "Create Goal";
            }

            closeGoalModal();
        }
    );
}

// ==========================================
// AI CREATE PLANNER EVENT
// ==========================================

function createPlannerEventFromAI(
    title,
    date,
    startTime,
    endTime = "",
    description = ""
) {

    const cleanTitle =
        title
            .trim();

    let cleanDate =
        date
            .trim();

    let cleanStartTime =
        startTime
            .trim();

    let cleanEndTime =
        endTime
            .trim();

    const cleanDescription =
        description
            .trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !cleanTitle ||
        !cleanDate ||
        !cleanStartTime
    ) {
        return false;
    }

    // ==========================================
    // NATURAL DATE PARSING
    // ==========================================

    const today =
        new Date();

    const dateOnly =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

    const normalizedDate =
        cleanDate
            .toLowerCase();

    if (
        normalizedDate ===
        "today"
    ) {

        cleanDate =
            dateOnly
                .toISOString()
                .split("T")[0];

    } else if (
        normalizedDate ===
        "tomorrow"
    ) {

        dateOnly.setDate(
            dateOnly.getDate() + 1
        );

        cleanDate =
            dateOnly
                .toISOString()
                .split("T")[0];

    } else {

        const parsedDate =
            new Date(
                cleanDate
            );

        if (
            !Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            cleanDate =
                parsedDate
                    .toISOString()
                    .split("T")[0];

        }

    }

    // ==========================================
    // NATURAL TIME PARSING
    // ==========================================

    function normalizeTime(
        timeValue
    ) {

        if (!timeValue) {
            return "";
        }

        let value =
            timeValue
                .trim()
                .toLowerCase()
                .replace(
                    /\s+/g,
                    ""
                );

        const match =
            value.match(
                /^(\d{1,2})(?::(\d{2}))?(am|pm)?$/
            );

        if (!match) {
            return "";
        }

        let hours =
            Number(
                match[1]
            );

        const minutes =
            Number(
                match[2] || "00"
            );

        const period =
            match[3];

        if (
            minutes < 0 ||
            minutes > 59
        ) {
            return "";
        }

        if (
            period === "pm" &&
            hours < 12
        ) {

            hours += 12;

        } else if (
            period === "am" &&
            hours === 12
        ) {

            hours = 0;

        }

        if (
            hours < 0 ||
            hours > 23
        ) {
            return "";
        }

        return (
            String(hours)
                .padStart(2, "0") +
            ":" +
            String(minutes)
                .padStart(2, "0")
        );

    }

    cleanStartTime =
        normalizeTime(
            cleanStartTime
        );

    cleanEndTime =
        normalizeTime(
            cleanEndTime
        );

    if (!cleanStartTime) {
        return false;
    }

    // ==========================================
    // VALIDATE END TIME
    // ==========================================

    if (
        cleanEndTime &&
        cleanEndTime <= cleanStartTime
    ) {
        return false;
    }

    // ==========================================
    // CREATE NEW EVENT
    // ==========================================

    const newEvent = {

        id:
            Date.now(),

        title:
            cleanTitle,

        date:
            cleanDate,

        startTime:
            cleanStartTime,

        endTime:
            cleanEndTime ||
            null,

        description:
            cleanDescription,

        createdAt:
            new Date().toISOString(),

        completed:
            false

    };

    // ==========================================
    // SAVE EVENT
    // ==========================================

    plannerEvents.push(
        newEvent
    );

    savePlannerEvents();

    renderPlanner();

    return true;
}

// ==========================================
// PLANNER PAGE
// ==========================================

const plannerPage =
    document.getElementById(
        "plannerPage"
    );


// ==========================================
// PLANNER ELEMENTS
// ==========================================

const plannerSchedule =
    document.getElementById(
        "plannerSchedule"
    );

const addPlannerEventBtn =
    document.getElementById(
        "addPlannerEventBtn"
    );

// ==========================================
// PLANNER DAY SUMMARY ELEMENTS
// ==========================================

const plannerDaySummary =
    document.getElementById(
        "plannerDaySummary"
    );

const plannerTotalEvents =
    document.getElementById(
        "plannerTotalEvents"
    );

const plannerCompletedEvents =
    document.getElementById(
        "plannerCompletedEvents"
    );

const plannerRemainingEvents =
    document.getElementById(
        "plannerRemainingEvents"
    );

// ==========================================
// PLANNER NAVIGATION ELEMENTS
// ==========================================

const plannerPreviousBtn =
    document.getElementById(
        "plannerPreviousBtn"
    );

const plannerTodayBtn =
    document.getElementById(
        "plannerTodayBtn"
    );

const plannerNextBtn =
    document.getElementById(
        "plannerNextBtn"
    );

const plannerCurrentDateElement =
    document.getElementById(
        "plannerCurrentDate"
    );



// ==========================================
// PLANNER EVENT MODAL ELEMENTS
// ==========================================

const plannerEventModal =
    document.getElementById(
        "plannerEventModal"
    );

const closePlannerModalBtn =
    document.getElementById(
        "closePlannerModalBtn"
    );

const cancelPlannerModalBtn =
    document.getElementById(
        "cancelPlannerModalBtn"
    );

const plannerEventForm =
    document.getElementById(
        "plannerEventForm"
    );

const plannerEventTitle =
    document.getElementById(
        "plannerEventTitle"
    );

const plannerEventDate =
    document.getElementById(
        "plannerEventDate"
    );

const plannerEventStartTime =
    document.getElementById(
        "plannerEventStartTime"
    );

const plannerEventEndTime =
    document.getElementById(
        "plannerEventEndTime"
    );

const plannerEventDescription =
    document.getElementById(
        "plannerEventDescription"
    );

// ==========================================
// PLANNER EVENT DETAILS ELEMENTS
// ==========================================

const plannerDetailsModal =
    document.getElementById(
        "plannerDetailsModal"
    );

const plannerDetailsOverlay =
    document.getElementById(
        "plannerDetailsOverlay"
    );

const plannerDetailsCloseBtn =
    document.getElementById(
        "plannerDetailsCloseBtn"
    );

const plannerDetailsTitle =
    document.getElementById(
        "plannerDetailsTitle"
    );

const plannerDetailsDate =
    document.getElementById(
        "plannerDetailsDate"
    );

const plannerDetailsTime =
    document.getElementById(
        "plannerDetailsTime"
    );

const plannerDetailsDescription =
    document.getElementById(
        "plannerDetailsDescription"
    );

const plannerDetailsCompleteBtn =
    document.getElementById(
        "plannerDetailsCompleteBtn"
    );

const plannerDetailsEditBtn =
    document.getElementById(
        "plannerDetailsEditBtn"
    );

const plannerDetailsDeleteBtn =
    document.getElementById(
        "plannerDetailsDeleteBtn"
    );

let selectedPlannerEventId =
    null;

// ==========================================
// PLANNER DELETE MODAL ELEMENTS
// ==========================================

const plannerDeleteModal =
    document.getElementById(
        "plannerDeleteModal"
    );

const plannerDeleteOverlay =
    document.getElementById(
        "plannerDeleteOverlay"
    );

const plannerDeleteCancelBtn =
    document.getElementById(
        "plannerDeleteCancelBtn"
    );

const plannerDeleteConfirmBtn =
    document.getElementById(
        "plannerDeleteConfirmBtn"
    );

// ==========================================
// OPEN PLANNER EVENT MODAL
// ==========================================

function openPlannerEventModal() {

    if (!plannerEventModal) {
        return;
    }


    // Reset old form data
    if (plannerEventForm) {
        plannerEventForm.reset();
    }


    // ==========================================
        // SET SELECTED PLANNER DATE
        // ==========================================

        if (plannerEventDate) {

            plannerEventDate.value =
                formatPlannerDateKey(
                    plannerCurrentDate
                );

        }


        // Open modal
        plannerEventModal.classList.add(
            "active"
        );


        // Focus title field
        if (plannerEventTitle) {
            plannerEventTitle.focus();
        }

}

// ==========================================
// OPEN EDIT PLANNER EVENT MODAL
// ==========================================

function openEditPlannerEventModal(
    eventId
) {

    if (!plannerEventModal) {
        return;
    }

    // ==========================================
    // FIND SELECTED EVENT
    // ==========================================

    const event =
        plannerEvents.find(
            (item) =>
                Number(item.id) ===
                Number(eventId)
        );

    if (!event) {
        return;
    }

    // ==========================================
    // LOAD EVENT DATA INTO FORM
    // ==========================================

    if (plannerEventTitle) {

        plannerEventTitle.value =
            event.title || "";

    }

    if (plannerEventDate) {

        plannerEventDate.value =
            event.date || "";

    }

    if (plannerEventStartTime) {

        plannerEventStartTime.value =
            event.startTime || "";

    }

    if (plannerEventEndTime) {

        plannerEventEndTime.value =
            event.endTime || "";

    }

    if (plannerEventDescription) {

        plannerEventDescription.value =
            event.description || "";

    }

    // ==========================================
    // CHANGE MODAL TITLE
    // ==========================================

    const modalTitle =
        document.getElementById(
            "plannerModalTitle"
        );

    if (modalTitle) {

        modalTitle.textContent =
            "Edit Event";

    }

    // ==========================================
    // STORE EDITING EVENT ID
    // ==========================================

    plannerEventForm.dataset.editingEventId =
        event.id;

    // ==========================================
    // OPEN MODAL
    // ==========================================

    plannerEventModal.classList.add(
        "active"
    );

    // ==========================================
    // FOCUS TITLE
    // ==========================================

    if (plannerEventTitle) {

        plannerEventTitle.focus();

    }

}

// ==========================================
// OPEN PLANNER EVENT DETAILS
// ==========================================

function openPlannerEventDetails(
    eventId
) {

    if (!plannerDetailsModal) {
        return;
    }

    const event =
        plannerEvents.find(
            (item) =>
                Number(item.id) ===
                Number(eventId)
        );

    if (!event) {
        return;
    }

    selectedPlannerEventId =
        event.id;

    // ==========================================
    // TITLE
    // ==========================================

    if (plannerDetailsTitle) {

        plannerDetailsTitle.textContent =
            event.title ||
            "Untitled Event";

    }

    // ==========================================
    // DATE
    // ==========================================

    if (plannerDetailsDate) {

        plannerDetailsDate.textContent =
            event.date ||
            "No date";

    }

    // ==========================================
    // TIME
    // ==========================================

    if (plannerDetailsTime) {

        plannerDetailsTime.textContent =
            event.startTime
                ? (
                    event.endTime
                        ? `${event.startTime} — ${event.endTime}`
                        : event.startTime
                )
                : "No time";

    }

    // ==========================================
    // DESCRIPTION
    // ==========================================

    if (plannerDetailsDescription) {

        plannerDetailsDescription.textContent =
            event.description ||
            "No description added.";

    }

    // ==========================================
    // COMPLETE BUTTON
    // ==========================================

    if (plannerDetailsCompleteBtn) {

        plannerDetailsCompleteBtn.textContent =
            event.completed === true
                ? "Undo Complete"
                : "Complete";

    }

    plannerDetailsModal.classList.add(
        "active"
    );

}

// ==========================================
// CLOSE PLANNER EVENT DETAILS
// ==========================================

function closePlannerEventDetails() {

    if (!plannerDetailsModal) {
        return;
    }

    plannerDetailsModal.classList.remove(
        "active"
    );

    selectedPlannerEventId =
        null;

}

// ==========================================
// PLANNER DETAILS CLOSE BUTTON
// ==========================================

if (plannerDetailsCloseBtn) {

    plannerDetailsCloseBtn.onclick =
        closePlannerEventDetails;

}

// ==========================================
// PLANNER DETAILS OVERLAY CLOSE
// ==========================================

if (plannerDetailsOverlay) {

    plannerDetailsOverlay.onclick =
        closePlannerEventDetails;

}

// ==========================================
// COMPLETE EVENT BUTTON
// ==========================================

if (plannerDetailsCompleteBtn) {

    plannerDetailsCompleteBtn.addEventListener(
        "click",
        togglePlannerEventFromDetails
    );

}

// ==========================================
// EDIT EVENT BUTTON
// ==========================================

if (plannerDetailsEditBtn) {

    plannerDetailsEditBtn.addEventListener(
        "click",
        () => {

            if (
                selectedPlannerEventId ===
                null
            ) {
                return;
            }

            const eventId =
                selectedPlannerEventId;

            closePlannerEventDetails();

            openEditPlannerEventModal(
                eventId
            );

        }
    );

}

if (plannerDetailsDeleteBtn) {

    plannerDetailsDeleteBtn.addEventListener(
        "click",
        () => {

            if (
                selectedPlannerEventId ===
                null
            ) {
                return;
            }

            

                openPlannerDeleteModal();

            

        }
    );

}

// ==========================================
// OPEN DELETE CONFIRMATION MODAL
// ==========================================

function openPlannerDeleteModal() {

    if (!plannerDeleteModal) {
        return;
    }

    plannerDeleteModal.classList.add(
        "active"
    );

}


// ==========================================
// CLOSE DELETE CONFIRMATION MODAL
// ==========================================

function closePlannerDeleteModal() {

    if (!plannerDeleteModal) {
        return;
    }

    plannerDeleteModal.classList.remove(
        "active"
    );

}

// ==========================================
// DELETE CONFIRMATION ACTION
// ==========================================

if (plannerDeleteConfirmBtn) {

    plannerDeleteConfirmBtn.addEventListener(
        "click",
        () => {

            if (
                selectedPlannerEventId ===
                null
            ) {
                return;
            }

            const eventId =
                selectedPlannerEventId;

            const eventIndex =
                plannerEvents.findIndex(
                    (item) =>
                        Number(item.id) ===
                        Number(eventId)
                );

            if (
                eventIndex === -1
            ) {

                closePlannerDeleteModal();

                return;

            }

            plannerEvents.splice(
                eventIndex,
                1
            );

            savePlannerEvents();

            closePlannerDeleteModal();

            closePlannerEventDetails();

            renderPlanner();

        }
    );

}


// ==========================================
// DELETE CONFIRMATION CANCEL
// ==========================================

if (plannerDeleteCancelBtn) {

    plannerDeleteCancelBtn.addEventListener(
        "click",
        closePlannerDeleteModal
    );

}


// ==========================================
// DELETE CONFIRMATION OVERLAY
// ==========================================

if (plannerDeleteOverlay) {

    plannerDeleteOverlay.addEventListener(
        "click",
        closePlannerDeleteModal
    );

}

// ==========================================
// TOGGLE PLANNER EVENT FROM DETAILS
// ==========================================

function togglePlannerEventFromDetails() {

    if (
        selectedPlannerEventId ===
        null
    ) {
        return;
    }

    const event =
        plannerEvents.find(
            (item) =>
                Number(item.id) ===
                Number(
                    selectedPlannerEventId
                )
        );

    if (!event) {
        return;
    }

    event.completed =
        event.completed !== true;

    savePlannerEvents();

    closePlannerEventDetails();

    renderPlanner();

}

// ==========================================
// CLOSE PLANNER EVENT MODAL
// ==========================================

function closePlannerEventModal() {

    if (!plannerEventModal) {
        return;
    }

    // ==========================================
    // CLOSE MODAL
    // ==========================================

    plannerEventModal.classList.remove(
        "active"
    );

    // ==========================================
    // RESET FORM
    // ==========================================

    if (plannerEventForm) {

        plannerEventForm.reset();

        delete plannerEventForm.dataset.editingEventId;

    }

    // ==========================================
    // RESET MODAL TITLE
    // ==========================================

    const modalTitle =
        document.getElementById(
            "plannerModalTitle"
        );

    if (modalTitle) {

        modalTitle.textContent =
            "Add Event";

    }

}



if (closePlannerModalBtn) {

    closePlannerModalBtn.addEventListener(
        "click",
        closePlannerEventModal
    );

}


if (cancelPlannerModalBtn) {

    cancelPlannerModalBtn.addEventListener(
        "click",
        closePlannerEventModal
    );

}

// ==========================================
// OPEN PLANNER EVENT MODAL BUTTON
// ==========================================

if (addPlannerEventBtn) {

    addPlannerEventBtn.addEventListener(
        "click",
        openPlannerEventModal
    );

}


// ==========================================
// PLANNER EVENTS STORAGE
// ==========================================

let plannerEvents = JSON.parse(
    localStorage.getItem(
        "commandCenterPlannerEvents"
    )
) || [];

// ==========================================
// PLANNER DATE STATE
// ==========================================

let plannerCurrentDate =
    new Date();

// ==========================================
// PLANNER DATE HELPERS
// ==========================================

function formatPlannerDateKey(
    date
) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// ==========================================
// FORMAT PLANNER HEADER DATE
// ==========================================

function formatPlannerHeaderDate(
    date
) {

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


// ==========================================
// UPDATE PLANNER DATE HEADER
// ==========================================

function updatePlannerDateHeader() {

    if (!plannerCurrentDateElement) {
        return;
    }

    plannerCurrentDateElement.textContent =
        formatPlannerHeaderDate(
            plannerCurrentDate
        );

}


// ==========================================
// SAVE PLANNER EVENTS
// ==========================================

function savePlannerEvents() {

    localStorage.setItem(
        "commandCenterPlannerEvents",
        JSON.stringify(
            plannerEvents
        )
    );

}

// ==========================================
// UPDATE PLANNER DAY SUMMARY
// ==========================================

function updatePlannerDaySummary(
    events
) {

    if (
        !plannerTotalEvents ||
        !plannerCompletedEvents ||
        !plannerRemainingEvents
    ) {
        return;
    }

    // ==========================================
    // CALCULATE SUMMARY
    // ==========================================

    const totalEvents =
        events.length;

    const completedEvents =
        events.filter(
            (event) =>
                event.completed === true
        ).length;

    const remainingEvents =
        totalEvents -
        completedEvents;

    // ==========================================
    // UPDATE UI
    // ==========================================

    plannerTotalEvents.textContent =
        totalEvents;

    plannerCompletedEvents.textContent =
        completedEvents;

    plannerRemainingEvents.textContent =
        remainingEvents;

}

/* ==========================================
   UPDATE PLANNER CURRENT TIME INDICATOR
   ========================================== */

function updatePlannerCurrentTimeIndicator() {

    const timelineGrid =
        document.querySelector(
            ".planner-timeline-grid"
        );

    if (!timelineGrid) {
        return;
    }

    let currentTimeLine =
        timelineGrid.querySelector(
            ".planner-current-time-line"
        );

    const today =
        new Date();

    const todayKey =
        formatPlannerDateKey(
            today
        );

    const selectedDate =
        formatPlannerDateKey(
            plannerCurrentDate
        );

    // ==========================================
    // ONLY SHOW ON TODAY
    // ==========================================

    if (
        todayKey !== selectedDate
    ) {

        if (currentTimeLine) {
            currentTimeLine.remove();
        }

        return;

    }

    // ==========================================
    // GET CURRENT TIME
    // ==========================================

    const currentHour =
        today.getHours();

    const currentMinute =
        today.getMinutes();

    const currentMinutes =
        (
            currentHour * 60
        ) +
        currentMinute;

    const timelineStart =
        8 * 60;

    const timelineEnd =
        23 * 60;

    // ==========================================
    // HIDE OUTSIDE TIMELINE
    // ==========================================

    if (
        currentMinutes < timelineStart ||
        currentMinutes > timelineEnd
    ) {

        if (currentTimeLine) {
            currentTimeLine.remove();
        }

        return;

    }

    // ==========================================
    // CREATE LINE
    // ==========================================

    if (!currentTimeLine) {

        currentTimeLine =
            document.createElement(
                "div"
            );

        currentTimeLine.className =
            "planner-current-time-line";

        const label =
            document.createElement(
                "span"
            );

        label.className =
            "planner-current-time-label";

        currentTimeLine.appendChild(
            label
        );

        timelineGrid.appendChild(
            currentTimeLine
        );

    }

    // ==========================================
    // POSITION LINE
    // ==========================================

    const minutesFromStart =
        currentMinutes -
        timelineStart;

    const top =
        minutesFromStart *
        (50 / 60);

    currentTimeLine.style.top =
        `${top}px`;

    // ==========================================
    // UPDATE LABEL
    // ==========================================

    const label =
        currentTimeLine.querySelector(
            ".planner-current-time-label"
        );

    if (label) {

        label.textContent =
            `NOW ${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

    }

}

// ==========================================
// LIVE PLANNER CURRENT TIME UPDATE
// ==========================================

function startPlannerCurrentTimeUpdater() {

    // Update immediately
    updatePlannerCurrentTimeIndicator();

    // Calculate time until the next exact minute
    const now =
        new Date();

    const millisecondsUntilNextMinute =
        (
            60 -
            now.getSeconds()
        ) *
        1000 -
        now.getMilliseconds();

    // Sync with the next exact minute
    setTimeout(
        () => {

            updatePlannerCurrentTimeIndicator();

            // Continue updating every minute
            setInterval(
                () => {

                    updatePlannerCurrentTimeIndicator();

                },
                60 * 1000
            );

        },
        millisecondsUntilNextMinute
    );

}

// ==========================================
// START LIVE CURRENT TIME UPDATER
// ==========================================

startPlannerCurrentTimeUpdater();


// ==========================================
// RENDER PLANNER TIMELINE EVENTS
// ==========================================

function renderPlanner() {

    if (!plannerSchedule) {
        return;
    }

    // ==========================================
    // GET SELECTED DATE
    // ==========================================

    const selectedDate =
        formatPlannerDateKey(
            plannerCurrentDate
        );

    // ==========================================
    // FILTER EVENTS
    // ==========================================

    const selectedDayEvents =
        plannerEvents.filter(
            (event) =>
                event.date === selectedDate
        );

    // ==========================================
    // UPDATE SUMMARY
    // ==========================================

    updatePlannerDaySummary(
        selectedDayEvents
    );

    // ==========================================
    // CLEAR SCHEDULE
    // ==========================================

    plannerSchedule.innerHTML = "";

    // ==========================================
    // CREATE TIMELINE
    // ==========================================

    const timeline =
        document.createElement(
            "div"
        );

    timeline.className =
        "planner-timeline";

    // ==========================================
    // TIME COLUMN
    // ==========================================

    const timeColumn =
        document.createElement(
            "div"
        );

    timeColumn.className =
        "planner-time-column";

    for (
        let hour = 8;
        hour <= 23;
        hour++
    ) {

        const timeSlot =
            document.createElement(
                "div"
            );

        timeSlot.className =
            "planner-time-slot";

        timeSlot.textContent =
            `${String(hour).padStart(2, "0")}:00`;

        timeColumn.appendChild(
            timeSlot
        );

    }

    // ==========================================
    // TIMELINE CONTENT
    // ==========================================

    const timelineContent =
        document.createElement(
            "div"
        );

    timelineContent.className =
        "planner-timeline-content";

    // ==========================================
    // TIMELINE GRID
    // ==========================================

    const timelineGrid =
        document.createElement(
            "div"
        );

    timelineGrid.className =
        "planner-timeline-grid";

    // ==========================================
    // GRID LINES
    // ==========================================

    for (
        let hour = 8;
        hour <= 23;
        hour++
    ) {

        const gridLine =
            document.createElement(
                "div"
            );

        gridLine.className =
            "planner-grid-line";

        timelineGrid.appendChild(
            gridLine
        );

    }

    // ==========================================
    // EVENT LAYER
    // ==========================================

    const eventLayer =
        document.createElement(
            "div"
        );

    eventLayer.className =
        "planner-event-layer";

    // ==========================================
    // CURRENT TIME INDICATOR
    // ==========================================

        updatePlannerCurrentTimeIndicator();

        // ==========================================
        // PREPARE EVENTS
        // ==========================================

        const preparedEvents =
            selectedDayEvents
                .filter(
                    (event) =>
                        event.startTime
                )
                .map(
                    (event) => {

                        const [
                            startHour,
                            startMinute
                        ] =
                            event.startTime
                                .split(":")
                                .map(Number);

                        let endHour =
                            startHour + 1;

                        let endMinute =
                            startMinute;

                        if (event.endTime) {

                            [
                                endHour,
                                endMinute
                            ] =
                                event.endTime
                                    .split(":")
                                    .map(Number);

                        }

                        const startMinutes =
                            (
                                startHour * 60
                            ) +
                            startMinute;

                        const endMinutes =
                            (
                                endHour * 60
                            ) +
                            endMinute;

                        return {

                            event,

                            startMinutes,

                            endMinutes:
                                Math.max(
                                    endMinutes,
                                    startMinutes + 30
                                ),

                            column: 0,

                            totalColumns: 1

                        };

                    }
                )
                .sort(
                    (a, b) =>
                        a.startMinutes -
                        b.startMinutes
                );

        // ==========================================
        // CALCULATE OVERLAPPING COLUMNS
        // ==========================================

        const activeEvents = [];

        preparedEvents.forEach(
            (currentEvent) => {

                // Remove events that already ended
                for (
                    let i =
                        activeEvents.length - 1;
                    i >= 0;
                    i--
                ) {

                    if (
                        activeEvents[i]
                            .endMinutes <=
                        currentEvent.startMinutes
                    ) {

                        activeEvents.splice(
                            i,
                            1
                        );

                    }

                }

                // Find first free column
                const usedColumns =
                    activeEvents.map(
                        (item) =>
                            item.column
                    );

                let column = 0;

                while (
                    usedColumns.includes(
                        column
                    )
                ) {

                    column++;

                }

                currentEvent.column =
                    column;

                activeEvents.push(
                    currentEvent
                );

                // Update total columns
                const totalColumns =
                    Math.max(
                        ...activeEvents.map(
                            (item) =>
                                item.column
                        )
                    ) + 1;

                activeEvents.forEach(
                    (item) => {

                        item.totalColumns =
                            Math.max(
                                item.totalColumns,
                                totalColumns
                            );

                    }
                );

            }
        );

    // ==========================================
    // SECOND PASS
    // ENSURE OVERLAPPING GROUPS SHARE WIDTH
    // ==========================================

    preparedEvents.forEach(
        (currentEvent) => {

            const overlappingEvents =
                preparedEvents.filter(
                    (otherEvent) =>
                        otherEvent.startMinutes <
                            currentEvent.endMinutes &&
                        otherEvent.endMinutes >
                            currentEvent.startMinutes
                );

            const requiredColumns =
                Math.max(
                    ...overlappingEvents.map(
                        (item) =>
                            item.column
                    )
                ) + 1;

            overlappingEvents.forEach(
                (item) => {

                    item.totalColumns =
                        Math.max(
                            item.totalColumns,
                            requiredColumns
                        );

                }
            );

        }
    );

    // ==========================================
    // RENDER EVENTS
    // ==========================================

    preparedEvents.forEach(
        (item) => {

            const event =
                item.event;

            // ==========================================
            // TIMELINE POSITION
            // ==========================================

            const timelineStart =
                8 * 60;

            const minutesFromStart =
                Math.max(
                    0,
                    item.startMinutes -
                    timelineStart
                );

            const duration =
                item.endMinutes -
                item.startMinutes;

            const top =
                minutesFromStart *
                (50 / 60);

            const height =
                duration *
                (50 / 60);

            // ==========================================
            // CREATE EVENT
            // ==========================================

            const eventCard =
                document.createElement(
                    "div"
                );

            eventCard.className =
                "planner-timeline-event";

            if (
                event.completed === true
            ) {

                eventCard.classList.add(
                    "completed"
                );

            }

            // ==========================================
            // WIDTH + POSITION
            // ==========================================

            const gap =
                8;

            const columnWidth =
                100 /
                item.totalColumns;

            eventCard.style.top =
                `${top}px`;

            eventCard.style.height =
                `${height}px`;

            eventCard.style.left =
                `calc(${item.column * columnWidth}% + ${gap / 2}px)`;

            eventCard.style.width =
                `calc(${columnWidth}% - ${gap}px)`;

            eventCard.style.right =
                "auto";

           // ==========================================
            // EVENT STATUS
            // ==========================================

            const eventStart =
                event.startTime
                    ? event.startTime.split(":")
                    : null;

            const eventEnd =
                event.endTime
                    ? event.endTime.split(":")
                    : null;

            const eventStartMinutes =
                eventStart
                    ? (
                        Number(eventStart[0]) * 60 +
                        Number(eventStart[1])
                    )
                    : null;

            const eventEndMinutes =
                eventEnd
                    ? (
                        Number(eventEnd[0]) * 60 +
                        Number(eventEnd[1])
                    )
                    : null;

            const now =
                new Date();

            const currentMinutes =
                now.getHours() * 60 +
                now.getMinutes();

            let eventStatus =
                "Scheduled";

            if (event.completed === true) {

                eventStatus =
                    "Completed";

            }
            else if (
                eventStartMinutes !== null &&
                eventEndMinutes !== null &&
                currentMinutes >= eventStartMinutes &&
                currentMinutes < eventEndMinutes
            ) {

                eventStatus =
                    "In Progress";

            }


        // ==========================================
        // EVENT CONTENT
        // ==========================================

        eventCard.innerHTML = `

            <div class="planner-timeline-event-header">

                <div class="planner-timeline-event-time">

                    ${event.startTime}

                    ${
                        event.endTime
                            ? ` — ${event.endTime}`
                            : ""
                    }

                </div>


                <span class="planner-event-status">

                    ${eventStatus}

                </span>

            </div>


            <div class="planner-timeline-event-title">

                ${event.title || "Untitled Event"}

            </div>

        `;

            // ==========================================
            // OPEN EVENT DETAILS
            // ==========================================

            eventCard.addEventListener(
                "click",
                () => {

                    openPlannerEventDetails(
                        event.id
                    );

                }
            );

            eventLayer.appendChild(
                eventCard
            );

        }
    );

   // ==========================================
    // BUILD TIMELINE
    // ==========================================

    timelineGrid.appendChild(
        eventLayer
    );

    timelineContent.appendChild(
        timelineGrid
    );

    timeline.appendChild(
        timeColumn
    );

    timeline.appendChild(
        timelineContent
    );

    plannerSchedule.appendChild(
    timeline
);

// ==========================================
// UPDATE CURRENT TIME INDICATOR
// ==========================================

updatePlannerCurrentTimeIndicator();

}

// ==========================================
// GO TO PREVIOUS PLANNER DAY
// ==========================================

function goToPreviousPlannerDay() {

    plannerCurrentDate.setDate(
        plannerCurrentDate.getDate() - 1
    );

    updatePlannerDateHeader();

    renderPlanner();

}


// ==========================================
// GO TO TODAY
// ==========================================

function goToPlannerToday() {

    plannerCurrentDate =
        new Date();

    updatePlannerDateHeader();

    renderPlanner();

}


// ==========================================
// GO TO NEXT PLANNER DAY
// ==========================================

function goToNextPlannerDay() {

    plannerCurrentDate.setDate(
        plannerCurrentDate.getDate() + 1
    );

    updatePlannerDateHeader();

    renderPlanner();

}

// ==========================================
// PLANNER NAVIGATION BUTTONS
// ==========================================

if (plannerPreviousBtn) {

    plannerPreviousBtn.addEventListener(
        "click",
        goToPreviousPlannerDay
    );

}

if (plannerTodayBtn) {

    plannerTodayBtn.addEventListener(
        "click",
        goToPlannerToday
    );

}

if (plannerNextBtn) {

    plannerNextBtn.addEventListener(
        "click",
        goToNextPlannerDay
    );

}

// ==========================================
// TOGGLE PLANNER EVENT COMPLETE
// ==========================================

function togglePlannerEventComplete(
    eventId
) {

    const event =
        plannerEvents.find(
            (item) =>
                Number(item.id) ===
                Number(eventId)
        );

    if (!event) {
        return;
    }

    // Toggle completed state
    event.completed =
        !event.completed;

    // Save updated event
    savePlannerEvents();

    // Refresh planner
    renderPlanner();

}


// ==========================================
// DELETE PLANNER EVENT
// ==========================================

function deletePlannerEvent(
    eventId
) {

    const event =
        plannerEvents.find(
            (item) =>
                Number(item.id) ===
                Number(eventId)
        );

    if (!event) {
        return;
    }

    // Confirm before deleting
    const shouldDelete =
        confirm(
            `Delete "${event.title}"?`
        );

    if (!shouldDelete) {
        return;
    }

    // Remove event
    plannerEvents =
        plannerEvents.filter(
            (item) =>
                Number(item.id) !==
                Number(eventId)
        );

    // Save updated list
    savePlannerEvents();

    // Refresh planner
    renderPlanner();

}


// ==========================================
// SAVE PLANNER EVENT
// ==========================================

function addPlannerEvent(event) {

    // Prevent browser from submitting the form
    event.preventDefault();

    // ==========================================
    // READ FORM VALUES
    // ==========================================

    const title =
        plannerEventTitle.value.trim();

    const date =
        plannerEventDate.value;

    const startTime =
        plannerEventStartTime.value;

    const endTime =
        plannerEventEndTime.value;

    const description =
        plannerEventDescription.value.trim();

    // ==========================================
    // VALIDATE REQUIRED FIELDS
    // ==========================================

    if (
        !title ||
        !date ||
        !startTime
    ) {

        alert(
            "Please enter the event title, date, and start time."
        );

        return;
    }

    // ==========================================
    // VALIDATE END TIME
    // ==========================================

    if (
        endTime &&
        endTime <= startTime
    ) {

        alert(
            "End time must be later than start time."
        );

        return;
    }

    // ==========================================
    // CHECK EDIT MODE
    // ==========================================

    const editingEventId =
        plannerEventForm.dataset.editingEventId;

    // ==========================================
    // UPDATE EXISTING EVENT
    // ==========================================

    if (editingEventId) {

        const eventToUpdate =
            plannerEvents.find(
                (item) =>
                    Number(item.id) ===
                    Number(editingEventId)
            );

        if (!eventToUpdate) {
            return;
        }

        // Update existing event data
        eventToUpdate.title =
            title;

        eventToUpdate.date =
            date;

        eventToUpdate.startTime =
            startTime;

        eventToUpdate.endTime =
            endTime || null;

        eventToUpdate.description =
            description;

        // Save updated event
        savePlannerEvents();

        // Remove edit mode
        delete plannerEventForm.dataset.editingEventId;

        // Reset modal title
        const modalTitle =
            document.getElementById(
                "plannerModalTitle"
            );

        if (modalTitle) {

            modalTitle.textContent =
                "Add Event";

        }

        // Refresh planner
        renderPlanner();

        // Close modal
        closePlannerEventModal();

        return;
    }

    // ==========================================
    // CREATE NEW EVENT
    // ==========================================

    const newEvent = {

        id:
            Date.now(),

        title:
            title,

        date:
            date,

        startTime:
            startTime,

        endTime:
            endTime || null,

        description:
            description,

        createdAt:
            new Date().toISOString()

    };

    // ==========================================
    // ADD EVENT TO PLANNER
    // ==========================================

    plannerEvents.push(
        newEvent
    );

    // ==========================================
    // SAVE EVENT
    // ==========================================

    savePlannerEvents();

    // ==========================================
    // REFRESH PLANNER
    // ==========================================

    renderPlanner();

    // ==========================================
    // CLOSE MODAL
    // ==========================================

    closePlannerEventModal();

}

// ==========================================
// PLANNER EVENT FORM SUBMIT
// ==========================================

if (plannerEventForm) {

    plannerEventForm.addEventListener(
        "submit",
        addPlannerEvent
    );

}


    // ==========================================
    // INITIAL PLANNER RENDER
    // ==========================================

    renderPlanner();



    const analyticsPage =
        document.getElementById(
            "analyticsPage"
        );

    const settingsPage =
    document.getElementById(
        "settingsPage"
    );


   function showPage(page) {

    // ==========================================
    // DASHBOARD
    // ==========================================

    dashboardElements.forEach(
        (element) => {

            if (element) {

                element.style.display =
                    page === "dashboard"
                        ? ""
                        : "none";

            }

        }
    );


    // ==========================================
    // TASKS
    // ==========================================

    if (tasksPage) {

        tasksPage.classList.toggle(
            "page-hidden",
            page !== "tasks"
        );

    }


    // ==========================================
    // NOTES
    // ==========================================

    if (notesPage) {

        notesPage.classList.toggle(
            "page-hidden",
            page !== "notes"
        );

    }


    // ==========================================
    // PLANNER
    // ==========================================

    if (plannerPage) {

        plannerPage.classList.toggle(
            "page-hidden",
            page !== "planner"
        );

    }


    // ==========================================
    // GOALS
    // ==========================================

    if (goalsPage) {

        goalsPage.classList.toggle(
            "page-hidden",
            page !== "goals"
        );

    }


    // ==========================================
    // FINANCE
    // ==========================================

    if (financePage) {

        financePage.classList.toggle(
            "page-hidden",
            page !== "finance"
        );

    }


    // ==========================================
    // AI COMMAND CENTER
    // ==========================================

    if (aiPage) {

        aiPage.classList.toggle(
            "page-hidden",
            page !== "ai"
        );

    }


    // ==========================================
    // ANALYTICS
    // ==========================================

    if (analyticsPage) {

        analyticsPage.classList.toggle(
            "page-hidden",
            page !== "analytics"
        );

    }

    // ==========================================
    // SETTINGS
    // ==========================================

    if (settingsPage) {

        settingsPage.classList.toggle(
            "page-hidden",
            page !== "settings"
        );

    }


    // ==========================================
    // ACTIVE SIDEBAR NAVIGATION
    // ==========================================

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(
        (navItem) => {

            const navPage =
                navItem.dataset.page;

            navItem.classList.toggle(
                "active",
                navPage === page
            );

        }
    );

}




    // ---------- SIDEBAR CLICK ----------

    const navItems =
        document.querySelectorAll(
            ".nav-item[data-page]"
        );


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const selectedPage =
                    item.dataset.page;


                // Active navigation

                navItems.forEach((nav) => {

                    nav.classList.remove(
                        "active"
                    );

                });

                item.classList.add(
                    "active"
                );


                // Open selected page

                if (
                    selectedPage ===
                    "dashboard"
                ) {

                    showPage(
                        "dashboard"
                    );

                }

                else if (
                    selectedPage ===
                    "tasks"
                ) {

                    showPage(
                        "tasks"
                    );

                }

                else if (
                    selectedPage ===
                    "notes"
                ) {

                    showPage(
                        "notes"
                    );

                }

                else if (
                    selectedPage ===
                    "planner"
                ) {

                    showPage(
                        "planner"
                    );

                }

                else if (
                    selectedPage ===
                    "goals"
                ) {

                    showPage(
                        "goals"
                    );

                }
                else if (
                    selectedPage ===
                    "finance"
                ) {

                    showPage(
                        "finance"
                    );

                }

                else if (
                    selectedPage ===
                    "analytics"
                ) {

                    showPage(
                        "analytics"
                    );

                }
                else if (
                    selectedPage ===
                    "ai"
                ) {

                    showPage(
                        "ai"
                    );

                }else if (
                    selectedPage ===
                    "settings"
                ) {

                    showPage(
                        "settings"
                    );

                }
                else {

                    console.log(
                        `${selectedPage} page coming soon`
                    );

                }


                // Close mobile sidebar

                document
                    .querySelector(
                        ".sidebar"
                    )
                    .classList.remove(
                        "mobile-open"
                    );

            }
        );

    });


    // Start on dashboard

    showPage(
        "dashboard"
    );



// ---------- COMMAND CENTER ----------

function handleCommand() {

    const command =
        commandInput.value.trim();

    if (!command) {
        return;
    }

    const normalizedCommand =
        command.toLowerCase();

    commandInput.value = "";


    // ==========================================
    // ADD TASK
    // ==========================================

    if (
        normalizedCommand === "add task" ||
        normalizedCommand === "task"
    ) {

        if (
            typeof openTaskModal ===
            "function"
        ) {
            openTaskModal();
        }

        return;
    }


    // ==========================================
    // CREATE NOTE
    // ==========================================

    if (
        normalizedCommand === "create note" ||
        normalizedCommand === "add note" ||
        normalizedCommand === "note"
    ) {

        if (
            typeof openNoteCreateModal ===
            "function"
        ) {
            openNoteCreateModal();
        }

        return;
    }


    // ==========================================
    // UNKNOWN COMMAND
    // ==========================================

    console.log(
        "Command received:",
        command
    );

}


commandButton.addEventListener(
    "click",
    handleCommand
);


// ==========================================
// PRESS ENTER TO EXECUTE
// ==========================================

commandInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            handleCommand();

        }

    }
);

// ==========================================
// APP INITIALIZED
// ==========================================

console.log("⚡ AI Command Center initialized");

// ==========================================
// TASK SYSTEM
// ==========================================

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");


// ---------- TASK DATA ----------

let tasks = JSON.parse(
    localStorage.getItem("commandCenterTasks")
) || [];

tasks = tasks.map((task) => ({
    ...task,
    completedAt: task.completedAt || null,
    time: task.time || null
}));

saveTasks();


// ==========================================
// AI ACTION HISTORY
// ==========================================

let aiActionHistory = JSON.parse(
    localStorage.getItem("commandCenterAIActionHistory")
) || [];


// ---------- SAVE AI ACTION HISTORY ----------

function saveAIActionHistory() {

    localStorage.setItem(
        "commandCenterAIActionHistory",
        JSON.stringify(
            aiActionHistory
        )
    );

}

// ==========================================
// ADD AI ACTION HISTORY
// ==========================================

function addAIActionHistory({

    action,
    description,
    status = "success",
    entityType = null,
    entityId = null

}) {

    const historyEntry = {

        id:
            `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

        action:
            action || "AI Action",

        description:
            description || "",

        status:
            status,

        entityType:
            entityType,

        entityId:
            entityId,

        timestamp:
            new Date().toISOString()

    };


    aiActionHistory.unshift(
        historyEntry
    );


    // Keep history lightweight
    aiActionHistory =
        aiActionHistory.slice(
            0,
            100
        );


    saveAIActionHistory();

    renderAIActionHistory();

    // Also show successful AI actions in Dashboard Activity
    if (status === "success" &&
        typeof addDashboardActivity === "function") {

        addDashboardActivity({
            action: historyEntry.action,
            description: historyEntry.description,
            entityType: historyEntry.entityType,
            entityId: historyEntry.entityId
        });

    }

}

// ==========================================
// RENDER AI ACTION HISTORY
// ==========================================

function renderAIActionHistory() {

    const historyList =
        document.getElementById(
            "aiActionHistoryList"
        );

    if (!historyList) {
        return;
    }

    historyList.innerHTML = "";


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (
        !aiActionHistory ||
        aiActionHistory.length === 0
    ) {

        const emptyState =
            document.createElement("div");

        emptyState.className =
            "ai-history-empty-state";


        const emptyIcon =
            document.createElement("div");

        emptyIcon.className =
            "ai-empty-icon";

        emptyIcon.textContent =
            "◷";


        const emptyTitle =
            document.createElement("strong");

        emptyTitle.textContent =
            "No AI actions yet";


        const emptyText =
            document.createElement("span");

        emptyText.textContent =
            "Actions performed by AI will appear here.";


        emptyState.appendChild(
            emptyIcon
        );

        emptyState.appendChild(
            emptyTitle
        );

        emptyState.appendChild(
            emptyText
        );

        historyList.appendChild(
            emptyState
        );

        return;
    }


    // ==========================================
    // HISTORY ITEMS
    // ==========================================

    aiActionHistory.forEach(
        (entry) => {

            const item =
                document.createElement("div");

            item.className =
                "ai-history-item";


            // ---------- ICON ----------

            const icon =
                document.createElement("div");

            icon.className =
                "ai-history-item-icon";

            icon.textContent =
                entry.status === "success"
                    ? "✓"
                    : "!";


            // ---------- CONTENT ----------

            const content =
                document.createElement("div");

            content.className =
                "ai-history-item-content";


            // ---------- TOP ROW ----------

            const top =
                document.createElement("div");

            top.className =
                "ai-history-item-top";


            const action =
                document.createElement("strong");

            action.textContent =
                entry.action ||
                "AI Action";


            const status =
                document.createElement("span");

            status.className =
                "ai-history-item-status";

            status.textContent =
                entry.status === "success"
                    ? "Success"
                    : "Failed";


            top.appendChild(
                action
            );

            top.appendChild(
                status
            );


            // ---------- DESCRIPTION ----------

            const description =
                document.createElement("p");

            description.textContent =
                entry.description ||
                "";


            // ---------- TIME ----------

            const time =
                document.createElement("time");

            const entryDate =
                new Date(
                    entry.timestamp
                );

            if (
                !Number.isNaN(
                    entryDate.getTime()
                )
            ) {

                time.textContent =
                    entryDate.toLocaleString(
                        [],
                        {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        }
                    );

            } else {

                time.textContent =
                    "";

            }


            // ---------- BUILD ----------

            content.appendChild(
                top
            );

            content.appendChild(
                description
            );

            content.appendChild(
                time
            );


            item.appendChild(
                icon
            );

            item.appendChild(
                content
            );


            historyList.appendChild(
                item
            );

        }
    );

}

renderAIActionHistory();


// ---------- SAVE TASKS ----------

function saveTasks() {
    localStorage.setItem(
        "commandCenterTasks",
        JSON.stringify(tasks)
    );
}

// ---------- FORMAT REMINDER ----------

function formatReminder(reminder) {

    const date = new Date(reminder);

    if (Number.isNaN(date.getTime())) {
        return "Invalid reminder";
    }

    return date.toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
    });
}


// ---------- RENDER TASKS ----------

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-tasks">
                <div>✓</div>
                <h3>No tasks yet</h3>
                <p>Add your first task to get started.</p>
            </div>
        `;

        return;
    }


    tasks.forEach((task) => {

        const taskElement = document.createElement("div");

        taskElement.className = `task-item ${
            task.completed ? "completed-task" : ""
        }`;

        const reminderHTML = task.reminder
    ? `
        <span class="task-reminder">
            🔔 ${formatReminder(task.reminder)}
        </span>
      `
    : "";

        taskElement.innerHTML = `
            <button
                class="task-check ${task.completed ? "checked" : ""}"
                data-id="${task.id}"
            >
                ${task.completed ? "✓" : ""}
            </button>

            <div class="task-details">
                <div class="task-main">
                    <strong>${task.title}</strong>

                    <span class="task-priority ${task.priority}">
                        ${task.priority}
                    </span>
                </div>

              ${task.date ? `
                    <span class="task-date">
                        📅 ${formatTaskDate(task.date)}
                    </span>
                ` : ""}

                ${task.time ? `
                    <span class="task-time">
                        🕐 ${task.time}
                    </span>
                ` : ""}

               

                ${reminderHTML}

                ${task.reminder ? `
                    <button
                        class="task-reminder-edit"
                        data-id="${task.id}"
                        type="button"
                    >
                        Edit reminder
                    </button>
                ` : `
                    <button
                        class="task-reminder-edit"
                        data-id="${task.id}"
                        type="button"
                    >
                        Set reminder
                    </button>
                `}
            </div>

            <div class="task-actions">

            <button
                class="task-edit"
                data-id="${task.id}"
                type="button"
            >
                Edit
            </button>

            <button
                class="task-delete"
                data-id="${task.id}"
                type="button"
            >
                Delete
            </button>

</div>
        `;

        taskList.appendChild(taskElement);
    });
}

// ==========================================
// FOCUS TASK FROM GLOBAL SEARCH
// ==========================================

function focusTaskFromSearch(taskId) {

    const taskElement =
        taskList.querySelector(
            `.task-item .task-check[data-id="${taskId}"]`
        )?.closest(".task-item");


    if (!taskElement) {
        return;
    }


    taskElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    taskElement.classList.add(
        "search-focused-task"
    );


    setTimeout(() => {

        taskElement.classList.remove(
            "search-focused-task"
        );

    }, 1800);

}

// ==========================================
// REMINDER MODAL SYSTEM
// ==========================================

const reminderModal =
    document.getElementById("reminderModal");

const reminderModalClose =
    document.getElementById("reminderModalClose");

const reminderCancel =
    document.getElementById("reminderCancel");

const reminderSave =
    document.getElementById("reminderSave");

const reminderDate =
    document.getElementById("reminderDate");

const reminderTime =
    document.getElementById("reminderTime");

const reminderPreviewText =
    document.getElementById("reminderPreviewText");

const reminderModalTitle =
    document.getElementById("reminderModalTitle");

// ==========================================
// REMINDER TARGET
// ==========================================

let reminderTargetType = null;
let reminderTargetId = null;


// ---------- OPEN REMINDER MODAL ----------

function openReminderModal(taskId) {

    const task = tasks.find(
        (task) => task.id === taskId
    );

    if (!task) {
        console.warn("Task not found:", taskId);
        return;
    }

    // Get reminder modal elements directly
    const modal =
        document.getElementById("reminderModal");

    const title =
        document.getElementById("reminderModalTitle");

    const dateInput =
        document.getElementById("reminderDate");

    const timeInput =
        document.getElementById("reminderTime");


    // Safety check
    if (
        !modal ||
        !title ||
        !dateInput ||
        !timeInput
    ) {
        console.error(
            "Reminder modal elements are missing:",
            {
                modal,
                title,
                dateInput,
                timeInput
            }
        );

        return;
    }


    // Remember which task is being edited
    reminderTargetType = "task";
    reminderTargetId = taskId;


    // Change modal title
    title.textContent = task.reminder
        ? "Edit Reminder"
        : "Set Reminder";


    // ---------- LOAD EXISTING REMINDER ----------

    if (task.reminder) {

        const date =
            new Date(task.reminder);


        const year =
            date.getFullYear();

        const month =
            String(date.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(date.getDate())
                .padStart(2, "0");

        const hours =
            String(date.getHours())
                .padStart(2, "0");

        const minutes =
            String(date.getMinutes())
                .padStart(2, "0");


        dateInput.value =
            `${year}-${month}-${day}`;

        timeInput.value =
            `${hours}:${minutes}`;

    } else {

        // No existing reminder
        dateInput.value = "";
        timeInput.value = "";
    }


    // Update preview
    updateReminderPreview();


    // Open modal
    modal.classList.add("active");


    // Focus date field
    dateInput.focus();
}

// ==========================================
// OPEN NOTE REMINDER MODAL
// ==========================================

function openNoteReminderModal(noteId) {

    // Find the selected note
    const note = notes.find(
        (item) => item.id === noteId
    );

    // Stop if note does not exist
    if (!note) {
        console.warn(
            "Note not found:",
            noteId
        );

        return;
    }


    // Get reminder modal elements
    const modal =
        document.getElementById("reminderModal");

    const title =
        document.getElementById("reminderModalTitle");

    const dateInput =
        document.getElementById("reminderDate");

    const timeInput =
        document.getElementById("reminderTime");


    // Safety check
    if (
        !modal ||
        !title ||
        !dateInput ||
        !timeInput
    ) {

        console.error(
            "Reminder modal elements are missing."
        );

        return;
    }


    // Remember that a NOTE is being edited
    reminderTargetType = "note";
    reminderTargetId = noteId;


    // Change modal title
    title.textContent = note.reminder
        ? "Edit Note Reminder"
        : "Set Note Reminder";


    // ==========================================
    // LOAD EXISTING REMINDER
    // ==========================================

    if (note.reminder) {

        const date =
            new Date(note.reminder);


        const year =
            date.getFullYear();


        const month =
            String(date.getMonth() + 1)
                .padStart(2, "0");


        const day =
            String(date.getDate())
                .padStart(2, "0");


        const hours =
            String(date.getHours())
                .padStart(2, "0");


        const minutes =
            String(date.getMinutes())
                .padStart(2, "0");


        dateInput.value =
            `${year}-${month}-${day}`;


        timeInput.value =
            `${hours}:${minutes}`;

    } else {

        // No existing reminder
        dateInput.value = "";
        timeInput.value = "";
    }


    // Update preview
    updateReminderPreview();


    // Open modal
    modal.classList.add("active");


    // Focus date input
    dateInput.focus();
}



// ==========================================
// CLOSE REMINDER MODAL
// ==========================================

function closeReminderModal() {

    const modal =
        document.getElementById("reminderModal");


    if (!modal) {
        return;
    }


    // Close modal
    modal.classList.remove("active");


    // Clear reminder target
    reminderTargetType = null;
    reminderTargetId = null;
}


 // ---------- UPDATE REMINDER PREVIEW ----------

function updateReminderPreview() {

    // Get reminder inputs directly
    const dateInput =
        document.getElementById("reminderDate");

    const timeInput =
        document.getElementById("reminderTime");

    const previewText =
        document.getElementById("reminderPreviewText");


    // Safety check
    if (
        !dateInput ||
        !timeInput ||
        !previewText
    ) {
        console.error(
            "Reminder preview elements are missing:",
            {
                dateInput,
                timeInput,
                previewText
            }
        );

        return;
    }


    // Get selected date and time
    const dateValue =
        dateInput.value;

    const timeValue =
        timeInput.value;


    // Nothing selected yet
    if (
        !dateValue ||
        !timeValue
    ) {

        previewText.textContent =
            "Choose a date and time";

        return;
    }


    // Create reminder date/time
    const reminderDateTime =
        new Date(
            `${dateValue}T${timeValue}`
        );


    // Validate date/time
    if (
        Number.isNaN(
            reminderDateTime.getTime()
        )
    ) {

        previewText.textContent =
            "Invalid date or time";

        return;
    }


    // Show formatted preview
    previewText.textContent =
        reminderDateTime.toLocaleString(
            [],
            {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit"
            }
        );
}


// ==========================================
// SAVE REMINDER
// ==========================================

async function saveReminder(){

    // Make sure something is selected
    if (
        reminderTargetType === null ||
        reminderTargetId === null
    ) {

        console.warn(
            "Reminder save cancelled: no target selected."
        );

        return;
    }


    // ==========================================
    // GET FORM ELEMENTS
    // ==========================================

    const dateInput =
        document.getElementById("reminderDate");

    const timeInput =
        document.getElementById("reminderTime");

    const previewText =
        document.getElementById(
            "reminderPreviewText"
        );


    // Safety check
    if (
        !dateInput ||
        !timeInput ||
        !previewText
    ) {

        console.error(
            "Reminder form elements are missing."
        );

        return;
    }


    // ==========================================
    // READ DATE & TIME
    // ==========================================

    const dateValue =
        dateInput.value;

    const timeValue =
        timeInput.value;


    // Both fields are required
    if (
        !dateValue ||
        !timeValue
    ) {

        previewText.textContent =
            "Please choose both date and time.";

        return;
    }


    // ==========================================
    // CREATE DATE/TIME
    // ==========================================

    const reminderDateTime =
        new Date(
            `${dateValue}T${timeValue}`
        );


    // Validate date
    if (
        Number.isNaN(
            reminderDateTime.getTime()
        )
    ) {

        previewText.textContent =
            "Please choose a valid date and time.";

        return;
    }


    // ==========================================
    // PREVENT PAST REMINDERS
    // ==========================================

    if (
        reminderDateTime.getTime() <=
        Date.now()
    ) {

        previewText.textContent =
            "Reminder must be set for a future time.";

        return;
    }

    // ==========================================
    // REQUEST NOTIFICATION PERMISSION
    // ==========================================

    const notificationPermissionGranted =
        await requestReminderNotificationPermission();

    


    // ==========================================
    // SAVE TASK REMINDER
    // ==========================================

    if (
        reminderTargetType === "task"
    ) {

        const task =
            tasks.find(
                (item) =>
                    item.id ===
                    reminderTargetId
            );


        if (!task) {

            console.error(
                "Task not found:",
                reminderTargetId
            );

            return;
        }


        // Save reminder
        task.reminder =
            reminderDateTime.toISOString();


        // Allow reminder to trigger again
        task.reminderTriggered = false;


        // Save tasks
        saveTasks();


        // Refresh task UI
        renderTasks();


        // Refresh dashboard
        updateDashboardStats();

        updateAnalytics();


        console.log(
            "Task reminder saved:",
            task.title
        );
    }


    // ==========================================
    // SAVE NOTE REMINDER
    // ==========================================

    if (
        reminderTargetType === "note"
    ) {

        const note =
            notes.find(
                (item) =>
                    item.id ===
                    reminderTargetId
            );


        if (!note) {

            console.error(
                "Note not found:",
                reminderTargetId
            );

            return;
        }


        // Save reminder
        note.reminder =
            reminderDateTime.toISOString();


        // Allow reminder to trigger again
        note.reminderTriggered = false;


        // Save notes
        saveNotes();


        // Refresh Notes UI
        renderNotes();


        // Refresh dashboard
        updateDashboardStats();


        console.log(
            "Note reminder saved:",
            note.title
        );
    }

    // ==========================================
    // SHOW SAVE CONFIRMATION
    // ==========================================

    if (reminderTargetType === "note") {

        const savedNote =
            notes.find(
                (note) =>
                    note.id === reminderTargetId
            );

        console.log(
            "NOTE REMINDER SAVED:",
            savedNote
        );
    }


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    closeReminderModal();
}

// ---------- DATE CHANGE ----------

const reminderDateInput =
    document.getElementById("reminderDate");

if (reminderDateInput) {

    reminderDateInput.addEventListener(
        "change",
        () => {
            updateReminderPreview();
        }
    );
}


// ---------- TIME CHANGE ----------

const reminderTimeInput =
    document.getElementById("reminderTime");

if (reminderTimeInput) {

    reminderTimeInput.addEventListener(
        "change",
        () => {
            updateReminderPreview();
        }
    );
}


// ---------- CLICK OUTSIDE MODAL ----------

const reminderModalElement =
    document.getElementById("reminderModal");

if (reminderModalElement) {

    reminderModalElement.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                reminderModalElement
            ) {
                closeReminderModal();
            }

        }
    );
}


// ---------- ESCAPE KEY ----------

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            reminderModalElement &&
            reminderModalElement.classList.contains("active")
        ) {
            closeReminderModal();
        }

    }
);


// ==========================================
// ADD TASK MODAL
// ==========================================

const taskCreateModal =
    document.getElementById(
        "taskCreateModal"
    );

const taskCreateOverlay =
    document.getElementById(
        "taskCreateOverlay"
    );

const taskCreateCloseBtn =
    document.getElementById(
        "taskCreateCloseBtn"
    );

const taskCreateCancelBtn =
    document.getElementById(
        "taskCreateCancelBtn"
    );

const taskCreateForm =
    document.getElementById(
        "taskCreateForm"
    );

const taskCreateTitleInput =
    document.getElementById(
        "taskCreateTitleInput"
    );

const taskCreatePriority =
    document.getElementById(
        "taskCreatePriority"
    );

const taskCreateReminder =
    document.getElementById(
        "taskCreateReminder"
    );

const taskCreateDate =
    document.getElementById(
        "taskCreateDate"
    );

const taskCreateTime =
    document.getElementById(
        "taskCreateTime"
    );

// ==========================================
// TASK EDIT STATE
// ==========================================

let editingTaskId = null;

// ==========================================
// TASK DELETE MODAL STATE
// ==========================================

let pendingDeleteTaskId = null;

const taskDeleteModal =
    document.getElementById("taskDeleteModal");

const taskDeleteMessage =
    document.getElementById("taskDeleteMessage");

const taskDeleteCancel =
    document.getElementById("taskDeleteCancel");

const taskDeleteConfirm =
    document.getElementById("taskDeleteConfirm");

// ==========================================
// TASK DELETE CONFIRMATION
// ==========================================

function openTaskDeleteModal(taskId) {

    const task =
        tasks.find(
            (task) => task.id === taskId
        );

    if (!task) {
        return;
    }

    if (!taskDeleteModal) {
        return;
    }

    pendingDeleteTaskId =
        taskId;


    if (taskDeleteMessage) {

        taskDeleteMessage.textContent =
            `Are you sure you want to delete "${task.title}"?`;

    }


    taskDeleteModal.classList.add(
        "active"
    );

}


// ==========================================
// CLOSE DELETE MODAL
// ==========================================

function closeTaskDeleteModal() {

    pendingDeleteTaskId =
        null;


    if (taskDeleteModal) {

        taskDeleteModal.classList.remove(
            "active"
        );

    }

}


// ==========================================
// CONFIRM DELETE
// ==========================================

function confirmDeleteTask() {

    if (
        pendingDeleteTaskId === null
    ) {
        return;
    }


    const task =
        tasks.find(
            (task) =>
                task.id ===
                pendingDeleteTaskId
        );


    if (!task) {

        closeTaskDeleteModal();

        return;
    }


    tasks =
        tasks.filter(
            (task) =>
                task.id !==
                pendingDeleteTaskId
        );


    // ==========================================
    // AI ACTION HISTORY
    // ==========================================

    addAIActionHistory({

        action:
            "Task Deleted",

        description:
            `Deleted task "${task.title}"`,

        status:
            "success",

        entityType:
            "task",

        entityId:
            task.id

    });


    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();


    closeTaskDeleteModal();

}


// ==========================================
// DELETE MODAL ACTIONS
// ==========================================

if (taskDeleteCancel) {

    taskDeleteCancel.addEventListener(
        "click",
        () => {

            closeTaskDeleteModal();

        }
    );

}


if (taskDeleteConfirm) {

    taskDeleteConfirm.addEventListener(
        "click",
        () => {

            confirmDeleteTask();

        }
    );

}


if (taskDeleteModal) {

    taskDeleteModal
        .querySelector(
            ".task-delete-backdrop"
        )
        ?.addEventListener(
            "click",
            () => {

                closeTaskDeleteModal();

            }
        );

}

// ==========================================
// OPEN TASK MODAL
// ==========================================

function openTaskModal(task = null) {

    if (!taskCreateModal) {
        return;
    }


    // ---------- OPEN MODAL ----------

    taskCreateModal.classList.add(
        "active"
    );


    // ---------- EDIT MODE ----------

    if (task) {

        if (taskCreateTitleInput) {
            taskCreateTitleInput.value =
                task.title || "";
        }

        if (taskCreatePriority) {
            taskCreatePriority.value =
                task.priority || "medium";
        }

        if (taskCreateDate) {
            taskCreateDate.value =
                task.date || "";
        }

        if (taskCreateTime) {
            if (task.reminder) {

                const reminderDate =
                    new Date(task.reminder);

                if (
                    !Number.isNaN(
                        reminderDate.getTime()
                    )
                ) {

                    taskCreateTime.value =
                        reminderDate
                            .toTimeString()
                            .slice(0, 5);

                }

            } else {

                taskCreateTime.value = "";

            }
        }

    }


    // ---------- ADD MODE ----------

    else {

        if (taskCreateTitleInput) {
            taskCreateTitleInput.value = "";
        }

        if (taskCreatePriority) {
            taskCreatePriority.value =
                "medium";
        }

        if (taskCreateDate) {
            taskCreateDate.value = "";
        }

        if (taskCreateTime) {
            taskCreateTime.value = "";
        }

    }


    // ---------- FOCUS ----------

    if (taskCreateTitleInput) {
        taskCreateTitleInput.focus();
    }

}

// ==========================================
// ADD TASK
// ==========================================

function addTask() {

    if (
        !taskCreateTitleInput ||
        !taskCreatePriority
    ) {
        return;
    }


    // ---------- TASK TITLE ----------

    const title =
        taskCreateTitleInput.value.trim();

    if (!title) {

        taskCreateTitleInput.focus();

        return;
    }


    // ---------- PRIORITY ----------

    const priority =
        ["high", "medium", "low"].includes(
            taskCreatePriority.value
        )
            ? taskCreatePriority.value
            : "medium";


    // ---------- DATE ----------

    const taskDate =
        taskCreateDate
            ? taskCreateDate.value
            : "";


    // ---------- REMINDER ----------

    let reminder = null;

    const reminderDate =
        taskCreateDate
            ? taskCreateDate.value
            : "";

    const reminderTime =
        taskCreateTime
            ? taskCreateTime.value
            : "";


    if (
        reminderDate &&
        reminderTime
    ) {

        const reminderDateTime =
            new Date(
                `${reminderDate}T${reminderTime}`
            );


        if (
            !Number.isNaN(
                reminderDateTime.getTime()
            )
        ) {

            reminder =
                reminderDateTime.toISOString();

        }

    }


    // ==========================================
    // EDIT EXISTING TASK
    // ==========================================

    if (editingTaskId !== null) {

        const task =
            tasks.find(
                (task) =>
                    task.id === editingTaskId
            );


        if (!task) {

            editingTaskId = null;

            closeTaskModal();

            return;
        }


        task.title =
            title;

        task.priority =
            priority;

        task.date =
            taskDate || null;

        task.reminder =
            reminder;

        task.reminderTriggered =
            false;


        saveTasks();

        renderTasks();

        updateDashboardStats();

        refreshAnalytics();

        renderDashboardProductivity();


        editingTaskId =
            null;

        closeTaskModal();

        return;
    }


    // ==========================================
    // CREATE NEW TASK
    // ==========================================

    const newTask = {

        id:
            Date.now(),

        title:
            title,

        priority:
            priority,

        completed:
            false,

        completedAt:
            null,

        date:
            taskDate || null,

        reminder:
            reminder,

        reminderTriggered:
            false

    };


    // ---------- SAVE ----------

    tasks.push(
        newTask
    );

    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();


    // ---------- CLOSE MODAL ----------

    closeTaskModal();

}

// ==========================================
// AI CREATE TASK
// ==========================================

function createTaskFromAI(title) {

    const cleanTitle =
        title
            .trim();

    if (!cleanTitle) {
        return false;
    }


    const newTask = {

        id:
            Date.now(),

        title:
            cleanTitle,

        priority:
            "medium",

        completed:
            false,

        completedAt:
            null,

        date:
            null,
        
        time:
    null,

        reminder:
            null,

        reminderTriggered:
            false

    };


    tasks.push(
        newTask
    );

    saveTasks();

    renderTasks();

    updateDashboardStats();

    refreshAnalytics();

    renderDashboardProductivity();


    return newTask;
}

// ==========================================
// AI TASK LOOKUP HELPER
// ==========================================

function findTaskForAI(options = {}) {

    const {
        id = null,
        title = null
    } = options;


    // ---------- FIND BY ID ----------

    if (id !== null && id !== undefined) {

        const taskById =
            tasks.find(
                (task) => task.id === id
            );

        if (taskById) {
            return taskById;
        }
    }


    // ---------- FIND BY TITLE ----------

    if (title) {

        const cleanTitle =
            String(title)
                .trim()
                .toLowerCase();

        if (!cleanTitle) {
            return null;
        }

        const taskByTitle =
            tasks.find(
                (task) =>
                    String(task.title || "")
                        .trim()
                        .toLowerCase() ===
                    cleanTitle
            );

        if (taskByTitle) {
            return taskByTitle;
        }
    }


    return null;
}

// ==========================================
// AI REMINDER DATE/TIME PARSER
// ==========================================

function parseAIReminderDateTime(command) {

    const text =
        String(command || "")
            .trim()
            .toLowerCase();

    if (!text) {
        return null;
    }


    // ==========================================
    // EXTRACT TIME
    // ==========================================

    const timeMatch =
        text.match(
            /\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b|\b([01]?\d|2[0-3]):([0-5]\d)\b/i
        );

    if (!timeMatch) {
        return null;
    }


    let hour;
    let minute;


    if (
        timeMatch[1] !== undefined
    ) {

        hour =
            Number(timeMatch[1]);

        minute =
            Number(timeMatch[2] || 0);

        const meridiem =
            String(
                timeMatch[3] || ""
            ).toLowerCase();

        if (meridiem === "pm" && hour < 12) {
            hour += 12;
        }

        if (meridiem === "am" && hour === 12) {
            hour = 0;
        }

    } else {

        hour =
            Number(timeMatch[4]);

        minute =
            Number(timeMatch[5]);

    }


    if (
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
    ) {
        return null;
    }


    // ==========================================
    // DETERMINE DATE
    // ==========================================

    const now =
        new Date();

    const reminderDate =
        new Date(now);

    reminderDate.setHours(
        hour,
        minute,
        0,
        0
    );


    // ---------- TOMORROW ----------

    if (
        text.includes("tomorrow")
    ) {

        reminderDate.setDate(
            reminderDate.getDate() + 1
        );

    }

    // ---------- TODAY ----------

    else if (
        text.includes("today")
    ) {

        // Keep today's date.
    }

    // ---------- WEEKDAYS ----------

    else {

        const weekdayMatch =
            text.match(
                /\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i
            );

        if (weekdayMatch) {

            const weekdays = {
                sunday: 0,
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5,
                saturday: 6
            };

            const targetDay =
                weekdays[
                    weekdayMatch[1]
                        .toLowerCase()
                ];

            let daysUntil =
                targetDay -
                now.getDay();

            if (daysUntil <= 0) {
                daysUntil += 7;
            }

            reminderDate.setDate(
                reminderDate.getDate() +
                daysUntil
            );

        } else {

            // If no date was specified,
            // use the next occurrence of the time.

            if (
                reminderDate.getTime() <=
                now.getTime()
            ) {

                reminderDate.setDate(
                    reminderDate.getDate() + 1
                );

            }

        }

    }


    // ==========================================
    // FINAL FUTURE VALIDATION
    // ==========================================

    if (
        reminderDate.getTime() <=
        now.getTime()
    ) {
        return null;
    }


    return reminderDate;
}

// ==========================================
// AI DATE HELPER: EXACT DATE
// ==========================================

function getExactDateAI(dateText) {

    const months = {
        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11
    };

    const cleanDate =
        String(dateText || "")
            .trim()
            .toLowerCase()
            .replace(/,/g, "");

    const match =
        cleanDate.match(
            /^(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:\s+(\d{4}))?$/
        );

    if (!match) {
        return null;
    }

    const monthName = match[1];
    const day = Number(match[2]);
    const currentYear = new Date().getFullYear();
    let year = match[3]
        ? Number(match[3])
        : currentYear;

    let targetDate =
        new Date(year, months[monthName], day);

    if (
        targetDate.getMonth() !== months[monthName] ||
        targetDate.getDate() !== day
    ) {
        return null;
    }

    if (!match[3]) {
        const today = new Date();

        if (targetDate < today) {
            year += 1;

            targetDate =
                new Date(year, months[monthName], day);

            if (
                targetDate.getMonth() !== months[monthName] ||
                targetDate.getDate() !== day
            ) {
                return null;
            }
        }
    }

    const formattedYear =
        targetDate.getFullYear();

    const formattedMonth =
        String(targetDate.getMonth() + 1).padStart(2, "0");

    const formattedDay =
        String(targetDate.getDate()).padStart(2, "0");

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

// ==========================================
// AI DATE HELPER: NEXT WEEKDAY
// ==========================================

function getNextWeekdayDateAI(dayName) {

    const weekdays = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    };

    const cleanDayName =
        String(dayName || "")
            .trim()
            .toLowerCase()
            .replace(/^next\s+/, "");

    const targetDay =
        weekdays[cleanDayName];

    if (targetDay === undefined) {
        return null;
    }

    const today =
        new Date();

    const currentDay =
        today.getDay();

    let daysUntil =
        targetDay - currentDay;

    // Always select the upcoming occurrence.
    // If today is that weekday, use next week.
    if (daysUntil <= 0) {
        daysUntil += 7;
    }

    const targetDate =
        new Date(today);

    targetDate.setDate(
        today.getDate() + daysUntil
    );

    return targetDate
        .toISOString()
        .split("T")[0];
}

// ==========================================
// AI TASK DATE FORMATTER
// ==========================================

function formatTaskDate(dateValue) {

    if (!dateValue) {
        return "";
    }

    const date =
        new Date(dateValue + "T00:00:00");

    if (isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString(
        undefined,
        {
            weekday: "short",
            month: "short",
            day: "numeric"
        }
    );
}


// ==========================================
// CLOSE TASK MODAL
// ==========================================

function closeTaskModal() {

    if (!taskCreateModal) {
        return;
    }

    taskCreateModal.classList.remove(
        "active"
    );

    if (taskCreateForm) {
        taskCreateForm.reset();
    }

    if (taskCreatePriority) {
        taskCreatePriority.value =
            "medium";
    }

}





// ==========================================
// TASK MODAL EVENTS
// ==========================================

if (taskCreateCloseBtn) {

    taskCreateCloseBtn.onclick =
        () => {

            closeTaskModal();

        };

}


if (taskCreateCancelBtn) {

    taskCreateCancelBtn.onclick =
        () => {

            closeTaskModal();

        };

}


if (taskCreateOverlay) {

    taskCreateOverlay.onclick =
        () => {

            closeTaskModal();

        };

}


// ==========================================
// TASK FORM SUBMIT
// ==========================================

if (taskCreateForm) {

    taskCreateForm.onsubmit =
        (event) => {

            event.preventDefault();

            addTask();

        };

}


// ==========================================
// ADD TASK BUTTON
// ==========================================

if (addTaskBtn) {

    addTaskBtn.onclick = () => {

        console.log(
            "ADD TASK BUTTON CLICKED"
        );

        const taskModal =
            document.getElementById(
                "taskCreateModal"
            );

        if (!taskModal) {
            console.warn(
                "TASK CREATE MODAL NOT FOUND"
            );

            return;
        }

        taskModal.classList.add(
            "active"
        );

        const titleInput =
            document.getElementById(
                "taskCreateTitleInput"
            );

        if (titleInput) {

            setTimeout(() => {

                titleInput.focus();

            }, 50);

        }

    };

}


// ---------- COMPLETE / DELETE / REMINDER ----------

taskList.addEventListener("click", (event) => {

    console.log(
    "TASK LIST CLICK LISTENER FIRED"
    );
    

    const target = event.target;

    const button = target.closest("button");

    if (!button) {
        return;
    }

    const taskId = Number(button.dataset.id);

    if (!taskId) {
        return;
    }


    // ---------- COMPLETE TASK ----------

    if (button.classList.contains("task-check")) {

        console.log(
            "CHECKBOX CLICKED:",
            button.dataset.id
        );

        const task = tasks.find(
            (task) => task.id === taskId
        );

        console.log(
            "FOUND TASK:",
            task
        );

        if (!task) {
            console.warn(
                "TASK NOT FOUND:",
                taskId
            );

            return;
        }

        task.completed = !task.completed;

        task.completedAt = task.completed
            ? new Date().toISOString()
            : null;

        console.log(
            "TASK AFTER UPDATE:",
            task
        );

        saveTasks();

        renderTasks();

        updateDashboardStats();

        refreshAnalytics();

        renderDashboardProductivity();

        console.log(
            "ALL COMPLETED TASKS:",
            tasks.filter(
                (task) => task.completed
            )
        );

        return;
    }


   // ---------- DELETE TASK ----------

        if (
            button.classList.contains(
                "task-delete"
            )
        ) {

            console.log(
                "DELETE BUTTON CLICKED:",
                taskId
            );

            const task =
                tasks.find(
                    (task) => task.id === taskId
                );

            console.log(
                "DELETE TASK FOUND:",
                task
            );

            if (!task) {

                console.warn(
                    "DELETE TASK NOT FOUND:",
                    taskId
                );

                return;
            }

            openTaskDeleteModal(
                taskId
            );

            return;
        }

    // ---------- EDIT TASK ----------

    if (
        button.classList.contains(
            "task-edit"
        )
    ) {

        const task =
            tasks.find(
                (task) => task.id === taskId
            );

        if (!task) {
            return;
        }


        editingTaskId =
            task.id;


        openTaskModal(
            task
        );

        return;
    }


    // ---------- SET / EDIT REMINDER ----------

    if (
        button.classList.contains(
            "task-reminder-edit"
        )
    ) {

        openReminderModal(taskId);

        return;
    }

});

// ---------- INITIAL RENDER ----------

renderTasks();

// ==========================================
// NOTES SYSTEM
// ==========================================

const notesGrid = document.getElementById("notesGrid");
const addNoteBtn = document.getElementById("addNoteBtn");

let notes = JSON.parse(
    localStorage.getItem("commandCenterNotes")
) || [];

function saveNotes() {
    localStorage.setItem(
        "commandCenterNotes",
        JSON.stringify(notes)
    );
}

// ==========================================
// RENDER NOTES
// ==========================================

function renderNotes() {

    // Clear existing notes
    notesGrid.innerHTML = "";


    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (notes.length === 0) {

        notesGrid.innerHTML = `
            <div class="empty-notes">

                <h3>No notes yet</h3>

                <p>Create your first note.</p>

            </div>
        `;

        return;
    }


    // ==========================================
    // CREATE NOTE CARDS
    // ==========================================

    notes.forEach((note) => {

        const noteElement =
            document.createElement("article");


        noteElement.className =
            "note-card";

        noteElement.dataset.noteId =
            String(note.id);

        noteElement.setAttribute(
            "role",
            "button"
        );

        noteElement.setAttribute(
            "tabindex",
            "0"
        );


        // ==========================================
        // REMINDER DISPLAY
        // ==========================================

        const reminderHTML =
            note.reminder
                ? `
                    <div class="task-reminder">
                        🔔 ${formatReminder(note.reminder)}
                    </div>
                  `
                : "";


        // ==========================================
        // NOTE CARD
        // ==========================================

        noteElement.innerHTML = `

            <!-- NOTE TITLE -->

            <h3>
                ${note.title}
            </h3>


            <!-- NOTE CONTENT -->

            <p>
                ${note.content}
            </p>


            <!-- REMINDER -->

            ${reminderHTML}


            <!-- NOTE ACTIONS -->

            <div class="note-card-actions">

                <button
                    class="task-reminder-edit note-reminder-btn"
                    data-id="${note.id}"
                    type="button"
                >
                    ${note.reminder
                        ? "Edit reminder"
                        : "Set reminder"}
                </button>

                <button
                    type="button"
                    class="note-view-details"
                    data-id="${note.id}"
                >
                    View details
                </button>

            </div>

        `;


        // Add note card to grid
        notesGrid.appendChild(noteElement);

    });
}

// ==========================================
// FOCUS NOTE FROM GLOBAL SEARCH
// ==========================================

function focusNoteFromSearch(noteId) {

    const noteElement =
        notesGrid.querySelector(
            `.note-card[data-note-id="${noteId}"]`
        );

    if (!noteElement) {
        console.warn(
            "NOTE NOT FOUND FROM SEARCH:",
            noteId
        );

        return;
    }

    noteElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    noteElement.classList.add(
        "search-focused-note"
    );

    setTimeout(() => {

        noteElement.classList.remove(
            "search-focused-note"
        );

    }, 1800);
}

// ==========================================
// NOTE DETAIL MODAL
// ==========================================

const noteDetailModal =
    document.getElementById(
        "noteDetailModal"
    );

const noteDetailOverlay =
    document.getElementById(
        "noteDetailOverlay"
    );

const noteDetailCloseBtn =
    document.getElementById(
        "noteDetailCloseBtn"
    );

const noteDetailTitle =
    document.getElementById(
        "noteDetailTitle"
    );

const noteDetailCreated =
    document.getElementById(
        "noteDetailCreated"
    );

const noteDetailReminder =
    document.getElementById(
        "noteDetailReminder"
    );

const noteDetailContent =
    document.getElementById(
        "noteDetailContent"
    );

const noteDetailEditBtn =
    document.getElementById(
        "noteDetailEditBtn"
    );

const noteDetailDeleteBtn =
    document.getElementById(
        "noteDetailDeleteBtn"
    );

let activeNoteDetailId = null;

// ==========================================
// NOTE EDIT MODAL
// ==========================================

const noteEditModal =
    document.getElementById(
        "noteEditModal"
    );

const noteEditOverlay =
    document.getElementById(
        "noteEditOverlay"
    );

const noteEditCloseBtn =
    document.getElementById(
        "noteEditCloseBtn"
    );

const noteEditCancelBtn =
    document.getElementById(
        "noteEditCancelBtn"
    );

const noteEditForm =
    document.getElementById(
        "noteEditForm"
    );

const noteEditTitleInput =
    document.getElementById(
        "noteEditTitleInput"
    );

const noteEditContentInput =
    document.getElementById(
        "noteEditContentInput"
    );

let activeNoteEditId = null;


// ==========================================
// OPEN NOTE EDIT MODAL
// ==========================================

function openNoteEdit(noteId) {

    const note =
        notes.find(
            (item) =>
                Number(item.id) ===
                Number(noteId)
        );

    if (
        !note ||
        !noteEditModal
    ) {
        return;
    }

    activeNoteEditId =
        Number(noteId);

    if (noteEditTitleInput) {
        noteEditTitleInput.value =
            note.title || "";
    }

    if (noteEditContentInput) {
        noteEditContentInput.value =
            note.content || "";
    }

    noteEditModal.classList.add(
        "active"
    );

    if (noteEditTitleInput) {
        noteEditTitleInput.focus();
    }
}


// ==========================================
// CLOSE NOTE EDIT MODAL
// ==========================================

function closeNoteEdit() {

    if (!noteEditModal) {
        return;
    }

    noteEditModal.classList.remove(
        "active"
    );

    activeNoteEditId =
        null;

    if (noteEditForm) {
        noteEditForm.reset();
    }
}

// ==========================================
// EDIT NOTE FROM DETAIL MODAL
// ==========================================

if (noteDetailEditBtn) {

    noteDetailEditBtn.addEventListener(
        "click",
        () => {

            if (activeNoteDetailId === null) {
                return;
            }

            const noteId =
                activeNoteDetailId;

            // Close detail modal
            closeNoteDetail();

            // Open edit modal
            openNoteEdit(noteId);

        }
    );

}

// ==========================================
// EDIT MODAL CLOSE EVENTS
// ==========================================

if (noteEditCloseBtn) {

    noteEditCloseBtn.addEventListener(
        "click",
        closeNoteEdit
    );

}

if (noteEditCancelBtn) {

    noteEditCancelBtn.addEventListener(
        "click",
        closeNoteEdit
    );

}

if (noteEditOverlay) {

    noteEditOverlay.addEventListener(
        "click",
        closeNoteEdit
    );

}


// ==========================================
// OPEN NOTE DETAIL
// ==========================================

function openNoteDetail(noteId) {

    const note =
        notes.find(
            (item) =>
                Number(item.id) ===
                Number(noteId)
        );

    if (!note || !noteDetailModal) {
        return;
    }

    activeNoteDetailId =
        Number(noteId);

    if (noteDetailTitle) {
        noteDetailTitle.textContent =
            note.title || "Untitled Note";
    }

    if (noteDetailCreated) {
        noteDetailCreated.textContent =
            note.createdAt
                ? `Created ${note.createdAt}`
                : "Created";
    }

    if (noteDetailReminder) {
        noteDetailReminder.textContent =
            note.reminder
                ? `🔔 ${formatReminder(note.reminder)}`
                : "No reminder";
    }

    if (noteDetailContent) {
        noteDetailContent.textContent =
            note.content || "";
    }

    noteDetailModal.classList.add(
        "active"
    );
}


// ==========================================
// CLOSE NOTE DETAIL
// ==========================================

function closeNoteDetail() {

    if (!noteDetailModal) {
        return;
    }

    noteDetailModal.classList.remove(
        "active"
    );

    activeNoteDetailId =
        null;
}


// ==========================================
// CLOSE EVENTS
// ==========================================

if (noteDetailCloseBtn) {

    noteDetailCloseBtn.addEventListener(
        "click",
        closeNoteDetail
    );

}

if (noteDetailOverlay) {

    noteDetailOverlay.addEventListener(
        "click",
        closeNoteDetail
    );

}

// ==========================================
// SAVE EDITED NOTE
// ==========================================

if (noteEditForm) {

    noteEditForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            if (
                activeNoteEditId === null
            ) {
                return;
            }

            const title =
                noteEditTitleInput
                    ? noteEditTitleInput.value.trim()
                    : "";

            const content =
                noteEditContentInput
                    ? noteEditContentInput.value.trim()
                    : "";

            // Title is required
            if (!title) {

                if (noteEditTitleInput) {
                    noteEditTitleInput.focus();
                }

                return;
            }

            // Content is required
            if (!content) {

                if (noteEditContentInput) {
                    noteEditContentInput.focus();
                }

                return;
            }

            const note =
                notes.find(
                    (item) =>
                        Number(item.id) ===
                        Number(activeNoteEditId)
                );

            if (!note) {
                closeNoteEdit();
                return;
            }

            // Update existing note
            note.title =
                title;

            note.content =
                content;

            // Keep reminder and creation date intact

            saveNotes();

            renderNotes();

            updateDashboardStats();

            refreshAnalytics();

            // Refresh Note Detail if it belongs
            // to the edited note
            if (
                typeof openNoteDetail ===
                "function"
            ) {

                openNoteDetail(
                    note.id
                );

            }

            closeNoteEdit();

        }
    );

}

// ==========================================
// NOTE DETAIL EDIT
// ==========================================

if (noteDetailEditBtn) {

    noteDetailEditBtn.addEventListener(
        "click",
        () => {

            if (
                activeNoteDetailId === null
            ) {
                return;
            }

            const noteId =
                Number(
                    activeNoteDetailId
                );

            closeNoteDetail();

            openNoteEdit(noteId);

        }
    );

}

// ==========================================
// NOTE DETAIL DELETE
// ==========================================

if (noteDetailDeleteBtn) {

    noteDetailDeleteBtn.addEventListener(
        "click",
        () => {

            if (
                activeNoteDetailId === null
            ) {
                return;
            }

            openNoteDeleteModal(
                activeNoteDetailId
            );

        }
    );

}

// ==========================================
// NOTE DELETE CONFIRMATION MODAL
// ==========================================

const noteDeleteModal =
    document.getElementById(
        "noteDeleteModal"
    );

const noteDeleteOverlay =
    document.getElementById(
        "noteDeleteOverlay"
    );

const noteDeleteCancelBtn =
    document.getElementById(
        "noteDeleteCancelBtn"
    );

const noteDeleteConfirmBtn =
    document.getElementById(
        "noteDeleteConfirmBtn"
    );

const noteDeleteName =
    document.getElementById(
        "noteDeleteName"
    );

let pendingNoteDeleteId = null;


// ==========================================
// OPEN DELETE CONFIRMATION
// ==========================================

function openNoteDeleteModal(noteId) {

    const note =
        notes.find(
            (item) =>
                Number(item.id) ===
                Number(noteId)
        );

    if (
        !note ||
        !noteDeleteModal
    ) {
        return;
    }

    pendingNoteDeleteId =
        Number(noteId);

    if (noteDeleteName) {
        noteDeleteName.textContent =
            note.title || "this note";
    }

    noteDeleteModal.classList.add(
        "active"
    );
}


// ==========================================
// CLOSE DELETE CONFIRMATION
// ==========================================

function closeNoteDeleteModal() {

    if (!noteDeleteModal) {
        return;
    }

    noteDeleteModal.classList.remove(
        "active"
    );

    pendingNoteDeleteId =
        null;
}


// ==========================================
// CANCEL
// ==========================================

if (noteDeleteCancelBtn) {

    noteDeleteCancelBtn.addEventListener(
        "click",
        closeNoteDeleteModal
    );

}


// ==========================================
// CLICK OUTSIDE
// ==========================================

if (noteDeleteOverlay) {

    noteDeleteOverlay.addEventListener(
        "click",
        closeNoteDeleteModal
    );

}


// ==========================================
// CONFIRM DELETE
// ==========================================

if (noteDeleteConfirmBtn) {

    noteDeleteConfirmBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            const noteId =
                Number(
                    pendingNoteDeleteId
                );

            if (!noteId) {
                return;
            }

            const note =
                notes.find(
                    (item) =>
                        Number(item.id) ===
                        noteId
                );

            if (!note) {

                closeNoteDeleteModal();

                return;
            }

            notes =
                notes.filter(
                    (item) =>
                        Number(item.id) !==
                        noteId
                );

            saveNotes();

            renderNotes();

            updateDashboardStats();

            refreshAnalytics();

            if (
                typeof activeNoteDetailId !==
                "undefined" &&
                Number(activeNoteDetailId) ===
                    noteId
            ) {
                closeNoteDetail();
            }

            closeNoteDeleteModal();

        }
    );

}


// ==========================================
// OPEN NOTE CREATE MODAL
// ==========================================

function openNoteCreateModal() {

    if (!noteCreateModal) {
        return;
    }

    noteCreateModal.classList.add(
        "active"
    );

    if (noteCreateTitleInput) {

        setTimeout(() => {

            noteCreateTitleInput.focus();

        }, 50);

    }

}

// ==========================================
// NOTE CREATE MODAL ELEMENTS + EVENTS
// ==========================================

const noteCreateModal =
    document.getElementById(
        "noteCreateModal"
    );

const noteCreateOverlay =
    document.getElementById(
        "noteCreateOverlay"
    );

const noteCreateCloseBtn =
    document.getElementById(
        "noteCreateCloseBtn"
    );

const noteCreateCancelBtn =
    document.getElementById(
        "noteCreateCancelBtn"
    );

const noteCreateForm =
    document.getElementById(
        "noteCreateForm"
    );

const noteCreateTitleInput =
    document.getElementById(
        "noteCreateTitleInput"
    );

const noteCreateContent =
    document.getElementById(
        "noteCreateContent"
    );

const noteCreateDate =
    document.getElementById(
        "noteCreateDate"
    );

const noteCreateTime =
    document.getElementById(
        "noteCreateTime"
    );


// ---------- X BUTTON ----------

if (noteCreateCloseBtn) {

    noteCreateCloseBtn.addEventListener(
        "click",
        () => {

            closeNoteCreateModal();

        }
    );

}


// ---------- CANCEL BUTTON ----------

if (noteCreateCancelBtn) {

    noteCreateCancelBtn.addEventListener(
        "click",
        () => {

            closeNoteCreateModal();

        }
    );

}


// ---------- OVERLAY ----------

if (noteCreateOverlay) {

    noteCreateOverlay.addEventListener(
        "click",
        () => {

            closeNoteCreateModal();

        }
    );

}


// ---------- SAVE / CREATE NOTE ----------

if (noteCreateForm) {

    noteCreateForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            createNote();

        }
    );

}


// ==========================================
// CLOSE NOTE CREATE MODAL
// ==========================================

function closeNoteCreateModal() {

    if (!noteCreateModal) {
        return;
    }

    noteCreateModal.classList.remove(
        "active"
    );

    if (noteCreateForm) {

        noteCreateForm.reset();

    }

}


// ==========================================
// CREATE NOTE
// ==========================================

function createNote() {

    if (
        !noteCreateTitleInput ||
        !noteCreateContent
    ) {
        return;
    }


    // ---------- TITLE ----------

    const title =
        noteCreateTitleInput.value.trim();

    if (!title) {

        noteCreateTitleInput.focus();

        return;

    }


    // ---------- CONTENT ----------

    const content =
        noteCreateContent.value.trim();

    if (!content) {

        noteCreateContent.focus();

        return;

    }


    // ---------- REMINDER ----------

    let reminder = null;

    const reminderDate =
        noteCreateDate
            ? noteCreateDate.value
            : "";

    const reminderTime =
        noteCreateTime
            ? noteCreateTime.value
            : "";


    if (
        reminderDate &&
        reminderTime
    ) {

        const reminderDateTime =
            new Date(
                `${reminderDate}T${reminderTime}`
            );


        if (
            !Number.isNaN(
                reminderDateTime.getTime()
            )
        ) {

            reminder =
                reminderDateTime.toISOString();

        }

    }


    // ---------- NEW NOTE ----------

    const newNote = {

        id:
            Date.now(),

        title:
            title,

        content:
            content,

        createdAt:
            new Date().toISOString(),

        reminder:
            reminder,

        reminderTriggered:
            false

    };


    // ---------- SAVE ----------

    notes.unshift(
        newNote
    );

    saveNotes();

    renderNotes();

    updateDashboardStats();

    refreshAnalytics();


    // ---------- CLOSE ----------

    closeNoteCreateModal();

}

// ==========================================
// AI CREATE NOTE
// ==========================================

function createNoteFromAI(
    title,
    content
) {

    const cleanTitle =
        title
            .trim();

    const cleanContent =
        content
            .trim();

    if (
        !cleanTitle ||
        !cleanContent
    ) {
        return false;
    }


    const newNote = {

        id:
            Date.now(),

        title:
            cleanTitle,

        content:
            cleanContent,

        createdAt:
            new Date().toISOString(),

        reminder:
            null,

        reminderTriggered:
            false

    };


    notes.unshift(
        newNote
    );

    saveNotes();

    renderNotes();

    updateDashboardStats();

    refreshAnalytics();


    return true;
}


// ==========================================
// CREATE NOTE BUTTON EVENT
// ==========================================

if (addNoteBtn) {

    addNoteBtn.onclick = () => {

        openNoteCreateModal();

    };

}

renderNotes();

// ==========================================
// NOTES CLICK HANDLER
// ==========================================

notesGrid.addEventListener(
    "click",
    (event) => {

        // ==========================================
        // BUTTON CLICK
        // ==========================================

        const button =
            event.target.closest("button");

            // VIEW DETAILS



        if (button) {

            const noteId =
                Number(button.dataset.id);

                    if (
                        button.classList.contains(
                            "note-view-details"
                        )
                    ) {
                        openNoteDetail(noteId);
                        return;
                    }


            if (!noteId) {
                return;
            }


            // ==========================================
            // DELETE NOTE
            // ==========================================

            if (
                button.classList.contains(
                    "note-delete"
                )
            ) {

                openNoteDeleteModal(noteId);

                return;
            }


            // ==========================================
            // SET / EDIT NOTE REMINDER
            // ==========================================

            if (
                button.classList.contains(
                    "note-reminder-btn"
                )
            ) {

                openNoteReminderModal(noteId);

                return;
            }

        }


        // ==========================================
        // NOTE CARD CLICK
        // ==========================================

        const noteCard =
            event.target.closest(".note-card");


        if (!noteCard) {
            return;
        }


        const noteId =
            Number(noteCard.dataset.noteId);


        if (!noteId) {
            return;
        }


        openNoteDetail(noteId);

    }
);

// ==========================================
// DASHBOARD STATS
// ==========================================

const totalTasksCount =
    document.getElementById("totalTasksCount");

const completedTasksCount =
    document.getElementById("completedTasksCount");

const totalNotesCount =
    document.getElementById("totalNotesCount");

const notesDescription =
    document.getElementById("notesDescription");

function updateDashboardStats() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    totalTasksCount.textContent =
        totalTasks;

    completedTasksCount.textContent =
        `${completedTasks} completed`;

    const totalNotes = notes.length;

    totalNotesCount.textContent =
        totalNotes;

    notesDescription.textContent =
        `${totalNotes} notes saved`;
}

// ==========================================
// REMINDER NOTIFICATION ENGINE
// ==========================================

async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.warn("Browser notifications are not supported.");
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission === "denied") {
        console.warn("Notification permission was denied.");
        return false;
    }

    const permission = await Notification.requestPermission();

    return permission === "granted";
}

// ==========================================
// REMINDER CHECK ENGINE
// ==========================================

function checkReminders() {

    if (!notificationsEnabled) {
        return;
    }

    // Current time
    const now = Date.now();


    // ==========================================
    // CHECK TASK REMINDERS
    // ==========================================

    tasks.forEach((task) => {

        // Ignore tasks without reminders
        if (!task.reminder) {
            return;
        }

        // Ignore completed tasks
        if (task.completed) {
            return;
        }

        // Ignore already triggered reminders
        if (task.reminderTriggered) {
            return;
        }


        // Convert reminder to timestamp
        const reminderTime =
            new Date(task.reminder).getTime();


        // Ignore invalid dates
        if (Number.isNaN(reminderTime)) {

            console.warn(
                "Invalid task reminder:",
                task.reminder
            );

            return;
        }


        // Check if reminder is due
        if (now >= reminderTime) {

            console.log(
                "Task reminder is due:",
                task.title
            );


            // Show notification
            if (
                "Notification" in window &&
                Notification.permission === "granted"
            ) {

                try {

                    const notification =
                        new Notification(
                            "Task Reminder",
                            {
                                body: task.title
                            }
                        );


                    console.log(
                        "Task notification created:",
                        task.title
                    );


                    notification.onclick = () => {

                        window.focus();

                        notification.close();

                    };


                } catch (error) {

                    console.error(
                        "Task notification failed:",
                        error
                    );

                    return;
                }
            }


            // Mark reminder as triggered
            task.reminderTriggered = true;


            console.log(
                "Task reminder marked as triggered:",
                task.title
            );
        }

    });


    // ==========================================
    // CHECK NOTE REMINDERS
    // ==========================================

    notes.forEach((note) => {

        // Ignore notes without reminders
        if (!note.reminder) {
            return;
        }

        // Ignore already triggered reminders
        if (note.reminderTriggered) {
            return;
        }


        // Convert reminder to timestamp
        const reminderTime =
            new Date(note.reminder).getTime();


        // Ignore invalid dates
        if (Number.isNaN(reminderTime)) {

            console.warn(
                "Invalid note reminder:",
                note.reminder
            );

            return;
        }


        // Check if reminder is due
        if (now >= reminderTime) {

            console.log(
                "Note reminder is due:",
                note.title
            );


            // Show browser notification
            if (
                "Notification" in window &&
                Notification.permission === "granted"
            ) {

                try {

                    const notification =
                        new Notification(
                            "Note Reminder",
                            {
                                body: note.title
                            }
                        );


                    console.log(
                        "Note notification created:",
                        note.title
                    );


                    notification.onclick = () => {

                        window.focus();

                        notification.close();

                    };


                } catch (error) {

                    console.error(
                        "Note notification failed:",
                        error
                    );

                    return;
                }
            }


            // Mark reminder as triggered
            note.reminderTriggered = true;


            console.log(
                "Note reminder marked as triggered:",
                note.title
            );
        }

    });


    // ==========================================
    // SAVE UPDATED REMINDER STATES
    // ==========================================

    saveTasks();

    saveNotes();
}


// ==========================================
// START REMINDER ENGINE
// ==========================================

// Check every 5 seconds
setInterval(
    checkReminders,
    5000
);


// Run immediately when page loads
checkReminders();

// ==========================================
// REQUEST REMINDER NOTIFICATION PERMISSION
// ==========================================

async function requestReminderNotificationPermission() {

    // Browser does not support notifications
    if (!("Notification" in window)) {
        return false;
    }

    // Already allowed
    if (
        Notification.permission ===
        "granted"
    ) {
        return true;
    }

    // Permission already denied
    if (
        Notification.permission ===
        "denied"
    ) {
        return false;
    }

    // Ask user for permission
    try {

        const permission =
            await Notification.requestPermission();

        return (
            permission ===
            "granted"
        );

    } catch (error) {

        console.error(
            "Notification permission request failed:",
            error
        );

        return false;
    }
}

// ==========================================
// ANALYTICS DATA ENGINE
// ==========================================

function getAnalyticsData() {

    // ==========================================
    // TASK DATA
    // ==========================================

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(
            (task) => task.completed
        ).length;


    const pendingTasks =
        tasks.filter(
            (task) => !task.completed
        ).length;


    // ==========================================
    // COMPLETION RATE
    // ==========================================

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );


    // ==========================================
    // NOTE DATA
    // ==========================================

    const totalNotes =
        notes.length;


    // ==========================================
    // PRIORITY BREAKDOWN
    // ==========================================

    const highPriorityTasks =
        tasks.filter(
            (task) =>
                task.priority === "high"
        ).length;


    const mediumPriorityTasks =
        tasks.filter(
            (task) =>
                task.priority === "medium"
        ).length;


    const lowPriorityTasks =
        tasks.filter(
            (task) =>
                task.priority === "low"
        ).length;


    // ==========================================
    // RETURN ANALYTICS DATA
    // ==========================================

    return {

        totalTasks,

        completedTasks,

        pendingTasks,

        completionRate,

        totalNotes,

        priorityBreakdown: {

            high: highPriorityTasks,

            medium: mediumPriorityTasks,

            low: lowPriorityTasks

        }

    };
}

console.log(
    "Analytics Data:",
    getAnalyticsData()
);

// ==========================================
// ANALYTICS UI
// ==========================================

function renderAnalytics() {

    const analyticsPage =
        document.getElementById(
            "analyticsPage"
        );

    if (!analyticsPage) {
        console.warn(
            "Analytics page not found."
        );
        return;
    }


    // ==========================================
    // MAIN STATS
    // ==========================================

    const analyticsTotalTasks =
        document.getElementById(
            "analyticsTotalTasks"
        );

    const analyticsCompletedTasks =
        document.getElementById(
            "analyticsCompletedTasks"
        );

    const analyticsPendingTasks =
        document.getElementById(
            "analyticsPendingTasks"
        );

    const analyticsCompletionRate =
        document.getElementById(
            "analyticsCompletionRate"
        );

    const analyticsTotalNotes =
        document.getElementById(
            "analyticsTotalNotes"
        );


    // ==========================================
    // COMPLETION OVERVIEW
    // ==========================================

    const analyticsCompletionPercent =
        document.getElementById(
            "analyticsCompletionPercent"
        );

    const analyticsCompletedOverview =
        document.getElementById(
            "analyticsCompletedOverview"
        );

    const analyticsPendingOverview =
        document.getElementById(
            "analyticsPendingOverview"
        );

    const completionRing =
        document.querySelector(
            ".completion-ring"
        );


    // ==========================================
    // PRIORITY
    // ==========================================

    const analyticsHighPriority =
        document.getElementById(
            "analyticsHighPriority"
        );

    const analyticsMediumPriority =
        document.getElementById(
            "analyticsMediumPriority"
        );

    const analyticsLowPriority =
        document.getElementById(
            "analyticsLowPriority"
        );


    const analyticsHighBar =
        document.getElementById(
            "analyticsHighBar"
        );

    const analyticsMediumBar =
        document.getElementById(
            "analyticsMediumBar"
        );

    const analyticsLowBar =
        document.getElementById(
            "analyticsLowBar"
        );


    // ==========================================
    // VERIFY ELEMENTS
    // ==========================================

    const requiredElements = [
        analyticsTotalTasks,
        analyticsCompletedTasks,
        analyticsPendingTasks,
        analyticsCompletionRate,
        analyticsTotalNotes,

        analyticsCompletionPercent,
        analyticsCompletedOverview,
        analyticsPendingOverview,

        analyticsHighPriority,
        analyticsMediumPriority,
        analyticsLowPriority,

        analyticsHighBar,
        analyticsMediumBar,
        analyticsLowBar,

        completionRing
    ];


    if (
        requiredElements.some(
            (element) => !element
        )
    ) {
        console.warn(
            "Some Analytics UI elements are missing."
        );

        return;
    }


    // ==========================================
    // GET REAL DATA
    // ==========================================

    const data =
        getAnalyticsData();


    // ==========================================
    // MAIN STATS
    // ==========================================

    analyticsTotalTasks.textContent =
        data.totalTasks;

    analyticsCompletedTasks.textContent =
        data.completedTasks;

    analyticsPendingTasks.textContent =
        data.pendingTasks;

    analyticsCompletionRate.textContent =
        `${data.completionRate}%`;

    analyticsTotalNotes.textContent =
        data.totalNotes;


    // ==========================================
    // COMPLETION OVERVIEW
    // ==========================================

    analyticsCompletionPercent.textContent =
        `${data.completionRate}%`;

    analyticsCompletedOverview.textContent =
        data.completedTasks;

    analyticsPendingOverview.textContent =
        data.pendingTasks;

    completionRing.style.setProperty(
        "--completion",
        `${data.completionRate}%`
    );


    // ==========================================
    // PRIORITY COUNTS
    // ==========================================

    const high =
        data.priorityBreakdown.high;

    const medium =
        data.priorityBreakdown.medium;

    const low =
        data.priorityBreakdown.low;


    analyticsHighPriority.textContent =
        high;

    analyticsMediumPriority.textContent =
        medium;

    analyticsLowPriority.textContent =
        low;


    // ==========================================
    // PRIORITY BARS
    // ==========================================

    const totalPriorityTasks =
        high + medium + low;


    const highPercentage =
        totalPriorityTasks === 0
            ? 0
            : (high / totalPriorityTasks) * 100;

    const mediumPercentage =
        totalPriorityTasks === 0
            ? 0
            : (medium / totalPriorityTasks) * 100;

    const lowPercentage =
        totalPriorityTasks === 0
            ? 0
            : (low / totalPriorityTasks) * 100;


    analyticsHighBar.style.width =
        `${highPercentage}%`;

    analyticsMediumBar.style.width =
        `${mediumPercentage}%`;

    analyticsLowBar.style.width =
        `${lowPercentage}%`;

    renderProductivityTrend();
}

function renderProductivityTrend() {

    const productivityBars =
        document.getElementById(
            "productivityBars"
        );

    const productivityLabels =
        document.getElementById(
            "productivityLabels"
        );

    if (
        !productivityBars ||
        !productivityLabels
    ) {
        return;
    }


    // ==========================================
    // CREATE LAST 7 DAYS
    // ==========================================

    const days = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date();

        date.setHours(
            0,
            0,
            0,
            0
        );

        date.setDate(
            date.getDate() - i
        );

        days.push(date);
    }


    // ==========================================
    // COUNT COMPLETED TASKS
    // ==========================================

    const dailyCounts =
        days.map((day) => {

            const nextDay =
                new Date(day);

            nextDay.setDate(
                nextDay.getDate() + 1
            );

            return tasks.filter(
                (task) => {

                    if (
                        !task.completedAt
                    ) {
                        return false;
                    }

                    const completedDate =
                        new Date(
                            task.completedAt
                        );

                    return (
                        completedDate >= day &&
                        completedDate < nextDay
                    );
                }
            ).length;

        });


    // ==========================================
    // FIND MAXIMUM
    // ==========================================

    const maxCount =
        Math.max(
            ...dailyCounts,
            1
        );


    // ==========================================
    // RENDER BARS
    // ==========================================

    productivityBars.innerHTML = "";

    dailyCounts.forEach(
        (count) => {

            const bar =
                document.createElement(
                    "div"
                );

            bar.className =
                "productivity-bar";

            const height =
                count === 0
                    ? 3
                    : Math.max(
                        (count / maxCount) * 100,
                        8
                    );

            bar.style.height =
                `${height}%`;

            bar.title =
                `${count} task${
                    count === 1
                        ? ""
                        : "s"
                } completed`;

            productivityBars.appendChild(
                bar
            );

        }
    );


    // ==========================================
    // RENDER DAY LABELS
    // ==========================================

    productivityLabels.innerHTML = "";

    days.forEach(
        (day) => {

            const label =
                document.createElement(
                    "span"
                );

            label.textContent =
                day.toLocaleDateString(
                    [],
                    {
                        weekday: "short"
                    }
                );

            productivityLabels.appendChild(
                label
            );

        }
    );
}

// ==========================================
// ANALYTICS UPDATE HOOK
// ==========================================

window.updateAnalytics =
    renderAnalytics;

function refreshAnalytics() {

    if (
        typeof window.updateAnalytics ===
        "function"
    ) {
        window.updateAnalytics();
    }

}

function renderDashboardProductivity() {

    const chartPeriod =
        document.getElementById(
            "chartPeriod"
        );

    const chartBars =
        document.getElementById(
            "dashboardProductivityBars"
        );

    const chartLabels =
        document.getElementById(
            "productivityChartLabels"
        );


    if (
        !chartPeriod ||
        !chartBars ||
        !chartLabels
    ) {
        console.warn(
            "Dashboard Productivity elements missing."
        );

        return;
    }


    const period =
        chartPeriod.value;


    const days =
        period === "This month"
            ? 30
            : 7;


    const dates = [];


    for (
        let i = days - 1;
        i >= 0;
        i--
    ) {

        const date =
            new Date();

        date.setHours(
            0,
            0,
            0,
            0
        );

        date.setDate(
            date.getDate() - i
        );

        dates.push(date);
    }


    const counts =
        dates.map(
            (date) => {

                const nextDate =
                    new Date(date);

                nextDate.setDate(
                    nextDate.getDate() + 1
                );


                return tasks.filter(
                    (task) => {

                        if (
                            !task.completedAt
                        ) {
                            return false;
                        }


                        const completedAt =
                            new Date(
                                task.completedAt
                            );


                        return (
                            completedAt >= date &&
                            completedAt < nextDate
                        );

                    }
                ).length;

            }
        );


    const maxCount =
        Math.max(
            ...counts,
            1
        );


    chartBars.innerHTML = "";

    chartLabels.innerHTML = "";


    counts.forEach(
        (count) => {

            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "dashboard-productivity-bar";


            const height =
                count === 0
                    ? 4
                    : Math.max(
                        (count / maxCount) * 100,
                        10
                    );


            bar.style.height =
                `${height}%`;


            bar.title =
                `${count} completed task${
                    count === 1
                        ? ""
                        : "s"
                }`;


            chartBars.appendChild(
                bar
            );

        }
    );


    dates.forEach(
        (date) => {

            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                period === "This week"
                    ? date.toLocaleDateString(
                        [],
                        {
                            weekday: "short"
                        }
                    )
                    : date.getDate();


            chartLabels.appendChild(
                label
            );

        }
    );


    console.log(
        "DASHBOARD PRODUCTIVITY:",
        counts
    );

}


// ==========================================
// PERIOD SWITCH
// ==========================================

const chartPeriod =
    document.getElementById(
        "chartPeriod"
    );


if (chartPeriod) {

    chartPeriod.addEventListener(
        "change",
        renderDashboardProductivity
    );

}


// ==========================================
// INITIAL RENDER
// ==========================================

renderDashboardProductivity();

document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderAnalytics();
    }
);

console.log(
    "PRODUCTIVITY TEST:",
    typeof renderDashboardProductivity,
    tasks.filter(
        (task) => task.completed
    )
);


requestNotificationPermission();

updateDashboardStats();

updateAnalytics();

// ==========================================
// REAL AI / LLM CONNECTION
// ==========================================

async function askRealAI(command) {

    const cleanCommand =
        String(command || "").trim();


    if (!cleanCommand) {

        throw new Error(
            "AI command is empty."
        );

    }


    const response =
        await fetch(
            "http://localhost:3000/api/ai",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    command:
                        cleanCommand,

                    messages:
                        Array.isArray(
                            aiConversationContext?.messages
                        )
                            ? aiConversationContext.messages
                            : []

                })
            }
        );


    let data;

    try {

        data =
            await response.json();

    }
    catch {

        throw new Error(
            "Backend returned an invalid response."
        );

    }


    if (
        !response.ok ||
        !data.success
    ) {

        throw new Error(
            data.error ||
            "Real AI request failed."
        );

    }


    const output =
        String(
            data.output || ""
        ).trim();


    if (!output) {

        throw new Error(
            "AI returned an empty response."
        );

    }


    return output;

}

// ==========================================
// REAL AI UI CONNECTION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const oldInput =
        document.getElementById("aiCommandInput");

    const oldSendButton =
        document.getElementById("aiSendCommandBtn");

    const aiConversationElement =
        document.getElementById("aiConversation");

    const aiStatusElement =
        document.getElementById("aiStatus");


    if (
        !oldInput ||
        !oldSendButton ||
        !aiConversationElement
    ) {
        return;
    }


    // ==========================================
    // REMOVE OLD INPUT LISTENERS
    // ==========================================

    const aiInput =
        oldInput.cloneNode(true);

    oldInput.replaceWith(aiInput);


    // ==========================================
    // REMOVE OLD BUTTON LISTENERS
    // ==========================================

    const aiSendButton =
        oldSendButton.cloneNode(true);

    oldSendButton.replaceWith(aiSendButton);


    // ==========================================
    // TYPING INDICATOR
    // ==========================================

    function showAITypingIndicator() {

        removeAITypingIndicator();


        const typingMessage =
            document.createElement("div");

        typingMessage.className =
            "ai-message assistant ai-typing-message";


        const typingContent =
            document.createElement("div");

        typingContent.className =
            "ai-message-content";


        const typingMeta =
            document.createElement("div");

        typingMeta.className =
            "ai-message-meta";


        const typingAuthor =
            document.createElement("span");

        typingAuthor.className =
            "ai-message-author";

        typingAuthor.textContent =
            "✦ AI Assistant";


        const typingBubble =
            document.createElement("div");

        typingBubble.className =
            "ai-message-bubble ai-typing-bubble";


        for (
            let i = 0;
            i < 3;
            i++
        ) {

            const dot =
                document.createElement("span");

            dot.className =
                "ai-typing-dot";

            typingBubble.appendChild(dot);

        }


        typingMeta.appendChild(
            typingAuthor
        );


        typingContent.appendChild(
            typingMeta
        );

        typingContent.appendChild(
            typingBubble
        );


        typingMessage.appendChild(
            typingContent
        );


        aiConversationElement.appendChild(
            typingMessage
        );


        aiConversationElement.scrollTo({

            top:
                aiConversationElement.scrollHeight,

            behavior:
                "smooth"

        });

    }


    function removeAITypingIndicator() {

        const typingMessage =
            aiConversationElement.querySelector(
                ".ai-typing-message"
            );


        if (typingMessage) {

            typingMessage.remove();

        }

    }


    // ==========================================
    // REAL AI REQUEST
    // ==========================================

    let aiCommandProcessing = false;

    async function runRealAIFromUI(event) {

            if (event) {
                event.preventDefault();
            }


            if (aiCommandProcessing) {
                return;
            }


            const command =
                aiInput.value.trim();


            if (!command) {
                return;
            }

            console.log(
                "AI COMMAND RECEIVED:",
                command
            );


            aiCommandProcessing = true;


            const normalizedCommand =
                command
                    .toLowerCase()
                    .trim();


            const actionKeywords = [

                "change its category to ",
                "change category to ",
                "set its category to ",
                "set category to ",
                "update its category to ",
                "update category to ",

                "increase its progress to ",
                "change its progress to ",
                "set its progress to ",
                "update its progress to ",
                "change progress to ",
                "set progress to ",
                "update progress to ",

                "create task",
                "create a task",
                "make task",
                "make a task",
                "add task",
                "add a task",

                "remind me",
                "need to",
                "i have to",
                "i want to",

                "create note",
                "create a note",
                "add note",
                "add a note",

                "create goal",
                "create a goal",
                "add goal",
                "add a goal",

                "create planner",
                "create a planner",
                "add planner",
                "add an event",
                "create event",

                "create expense",
                "add expense",

                "create income",
                "add income",

                "complete task",
                "finish task",
                "mark it complete",

                "delete task",
                "delete goal",
                "delete it",
                "rename it to",
                "make it friday",
                "change it",
                "remove task",

                "make it tomorrow",
                "move it to tomorrow",
                "set it for tomorrow",

                "change its target to ",
                "change target to ",
                "set its target to ",
                "set target to ",

                "change the reminder to ",
                "change reminder to ",
                "set the reminder to ",

                "make it at ",
                "set it at ",
                "move it to ",

                "make it on ",
                "move it to ",
                "set it for ",

                "make it on ",
                "move it to ",
                "set it for ",

                "make it next ",
                "move it to next ",
                "set it for next ",

                "make it priority",
                "change its priority",
                "change priority",
                "set priority"

            ];

            const isNamedGoalProgressCommand =
                /^(?:increase|change|set|update)\s+.+?\s+progress\s+(?:to|at)\s+[0-9]+(?:\.[0-9]+)?%?\s*$/i.test(
                    command.trim()
                );

            const isNamedGoalCategoryCommand =
                /^(?:change|set|update)\s+.+?\s+category\s+to\s+(?:Personal|Career|Health|Finance|Education)\s*$/i.test(
                    command.trim()
                );

            const isNamedGoalTargetCommand =
                /^(?:change|set|update)\s+.+?\s+target\s+to\s+-?[0-9,]+(?:\.[0-9]+)?\s*$/i.test(
                    command.trim()
                );

            const isNamedGoalDescriptionCommand =
                /^(?:change|set|update)\s+.+?\s+description\s+to\s+.+$/i.test(
                    command.trim()
                );

            const isNamedGoalRenameCommand =
                /^(?:rename|change)\s+.+?\s+to\s+.+$/i.test(
                    command.trim()
                );

            const isNamedGoalDeleteCommand =
                /^delete\s+.+?\s+goal$/i.test(
                    command.trim()
                );

            const isNamedGoalProgressQuery =
                /^what\s+is\s+.+?\s+progress$/i.test(
                    command.trim()
                );

            const isNamedGoalTargetQuery =
                /^what\s+is\s+.+?\s+target$/i.test(
                    command.trim()
                ) ||
                /^what\s+is\s+(?:the\s+)?target\s+of\s+.+$/i.test(
                    command.trim()
                );

            const isNamedGoalDescriptionQuery =
                /^what\s+is\s+.+?\s+description$/i.test(
                    command.trim()
                );
                
            const isNamedGoalCategoryQuery =
                /^what\s+is\s+.+?\s+category$/i.test(
                    command.trim()
                ) ||
                /^what\s+is\s+(?:the\s+)?category\s+of\s+.+$/i.test(
                    command.trim()
                );

            const isNegativeGoalTargetCommand =
                /^(?:change|set|update)\s+.+?\s+target\s+to\s+-[0-9,]+(?:\.[0-9]+)?\s*$/i.test(
                    command.trim()
                );

            const isCreateGoalCommand =
                /^(?:create|add|make)\s+(?:a\s+)?goal\s+(?:called|named)\s+.+$/i.test(
                    command.trim()
                );

            const isAIDeleteGoalCommand =
                /^delete\s+(?:the\s+)?goal\s+.+$/i.test(
                    command.trim()
                );

            const isAIFindGoalCommand =
                /^find\s+(?:the\s+)?goal\s+.+$/i.test(
                    command.trim()
                );

            const isAIUndoDeletedGoalCommand =
                    normalizedCommand === "undo that" ||
                    normalizedCommand === "undo it" ||
                    normalizedCommand === "restore that goal";

            // Restore persisted deleted goal after page refresh.
            if (
                window.lastDeletedGoal === undefined ||
                window.lastDeletedGoal === null
            ) {
                const savedDeletedGoal =
                    localStorage.getItem(
                        "lastDeletedGoal"
                    );

                if (savedDeletedGoal) {
                    try {
                        window.lastDeletedGoal =
                            JSON.parse(
                                savedDeletedGoal
                            );
                    } catch (error) {
                        window.lastDeletedGoal =
                            null;
                    }
                }
            }

            const isActionCommand =
                actionKeywords.some(
                    (keyword) =>
                        normalizedCommand.includes(keyword)
                ) ||
                isNamedGoalProgressCommand ||
                isNamedGoalProgressQuery ||
                isNamedGoalTargetQuery ||
                isNamedGoalDescriptionQuery ||
                isAIDeleteGoalCommand ||
                isAIFindGoalCommand ||
                isAIUndoDeletedGoalCommand ||
                isNamedGoalCategoryQuery ||
                    isCreateGoalCommand ||
                isNamedGoalCategoryCommand ||
                isNamedGoalTargetCommand ||
                isNegativeGoalTargetCommand ||
                isNamedGoalRenameCommand ||
                isNamedGoalDescriptionCommand ||
                isNamedGoalDeleteCommand;

            console.log(
                "AI ACTION CHECK:",
                isActionCommand,
                isNamedGoalProgressCommand
            );



// ==========================================
// ACTION COMMAND
// ==========================================

if (isActionCommand) {
    if (aiStatusElement) {
        aiStatusElement.textContent =
            "Thinking...";
    }

    console.log(
        "AI ACTION BRANCH ENTERED"
    );

    try {
        handleAICommand(
            command
        );

        if (aiStatusElement) {
            aiStatusElement.textContent =
                "AI Online";
        }

    }
    catch (error) {
        console.error(
            "AI Action Handler Error:",
            error
        );

        addAIMessage(
            "I couldn't process that action. Please try again.",
            "assistant"
        );

        if (aiStatusElement) {
            aiStatusElement.textContent =
                "AI Error";
        }
    }

    aiInput.value = "";

    aiConversationElement.scrollTop =
        aiConversationElement.scrollHeight;

    aiCommandProcessing = false;
    return;
}


            // ==========================================
            // NORMAL LLM CONVERSATION
            // ==========================================

            addAIMessage(
                command,
                "user"
            );


            aiInput.value = "";


            if (aiStatusElement) {

                aiStatusElement.textContent =
                    "Thinking...";

            }


            showAITypingIndicator();


            try {

                const aiResponse =
                    await askRealAI(
                        command
                    );


                removeAITypingIndicator();


                addAIMessage(
                    aiResponse,
                    "assistant"
                );


                if (aiStatusElement) {

                    aiStatusElement.textContent =
                        "AI Online";

                }

            }
            catch (error) {

                console.error(
                    "Real AI UI Error:",
                    error
                );


                removeAITypingIndicator();


                if (aiStatusElement) {

                    aiStatusElement.textContent =
                        "AI Error";

                }


                addAIMessage(
                    "Real AI connection error: " +
                    (
                        error?.message ||
                        "Unknown error"
                    ),
                    "assistant"
                );

            }


            aiConversationElement.scrollTop =
                aiConversationElement.scrollHeight;


            aiCommandProcessing = false;

        }


    // ==========================================
    // SEND BUTTON
    // ==========================================

    aiSendButton.addEventListener(
        "click",
        runRealAIFromUI
    );


    // ==========================================
    // ENTER KEY
    // ==========================================

    aiInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                runRealAIFromUI(event);

            }

        }
    );

});

// =========================
// SETTINGS - DATA MANAGEMENT
// =========================

const exportDataBtn = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const importDataInput = document.getElementById("importDataInput");

const clearDataBtn = document.getElementById("clearDataBtn");
const resetCommandCenterBtn = document.getElementById("resetCommandCenterBtn");

const dataConfirmModal = document.getElementById("dataConfirmModal");
const dataConfirmClose = document.getElementById("dataConfirmClose");
const dataConfirmCancel = document.getElementById("dataConfirmCancel");
const dataConfirmProceed = document.getElementById("dataConfirmProceed");

const dataConfirmTitle = document.getElementById("dataConfirmTitle");
const dataConfirmMessage = document.getElementById("dataConfirmMessage");
const dataConfirmEyebrow = document.getElementById("dataConfirmEyebrow");

let pendingDataAction = null;
let pendingImportedData = null;


// GET SAVED DATA
function getCommandCenterData() {
    const data = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key) {
            data[key] = localStorage.getItem(key);
        }
    }

    return data;
}


// OPEN MODAL
function openDataConfirmModal(action) {
    if (!dataConfirmModal) {
        console.error("Data confirmation modal not found.");
        return;
    }

    pendingDataAction = action;

    if (action === "import") {
        dataConfirmEyebrow.textContent = "IMPORT DATA";
        dataConfirmTitle.textContent = "Import backup?";
        dataConfirmMessage.textContent =
            "Your current saved data may be replaced by this backup.";
        dataConfirmProceed.textContent = "Import Backup";
    }

    if (action === "clear") {
        dataConfirmEyebrow.textContent = "CLEAR DATA";
        dataConfirmTitle.textContent = "Clear saved data?";
        dataConfirmMessage.textContent =
            "All saved Command Center data will be permanently removed.";
        dataConfirmProceed.textContent = "Clear Data";
    }

    if (action === "reset") {
        dataConfirmEyebrow.textContent = "FULL RESET";
        dataConfirmTitle.textContent = "Reset Command Center?";
        dataConfirmMessage.textContent =
            "Everything saved in Command Center will be permanently removed.";
        dataConfirmProceed.textContent = "Reset Everything";
    }

    dataConfirmModal.classList.add("active");
}


// CLOSE MODAL
function closeDataConfirmModal() {
    if (!dataConfirmModal) return;

    dataConfirmModal.classList.remove("active");

    pendingDataAction = null;
    pendingImportedData = null;
}


// EXPORT
if (exportDataBtn) {
    exportDataBtn.addEventListener("click", () => {

        const data = getCommandCenterData();

        const blob = new Blob(
            [JSON.stringify(data, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `command-center-backup-${Date.now()}.json`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    });
}


// IMPORT
if (importDataBtn && importDataInput) {

    importDataBtn.addEventListener("click", () => {
        importDataInput.click();
    });

    importDataInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            try {

                const importedData = JSON.parse(e.target.result);

                if (
                    !importedData ||
                    typeof importedData !== "object" ||
                    Array.isArray(importedData)
                ) {
                    throw new Error("Invalid backup");
                }

                pendingImportedData = importedData;

                openDataConfirmModal("import");

            } catch (error) {

                alert("Invalid Command Center backup file.");

            }

        };

        reader.readAsText(file);

        importDataInput.value = "";
    });
}


// CLEAR
if (clearDataBtn) {

    clearDataBtn.addEventListener("click", () => {

        openDataConfirmModal("clear");

    });
}


// RESET
if (resetCommandCenterBtn) {

    resetCommandCenterBtn.addEventListener("click", () => {

        openDataConfirmModal("reset");

    });
}


// CONFIRM
if (dataConfirmProceed) {

    dataConfirmProceed.addEventListener("click", () => {

        if (pendingDataAction === "import") {

            if (!pendingImportedData) return;

            localStorage.clear();

            Object.entries(pendingImportedData).forEach(
                ([key, value]) => {
                    localStorage.setItem(key, value);
                }
            );

            closeDataConfirmModal();

            location.reload();

            return;
        }


        if (pendingDataAction === "clear") {

            localStorage.clear();

            closeDataConfirmModal();

            location.reload();

            return;
        }


        if (pendingDataAction === "reset") {

            localStorage.clear();

            closeDataConfirmModal();

            location.reload();

            return;
        }

    });

}


// CANCEL
if (dataConfirmCancel) {
    dataConfirmCancel.addEventListener(
        "click",
        closeDataConfirmModal
    );
}


// CLOSE ×
if (dataConfirmClose) {
    dataConfirmClose.addEventListener(
        "click",
        closeDataConfirmModal
    );
}


// OUTSIDE CLICK
if (dataConfirmModal) {

    dataConfirmModal.addEventListener("click", (event) => {

        if (event.target === dataConfirmModal) {
            closeDataConfirmModal();
        }

    });

}


// ESC
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        dataConfirmModal &&
        dataConfirmModal.classList.contains("active")
    ) {
        closeDataConfirmModal();
    }

});


/* ==========================================
   DASHBOARD AI COMMAND CONNECTION
========================================== */

(function connectDashboardAI() {
    const dashboardInput = document.getElementById("commandInput");
    const dashboardButton = document.getElementById("commandButton");

    if (!dashboardInput || !dashboardButton) return;

    function sendDashboardCommand() {
        const command = dashboardInput.value.trim();

        if (!command) {
            dashboardInput.focus();
            return;
        }

        if (typeof handleAICommand === "function") {
            dashboardInput.value = "";

            if (typeof showPage === "function") {
                showPage("ai");
            }

            if (typeof addAIMessage === "function") {
                addAIMessage(command, "user");
            }

            handleAICommand(command);
        } else {
            console.error(
                "Dashboard AI: handleAICommand was not found."
            );
        }
    }

    dashboardButton.addEventListener("click", sendDashboardCommand);

    dashboardInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendDashboardCommand();
        }
    });
})();


/* ==========================================
   DASHBOARD QUICK ACTIONS
========================================== */

(function connectDashboardQuickActions() {
    document.addEventListener("click", function (event) {
        const button = event.target.closest(
            ".command-suggestions button"
        );

        if (!button) return;

        event.preventDefault();

        const label = button.textContent.trim().toLowerCase();

        // CREATE NOTE
        if (label.includes("create note")) {
            if (typeof openNoteCreateModal === "function") {
                openNoteCreateModal();
            } else {
                console.error(
                    "Dashboard Quick Actions: openNoteCreateModal not found."
                );
            }

            return;
        }

        // ADD TASK
        if (label.includes("add task")) {
            if (typeof openTaskModal === "function") {
                openTaskModal();
            } else {
                console.error(
                    "Dashboard Quick Actions: openTaskModal not found."
                );
            }

            return;
        }

       // ADD EXPENSE
        if (label.includes("add expense")) {
            if (typeof openFinanceModal === "function") {
                openFinanceModal();
            } else {
                console.error(
                    "Dashboard Quick Actions: openFinanceModal not found."
                );
            }
        }
    });
})();

/* ==========================================
   DASHBOARD AI COMMAND - OPEN PAGE ONLY
========================================== */

(function connectDashboardCommandNavigation() {
    const commandInput = document.getElementById("commandInput");
    const commandButton = document.getElementById("commandButton");

    function openAICommandCenter(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (typeof showPage === "function") {
            showPage("ai");
        } else {
            console.error("showPage function not found.");
        }

        // Focus the actual AI page input, if available
        const aiInput = document.getElementById("aiCommandInput");

        if (aiInput) {
            aiInput.focus();
        }
    }

    if (commandInput) {
        commandInput.addEventListener("click", openAICommandCenter);

        commandInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                openAICommandCenter(event);
            }
        });
    }

    if (commandButton) {
        commandButton.addEventListener("click", openAICommandCenter);
    }
})();


// ==========================================
// COMMON DASHBOARD ACTIVITY LOGGER
// ==========================================

function addDashboardActivity({
    action,
    description,
    entityType = "",
    entityId = ""
}) {
    try {
        const history = JSON.parse(
            localStorage.getItem(ACTIVITY_STORAGE_KEY) || "[]"
        );

        history.unshift({
            action,
            description,
            entityType,
            entityId,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem(
            ACTIVITY_STORAGE_KEY,
            JSON.stringify(history)
        );

        renderDashboardActivity();

    } catch (error) {
        console.error("Dashboard activity save error:", error);
    }
}

/* ==========================================
   PREMIUM DASHBOARD - TODAY'S ACTIVITY
========================================== */

const ACTIVITY_STORAGE_KEY = "commandCenterAIActionHistory";
let showAllDashboardActivity = false;

function renderDashboardActivity() {
    const activityList = document.getElementById("dashboardActivityList");

    if (!activityList || !Array.isArray(tasks)) return;

    // Today's local date in YYYY-MM-DD format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const today = `${year}-${month}-${day}`;

    // Show tasks scheduled for today
    const todaysTasks = tasks
        .filter(task => task.date === today)
        .sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            return (a.time || "").localeCompare(b.time || "");
        });

    
    if (todaysTasks.length === 0) {
        activityList.innerHTML = `
            <div class="dashboard-activity-empty">
                <span class="activity-empty-icon">✦</span>
                <h4>Your day starts here</h4>
                <p>
                    Your tasks, notes, planner events, goal updates
                    and finance activity will appear here as you use your Command Center.
                </p>
            </div>
        `;
        return;
    }

    const completedCount = todaysTasks.filter(
        task => task.completed
    ).length;

    const progress = Math.round(
        (completedCount / todaysTasks.length) * 100
    );

    activityList.innerHTML = `
        <div class="dashboard-activity-summary">
            <div>
                <span class="activity-summary-label">DAILY PROGRESS</span>
                <strong>${completedCount} of ${todaysTasks.length} completed</strong>
            </div>
            <span class="activity-progress-percent">${progress}%</span>
        </div>

        <div class="activity-progress-track">
            <div class="activity-progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="dashboard-activity-items">
            ${todaysTasks.map(task => {
                const priority = ["low", "medium", "high"].includes(
                    String(task.priority || "").toLowerCase()
                )
                    ? String(task.priority).toLowerCase()
                    : "medium";

                return `
                    <div class="dashboard-activity-item ${task.completed ? "is-completed" : ""}">
                        <button
                            type="button"
                            class="dashboard-activity-check ${task.completed ? "is-checked" : ""}"
                            data-activity-task-id="${task.id}"
                            aria-label="${task.completed ? "Mark incomplete" : "Complete task"}"
                        >${task.completed ? "✓" : ""}</button>

                        <div class="dashboard-activity-details">
                            <strong>${escapeActivityText(task.title || "Untitled task")}</strong>
                            <div class="dashboard-activity-meta">
                                ${task.time ? `<span>${escapeActivityText(task.time)}</span>` : ""}
                                <span class="activity-priority priority-${priority}">${priority}</span>
                            </div>
                        </div>

                        <span class="activity-status">
                            ${task.completed ? "Completed" : "Pending"}
                        </span>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

function escapeActivityText(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Toggle task completion using the existing task data
document.addEventListener("click", function(event) {
    const button = event.target.closest("[data-activity-task-id]");

    if (!button) return;

    const task = tasks.find(
        item => String(item.id) === button.dataset.activityTaskId
    );

    if (!task) return;

    task.completed = !task.completed;

    if (typeof saveTasks === "function") {
        saveTasks();
    } else if (typeof saveData === "function") {
        saveData();
    }

    if (typeof renderTasks === "function") {
        renderTasks();
    }

    if (typeof updateDashboardStats === "function") {
        updateDashboardStats();
    }

    renderDashboardActivity();

    if (typeof renderDashboardProductivity === "function") {
        renderDashboardProductivity();
    }
});

// Initial render
renderDashboardActivity();


/* PREMIUM TODAY'S ACTIVITY MENU */
(function connectActivityOptionsMenu() {
    const card = document.querySelector(".premium-activity-card");
    if (!card || card.dataset.menuConnected === "true") return;

    const moreButton = card.querySelector("#activityMoreButton");
    const menu = card.querySelector("#activityOptionsMenu");

    if (!moreButton || !menu) return;

    card.dataset.menuConnected = "true";
    moreButton.setAttribute("aria-expanded", "false");
    moreButton.setAttribute("aria-haspopup", "true");

    function closeMenu() {
        menu.hidden = true;
        moreButton.setAttribute("aria-expanded", "false");
    }

    moreButton.addEventListener("click", function (event) {
        event.stopPropagation();
        menu.hidden = !menu.hidden;
        moreButton.setAttribute("aria-expanded", String(!menu.hidden));
    });

    document.addEventListener("click", function (event) {
        if (!card.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            moreButton.focus();
        }
    });

    menu.addEventListener("click", function (event) {
        const actionButton = event.target.closest("[data-activity-action]");
        if (!actionButton) return;

        const action = actionButton.dataset.activityAction;
        closeMenu();

        if (action === "refresh") {
            if (typeof renderDashboardActivity === "function") {
                renderDashboardActivity();
            }
            if (typeof renderDashboardProductivity === "function") {
                renderDashboardProductivity();
            }
        }

        if (action === "history") {
            showAllDashboardActivity = !showAllDashboardActivity;
            renderDashboardActivity();

            const activityList = document.getElementById("dashboardActivityList");
            if (activityList) {
                activityList.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
})();


/* ==========================================
   TODAY'S ACTIVITY + AI ACTION HISTORY FIX
========================================== */


// Save AI actions
window.addAIActionHistory = function (entry) {
    try {
        const history = JSON.parse(
            localStorage.getItem(ACTIVITY_STORAGE_KEY) || "[]"
        );

        history.unshift({
            ...entry,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem(
            ACTIVITY_STORAGE_KEY,
            JSON.stringify(history.slice(0, 100))
        );

        renderDashboardActivity();
    } catch (error) {
        console.error("Activity save error:", error);
    }
};

// Render activity list
function renderDashboardActivity() {
    const list = document.getElementById("dashboardActivityList");
    if (!list) return;

    let history = [];

    try {
        history = JSON.parse(
            localStorage.getItem(ACTIVITY_STORAGE_KEY) || "[]"
        );
    } catch (error) {
        console.error("Activity read error:", error);
    }

    if (!history.length) {
        list.innerHTML =
            '<p class="activity-empty">No activity recorded yet.</p>';
        return;
    }

    const visibleItems = showAllDashboardActivity
        ? history
        : history.slice(0, 5);

    list.innerHTML = visibleItems.map(item => {
        const date = item.timestamp
            ? new Date(item.timestamp).toLocaleString()
            : "";

        return `
            <div class="activity-item">
                <div class="activity-item-content">
                    <strong>${escapeActivityText(item.action || "Activity")}</strong>
                    <p>${escapeActivityText(item.description || "")}</p>
                    <small>${escapeActivityText(date)}</small>
                </div>
            </div>
        `;
    }).join("");
}

// Escape text before inserting into HTML
function escapeActivityText(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}



// Initial activity load
renderDashboardActivity();

function updateDashboardMonthlyBalance() {
    const cards = document.querySelectorAll(".stat-card");

    const balanceCard = [...cards].find(card =>
        card.querySelector(".stat-label")?.textContent.trim() === "Monthly Balance"
    );

    if (!balanceCard) return;

    const now = new Date();
    let income = 0;
    let expenses = 0;

    const transactions = JSON.parse(
        localStorage.getItem("commandCenterTransactions") || "[]"
    );

    transactions.forEach(t => {
        if (!t.date) return;

        const date = new Date(t.date + "T12:00:00");

        if (
            date.getFullYear() !== now.getFullYear() ||
            date.getMonth() !== now.getMonth()
        ) return;

        if (t.type === "income") {
            income += Number(t.amount) || 0;
        } else if (t.type === "expense") {
            expenses += Number(t.amount) || 0;
        }
    });

    const balance = income - expenses;

    balanceCard.querySelector(".stat-value").textContent =
        "Rs " + balance.toLocaleString("en-PK");

    balanceCard.querySelector(".stat-description").textContent =
        `Rs ${income.toLocaleString("en-PK")} income · Rs ${expenses.toLocaleString("en-PK")} spent this month`;
}
updateDashboardMonthlyBalance();

