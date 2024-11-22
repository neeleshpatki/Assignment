function fetchQuizQuestions(category, difficulty) {
    const url = `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}&difficulty=${difficulty}`;

    $.ajax({
      url: url,
      method: 'GET',
      success: function(response) {
        const questions = response.results;
        $('#quiz').show();
        $('#result').hide();
        $('#questions').html('');
        let questionHtml = '';

        questions.forEach((question, index) => {
          const answers = [...question.incorrect_answers, question.correct_answer];
          const shuffledAnswers = shuffleArray(answers);
          questionHtml += `
            <div class="question">
              <p>${index + 1}. ${question.question}</p>
              <div class="answers">
                ${shuffledAnswers.map((answer, i) => `
                  <label>
                    <input type="radio" name="question${index}" value="${answer}">
                    ${answer}
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        });

        $('#questions').html(questionHtml);
      },
      error: function() {
        alert('Error fetching quiz questions.');
      }
    });
  }

  // Shuffle the answer options randomly
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Calculate and display the score
  function calculateScore() {
    let score = 0;
    $('#questions .question').each(function(index, questionDiv) {
      const correctAnswer = $(questionDiv).data('correct-answer');
      const selectedAnswer = $(questionDiv).find('input[type="radio"]:checked').val();
      if (selectedAnswer === correctAnswer) {
        score++;
      }
    });
    $('#score').text(score);
    $('#result').show();
    $('#quiz').hide();
  }

  // Event listeners
  $(document).ready(function() {
    $('#startBtn').click(function() {
      const category = $('#category').val();
      const difficulty = $('#difficulty').val();
      fetchQuizQuestions(category, difficulty);
    });

    $('#submitBtn').click(function() {
      calculateScore();
    });
  });