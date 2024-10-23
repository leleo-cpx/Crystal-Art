document.getElementById('addItemBtn').addEventListener('click', function() {
    const inputValue = document.getElementById('itemInput').value;
    if (inputValue.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = inputValue;
    document.getElementById('itemList').appendChild(li);
    document.getElementById('itemInput').value = ''; // Limpa o input após adicionar
    }
    });
