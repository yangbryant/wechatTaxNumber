//index.js
//获取应用实例
const app = getApp();
const queryTaxUrl = require('../../config.js').queryTaxUrl;

Page({
  data: {
    taxList: [],
  },
  formatTaxList(taxList) {
    const formatedTaxList = [];
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
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res.data);
        const taxList = that.formatTaxList(res.data);
        that.setData({
          taxList,
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
