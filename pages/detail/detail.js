//logs.js
const util = require('../../utils/util.js')
const detailTaxUrl = require('../../config.js').detailTaxUrl;

Page({
  data: {
    taxDetail: null
  },
  formatTaxDetail(taxDetail) {
    return taxDetail;
  },
  onLoad: function(option) {
    console.log(option.keyno);
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
