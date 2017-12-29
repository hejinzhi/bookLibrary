function get(url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}

function Delete(url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}



module.exports = {
    get: get,
    delete: Delete
}