const getValidationMessage = (messages) => {
    let errorMessage = [];
    if (messages && messages.errors.length > 0) {
        messages.errors.forEach(element => {
            errorMessage.push(element.msg);
        });
    }
    return errorMessage.join(', ');
}

const deleteFile = (filePath) =>{
    fs.unlink(filePath, (err) =>{
        if(err) throw(err);
    })
}


exports.getValidationMessage = getValidationMessage;
exports.deleteFile = deleteFile;