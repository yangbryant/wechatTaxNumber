//index.js
//获取应用实例
const app = getApp();
const queryTaxUrl = require('../../config.js').queryTaxUrl;

Page({
  data: {
    taxList: [],
    emptyStr: '欢迎使用查询税号小程序!',
  },
  isArray: function(obj) {
    if(Array.isArray) {
      return Array.isArray(obj);
    } else {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }
  },
  formatTaxList: function(taxList) {
    const formatedTaxList = [];
    if (this.isArray(taxList) === false) return formatedTaxList;

    for (let i = 0; i < taxList.length; i += 1) {

      const keyNo = taxList[i].KeyNo;
      const name = taxList[i].Name;
      const creditCode = taxList[i].CreditCode;

      formatedTaxList.push({ 'keyNo': keyNo, 'name': name, 'creditCode': creditCode });
    }
    return formatedTaxList;
  },
  //事件处理函数
  handleInput: function(event) {
    console.log(event.detail);
    const url = `${queryTaxUrl}?key=${event.detail.value}`;
    const that = this;
    wx.showLoading({
      title: '正在搜索...',
    });
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res.data);
        if (res.statusCode === 200) {
          const taxList = that.formatTaxList(res.data);
          const emptyStr = taxList.length === 0 ? '暂无数据' : '';
          that.setData({
            taxList,
            emptyStr,
          });
          wx.hideLoading();
        } else {
          wx.showToast({
            title: '网络异常',
          });
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '搜索失败',
        });
      }
    });
  },
  bindTap: function(event) {
    const keyNo = event.currentTarget.id;
    wx.navigateTo({
      url: `../detail/detail?keyno=${keyNo}`,
    })
  },
  onLoad: function () {
  }
})
