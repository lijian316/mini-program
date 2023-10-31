Page({
    data: {},

    handleGridItemClick: function (event) {
        const index = event.currentTarget.dataset.index;
        if (index == 0) {
            wx.navigateTo({
                url: '../list/index?type=0'
            });
        } else if (index == 1) {
            wx.navigateTo({
                url: '../list/index?type=1'
            });
        } else if (index == 2) {
            wx.navigateTo({
                url: '../faq/index'
            });
        }
    }
});