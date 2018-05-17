const fs = require('fs');

function fetchComments() {
    try {
        let commments = fs.readFileSync('data.json');
        return JSON.parse(commments);
    } catch (e) {
        return [];
    }
}

function logComment(comment) {
    console.log('------');
    console.log(`Id: ${comment.id}`);
    console.log(`Title: ${comment.title}`);
    console.log(`Content: ${comment.content}`);
}

const addComment = (title, content) => {
    console.log('addComment start');
    let id;
    let comments = fetchComments();
    if (comments.length === 0) {
        id = 0;
    } else {
        id = comments[comments.length - 1].id + 1;
    }
    const comment = {
        id,
        title,
        content
    }
    comments.push(comment);
    fs.writeFileSync('data.json', JSON.stringify(comments));
    logComment(comment);
//   let comments = fs.readFileSync('data.json');
//   comments = JSON.parse(comments);
//   console.log(comments);
}

const listComments = () => {
    const comments = fetchComments();
    comments.forEach((comment) => {
        logComment(comment);
    })
}

const removeComment = (id) => {
    const comments = fetchComments();
    const newComments = comments.filter(comment => comment.id !== id);
    debugger;
    if (newComments.length === comments.length) {
        return false;
    } else {
        fs.writeFileSync('data.json', JSON.stringify(newComments));
        return true;
    }
}

const reportComments = () => {
    const comments = fetchComments();
    comments.forEach(comment => {
        commentReport = `ID: ${comment.id}\n Title: ${comment.title}\n Content: ${comment.content}\n\n`;
        fs.appendFileSync('data.txt', commentReport);
    })
}

// re-arrange all the id. Re-assign the id of each comment
// to make all the id look neat. Goes from 1,2,3,4 ...
const reArrange = () => {
    const comments = fetchComments();
    let id = 0;
    const newComments = comments.map(comment => {
        comment.id = id;
        id++;
        return comment;
    })
    fs.writeFileSync('data.json', JSON.stringify(newComments));
}

module.exports = {
    addComment,
    listComments,
    removeComment,
    reportComments,
    reArrange
}