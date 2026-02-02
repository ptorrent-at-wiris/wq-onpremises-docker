(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Get correct answer & student answer div
        const correctAnswerDiv = document.getElementById('correct-answer');
        const studentAnswerDiv = document.getElementById('student-answer');

        // Get WirisQuizzes API instance
        const quizzes = com.wiris.quizzes.api.Quizzes.getInstance();

        // Configure WirisQuizzes service endpoint
        const conf = quizzes.getConfiguration();
        conf.set(com.wiris.quizzes.api.ConfigurationKeys.SERVICE_URL, 'http://localhost:8080/quizzes');
        // Any other configuration options can be set here as needed

        // Build WirisQuizzes data model objects (they will hold the state of the question and the answer)
        const question = quizzes.newQuestion();
        const slot = question.addNewSlot();
        const authorAnswer = slot.addNewAuthorAnswer("");
        const instance = quizzes.newQuestionInstance(question);

        // Build WirisQuizzes UI forms
        const ui = quizzes.getQuizzesComponentBuilder();

        const authoringField = ui.newAuthoringField(question, slot, authorAnswer);
        correctAnswerDiv.replaceChild(authoringField.getElement(), correctAnswerDiv.firstChild);

        const answerField = ui.newAnswerField(instance, slot);
        studentAnswerDiv.replaceChild(answerField.getElement(), studentAnswerDiv.firstChild);

        // Set up submit button
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', function () {
            const request = quizzes.newGradeRequest(instance);
            const response = quizzes.getQuizzesService().execute(request);
            instance.update(response);

            // Show feedback
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = 'Correct: ' + instance.areAllAnswersCorrect();
        });

    });
})();