//detail.js
const util = require('../../utils/util.js')
const detailTaxUrl = require('../../config.js').detailTaxUrl;

Page({
  data: {
    taxDetail: {
      Name: "烟台红旗瑞弘建材有限公司",
      KeyNo: "a579b1900b737e8ac0869b5054926fac",
      CreditCode: "91370611695428993G",
      Address: "福山区福新路155号",
      PhoneNumber: "3978707",
      Bank: "农行烟台金盛支行",
      Bankaccount: "15392401040000404"
    }
  },
  formatTaxDetail(taxDetail) {
    return taxDetail;
  },
  onLoad: function(option) {
    // console.log(option.keyno);
    // const keyNo = option.keyno;
    // if (keyNo) {
    //   const url = `${detailTaxUrl}?token=${keyNo}`;
    //   const that = this;
    //   wx.request({
    //     url: url,
    //     data: {},
    //     method: 'GET',
    //     header: {
    //       'content-type': 'application/json',
    //     },
    //     success: function (res) {
    //       console.log(res.data);
    //       const taxDetail = that.formatTaxDetail(res.data);
    //       that.setData({
    //         taxDetail,
    //       });
    //     }
    //   });
    // }
  }
})
