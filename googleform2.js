document.addEventListener('DOMContentLoaded', () => {
    const formFieldsContainer = document.querySelector('#formFields');
    const addFieldButton = document.querySelector('#addField');
    const dynamicForm = document.querySelector('#dynamicForm');
    const responseMessage = document.querySelector('#responseMessage');
    let fieldCount = 0;

    
    addFieldButton.addEventListener('click', () => {
        fieldCount++;
        const fieldDiv = document.createElement('div');
        fieldDiv.innerHTML = `
            <input type="text" name="dynamicField" placeholder="Enter question ${fieldCount}" required />
            <button type="button" class="remove-btn">Remove</button>
        `;
        formFieldsContainer.appendChild(fieldDiv);

        fieldDiv.querySelector('.remove-btn').addEventListener('click', () => fieldDiv.remove());
    });

    
    dynamicForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(dynamicForm);
        const response = `
            <h3>Form Submitted!</h3>
            ${['name', 'email', 'age', 'likeProduct', 'comments'].map(
                (field) => `<p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${formData.get(field) || 'None'}</p>`
            ).join('')}
            ${formData.getAll('dynamicField').map(
                (field, index) => `<p><strong>Dynamic Field ${index + 1}:</strong> ${field}</p>`
            ).join('')}
        `;
        responseMessage.innerHTML = response;
        dynamicForm.reset();
        formFieldsContainer.innerHTML = '';
        fieldCount = 0;
    });
});
