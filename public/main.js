function convertTemperature() {
    const temp = document.getElementById('temperature').value;
    const unit = document.getElementById('unit').value;

    if (!temp) {
        alert('Please enter a temperature value.');
        return;
    }

    fetch(`/convert?temp=${temp}&unit=${unit}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = `Converted Temperature: ${data.converted}`;
        })
        .catch(error => console.error('Error:', error));
}
