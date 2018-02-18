/**
 * 小程序配置文件
 */

var host = "http://6ne7vs.natappfree.cc/api"

var config = {

  // 下面的地址配合云端 Server 工作
  host,

  // 查询税号列表接口
  queryTaxUrl: `${host}/queryTax`,

  // 查询详细税号开户行信息接口
  detailTaxUrl: `${host}/detailTax`
};

module.exports = config
