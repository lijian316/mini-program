Page({

    /**
     * 页面的初始数据
     * type 0 陪诊 1 陪护
     * date 日期
     * name 姓名
     * phone 电话
     */
    data: {
        type: 0,
        date: '',
        name: '',
        phone: '',
        show: false,
        success: false,
    },

    onLoad: function (options) {
        const type = options.type;
        console.log('type:', type);
    },

    onDisplay() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },

    onPhoneChange(event) {
        this.setData({
            phone: event.detail
        })
    },

    onNameChange(event) {
        this.setData({
            name: event.detail
        })
    },

    onConfirm(event) {
        this.setData({
            show: false,
            date: this.formatDate(event.detail),
        });
    },

    onSubmit() {
        if (this.data.name == "") {
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (this.data.phone == "") {
            wx.showToast({
                title: '联系方式不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (this.data.date == "") {
            wx.showToast({
                title: '日期不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        this.pushData()
    },

    pushData() {
        const db = wx.cloud.database({
            env: 'default-3gsdrtjka14e77e6'
        })
        var that = this;
        var collectionName = this.data.type == 0 ? "peizhen" : "peihu";
        db.collection(collectionName).add({
            data: {
                name: String(this.data.name),
                phone: String(this.data.phone),
                date: String(this.data.date),
            },
            success: function (res) {
                console.log("登记成功", res);
                wx.setClipboardData({
                    data: res._id,
                })
                that.setData({
                    success: true
                })
            }
        })
    },
})