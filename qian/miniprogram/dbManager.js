const db = wx.cloud.database();
const _openid = '';
const _ = db.command
const dbName = "";

export function init(name) {
    this.dbName = name;
}

export function get(key = this._openid) {
    console.log("查询：", key);
    this._openid = key;
    return db.collection(this.dbName).where({
        _openid: key
    }).get();
}

export function add(data) {
    console.log("添加：", data);
    return db.collection(this.dbName).add({
        data: data
    })
}

export function addAssets(data) {
    console.log("新增资产：", data)
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            "assets": _.push(data)
        }
    })
}

export function removeAssets(data) {
    console.log("移除资产：", data)
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            "assets": data
        }
    })
}

export function addDebt(data) {
    console.log("新增负债：", data)
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            "debt": _.push(data)
        }
    })
}

export function removeDebt(data) {
    console.log("移除负债：", data)
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            "debt": data
        }
    })
}

export function updateIncome(data) {
    console.log("更新收入：", data);
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            'income.0.value': _.inc(Number(data))
        }
    })
}

export function updatePay(data) {
    console.log("更新支出：", data);
    return db.collection(this.dbName).where({
        _openid: this._openid
    }).update({
        data: {
            "pay.0.value": _.inc(Number(data))
        }
    })
}