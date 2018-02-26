//detail.js
const util = require('../../utils/util.js')
const detailTaxUrl = require('../../config.js').detailTaxUrl;

Page({
  data: {
    taxDetail: null,
  },
  fixEmptyString: function(str, placeholder) {
    str = str === '' ? placeholder : str;
    str = str === null ? placeholder : str;
    str = str === 'null' ? placeholder : str;
    return str;
  },
  formatTaxDetail: function(taxDetail) {
    taxDetail.Address = this.fixEmptyString(taxDetail.Address, "暂无数据");
    taxDetail.PhoneNumber = this.fixEmptyString(taxDetail.PhoneNumber, "暂无数据");
    taxDetail.Bank = this.fixEmptyString(taxDetail.Bank, "暂无数据");
    taxDetail.Bankaccount = this.fixEmptyString(taxDetail.Bankaccount, "暂无数据");
    return taxDetail;
  },
  hometap: function(event) {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  bindlongpress: function(event) {
    const taxDetail = this.data.taxDetail;
    const data = `名称:${taxDetail.Name}\n税号:${taxDetail.CreditCode}\n单位地址:${taxDetail.Address}\n电话号码:${taxDetail.PhoneNumber}\n开户银行:${taxDetail.Bank}\n银行账户:${taxDetail.Bankaccount}`;
    wx.setClipboardData({
      data: data,
      success: function(res) {
        wx.showToast({
          title: '已复制到粘贴板',
        })
      }
    });
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '企业发票抬头信息',
      path: `/pages/detail/detail?keyno=${this.data.taxDetail.KeyNo}`,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  onLoad: function(option) {
    const keyNo = option.keyno;
    if (keyNo) {
      const url = `${detailTaxUrl}?token=${keyNo}`;
      const that = this;
      wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          console.log(res.data);
          const taxDetail = that.formatTaxDetail(res.data);
          that.setData({
            taxDetail,
          });
        }
      });
    }
  }
})
