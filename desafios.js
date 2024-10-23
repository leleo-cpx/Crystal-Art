let challenges = [];
let currentChallengeIndex = 0;
let hasAnswered = false;

// Função para carregar desafios de um arquivo XML
function loadChallenges() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'challenges.xml', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const xml = this.responseXML;
            const items = xml.getElementsByTagName('challenge');

            for (let i = 0; i < items.length; i++) {
                const question = items[i].getElementsByTagName('question')[0].textContent;
                const correctAnswer = items[i].getElementsByTagName('answer')[0].textContent;
                const options = Array.from(items[i].getElementsByTagName('option')).map(opt => opt.textContent);
                challenges.push({ question, correctAnswer, options });
            }

            showChallenge();
        }
    };
    xhr.send();
}

// Função para exibir o desafio atual
function showChallenge() {
    if (currentChallengeIndex < challenges.length) {
        const challenge = challenges[currentChallengeIndex];
        document.getElementById('question').innerText = challenge.question;
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; // Limpar opções anteriores

        challenge.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'option';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'options';
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement('br'));
        });

        document.getElementById('message').innerText = '';
        document.getElementById('next-button').style.display = 'none';
        hasAnswered = false;
    } else {
        document.getElementById('challenge-area').innerHTML = '<p>Você completou todos os desafios!</p>';
    }
}

// Evento para o botão de responder
document.getElementById('submit-button').onclick = function() {
    const selectedOption = document.querySelector('input[name="options"]:checked');

    if (!hasAnswered && selectedOption) {
        if (selectedOption.value === challenges[currentChallengeIndex].correctAnswer) {
            document.getElementById('message').innerText = 'Desafio respondido, Parabéns!';
            hasAnswered = true;
            document.getElementById('next-button').style.display = 'block';
        } else {
            document.getElementById('message').innerText = 'Resposta incorreta. Tente novamente.';
        }
    }
};

// Evento para o botão de próximo desafio
document.getElementById('next-button').onclick = function() {
    currentChallengeIndex++;
    showChallenge();
};

// Carregar desafios ao iniciar
window.onload = loadChallenges;
