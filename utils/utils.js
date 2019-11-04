const getValidationMessage = (messages) => {
    let errorMessage = [];
    if (messages && messages.errors.length > 0) {
        messages.errors.forEach(element => {
            errorMessage.push(element.msg);
        });
    }
    return errorMessage.join(', ');
}
exports.getValidationMessage = getValidationMessage;