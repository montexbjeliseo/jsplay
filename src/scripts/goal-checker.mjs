import { a, build } from "./builder.mjs";

class GoalChecker {
    constructor({
        goals = [],
        codeEditor = null,
        outputElement = null,
        messageBox = null,
        previousLesson = null,
        nextLesson,
    }) {
        this.goals = goals;
        this.currentGoal = 0;
        this.codeEditor = codeEditor;
        this.outputElement = outputElement;
        this.messageBox = messageBox;
        this.previousLesson = previousLesson;
        this.nextLesson = nextLesson;

        this.observer = new MutationObserver(() => {
            const cmContent = document.querySelector(".cm-content");
            const messageBox = document.querySelector("#message-box");

            if (!cmContent) {
                console.error("No se encontro el elemento 'cmContent'");
                return;
            }

            if (!messageBox) {
                console.error("No se encontro el elemento 'messageBox'");
                return;
            }

            if (this.goals[this.currentGoal].test() && !this.goals[this.currentGoal].completed) {
                this.goals[this.currentGoal].completed = true;

                messageBox.className = "success";
                messageBox.innerHTML = `
                        ${build("p", this.goals[this.currentGoal].successMessage)}
                        ${build("button", "Continuar", { id: "continue-btn" })}
                    `;
                this.configureContinueButton();
            } else if (!this.goals[this.currentGoal].completed) {
                messageBox.className = "warning";
                messageBox.innerHTML = `
                        ${build("b", "Tu respuesta no es correcta.")}
                        ${build("p", this.goals[this.currentGoal].description)}
                    `;
                this.configureContinueButton();
            }
        });

    }

    setGoal(index) {
        this.currentGoal = index;

        this.messageBox = this.messageBox || document.querySelector("#message-box");

        if (this.messageBox) {
            this.messageBox.textContent = this.goals[this.currentGoal].description;
            this.messageBox.className = "info";
        }
    }

    configureContinueButton() {
        const continueBtn = document.querySelector("#continue-btn");

        if (continueBtn) {
            continueBtn.addEventListener("click", () => {
                if (this.currentGoal < this.goals.length - 1) {
                    this.setGoal(this.currentGoal + 1);
                } else {
                    this.finishLesson(this.nextLesson.link);
                }
            });
        }
    }

    finishLesson = (nextLessonLink) => {
        const successMessage = document.querySelector("#message-box");
        if (successMessage) {
            successMessage.innerHTML = `
                ${build("p", "¡Felicidades! Has completado el tutorial.")}
                ${nextLessonLink ? a("Siguiente tutorial", nextLessonLink) : ""}`;
        }
    }

    run() {
        this.setGoal(0);

        if (this.outputElement) {
            this.observer.observe(this.outputElement, { childList: true, subtree: true });
        } else {
            console.error("No se encontro el elemento 'outputElement'");
        }
    }

}

export default GoalChecker;