import requset from '../shared/request';
import config from '../config';

function getAllBooks() {
    return requset.get(config.bookApiUrl);
}

function getBookById(id) {
    return requset.get(config.bookApiUrl + id);
}


module.exports = {
    getAllBooks,
    getBookById
}