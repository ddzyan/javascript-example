"use strict";

const autocannon = require("autocannon");
const reporter = require("autocannon-reporter");
const path = require("path");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @description
 * 运行autocannon
 * @author lizc
 * @param {*} param
 */
function makeAutocannon(param) {
  autocannon(param).on("done", handleResults);
}

/**
 * @description
 * 处理接口
 * @author lizc
 * @param {*} result
 */
function handleResults(result) {
  const reportOutputPath = path.join(`./${result.title}_report.html`);
  reporter.writeReport(
    reporter.buildReport(result),
    reportOutputPath,
    (err, res) => {
      if (err) console.err("Error writting report: ", err);
      else console.log("Report written to: ", reportOutputPath);
    }
  );
}

// 请求参数
const autocannonParam = {
  url: "http://127.0.0.1:6100/",
  connections: 100,
  duration: 10,
  headers: {
    type: "application/x-www-form-urlencoded"
  }
};
// 请求报文参数
const requestsParam = {
  method: "POST", // this should be a put for modifying secret details
  headers: {
    // let submit some json?
    "Content-type": "application/json; charset=utf-8"
  }
};

/**
 * @description
 * 启动批量压测
 * @author lizc
 * @param {*} methodList 接口列表
 */
async function run(methodList) {
  const autocannonList = methodList.map(val => {
    return {
      ...autocannonParam,
      url: autocannonParam.url + val,
      title: val,
      requests: [
        {
          ...requestsParam
        }
      ]
    };
  });
  for (let i = 0; i < autocannonList.length; i++) {
    if (i !== 0) {
      await sleep((autocannonList[i - 1].duration + 2) * 1000);
      makeAutocannon(autocannonList[i]);
    } else {
      makeAutocannon(autocannonList[i]);
    }
  }
}
// 启动
run(["order", "crypto"]);
